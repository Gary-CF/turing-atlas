import records from "./portraits.json";
import roster from "./roster.json";
import { settings } from "./content";

export type Photo = { id: string; name: string; file: string; sourcePage: string; credit: string; license?: string; licenseUrl?: string; modifications: string; illustration?: boolean; crop?: { viewBox: string; width: number; height: number } };
export const portraits: Photo[] = settings.lineArtPortraits ? roster.map(person => {
  const source = records.find(photo => photo.id === person.id);
  return { id: person.id, name: person.name, file: `line-art/${person.id}.${source?.license.startsWith("GFDL") ? "png" : "webp"}`, illustration: true,
    sourcePage: source?.sourcePage ?? person.source, credit: source ? `参考图：${source.credit}；AI 线描改绘：Turing Atlas` : "Turing Atlas · AI 线描插画",
    license: source?.license, licenseUrl: source?.licenseUrl, modifications: "AI 黑金线描绘制、尺寸调整与展示裁切" };
}) : records;
const byId: Record<string, Photo | undefined> = Object.fromEntries(portraits.map(photo => [photo.id, photo]));
export const getPortrait = (id: string) => settings.portraits ? byId[id] : undefined;
