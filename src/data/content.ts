export type Expression = {
  slug: string;
  name: string;
  line: string;
  description: string;
  /** Muted watercolor accent for the card wash (not used for text). */
  accent: string;
};

export const expressions: Expression[] = [
  {
    slug: "blanco",
    name: "Blanco",
    line: "The foundation",
    description:
      "Bright, clean, and true to the agave. The tequila every MANAVÉ expression begins with — made for sipping, for mixing, and for sharing.",
    accent: "#879785",
  },
  {
    slug: "coffee",
    name: "Coffee",
    line: "Roasted, rich, and balanced",
    description:
      "Deep roasted coffee character on the same tequila foundation. Made for the after-dinner pour and the best espresso martini you will make at home.",
    accent: "#7A6250",
  },
  {
    slug: "passion-fruit",
    name: "Passion Fruit",
    line: "Bright and tropical",
    description:
      "Vivid passion fruit with agave depth underneath — fresh, aromatic, and unmistakably tequila.",
    accent: "#C99A4B",
  },
  {
    slug: "pina-colada",
    name: "Piña Colada",
    line: "Pineapple and coconut",
    description:
      "The resort-bar classic, reimagined with real tequila. Pineapple and coconut with a smooth, sunlit finish.",
    accent: "#D2BE86",
  },
];

export type Serve = {
  name: string;
  expression: string;
  blurb: string;
  ingredients: string[];
  method: string;
};

export const serves: Serve[] = [
  {
    name: "Blanco Ranch Water",
    expression: "Blanco",
    blurb: "Tall, crisp, and effortless — the easiest way to taste the agave.",
    ingredients: ["2 oz MANAVÉ Blanco", "½ oz fresh lime juice", "Chilled sparkling mineral water", "Lime wheel"],
    method: "Build over ice in a tall glass, top with mineral water, and garnish with a lime wheel.",
  },
  {
    name: "Coffee Espresso Martini",
    expression: "Coffee",
    blurb: "Silky, roasted, and balanced — no separate coffee liqueur needed.",
    ingredients: ["1½ oz MANAVÉ Coffee", "1 oz fresh espresso, cooled", "¼ oz simple syrup (to taste)", "3 coffee beans"],
    method: "Shake hard with ice, double-strain into a chilled coupe, and garnish with three coffee beans.",
  },
  {
    name: "Passion Fruit Sunset",
    expression: "Passion Fruit",
    blurb: "A golden-hour sipper that tastes like vacation.",
    ingredients: ["2 oz MANAVÉ Passion Fruit", "1 oz orange juice", "½ oz fresh lime juice", "Splash of soda", "Orange slice"],
    method: "Shake the first three ingredients with ice, strain over fresh ice, top with soda, and garnish with an orange slice.",
  },
  {
    name: "Piña Colada Signature Serve",
    expression: "Piña Colada",
    blurb: "The beach classic — made the way tequila lovers wish it always was.",
    ingredients: ["2 oz MANAVÉ Piña Colada", "1½ oz pineapple juice", "1 oz cream of coconut", "Pineapple wedge"],
    method: "Shake with ice until well chilled, strain over crushed ice, and garnish with a pineapple wedge.",
  },
];

export type Market = { name: string; kind: string; note: string };

export const markets: Market[] = [
  { name: "Chicago Area", kind: "Illinois", note: "Our home-market focus — tastings and events across the Chicago area." },
  { name: "Illinois Retail", kind: "Retail", note: "Working with Illinois retailers who share a passion for craft tequila." },
  { name: "Resorts", kind: "Hospitality", note: "Poolside, beachside, and bar-side — MANAVÉ is made for the resort experience." },
  { name: "Duty-Free", kind: "Travel retail", note: "A premium pour for travelers, wherever the journey begins or ends." },
  { name: "Cabo", kind: "Mexico", note: "Los Cabos — where tequila and the sea meet." },
  { name: "Cancún", kind: "Mexico", note: "Caribbean mornings and long, easy evenings." },
];

export const discoverySources = [
  "Retail Store",
  "Resort",
  "Duty-Free",
  "Friend / Family",
  "Social Media",
  "Event / Tasting",
  "Other",
] as const;

export const inquiryTypes = ["General", "Retail", "Distribution", "Resort", "Media"] as const;

export const expressionNames = expressions.map((e) => e.name);
