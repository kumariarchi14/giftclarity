type VisualPreset = {
  keywords: string[];
  start: string;
  end: string;
  accent: string;
  surface: string;
  shadow: string;
  render: (accent: string, surface: string, shadow: string) => string;
};

function jarSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="172" rx="70" ry="12" fill="${shadow}" opacity="0.26" />
    <rect x="102" y="62" width="116" height="92" rx="18" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <rect x="122" y="48" width="76" height="22" rx="8" fill="${accent}" />
    <path d="M125 85 C150 105, 170 105, 195 85" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
    <path d="M125 104 C150 124, 170 124, 195 104" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
    <path d="M125 123 C150 143, 170 143, 195 123" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
  `;
}

function chargerSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="76" ry="12" fill="${shadow}" opacity="0.24" />
    <rect x="104" y="72" width="112" height="72" rx="18" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <rect x="126" y="94" width="28" height="10" rx="4" fill="${accent}" />
    <rect x="160" y="94" width="28" height="10" rx="4" fill="${accent}" opacity="0.6" />
    <path d="M214 104 C244 106, 250 124, 246 142" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
    <rect x="240" y="138" width="16" height="18" rx="4" fill="${accent}" />
  `;
}

function bottleSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="58" ry="12" fill="${shadow}" opacity="0.24" />
    <rect x="135" y="56" width="50" height="104" rx="20" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <rect x="144" y="42" width="32" height="24" rx="8" fill="${accent}" />
    <rect x="144" y="88" width="32" height="28" rx="8" fill="${accent}" opacity="0.18" />
  `;
}

function notebookSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="72" ry="12" fill="${shadow}" opacity="0.22" />
    <rect x="92" y="52" width="136" height="110" rx="14" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <rect x="102" y="52" width="20" height="110" rx="10" fill="${accent}" />
    <line x1="138" y1="84" x2="204" y2="84" stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
    <line x1="138" y1="108" x2="204" y2="108" stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
    <line x1="138" y1="132" x2="188" y2="132" stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity="0.45"/>
  `;
}

function mugSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="66" ry="12" fill="${shadow}" opacity="0.22" />
    <rect x="106" y="76" width="88" height="74" rx="18" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <path d="M194 90 H212 C225 90 232 98 232 112 C232 126 225 134 212 134 H194" fill="none" stroke="${accent}" stroke-width="6"/>
    <path d="M126 64 C122 54, 126 46, 134 40" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
    <path d="M152 62 C148 52, 152 44, 160 38" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
  `;
}

function frameSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="178" rx="72" ry="10" fill="${shadow}" opacity="0.2" />
    <rect x="94" y="46" width="132" height="104" rx="8" fill="${accent}" />
    <rect x="108" y="60" width="104" height="76" rx="4" fill="${surface}" />
    <circle cx="184" cy="84" r="14" fill="${accent}" opacity="0.2"/>
    <path d="M118 126 L146 98 L168 116 L186 92 L202 126 Z" fill="${accent}" opacity="0.5"/>
    <path d="M152 150 L168 150 L160 172 Z" fill="${accent}" />
  `;
}

function traySvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="84" ry="12" fill="${shadow}" opacity="0.2" />
    <rect x="82" y="88" width="156" height="54" rx="18" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <circle cx="120" cy="116" r="12" fill="${accent}" opacity="0.75"/>
    <rect x="146" y="104" width="56" height="24" rx="8" fill="${accent}" opacity="0.35"/>
  `;
}

function pouchSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="78" ry="12" fill="${shadow}" opacity="0.22" />
    <rect x="88" y="82" width="144" height="66" rx="18" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <path d="M106 82 C110 64, 124 54, 142 54 H178 C196 54 210 64 214 82" fill="none" stroke="${accent}" stroke-width="6"/>
    <circle cx="160" cy="114" r="10" fill="${accent}" opacity="0.6"/>
  `;
}

function platterSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="86" ry="12" fill="${shadow}" opacity="0.22" />
    <ellipse cx="160" cy="118" rx="86" ry="44" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <circle cx="126" cy="110" r="10" fill="${accent}" opacity="0.55"/>
    <circle cx="160" cy="124" r="10" fill="${accent}" opacity="0.35"/>
    <circle cx="192" cy="108" r="10" fill="${accent}" opacity="0.7"/>
  `;
}

function speakerSvg(accent: string, surface: string, shadow: string) {
  return `
    <ellipse cx="160" cy="176" rx="78" ry="12" fill="${shadow}" opacity="0.22" />
    <rect x="92" y="84" width="136" height="62" rx="20" fill="${surface}" stroke="${accent}" stroke-width="6"/>
    <circle cx="132" cy="116" r="18" fill="none" stroke="${accent}" stroke-width="5"/>
    <circle cx="188" cy="116" r="18" fill="none" stroke="${accent}" stroke-width="5"/>
    <circle cx="188" cy="116" r="6" fill="${accent}" />
  `;
}

const visualPresets: VisualPreset[] = [
  {
    keywords: ["jar"],
    start: "#f0e0cf",
    end: "#d0a57c",
    accent: "#8a5631",
    surface: "#fff7f0",
    shadow: "#8a5631",
    render: jarSvg
  },
  {
    keywords: ["charger", "power bank"],
    start: "#dce7ee",
    end: "#9fb3c7",
    accent: "#44627f",
    surface: "#f8fbff",
    shadow: "#54708d",
    render: chargerSvg
  },
  {
    keywords: ["bottle", "tumbler", "shaker"],
    start: "#d8edf0",
    end: "#8dbbc3",
    accent: "#2f6972",
    surface: "#f7feff",
    shadow: "#4f7e85",
    render: bottleSvg
  },
  {
    keywords: ["journal", "planner", "notebook", "reading", "recipe", "folio", "sketchbook"],
    start: "#eee1d0",
    end: "#c99e78",
    accent: "#80512f",
    surface: "#fff8f0",
    shadow: "#80512f",
    render: notebookSvg
  },
  {
    keywords: ["coffee", "tea", "mug", "filter", "frother"],
    start: "#f0dfd2",
    end: "#c2855c",
    accent: "#7d4428",
    surface: "#fff8f4",
    shadow: "#8d583b",
    render: mugSvg
  },
  {
    keywords: ["frame", "album", "memory", "keepsake", "map", "photo"],
    start: "#f2dfe6",
    end: "#d39ab0",
    accent: "#8d4764",
    surface: "#fff8fb",
    shadow: "#8d4764",
    render: frameSvg
  },
  {
    keywords: ["tray", "organizer", "desk", "board"],
    start: "#eee6dc",
    end: "#cab295",
    accent: "#7d6445",
    surface: "#fffdf9",
    shadow: "#7d6445",
    render: traySvg
  },
  {
    keywords: ["pouch", "wallet", "duffel", "travel", "tote", "sleeve"],
    start: "#dee8e9",
    end: "#9fb6b8",
    accent: "#46666b",
    surface: "#f8fcfc",
    shadow: "#557479",
    render: pouchSvg
  },
  {
    keywords: ["platter", "bowl", "snack", "serving", "napkin", "plate", "box", "hamper"],
    start: "#f2e6d9",
    end: "#d7b08b",
    accent: "#8a5d34",
    surface: "#fff9f2",
    shadow: "#8a5d34",
    render: platterSvg
  },
  {
    keywords: ["speaker", "playlist", "headphone", "music"],
    start: "#dde7fb",
    end: "#8ea8e2",
    accent: "#385b9e",
    surface: "#f7f9ff",
    shadow: "#385b9e",
    render: speakerSvg
  }
];

function pickPreset(title: string) {
  const lower = title.toLowerCase();

  return (
    visualPresets.find((preset) => preset.keywords.some((keyword) => lower.includes(keyword))) ?? {
      start: "#efe6dc",
      end: "#cfaa86",
      accent: "#80573b",
      surface: "#fff9f3",
      shadow: "#80573b",
      render: traySvg
    }
  );
}

function wrapTitle(title: string) {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length > 18 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 2);
}

export function getGiftItemImageSrc(title: string) {
  const preset = pickPreset(title);
  const lines = wrapTitle(title)
    .map(
      (line, index) =>
        `<text x="160" y="${174 + index * 22}" text-anchor="middle" fill="${preset.accent}" font-family="Arial, sans-serif" font-size="20" font-weight="700">${line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</text>`
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${preset.start}" />
          <stop offset="100%" stop-color="${preset.end}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" rx="28" fill="url(#bg)" />
      <circle cx="256" cy="52" r="44" fill="rgba(255,255,255,0.18)" />
      <circle cx="68" cy="176" r="52" fill="rgba(255,255,255,0.12)" />
      <rect x="20" y="18" width="280" height="184" rx="26" fill="rgba(255,250,244,0.62)" />
      ${preset.render(preset.accent, preset.surface, preset.shadow)}
      ${lines}
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
