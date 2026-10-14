import type { Fallback } from "@/content/sections";

/**
 * Flat placeholder drawings shown until real warehouse photos exist.
 * Warm greys a shade darker than the page, with the notice-bar green as the only accent.
 */

const C = {
  bg: "#e3e1da",
  wall: "#dcd9d0",
  floor: "#e7e5df",
  box: ["#cfc8ba", "#c4bcab", "#d8d2c5", "#bdb5a4"],
  tape: "#e4dfd3",
  line: "#a9a293",
  dark: "#8c8575",
  light: "#f1efe9",
  accent: "#2c4a3c",
};

/** Deterministic box sizes so the shelves look stocked but identical on every render. */
const WIDTHS = [46, 62, 38, 54, 70, 44, 58, 36];
const HEIGHTS = [50, 64, 42, 58, 46, 60];

function Box({ x, y, w, h, i, label }: { x: number; y: number; w: number; h: number; i: number; label?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.box[i % C.box.length]} />
      <rect x={x + w / 2 - 3} y={y} width={6} height={h * 0.38} fill={C.tape} />
      {label && <rect x={x + w * 0.18} y={y + h * 0.55} width={w * 0.42} height={h * 0.2} fill={C.light} />}
    </g>
  );
}

/** One storage rack: uprights, beams, and boxes filling each level from the left. */
function Rack({ x, w, top, floor, levels, seed = 0 }: { x: number; w: number; top: number; floor: number; levels: number; seed?: number }) {
  const gap = (floor - top) / levels;
  const beams = Array.from({ length: levels }, (_, l) => top + gap * (l + 1));
  const boxes: React.ReactNode[] = [];
  beams.forEach((beamY, l) => {
    let cx = x + 10;
    let k = seed + l * 3;
    while (true) {
      const bw = WIDTHS[k % WIDTHS.length];
      const bh = Math.min(HEIGHTS[(k + l) % HEIGHTS.length], gap - 14);
      if (cx + bw > x + w - 10) break;
      boxes.push(<Box key={`${l}-${k}`} x={cx} y={beamY - bh - 3} w={bw} h={bh} i={k} label={k % 3 === 0} />);
      cx += bw + 4;
      k++;
    }
  });
  return (
    <g>
      {boxes}
      {beams.map((y) => <rect key={y} x={x} y={y - 3} width={w} height={6} fill={C.dark} />)}
      <rect x={x} y={top} width={5} height={floor - top} fill={C.dark} />
      <rect x={x + w - 5} y={top} width={5} height={floor - top} fill={C.dark} />
    </g>
  );
}

function Warehouse() {
  return (
    <>
      <rect width="400" height="460" fill={C.wall} />
      <rect y="330" width="400" height="130" fill={C.floor} />
      {[70, 190, 310].map((x) => <rect key={x} x={x} y="24" width="40" height="5" fill={C.light} />)}
      <Rack x={24} w={170} top={60} floor={330} levels={3} seed={1} />
      <Rack x={206} w={170} top={60} floor={330} levels={3} seed={4} />
      <rect x="0" y="352" width="400" height="3" fill={C.accent} opacity=".5" />
      {/* Pallet ready to ship */}
      <rect x="112" y="420" width="176" height="8" fill={C.dark} />
      <rect x="120" y="428" width="12" height="10" fill={C.dark} />
      <rect x="194" y="428" width="12" height="10" fill={C.dark} />
      <rect x="268" y="428" width="12" height="10" fill={C.dark} />
      <Box x={116} y={364} w={56} h={56} i={1} />
      <Box x={172} y={364} w={56} h={56} i={0} label />
      <Box x={228} y={364} w={56} h={56} i={3} />
      <Box x={140} y={316} w={60} h={48} i={2} />
      <Box x={200} y={316} w={60} h={48} i={1} />
      <rect x="206" y="340" width="20" height="8" fill={C.accent} />
    </>
  );
}

function Shelves() {
  return (
    <>
      <rect width="640" height="560" fill={C.wall} />
      <rect y="480" width="640" height="80" fill={C.floor} />
      <rect y="500" width="640" height="3" fill={C.accent} opacity=".5" />
      <Rack x={30} w={190} top={40} floor={480} levels={4} seed={0} />
      <Rack x={225} w={190} top={40} floor={480} levels={4} seed={5} />
      <Rack x={420} w={190} top={40} floor={480} levels={4} seed={2} />
      {["A-01", "A-02", "A-03"].map((s, i) => (
        <g key={s}>
          <rect x={44 + i * 195} y="18" width="44" height="16" fill={i === 1 ? C.accent : C.dark} />
          <text x={66 + i * 195} y="29.5" textAnchor="middle" fontSize="9" fill={C.light} style={{ fontFamily: "var(--mono)", letterSpacing: ".06em" }}>{s}</text>
        </g>
      ))}
    </>
  );
}

