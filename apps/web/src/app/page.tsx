import Card from "@/src/components/Card";
import { getCardInformation } from "@/src/app/api/server_actions/actions";
import Link from "next/link";
import { auth } from "@/auth";

// Renders live card data from the database and reads the auth session, so it
// must not be statically prerendered at build time.
export const dynamic = "force-dynamic";

// The painted facades of Nyhavn, abstracted into a canal row. Order and color
// aren't decoration — they're the brand's whole palette in one glance.
const facadeColors = [
  "#E6A23C",
  "#C25342",
  "#2F6E69",
  "#4A6FA5",
  "#E8C766",
  "#B94B3C",
];

// One ribbon of facade color, reused as the page's structural divider.
function FacadeStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1.5 w-full ${className}`} aria-hidden="true">
      {facadeColors.map((c) => (
        <span key={c} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

// The canal houses. Heights and colors vary like the real row; a few wear the
// stepped Danish gable (trappegavl).
type House = {
  x: number;
  w: number;
  h: number;
  color: string;
  roof: "gable" | "flat" | "step";
};

const houses: House[] = [
  { x: 32, w: 92, h: 150, color: "#E6A23C", roof: "gable" },
  { x: 132, w: 78, h: 182, color: "#C25342", roof: "gable" },
  { x: 218, w: 104, h: 132, color: "#2F6E69", roof: "flat" },
  { x: 330, w: 70, h: 166, color: "#4A6FA5", roof: "gable" },
  { x: 408, w: 96, h: 204, color: "#D98C2B", roof: "step" },
  { x: 512, w: 72, h: 140, color: "#B94B3C", roof: "gable" },
  { x: 592, w: 110, h: 176, color: "#E8C766", roof: "gable" },
  { x: 710, w: 80, h: 122, color: "#2F6E69", roof: "flat" },
  { x: 798, w: 92, h: 192, color: "#E6A23C", roof: "gable" },
  { x: 898, w: 74, h: 150, color: "#4A6FA5", roof: "gable" },
  { x: 980, w: 100, h: 212, color: "#C25342", roof: "step" },
  { x: 1088, w: 72, h: 140, color: "#2F6E69", roof: "gable" },
];

const QUAY = 244; // baseline where the houses meet the quay

function stepGable(x: number, top: number, w: number) {
  const p = [
    [x, top],
    [x, top - 8],
    [x + 0.16 * w, top - 8],
    [x + 0.16 * w, top - 18],
    [x + 0.32 * w, top - 18],
    [x + 0.32 * w, top - 28],
    [x + 0.42 * w, top - 28],
    [x + 0.42 * w, top - 38],
    [x + 0.58 * w, top - 38],
    [x + 0.58 * w, top - 28],
    [x + 0.68 * w, top - 28],
    [x + 0.68 * w, top - 18],
    [x + 0.84 * w, top - 18],
    [x + 0.84 * w, top - 8],
    [x + w, top - 8],
    [x + w, top],
  ];
  return p.map((pt) => pt.join(",")).join(" ");
}

function House({ house }: { house: House }) {
  const { x, w, h, color, roof } = house;
  const top = QUAY - h;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={color} />
      {roof === "gable" && (
        <polygon
          points={`${x - 3},${top} ${x + w / 2},${top - 30} ${x + w + 3},${top}`}
          fill={color}
        />
      )}
      {roof === "flat" && (
        <rect x={x - 3} y={top - 9} width={w + 6} height={9} fill={color} />
      )}
      {roof === "step" && <polygon points={stepGable(x, top, w)} fill={color} />}
      {/* Lit windows at golden hour */}
      <rect
        x={x + w * 0.24}
        y={top + 24}
        width={11}
        height={15}
        fill="#F6E4A8"
        opacity={0.9}
      />
      <rect
        x={x + w * 0.6}
        y={top + 24}
        width={11}
        height={15}
        fill="#F6E4A8"
        opacity={0.9}
      />
      {h > 150 && (
        <>
          <rect
            x={x + w * 0.24}
            y={top + 58}
            width={11}
            height={15}
            fill="#F6E4A8"
            opacity={0.55}
          />
          <rect
            x={x + w * 0.6}
            y={top + 58}
            width={11}
            height={15}
            fill="#F6E4A8"
            opacity={0.55}
          />
        </>
      )}
    </g>
  );
}

function NyhavnSkyline() {
  return (
    <svg
      viewBox="0 0 1200 380"
      preserveAspectRatio="xMidYMax meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16263B" stopOpacity="0" />
          <stop offset="85%" stopColor="#16263B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#16263B" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Reflection in the canal — mirrored about the quay line and shimmering */}
      <g
        className="canal-reflection"
        transform={`translate(0, ${QUAY * 2}) scale(1, -1)`}
        opacity={0.45}
      >
        {houses.map((h) => (
          <House key={`r-${h.x}`} house={h} />
        ))}
      </g>
      <rect
        x="0"
        y={QUAY}
        width="1200"
        height={380 - QUAY}
        fill="url(#fade)"
      />

      {/* The quay edge */}
      <rect x="0" y={QUAY - 2} width="1200" height="3" fill="#0E1C2E" />

      {/* The houses */}
      {houses.map((h) => (
        <House key={h.x} house={h} />
      ))}
    </svg>
  );
}

export default async function HomePage() {
  const cardInfo = await getCardInformation();
  const session = await auth();

  return (
    <div className="min-h-screen bg-cph-paper">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cph-navy">
        <FacadeStripe />

        {/* Golden-hour glow over the canal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 75% 8%, rgba(230,162,60,0.28), rgba(217,140,43,0.08) 38%, transparent 62%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-5xl flex-col items-start justify-center px-6 pt-28 pb-56 sm:pb-64 lg:px-8">
          <p className="font-mono text-xs tracking-[0.3em] text-cph-ochre uppercase">
            Besökskalender · Köpenhamn
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-cph-paper sm:text-6xl md:text-7xl">
            Boka din tid
            <br />
            <span className="text-cph-ochre">vid kanalen</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cph-sky">
            Välj en ledig dag, boka tåget över Öresund och kom och hälsa på.
            Enkelt och smidigt — ända fram till Nyhavn.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {session ? (
              <Link
                href="/calendar"
                className="rounded-md bg-cph-ochre px-7 py-3 font-medium text-cph-navy transition-colors hover:bg-amber-300"
              >
                Gå till bokning
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-cph-ochre px-7 py-3 font-medium text-cph-navy transition-colors hover:bg-amber-300"
              >
                Logga in
              </Link>
            )}
            <Link
              href="#features"
              className="rounded-md border border-cph-sky/30 px-7 py-3 font-medium text-cph-paper transition-colors hover:border-cph-sky/60 hover:bg-white/5"
            >
              Utforska staden
            </Link>
          </div>
        </div>

        {/* Signature: the Nyhavn skyline rising from the canal */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-56 sm:h-64">
          <NyhavnSkyline />
        </div>
      </section>

      {/* Things to do */}
      <section id="features" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-cph-rust uppercase">
              Upplevelser
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cph-navy sm:text-4xl">
              Att göra i Köpenhamn
            </h2>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(cardInfo).map(([id, card]) => (
              <Card key={id} cardInfo={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cph-navy">
        <FacadeStripe />
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl font-bold text-cph-ochre">
                Adam Oueidat
              </h3>
              <p className="mt-1 text-cph-sky">Software Engineer</p>
              <div className="mt-4 flex justify-center gap-4 md:justify-start">
                <a
                  href="https://github.com/Adam-Oueidat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-cph-sky transition-colors hover:text-cph-ochre"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/adam-oueidat-29555215b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-cph-sky transition-colors hover:text-cph-ochre"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c.4-.8 1.1-1.1 1.9-1.1 1.4 0 2.5.9 2.5 2.8v6.535z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-cph-sky/80">Built with Next.js &amp; TypeScript</p>
              <p className="mt-2 text-cph-sky/80">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
