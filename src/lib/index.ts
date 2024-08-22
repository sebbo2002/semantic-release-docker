import { type PublishContext } from 'semantic-release';
import {
    type MajorAndMinorPart,
    type NormalizedPluginConfigTags,
    type NormalizedPluginConfig,
    type PluginConfig,
    type PluginConfigTagKeys,
    type TagTask,
    type PublishResponse
} from './types.js';
import { execa } from 'execa';

export {
    type PluginConfig,
    type NormalizedPluginConfigTags,
    type NormalizedPluginConfig,
    type PluginConfigTagKeys,
    type MajorAndMinorPart,
    type TagTask
};

let IS_REGCTL_AVAILABLE: boolean | undefined = undefined;

export function parseConfig (config: PluginConfig): NormalizedPluginConfig {
    const result: NormalizedPluginConfig = {
        images: [],
        tag: {
            latest: true,
            major: true,
            minor: true,
            version: true,
            channel: true
        }
    };

    if (typeof config.images === 'string') {
        result.images.push(config.images);
    } else if (Array.isArray(config.images)) {
        config.images
            .filter(image => typeof image === 'string')
            .forEach(image => result.images.push(image));
    } else {
        throw new Error('Configuration invalid: No image defined!');
    }

    const tagNames = Object.keys(result.tag) as PluginConfigTagKeys[];
    tagNames.forEach(name => {
        const value = config.tag ? config.tag[name] : undefined;
        if (value === true || value === false) {
            result.tag[name] = value;
        }
    });

    return result;
}

export function getBaseImage (input: string): string {
    let p = input.split('@')[0].split(':');

    // it's a ":port"
    if (p[1] && p[1].includes('/')) {
        p = [p[0] + ':' + p[1], p[2]];
    }

    return p[0];
}

export function isPreRelease (context: PublishContext): boolean {
    return Boolean(context.nextRelease && context.nextRelease.version.includes('-'));
}

export function getMajorAndMinorPart (version: string | undefined): MajorAndMinorPart {
    if (!version) {
        return {
            major: null,
            minor: null
        };
    }

    const parts = version.split('.', 2);
    return {
        major: parts[0],
        minor: parts[1]
    };
}

export function getTagTasks (config: NormalizedPluginConfig, context: PublishContext): TagTask[] {
    const result: TagTask[] = [];

    if (!context.nextRelease) {
        return [];
    }

    const version = context.nextRelease.version;
    config.images.forEach(input => {
        const outputBase = getBaseImage(input);

        // version
        if (config.tag.version && version) {
            result.push({
                input,
                output: `${outputBase}:${version}`
            });
        }

        if (!isPreRelease(context)) {
            const { major, minor } = getMajorAndMinorPart(version);

            // latest
            if (config.tag.latest) {
                result.push({
                    input,
                    output: `${outputBase}:latest`
                });
            }

            // major
            if (config.tag.major && major) {
                result.push({
                    input,
                    output: `${outputBase}:${major}`
                });
            }

            // minor
            if (config.tag.minor && major && minor) {
                result.push({
                    input,
                    output: `${outputBase}:${major}.${minor}`
                });
            }
        }

        // channel
        const channel = context.nextRelease?.channel;
        if (config.tag.channel && channel) {
            result.push({
                input,
                output: `${outputBase}:${channel}`
            });
        }
    });

    return result;
}

export function getUrlFromImage (image: string): string | undefined {
    const parts = getBaseImage(image).split('/');
    if (parts[0] === 'ghcr.io' && parts.length === 3) {
        return `https://github.com/${parts[1]}/${parts[2]}/pkgs/container/${parts[2]}`;
    }
    if (parts[0] === 'registry.gitlab.com' && parts.length >= 3) {
        return `https://gitlab.com/${parts[1]}/${parts[2]}/container_registry`;
    }

    const couldBeAHostname = parts[0].includes('.');
    if (!couldBeAHostname && parts.length === 2) {
        return `https://hub.docker.com/r/${parts[0]}/${parts[1]}/tags`;
    }
    if (!couldBeAHostname && parts.length === 1) {
        return `https://hub.docker.com/_/${parts[0]}/tags`;
    }
}

export async function exec (file: string, args: string[]): Promise<void> {
    try {
        await execa(file, args);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'command' in error && 'message' in error) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw new Error(`Unable to run "${error.command}": ${error.message}`);
        } else {
            throw new Error(`Unable to run "${args.join(' ')}": ${error}`);
        }
    }
}

export async function isRegCtlAvailable (): Promise<boolean> {
    if(IS_REGCTL_AVAILABLE !== undefined) {
        return IS_REGCTL_AVAILABLE;
    }

    try {
        await execa('which', ['regctl']);
        IS_REGCTL_AVAILABLE = true;
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(error) {
        IS_REGCTL_AVAILABLE = false;
        return false;
    }
}

export async function tagImage (input: string, output: string): Promise<void> {
    await exec('docker', ['tag', input, output]);
}

export async function pushImage (image: string): Promise<void> {
    await exec('docker', ['push', image]);
}

export async function copyImage (input: string, output: string): Promise<void> {
    await exec('regctl', ['image', 'copy', input, output]);
}

export async function publish (pluginConfig: PluginConfig, context: PublishContext): Promise<boolean | PublishResponse> {
    if (!context.nextRelease) {
        context.logger.log('No release schedules, so no images to tag.');
        return false;
    }

    const config = parseConfig(pluginConfig);
    const tasks = getTagTasks(config, context);
    if (!tasks.length) {
        return false;
    }

    for (const task of tasks) {
        if(await isRegCtlAvailable()) {
            context.logger.log(`Copy with regctl ${task.input} → ${task.output}`);

            try {
                await copyImage(task.input, task.output);
                continue;
            }
            catch(error) {
                context.logger.error(error);
                context.logger.log('Retry without regctl…');
            }
        }

        context.logger.log(`Tag ${task.input} → ${task.output}`);
        await tagImage(task.input, task.output);

        context.logger.log(`Push ${task.output}`);
        await pushImage(task.output);
    }

    const channel = context.nextRelease?.channel;
    const firstTask = tasks[0];
    return {
        name: `Docker container (${firstTask.output})`,
        url: getUrlFromImage(firstTask.output),
        channel
    };
}

export default {
    publish
};
