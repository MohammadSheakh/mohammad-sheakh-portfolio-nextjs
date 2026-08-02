const XS = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600];
const LABELS = [
  "NODE",
  "API",
  "DB",
  "QUEUE",
  "CACHE",
  "CLOUD",
  "STRIPE",
  "AUTH",
  "WS",
  "KAFKA",
  "S3",
  "DOCKER",
  "CI/CD",
];
const HEX = [
  "0x4E4F4445",
  "0x52455354",
  "0x504F5354",
  "0x42554C4C",
  "0x52454449",
  "0x41575353",
  "0x53545250",
  "0x4A575420",
  "0x574F524B",
  "0x4B41464B",
];
const DURATIONS = [1.8, 2.2, 1.5, 2, 1.9, 2.4, 1.6, 2.1, 1.7, 2.3, 2, 1.8, 2.2];

function CircuitSvg() {
  return (
    <svg
      width="2800"
      height="130"
      viewBox="0 0 2800 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block" }}
    >
      <rect width="2800" height="130" fill="#0a0a0a" />
      <g stroke="#1c2e1c" strokeWidth="1">
        <line x1="0" y1="65" x2="2800" y2="65" />
        {XS.map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="130" />
        ))}
      </g>
      <g fill="#22cc44">
        {XS.map((x, i) => (
          <circle key={x} cx={x} cy="65" r="5">
            <animate
              attributeName="opacity"
              values={i % 2 === 0 ? "0.2;0.9;0.2" : "0.9;0.2;0.9"}
              dur={`${DURATIONS[i]}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
      <g fill="#22cc44" fontFamily="monospace" fontSize="9">
        {XS.map((x, i) => (
          <text key={x} x={x - 30} y="44" opacity="0.4">
            {LABELS[i]}
          </text>
        ))}
      </g>
      <g fill="#222" fontFamily="monospace" fontSize="8">
        {HEX.map((h, i) => (
          <text key={h} x={XS[i] - 32} y="90">
            {h}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default function Circuit() {
  return (
    <div className="circuit">
      <div className="circuit-inner">
        <CircuitSvg />
        <CircuitSvg />
      </div>
    </div>
  );
}
