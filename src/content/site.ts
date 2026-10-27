export interface PerfumeItem {
  no: string;
  name: string;
  tagline: string;
  notes: string;
  size: string;
  price: string;
  image: string;
  description?: string;
  concentration?: string;
  longevity?: string;
  sillage?: string;
  accords?: string[];
}

export interface HouseChapter {
  chapter: string;
  title: string;
  heading: string;
  body: string;
  quote?: string;
  signature?: string;
  image: string;
  imagePosition: 'left' | 'right' | 'full';
  location?: string;
  year?: string;
  extraDetails?: string;
}

export interface ArchitectureItem {
  no: string;
  name: string;
  top: string;
  heart: string;
  base: string;
  image: string;
  character?: string;
  macerationWeeks?: number;
  concentration?: string;
}

export interface JournalEntry {
  title: string;
  read: string;
  excerpt: string;
  image: string;
  layout: 'image-top' | 'text-top' | 'feature' | 'split';
  author?: string;
  date?: string;
  fullStory?: string[];
  tags?: string[];
}

export const site = {
  brand: "Noctavé",
  tagline: "Haute Parfumerie Nocturne",
  city: "Paris · Grasse · Kyoto",
  nav: ["Collection", "House", "Architecture", "Journal"],
  hero: {
    titleLine1: "WITNESS THE",
    titleLine2: "HIDDEN NOIR",
    subtitleLine1: "An olfactory odyssey through resin, oud, and midnight bloom,",
    subtitleLine2: "captured by sense and memory.",
    cta: "Begin the Ritual",
    videoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4",
    poster: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1920&auto=format&fit=crop"
  },
  collection: [
    { 
      no: "01", 
      name: "Noir Oud", 
      tagline: "Oud · Leather · Black Amber", 
      notes: "OUD · LEATHER · AMBER", 
      size: "50ml", 
      price: "$340",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      description: "An unapologetic distillation of 30-year wild Assam agarwood, aged calfskin leather, and fossilized amber tears. Lingers like dusk in an old library.",
      concentration: "Extrait de Parfum (32%)",
      longevity: "14+ Hours",
      sillage: "Intimate & Intoxicating",
      accords: ["Dark Woody", "Smoky Leather", "Balsamic Amber", "Saffron Veil"]
    },
    { 
      no: "02", 
      name: "Midnight Amber", 
      tagline: "Amber · Benzoin · Vanilla Smoke", 
      notes: "AMBER · BENZOIN · VANILLA", 
      size: "50ml", 
      price: "$320",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
      description: "A nocturnal embrace of golden benzoin tears, burned Madagascar vanilla pods, and soft labdanum haze suspended in midnight quietude.",
      concentration: "Extrait de Parfum (30%)",
      longevity: "12+ Hours",
      sillage: "Warm & Enveloping",
      accords: ["Gourmand Amber", "Smoky Resin", "Spiced Bergamot", "Tonka Bean"]
    },
    { 
      no: "03", 
      name: "Velvet Smoke", 
      tagline: "Incense · Cade · Birch Tar", 
      notes: "INCENSE · CADE · BIRCH", 
      size: "30ml", 
      price: "$380",
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop",
      description: "Smoldering birch tar tempered by ceremonial Kyara wood, green crushed cardamom, and black velvet ash. Cold smoke turned sacred.",
      concentration: "Pure Oil Extract (38%)",
      longevity: "16+ Hours",
      sillage: "Architectural & Hypnotic",
      accords: ["Birch Tar", "Sacred Cade", "Black Pepper", "Smoked Vetiver"]
    },
    { 
      no: "04", 
      name: "Sable Musk", 
      tagline: "White Musk · Iris · Cashmeran", 
      notes: "MUSK · IRIS · CASHMERAN", 
      size: "50ml", 
      price: "$300",
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop",
      description: "Florentine orris concrete intertwined with nocturnal ambrette seed and luminous cashmeran. The texture of heavy silk drawn across warm skin.",
      concentration: "Extrait de Parfum (28%)",
      longevity: "10+ Hours",
      sillage: "Skin-Close & Magnetic",
      accords: ["Powdery Orris", "Cashmere Wood", "Clean Animalic", "Ambrette Seed"]
    },
    { 
      no: "05", 
      name: "Incense Noir", 
      tagline: "Frankincense · Myrrh · Cardamom", 
      notes: "FRANKINCENSE · MYRRH · CARDAMOM", 
      size: "30ml", 
      price: "$360",
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop",
      description: "Hojari green frankincense tears harvested under the new moon, crushed with Yemeni myrrh and crimson Taif petals in deep stone vessels.",
      concentration: "Extrait de Parfum (35%)",
      longevity: "15+ Hours",
      sillage: "Monumental & Divine",
      accords: ["Hojari Resin", "Crimson Rose", "Yemeni Myrrh", "Black Cardamom"]
    }
  ] as PerfumeItem[],
  house: [
    { 
      chapter: "I", 
      title: "The Perfumer", 
      heading: "A memory, distilled.", 
      body: "Every Noctavé composition begins with a memory — a room, a scent trail, a night that would not let go. We do not formulate for mass appeal; we bottle specific, unrepeatable atmospheric states.", 
      quote: "Scent is memory, made wearable.", 
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
      imagePosition: "left" as const,
      location: "Paris VIII",
      year: "Est. 2021",
      extraDetails: "Our master noses work in total isolation under low ambient tungsten light to prevent sensory interference."
    },
    { 
      chapter: "II", 
      title: "The Materials", 
      heading: "Two hundred and forty raw voices.", 
      body: "Oud from Assam. Rose from Taif. Amber from the Baltic. Each ingredient is chosen for how it behaves over time, not how it smells on paper. We extract each botanical essence at low temperatures to protect its raw nocturnal vibration.", 
      quote: "A perfume is a conversation between materials.", 
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1200&auto=format&fit=crop", 
      imagePosition: "right" as const,
      location: "Grasse & Assam",
      year: "Raw Harvest",
      extraDetails: "Wild-harvested under moon cycles to preserve volatile aromatic resin compounds."
    },
    { 
      chapter: "III", 
      title: "The Waiting", 
      heading: "Six weeks in the dark.", 
      body: "Maceration is not a step — it is the work. The fragrance rests in obsidian glass carboys at 14°C. It settles. Molecules link and soften. It becomes itself. Only then is it bottled, unfiltered, unhurried.", 
      signature: "— Aurélien Voss, Head Perfumer", 
      image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1600&auto=format&fit=crop", 
      imagePosition: "full" as const,
      location: "The Cellar · Kyoto Vault",
      year: "42 Days Maceration",
      extraDetails: "Unfiltered cold extraction ensuring high resin density without chemical stabilizers."
    }
  ] as HouseChapter[],
  architecture: [
    { 
      no: "01", 
      name: "Noir Oud", 
      top: "Bergamot · Saffron", 
      heart: "Oud · Rose", 
      base: "Amber · Leather · Musk", 
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop",
      character: "Nocturnal, Regal, Indelible",
      macerationWeeks: 6,
      concentration: "32% Extrait"
    },
    { 
      no: "02", 
      name: "Midnight Amber", 
      top: "Bergamot · Pink Pepper", 
      heart: "Amber · Benzoin", 
      base: "Vanilla · Tonka · Smoke", 
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
      character: "Luminous, Resinous, Enveloping",
      macerationWeeks: 6,
      concentration: "30% Extrait"
    },
    { 
      no: "03", 
      name: "Velvet Smoke", 
      top: "Cardamom · Black Pepper", 
      heart: "Incense · Cade", 
      base: "Birch Tar · Vetiver · Musk", 
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop",
      character: "Smoldering, Austere, Sacred",
      macerationWeeks: 8,
      concentration: "38% Pure Extract"
    },
    { 
      no: "04", 
      name: "Sable Musk", 
      top: "Iris · Bergamot", 
      heart: "White Musk · Cashmeran", 
      base: "Sandalwood · Ambrette", 
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop",
      character: "Velvety, Sensual, Second-Skin",
      macerationWeeks: 5,
      concentration: "28% Extrait"
    },
    { 
      no: "05", 
      name: "Incense Noir", 
      top: "Frankincense · Cardamom", 
      heart: "Myrrh · Rose", 
      base: "Oud · Leather · Amber", 
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop",
      character: "Transcendent, Monastic, Infinite",
      macerationWeeks: 7,
      concentration: "35% Extrait"
    }
  ] as ArchitectureItem[],
  journal: {
    volume: "Volume 01 · 2026",
    entries: [
      { 
        title: "The Oud Roads of Assam", 
        read: "6 min read", 
        excerpt: "A journey through the forests where oud is harvested by hand — and the families who have done it for generations.", 
        image: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=800&auto=format&fit=crop", 
        layout: "image-top" as const,
        author: "Aurélien Voss",
        date: "October 14, 2025",
        tags: ["Assam", "Aquilaria", "Provenance"],
        fullStory: [
          "Deep within the rain-soaked valleys of Assam, the Aquilaria agallocha tree does not yield scent easily. The dark, fragrant heartwood forms only when the tree is pierced by time, weather, and a specific micro-organism.",
          "We spent two weeks following Haroon and his sons across the forested slopes of Hojai. Here, woodcutters do not speak loudly. They tap the bark with small silver adzes, listening for the acoustic timbre of dense resin inside.",
          "When distilled in copper alembics over slow river wood fires, the result is not sweet; it is earthy, ancient, slightly barnyard at first glance, then slowly blossoming into an amber honey that will stay on human skin for days."
        ]
      },
      { 
        title: "A Note on Saffron", 
        read: "4 min read", 
        excerpt: "Why the world's most expensive spice is also one of perfumery's quietest materials.", 
        image: "https://images.unsplash.com/photo-1615397323134-0ff2a4bb2db3?q=80&w=800&auto=format&fit=crop", 
        layout: "text-top" as const,
        author: "Elena Rostova",
        date: "November 02, 2025",
        tags: ["Kashmir", "Crocus Sativus", "Accords"],
        fullStory: [
          "Seventy-five thousand flowers for half a kilogram of crimson stigmata. Saffron has a reputation for excess in the culinary sphere, yet in high perfumery it behaves with monastic restraint.",
          "It provides a bitter-sweet metallic shimmer across the opening of Noir Oud, acting as an astringent veil that cuts through dense resins before they settle into warmth.",
          "To smell Kashmir saffron raw is to experience leather, sun-baked earth, and iodine all suspended in a single whisper."
        ]
      },
      { 
        title: "Why Perfume Should Be Worn at Night", 
        read: "8 min read", 
        excerpt: "The fragrance industry built itself around mornings. Nocturnal wearers know something they don't.", 
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop", 
        layout: "feature" as const,
        author: "Aurélien Voss",
        date: "December 19, 2025",
        tags: ["Editorial", "Sensory Philosophy", "Midnight"],
        fullStory: [
          "Morning scent is an armor; night scent is an invitation. When atmospheric temperature drops and the air cools, the vapor pressure of heavy molecules like labdanum, birch tar, and civet changes dramatically.",
          "In the dark, our visual perception diminishes and our olfactory cortex sharpens by nearly 40%. The noise of daylight subsides, allowing base notes to echo against the stillness.",
          "Noctavé fragrances are purposely structured without high-citrus top bursts. They are designed to unfold slowly as midnight approaches."
        ]
      },
      { 
        title: "In the Atelier: Maceration Week Six", 
        read: "5 min read", 
        excerpt: "Six weeks is a long time to wait for a smell. Here is what actually happens in the dark.", 
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop", 
        layout: "split" as const,
        author: "Dr. Marc Delacroix",
        date: "January 08, 2026",
        tags: ["Chemistry", "Maceration", "Technique"],
        fullStory: [
          "During the first fourteen days, the alcohol is sharp and the volatile esters fight for dominance. By week four, the vanillin and benzoin have begun to form loose hemiacetal complexes with the natural aldehydes.",
          "By week six, the solution achieves optical clarity and visceral depth. The harsh alcoholic edges soften into a velvety suspension.",
          "We do not filter under pressure; we let gravity do the work in cold chambers at 14 degrees Celsius."
        ]
      }
    ] as JournalEntry[]
  },
  cta: {
    title: "Find the scent that follows you.",
    subtext: "Book a private scent session. Discover your signature noir. No commitment, no pressure. Just the night.",
    primary: "Book a Session",
    secondary: "Shop the Collection"
  },
  footer: {
    copyright: "© 2026 Noctavé Haute Parfumerie. All rights reserved.",
    tagline: "Distilled under midnight skies · Paris · Kyoto",
    links: ["Privacy Policy", "Terms of Ritual", "Concierge & Press", "Atelier Visits"]
  }
} as const;
