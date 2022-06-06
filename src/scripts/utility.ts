import { TDetails } from "./types/types";

export function moveClassDNone([...add], [...remove]) {
    add.forEach(node => node.classList.add('d-none'));
    remove.forEach(node => node.classList.remove('d-none'));
}

export async function getDetails(url: string): Promise<TDetails> {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    };
};

export function setPendingMessage(node: HTMLDivElement) {
    node.innerText = 'Getting the weather details...'
    moveClassDNone([], [node]);
};