import { nanoid } from "nanoid";

const adjectives: string[] = [
    "brave", "cool", "swift", "clever", "fierce", "bold", "mystic", "silent",
    "fearless", "frosty", "radiant", "shadow", "electric", "crimson", "silver"
];

const nouns: string[] = [
    "phantom", "tiger", "wizard", "knight", "falcon", "ranger", "ninja", "wolf",
    "storm", "dragon", "vortex", "guardian", "warrior", "comet", "nebula"
];

export function generateUniqueName(): string {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const uniqueId = nanoid(12);

    return `${randomAdjective}-${randomNoun}-${uniqueId}`;
}

