export type Project = {
    id: number;
    name: string;
    description: string;
    mainLanguage: string;
    path: string;
    avatar?: string;
}

export interface LanguageReport {
    [key: string]: Stats;
}

export interface Stats {
    blanks: number;
    children: Children;
    code: number;
    comments: number;
    inaccurate: boolean;
    reports: Report[];
}

export interface FileLevelReport {
    name: string;
    stats: FileLevelStats;
}

export interface FileLevelStats {
    blanks: number;
    code: number;
    comments: number;
}