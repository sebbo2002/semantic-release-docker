export interface PluginConfig {
    images: string | string[];
    tag?: {
        latest?: boolean;
        major?: boolean;
        minor?: boolean;
        version?: boolean;
        channel?: boolean;
    }
}

export interface NormalizedPluginConfigTags {
    latest: boolean;
    major: boolean;
    minor: boolean;
    version: boolean;
    channel: boolean;
}

export type PluginConfigTagKeys = keyof NormalizedPluginConfigTags;

export interface NormalizedPluginConfig {
    images: string[];
    tag: NormalizedPluginConfigTags
}

export interface MajorAndMinorPart {
    major: string | null;
    minor: string | null;
}

export interface TagTask {
    input: string;
    output: string;
}

export interface PublishResponse {
    name: string;
    url?: string;
    channel?: string;
}
