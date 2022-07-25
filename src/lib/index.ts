import { Context } from 'semantic-release';
import {
    MajorAndMinorPart,
    NormalizedPluginConfigTags,
    NormalizedPluginConfig,
    PluginConfig,
    PluginConfigTagKeys,
    TagTask,
    PublishResponse
} from './types.js';
import { execa } from 'execa';

export {
    PluginConfig,
    NormalizedPluginConfigTags,
    NormalizedPluginConfig,
    PluginConfigTagKeys,
    MajorAndMinorPart,
    TagTask
};

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

export function isPreRelease (context: Context): boolean {
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

export function getTagTasks (config: NormalizedPluginConfig, context: Context): TagTask[] {
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

export async function docker (command: string[]): Promise<void> {
    try {
        await execa('docker', command);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'command' in error && 'message' in error) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            throw new Error(`Unable to run "${error.command}": ${error.message}`);
        } else {
            throw new Error(`Unable to run "${command.join(' ')}": ${error}`);
        }
    }
}

export async function tagImage (input: string, output: string): Promise<void> {
    await docker(['tag', input, output]);
}

export async function pushImage (image: string): Promise<void> {
    await docker(['push', image]);
}

export async function publish (pluginConfig: PluginConfig, context: Context): Promise<boolean | PublishResponse> {
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
