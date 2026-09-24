import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";

export const heroOptions = { centered: true, beacon: true, stars: true, typing: true, loopTyping: true, motion: true, starCount: 160, rotationSeconds: 9, twinkleSeconds: 6, letterSeconds: 0.28, wordPauseSeconds: 0.65, pauseSeconds: 5 };
const tagline = "Hello World!";
// Deterministic positions keep the server and browser render identical.
const stars = Array.from({ length: heroOptions.starCount }, (_, i) => [(i * 73.137 + 3) % 100, (i * 37.781 + 7) % 100]);

export default function Hero() {
  const options = heroOptions;
  const split = tagline.indexOf(" ") + 1;
  const firstWord = split * options.letterSeconds;
  const resume = firstWord + options.wordPauseSeconds;
  const typed = tagline.length * options.letterSeconds + options.wordPauseSeconds;
  const cycle = typed + options.pauseSeconds;
  const percent = (seconds: number) => 100 * seconds / cycle;
  const style = { "--orb-period": `${options.rotationSeconds}s`, "--typing-cycle": `${cycle}s`, "--typing-iterations": options.loopTyping ? "infinite" : 1, "--type-width": `calc(${tagline.length}ch + ${tagline.length * 0.08}em + 1px)` } as CSSProperties;
  return <section className={`hero${options.centered ? " hero-centered" : ""}`} data-motion={options.motion} style={style}>
    {/* Hold between words, then hold the complete line before restarting. */}
    <style>{`@keyframes hero-type {
      0% { width: 0; animation-timing-function: steps(${split}, end); }
      ${percent(firstWord)}% { width: ${100 * split / tagline.length}%; }
      ${percent(resume)}% { width: ${100 * split / tagline.length}%; animation-timing-function: steps(${tagline.length - split}, end); }
      ${percent(typed)}%, 100% { width: 100%; }
    }`}</style>
    {options.stars && <div className="hero-stars" aria-hidden="true">{stars.map(([x, y], i) => <span key={i} style={{ left: `${x}%`, top: `${y}%`, "--size": `${i % 19 === 0 ? 3.4 : 1 + (i % 4) * 0.45}px`, "--brightness": 0.55 + (i % 4) * 0.15, "--period": `${options.twinkleSeconds + i % 5}s`, "--delay": `${-i * 1.7}s` } as CSSProperties} />)}</div>}
    <p className="eyebrow">THE PEOPLE BEHIND COMPUTING · SINCE 1966</p>
    <h1 aria-label="Turing Award Laureates"><span aria-hidden="true">Tur{options.beacon ? <span className="beacon-letter">ı<span className="beacon-orb" /></span> : "i"}ng Award<br /><em>Laureates.</em></span></h1>
    <div className="hero-bottom">
      <p>{options.typing ? <><span className="sr-only">{tagline}</span><span className="typewriter-slot" aria-hidden="true"><span className="typewriter">{tagline}</span></span></> : tagline}</p>
      <a href="#archive" className="text-link">浏览人物 <ArrowDown size={16} /></a>
    </div>
  </section>;
}
