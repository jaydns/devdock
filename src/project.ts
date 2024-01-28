import { invoke } from '@tauri-apps/api/tauri';
import { LanguageReport, Project } from './types';


async function getProjectDetails(path: string): Promise<Project> {
    // debug
    if (!window.__TAURI_IPC__) {
        return {
            name: "jaydns/solcompute",
            description: "SolCompute - our winning submission to ChargerHacks 2023",
            path: "/home/test/Projects/solcompute",
            mainLanguage: "JavaScript",
            id: 1,
        }
    }

    const stats = await invoke<LanguageReport>("get_lang_stats", { path: path });

    console.log(stats)

    let maxCode = -1;
    let maxKey = '';

    for (const key in stats) {
        if (["Json", "Svg", "Tsx", "Jsx"].includes(key)) continue; // todo consolidate tsx and jsx
        if (stats[key].code > maxCode) {
            maxCode = stats[key].code;
            maxKey = key;
        }
    }

    const repoUrl = await invoke<string>("get_remote_repo_url", { path: path });

    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const matches = repoUrl.match(regex);

    let apiUrl = "";

    if (matches) {
        const [, owner, repo] = matches;
        apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    }

    const repoInfo = await fetch(apiUrl).then(res => res.json());

    return {
        name: repoInfo.full_name,
        description: repoInfo.description,
        path,
        mainLanguage: maxKey,
        id: 1,
        avatar: repoInfo.owner.avatar_url
    }
}

export { getProjectDetails };
