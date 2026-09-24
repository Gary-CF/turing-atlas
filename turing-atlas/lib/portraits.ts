import records from "./portraits.json";
import { settings } from "./content";

export type Photo = { id: string; name: string; file: string; sourcePage: string; credit: string; license: string; licenseUrl: string; modifications: string; crop?: { viewBox: string; width: number; height: number } };
export const portraits = records as Photo[];
const byId: Record<string, Photo | undefined> = Object.fromEntries(portraits.map(photo => [photo.id, photo]));
export const getPortrait = (id: string) => settings.portraits ? byId[id] : undefined;
