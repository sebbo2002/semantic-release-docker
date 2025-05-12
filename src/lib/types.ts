export interface MajorAndMinorPart {
    major: null | string;
    minor: null | string;
}

export interface NormalizedPluginConfig {
    images: string[];
    tag: NormalizedPluginConfigTags;
}

export interface NormalizedPluginConfigTags {
    channel: boolean;
    latest: boolean;
    major: boolean;
    minor: boolean;
    version: boolean;
}

export interface PluginConfig {
    images: string | string[];
    tag?: {
        channel?: boolean;
        latest?: boolean;
        major?: boolean;
        minor?: boolean;
        version?: boolean;
    };
}

export type PluginConfigTagKeys = keyof NormalizedPluginConfigTags;

export interface PublishResponse {
    channel?: string;
    name: string;
    url?: string;
}

export interface TagTask {
    input: string;
    output: string;
}