function Inspection() {
  const rows = [0, 1, 2, 3];
  return (
    <>
      <rect width="400" height="300" fill={C.wall} />
      {/* Bench */}
      <rect x="0" y="214" width="400" height="12" fill={C.dark} />
      <rect y="226" width="400" height="74" fill={C.floor} />
      <rect x="30" y="226" width="10" height="74" fill={C.line} />
      <rect x="360" y="226" width="10" height="74" fill={C.line} />
      {/* Checklist */}
      <rect x="44" y="64" width="116" height="150" fill={C.light} />
      <rect x="82" y="56" width="40" height="14" fill={C.dark} />
      {rows.map((r) => (
        <g key={r}>
          <rect x="58" y={90 + r * 28} width="14" height="14" fill="none" stroke={C.dark} strokeWidth="1.5" />
          {r < 3 && <path d={`M61 ${97 + r * 28} l3.5 3.5 l6 -7`} fill="none" stroke={C.accent} strokeWidth="2.2" />}
          <rect x="80" y={94 + r * 28} width={r % 2 ? 50 : 64} height="5" fill={C.box[0]} />
        </g>
      ))}
      {/* Dropper bottle */}
      <rect x="196" y="150" width="40" height="64" fill={C.box[3]} />
      <rect x="208" y="132" width="16" height="18" fill={C.dark} />
      <rect x="211" y="112" width="10" height="20" fill={C.line} />
      <rect x="203" y="176" width="26" height="14" fill={C.light} />
      {/* Pump bottle */}
      <rect x="252" y="122" width="44" height="92" fill={C.box[0]} />
      <rect x="266" y="108" width="16" height="14" fill={C.dark} />
      <rect x="262" y="100" width="34" height="8" fill={C.dark} />
      <rect x="260" y="150" width="28" height="20" fill={C.light} />
      {/* Jar */}
      <rect x="312" y="178" width="58" height="36" fill={C.box[2]} />
      <rect x="308" y="166" width="66" height="12" fill={C.accent} />
      {/* Expiry tag */}
      <rect x="258" y="176" width="32" height="12" fill={C.accent} />
      <text x="274" y="185" textAnchor="middle" fontSize="7.5" fill={C.light} style={{ fontFamily: "var(--mono)", letterSpacing: ".06em" }}>EXP OK</text>
    </>
  );
}

function Packing() {
  return (
    <>
      <rect width="400" height="300" fill={C.wall} />
      <rect y="240" width="400" height="60" fill={C.floor} />
      {/* Open box with flaps */}
      <polygon points="130,150 102,118 150,118 166,150" fill={C.box[0]} />
      <polygon points="270,150 298,118 250,118 234,150" fill={C.box[0]} />
      <rect x="140" y="138" width="120" height="12" fill={C.dark} />
      <rect x="130" y="150" width="140" height="90" fill={C.box[1]} />
      <rect x="150" y="196" width="56" height="26" fill={C.light} />
      <rect x="156" y="202" width="34" height="4" fill={C.line} />
      <rect x="156" y="210" width="24" height="4" fill={C.line} />
      {/* Products peeking out */}
      <rect x="164" y="124" width="18" height="26" fill={C.box[3]} />
      <rect x="190" y="116" width="16" height="34" fill={C.accent} />
      <rect x="214" y="128" width="22" height="22" fill={C.box[2]} />
      {/* Tape roll */}
      <circle cx="72" cy="222" r="18" fill={C.box[2]} />
      <circle cx="72" cy="222" r="9" fill={C.wall} />
      <rect x="72" y="236" width="34" height="4" fill={C.box[2]} />
      {/* Sealed boxes, labelled for export */}
      <rect x="292" y="176" width="84" height="64" fill={C.box[3]} />
      <rect x="292" y="200" width="84" height="8" fill={C.tape} />
      <rect x="300" y="120" width="68" height="56" fill={C.box[0]} />
      <rect x="330" y="120" width="8" height="56" fill={C.tape} />
      <rect x="306" y="214" width="40" height="18" fill={C.light} />
      <rect x="306" y="214" width="6" height="18" fill={C.accent} />
    </>
  );
}

function Location() {
  return (
    <>
      <rect width="400" height="300" fill={C.bg} />
      {[40, 110, 170, 240].map((y) => <rect key={`h${y}`} x="0" y={y} width="400" height="6" fill={C.light} />)}
      {[60, 150, 260, 340].map((x) => <rect key={`v${x}`} x={x} y="0" width="6" height="300" fill={C.light} />)}
      <polygon points="0,290 400,30 400,44 0,304" fill={C.light} />
      <rect x="166" y="52" width="88" height="52" fill={C.wall} />
      <rect x="276" y="186" width="58" height="48" fill={C.wall} />
      {/* Pin */}
      <rect x="196" y="122" width="26" height="26" fill={C.accent} />
      <rect x="206" y="148" width="6" height="16" fill={C.accent} />
      <rect x="205" y="131" width="8" height="8" fill={C.light} />
    </>
  );
}

function Portrait() {
  return (
    <>
      <rect width="300" height="375" fill={C.bg} />
      <circle cx="150" cy="150" r="54" fill={C.box[0]} />
      <path d="M50 375 C 58 270, 242 270, 250 375 Z" fill={C.box[0]} />
    </>
  );
}

