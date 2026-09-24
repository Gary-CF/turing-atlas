"use client";

import { useState } from "react";
import type { Person } from "@/lib/content";
import { getPortrait } from "@/lib/portraits";

export default function Portrait({ person, large = false, round = false }: { person: Person; large?: boolean; round?: boolean }) {
  const [failed, setFailed] = useState(false);
  const photo = getPortrait(person.id), src = photo && !failed ? `/portraits/${photo.file}` : undefined;
  const words = person.name.split(" ");
  const className = `portrait${large ? " portrait-large" : ""}${photo?.illustration ? " portrait-line-art" : ""}`;
  // Frame group photos consistently without altering the licensed source file.
  if (src && photo?.crop) {
    const cropped = <svg viewBox={photo.crop.viewBox} preserveAspectRatio="xMidYMid slice" {...(round ? { x: -37, y: -37, width: 74, height: 74 } : { className, role: "img", "aria-label": `${person.name} 肖像` })}><image href={src} width={photo.crop.width} height={photo.crop.height} onError={() => setFailed(true)} /></svg>;
    return round ? <g clipPath={`url(#clip-${person.id})`}>{cropped}</g> : cropped;
  }
  if (round) return src
    ? <image className={photo?.illustration ? "portrait-line-art" : undefined} href={src} x="-37" y="-37" width="74" height="74" preserveAspectRatio="xMidYMid slice" clipPath={`url(#clip-${person.id})`} onError={() => setFailed(true)} />
    : <text textAnchor="middle" className="node-placeholder">{words.map((word, i) => <tspan key={i} x="0" y={(i - (words.length - 1) / 2) * 13 + 4} textLength={word.length > 10 ? 62 : undefined} lengthAdjust="spacingAndGlyphs">{word}</tspan>)}</text>;
  return src
    ? <img className={className} src={src} alt={`${person.name} 肖像`} width={large ? 300 : 180} height={large ? 360 : 210} loading={large ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
    : <div className={`${className} portrait-placeholder`}><span lang="en">{person.name}</span></div>;
}
