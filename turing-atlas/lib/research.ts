import type { Material, Person } from "./content";
import profiles from "./research-profiles.json";
import library from "./research-materials.json";

const materials: Record<string, Material> = library;
export const research: Record<string, Partial<Person>> = Object.fromEntries(
  Object.entries(profiles).map(([id, p]) => [id, { ...p, materials: p.materials.map(ref => materials[ref]) }]),
);