/* ───────────── Dot world map ───────────── */

/**
 * Land as longitude ranges per 5° latitude band (75°N → 50°S), coarse on purpose.
 * The map starts at 25°W so Korea sits mid-frame with the Americas to the right.
 */
const LAND: [number, number][][] = [
  [[-120, -80], [-60, -25], [95, 110]],
  [[-160, -60], [-50, -25], [20, 30], [60, 180]],
  [[-165, -60], [-50, -35], [-22, -14], [10, 180]],
  [[-160, -65], [-45, -40], [5, 165]],
  [[-135, -60], [-8, 0], [10, 160]],
  [[-125, -55], [-5, 140]],
  [[-125, -65], [-5, 30], [40, 135]],
  [[-125, -75], [-10, 20], [25, 120], [125, 129], [138, 142]],
  [[-120, -78], [-10, 10], [35, 120], [126, 140]],
  [[-115, -80], [-10, 30], [35, 120], [130, 132]],
  [[-110, -80], [-15, 55], [60, 120]],
  [[-105, -87], [-17, 40], [42, 58], [70, 88], [95, 110]],
  [[-95, -85], [-17, 40], [42, 52], [75, 80], [98, 108], [120, 122]],
  [[-85, -60], [-15, 50], [78, 80], [98, 105], [120, 125]],
  [[-78, -50], [-10, 45], [100, 105], [115, 120]],
  [[-80, -50], [10, 42], [100, 105], [110, 118], [120, 125]],
  [[-80, -35], [12, 40], [105, 115], [120, 140]],
  [[-78, -35], [13, 40], [120, 150]],
  [[-75, -38], [13, 40], [45, 50], [125, 145]],
  [[-70, -40], [13, 35], [44, 48], [115, 150]],
  [[-70, -45], [15, 33], [113, 153]],
  [[-72, -50], [17, 31], [115, 153]],
  [[-72, -55], [18, 26], [117, 150]],
  [[-73, -62], [145, 148], [173, 176]],
  [[-75, -65], [168, 172]],
  [[-75, -68]],
];
const LON0 = -25;
const STEP = 10;
const px = (lon: number) => (((lon - LON0 + 360) % 360) / 5) * STEP;
const py = (lat: number) => ((75 - lat) / 5) * STEP + STEP / 2;

const DOTS = LAND.flatMap((ranges, r) =>
  Array.from({ length: 72 }, (_, c) => -180 + c * 5 + 2.5)
    .filter((lon) => ranges.some(([a, b]) => lon >= a && lon <= b))
    .map((lon) => [px(lon), r * STEP + STEP / 2] as const)
);

const KOREA = { x: px(127), y: py(37) };
const ROUTES = [
  { lon: -102, lat: 23, soon: false }, // Mexico
  { lon: 68, lat: 48, soon: false },   // Kazakhstan
  { lon: 54, lat: 24, soon: false },   // UAE
  { lon: 10, lat: 50, soon: true },    // Europe
].map(({ lon, lat, soon }) => {
  const x = px(lon), y = py(lat);
  const lift = Math.abs(x - KOREA.x) * 0.28;
  return { x, y, soon, d: `M${KOREA.x} ${KOREA.y} Q ${(x + KOREA.x) / 2} ${Math.min(y, KOREA.y) - lift} ${x} ${y}` };
});

function WorldMap() {
  return (
    <>
      {DOTS.map(([x, y], i) => <rect key={i} x={x - 1.5} y={y - 1.5} width="3" height="3" fill={C.line} />)}
      {ROUTES.map((r) => (
        <g key={r.d}>
          <path d={r.d} fill="none" stroke={C.accent} strokeWidth="1.2" strokeDasharray={r.soon ? "3 4" : undefined} opacity={r.soon ? 0.5 : 0.9} />
          <rect x={r.x - 3} y={r.y - 3} width="6" height="6" fill={r.soon ? C.line : C.accent} />
        </g>
      ))}
      <rect x={KOREA.x - 4.5} y={KOREA.y - 4.5} width="9" height="9" fill={C.accent} />
    </>
  );
}

const ART: Record<Fallback, { viewBox: string; Draw: () => React.ReactNode }> = {
  warehouse: { viewBox: "0 0 400 460", Draw: Warehouse },
  shelves: { viewBox: "0 0 640 560", Draw: Shelves },
  inspection: { viewBox: "0 0 400 300", Draw: Inspection },
  packing: { viewBox: "0 0 400 300", Draw: Packing },
  location: { viewBox: "0 0 400 300", Draw: Location },
  portrait: { viewBox: "0 0 300 375", Draw: Portrait },
  worldMap: { viewBox: "0 0 720 260", Draw: WorldMap },
};

/** Renders a fallback drawing. Pass `title` for a meaningful image, omit it for decoration. */
export default function Illustration({ name, title, fit = "cover" }: { name: Fallback; title?: string; fit?: "cover" | "contain" }) {
  const { viewBox, Draw } = ART[name];
  return (
    <svg
      className="illu"
      viewBox={viewBox}
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <Draw />
    </svg>
  );
}
