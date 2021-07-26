import { Context } from 'semantic-release';
import {MajorAndMinorPart, NormalizedPluginConfigTags, NormalizedPluginConfig, PluginConfig, PluginConfigTagKeys, TagTask} from './types';
import execa from 'execa';

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

    if(typeof config.images === 'string') {
        result.images.push(config.images);
    }
    else if(Array.isArray(config.images)) {
        config.images
            .filter(image => typeof image === 'string')
            .forEach(image => result.images.push(image));
    }
    else {
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
    if(p[1] && p[1].includes('/')) {
        p = [p[0] + ':' + p[1], p[2]];
    }

    return p[0];
}

export function isNoPreRelease(context: Context): boolean {
    return ['major', 'minor', 'patch'].includes(String(context.nextRelease?.type));
}

export function getMajorAndMinorPart(version: string | undefined): MajorAndMinorPart {
    if(!version) {
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

    if(!context.nextRelease) {
        return [];
    }

    const version = context.nextRelease.version;
    config.images.forEach(input => {
        const outputBase = getBaseImage(input);

        if(isNoPreRelease(context)) {
            const {major, minor} = getMajorAndMinorPart(version);

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

        // version
        if (config.tag.version && version) {
            result.push({
                input,
                output: `${outputBase}:${version}`
            });
        }

        // channel
        // Sadly, channel is not defined in the types…
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

export async function docker(command: string[]): Promise<void> {
    try {
        await execa('docker', command);
    }
    catch(error) {
        throw new Error(`Unable to run "${error.command}": ${error.message}`);
    }
}

export async function tagImage(input: string, output: string): Promise<void> {
    await docker(['tag', input, output]);
}

export async function pushImage(image: string): Promise<void> {
    await docker(['push', image]);
}

export async function publish (pluginConfig: PluginConfig, context: Context): Promise<void> {
    if(!context.nextRelease) {
        context.logger.log('No release schedules, so no images to tag.');
        return;
    }

    const config = parseConfig(pluginConfig);
    const tasks = getTagTasks(config, context);

    for(const task of tasks) {
        context.logger.log(`Tag ${task.input} → ${task.output}`);
        await tagImage(task.input, task.output);

        context.logger.log(`Push ${task.output}`);
        await pushImage(task.output);
    }
}

export default {
    publish
};
