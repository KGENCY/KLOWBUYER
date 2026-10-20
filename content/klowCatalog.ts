/**
 * Real partner brands and products, as listed on klow.kr (brand pages and product pages).
 * Generated from klow.kr — edit here or re-import; brands.ts and products.ts read from this file.
 * Prices in USD. `tiers` are wholesale unit prices by minimum quantity (the first row is the 1-unit sample).
 */

export interface KlowBrand {
  slug: string;
  name: string;
  intro: string;
  tier: string;
  logo: string | null;
  origin: string;
  /** Units per SKU for the first wholesale order. */
  openingOrder: number | null;
  /** Average MSRP ÷ wholesale. */
  retailMultiple: number | null;
  youtube: { id: string; title: string; vertical: boolean }[];
  productIds: string[];
}

/** Key benefits a product can be listed under, in filter order. */
export const BENEFITS = ["Hydration", "Pores", "Soothing", "Brightening", "Anti-aging", "Barrier", "Sun protection", "Cleansing"] as const;
export type Benefit = (typeof BENEFITS)[number];

export interface KlowProduct {
  id: string;
  /** Product id on klow.kr (/shop/products/[klowId]). */
  klowId: string;
  brandSlug: string;
  name: string;
  volume: string;
  heroIngredient: string;
  category: string;
  /** Key benefits, picked when the product is listed (filters on /samples). */
  benefits: Benefit[];
  samplePrice: number | null;
  msrp: number | null;
  moqPrice: number | null;
  moq: number | null;
  images: string[];
  tiers: { min: number; unit: number | null }[];
  about: string | null;
  keyActives: string[];
  forText: string | null;
  madeIn: string | null;
  ingredients: string | null;
}

export const KLOW_BRANDS: KlowBrand[] = [
  {
    "slug": "airmood",
    "name": "AIRmood",
    "intro": "Take Off Into Your Day",
    "tier": "Hidden gem",
    "logo": "https://cdn.klow.kr/brands/cmup3l2vr00rolj013gh5clbw/images/f80da305-8c0f-4518-ab9d-98f6099437fc-9968x13368___________.webp",
    "origin": "Korea",
    "openingOrder": 90,
    "retailMultiple": 2.1,
    "youtube": [
      {
        "id": "nBXacE5dSuw",
        "title": "내가 찐!! 승무원들의 꿀템 추천해줄게🫶 #에어무드 #수분크림 #스노우크림 #승무원 #속건조 #물광 #물광크림 #스킨케어 #자기관리 #피부좋아지는법 @에어무드AIRmood",
        "vertical": true
      },
      {
        "id": "z9WFj2q4Dtw",
        "title": "에어무드 스킨트립✈️",
        "vertical": true
      },
      {
        "id": "J4lUTGRZcJ8",
        "title": "✈️ 에어무드 크루 수진님의 이야기",
        "vertical": true
      },
      {
        "id": "NCLqzAv0YoI",
        "title": "AIRmood 기대되는 마음으로 하루를 깨웁니다.",
        "vertical": true
      },
      {
        "id": "b22NpUEOUfE",
        "title": "AIRmood 하루의 시작이 매일 여행처럼 설레길 바랍니다.",
        "vertical": true
      }
    ],
    "productIds": [
      "airmood-hyaluronic-snow-toner",
      "airmood-pink-tone-up-wave-suncream",
      "airmood-hyaluronic-snow-cream",
      "airmood-hyaluronic-snow-ampoule"
    ]
  },
  {
    "slug": "inyoe",
    "name": "inyoe",
    "intro": "Less Cover, More Essence",
    "tier": "Hidden gem",
    "logo": "https://cdn.klow.kr/brands/cmqhqzg9c001gmo0x2peaeo51/videos/bc13e1a5-8eef-40ca-a470-24d46fd657be-15G_5237_M_B.mov",
    "origin": "Korea",
    "openingOrder": 20,
    "retailMultiple": 1.6,
    "youtube": [
      {
        "id": "I5zcuU3pl9k",
        "title": "Korean essence toner with rice milk Inyoe toner #koreanglow #milktoner #brightskin #glow",
        "vertical": true
      },
      {
        "id": "SZdtZ6MnTgQ",
        "title": "love this 3 step routine from inyoe 🫧",
        "vertical": true
      },
      {
        "id": "3H3eQkwl1ko",
        "title": "Inyoe Gleamy Milk Toner!",
        "vertical": true
      },
      {
        "id": "a2SzG0X5PFM",
        "title": "Inyoe Hydrozy Oil serum 10% Betaine + Apple seed oil #korean",
        "vertical": true
      },
      {
        "id": "aNYhTq835Mw",
        "title": "Inyoe Cosmoprof HongKong 26",
        "vertical": false
      },
      {
        "id": "qyt16ffgA8g",
        "title": "INYOE milk toner🤍    #skincare #toner #skincareroutine",
        "vertical": true
      },
      {
        "id": "kJyE9cMKk1I",
        "title": "Inyoe dough cleanser",
        "vertical": true
      }
    ],
    "productIds": [
      "inyoe-gleamy-milk-toner",
      "inyoe-hydrozy-oil-serum",
      "inyoe-pdrn-tensi-cream",
      "inyoe-dough-cleansing-foam",
      "inyoe-the-6-essentials-gift-box",
      "inyoe-3-seed-cleansing-oil",
      "inyoe-youth-sun-serum",
      "inyoe-hydra-glow-duo",
      "inyoe-hydra-barrier-trio"
    ]
  },
  {
    "slug": "droasislab",
    "name": "DR.OASIS LAB",
    "intro": "Step-by-step home aesthetic routines,\ndesigned for the way your skin changes",
    "tier": "Hidden gem",
    "logo": "https://cdn.klow.kr/brands/cmqq7vlad008gpc0xxq06lvoj/videos/2914c200-c3b3-4cd0-afe7-0111e3460311-_________.mp4",
    "origin": "Korea",
    "openingOrder": 20,
    "retailMultiple": 1.9,
    "youtube": [
      {
        "id": "GMqRU2VMGIA",
        "title": "퇴근후, 스피큘앰플로 빠르게 관리하기 😆✨",
        "vertical": true
      },
      {
        "id": "2FKalZ1n6LU",
        "title": "🍂가을스킨케어루틴 | 여드름진정 | 나이트케어루틴",
        "vertical": true
      },
      {
        "id": "H5ThUJw0qUw",
        "title": "퇴근 후 대용량 스킨으로 스킨팩💦 찐현실 민낯은 이렇습니다... #메이크업 #getunreadywithme  #grwm  #kbeauty  #겟레디윗미 #뷰티 #skincare",
        "vertical": true
      },
      {
        "id": "MOYlENypUmo",
        "title": "🙋🏻스피큘 앰플 어떻게 사용해야하나요?",
        "vertical": true
      },
      {
        "id": "jBDPBmGdYz4",
        "title": "V사 스피큘 앰플 vs 우리 브랜드 앰플｜사용감 솔직 비교!",
        "vertical": true
      }
    ],
    "productIds": [
      "droasislab-supergen-triple-spicule-ampoule",
      "droasislab-supergen-triple-rebalancing-cream",
      "droasislab-supergen-triple-glow-gel-mist",
      "droasislab-supergen-triple-dual-cream",
      "droasislab-supergen-triple-boosting-skin"
    ]
  },
  {
    "slug": "simplete",
    "name": "simpleté",
    "intro": "Ballet-inspired skincare, simple and elegant.",
    "tier": "Hidden gem",
    "logo": "https://cdn.klow.kr/brands/cmrd94jyh002gpe0xyadsi0e2/images/62289c00-6df1-4c01-ae90-ec3117e559e1-simp_14p.webp",
    "origin": "Korea",
    "openingOrder": 30,
    "retailMultiple": 2.1,
    "youtube": [
      {
        "id": "vt-vUiUml_E",
        "title": "요철 좁쌀 싹 잡는 화잘먹 루틴",
        "vertical": true
      },
      {
        "id": "Ai7s3CPh-fM",
        "title": "기미·속잡티 다 잡고 피부 겉속까지 하얘지는 선크림 찾았다🩵",
        "vertical": true
      },
      {
        "id": "nfNXZDvXs38",
        "title": "Simplete Milkpeel Toner Official Video",
        "vertical": true
      },
      {
        "id": "1pqfKDDIeOA",
        "title": "우유 광채 피부를 위한 심플레 예신화장품 추천",
        "vertical": true
      },
      {
        "id": "3N_3NbOp-WE",
        "title": "공주템 장착🎀 #미스트 #심플레 #스킨케어 #미스트추천 #화잘먹템 #화잘먹 #메이크업 #kbeauty #makeup",
        "vertical": true
      },
      {
        "id": "7R97I5BSeFc",
        "title": "한의사 아침 5분컷 미백 관리 선크림편",
        "vertical": true
      },
      {
        "id": "PkOUYclwApk",
        "title": "✨️ Milk-Peel Toner to Essence + Brightening  Glow  Mist  Serum 🤍 @심플레 #simplete #kbeauty",
        "vertical": true
      },
      {
        "id": "vsxA7nFLDKE",
        "title": "#제품제공 [심플레] 해외 1위하는 🍓스트로베리 밀키 톤업 선앰플 얼마나 좋길래? #makeup",
        "vertical": true
      },
      {
        "id": "m6Di3PZvZTg",
        "title": "#skincare #simplete",
        "vertical": true
      },
      {
        "id": "JvhCoomX4GQ",
        "title": "러블리한 발레코어 '심플레'",
        "vertical": true
      }
    ],
    "productIds": [
      "simplete-milk-peel-toner-to-essence",
      "simplete-radiance-moisture-booster-serum",
      "simplete-lift-glow-ampoule",
      "simplete-time-recovery-cream",
      "simplete-strawberry-milky-tone-up-sun-ampoule",
      "simplete-brightening-glow-mist-serum"
    ]
  },
  {
    "slug": "liita",
    "name": "LIITA",
    "intro": "Love Is In The Air,\nmanifesting Love & Inspiration\nin the form of Beauty",
    "tier": "Hidden gem",
    "logo": "https://cdn.klow.kr/brands/cmse9v9wf0048o10xgu1g7d1u/images/fd0bdf66-9e32-4494-8ed2-5bd051ca2621-BACKWALL_BG_.webp",
    "origin": "Korea",
    "openingOrder": 30,
    "retailMultiple": 1.8,
    "youtube": [],
    "productIds": [
      "liita-saffron-on-rose-the-essential-3",
      "liita-saffron-on-rose-the-complete-4",
      "liita-toner-to-calm",
      "liita-serum-to-shine",
      "liita-cream-to-enrich",
      "liita-balm-to-bloom",
      "liita-paper-gift-bag"
    ]
  }
];

export const KLOW_PRODUCTS: KlowProduct[] = [
  {
    "id": "airmood-hyaluronic-snow-toner",
    "klowId": "cmup3lzkp00rplj01pfgzfie8",
    "brandSlug": "airmood",
    "name": "Hyaluronic Snow Toner",
    "volume": "150 ml",
    "heroIngredient": "Hyaluronic Acid",
    "category": "Skincare",
    "benefits": ["Hydration", "Soothing"],
    "samplePrice": 11.5,
    "msrp": 21,
    "moqPrice": 9.5,
    "moq": 90,
    "images": [
      "https://cdn.klow.kr/brands/cmup3l2vr00rolj013gh5clbw/images/8cfb1d17-25de-4563-8c55-59ed90e7eca7-_____02.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 11.5
      },
      {
        "min": 90,
        "unit": 9.5
      },
      {
        "min": 270,
        "unit": 9
      },
      {
        "min": 720,
        "unit": 8.6
      }
    ],
    "about": "A lightweight hydrating toner formulated with 2% low-molecular hyaluronic acid. The watery texture absorbs quickly to replenish moisture without stickiness, leaving skin fresh, smooth and prepped for the next step.\n\nHow to use: After cleansing, apply to a cotton pad or palms and gently pat onto face until absorbed. Use morning and night.\n\nSold in cartons of 30 pcs.",
    "keyActives": [
      "Hyaluronic Acid"
    ],
    "forText": "Dehydrated skin, all skin types",
    "madeIn": "Republic of Korea",
    "ingredients": "Hydrolyzed Hyaluronic Acid"
  },
  {
    "id": "airmood-pink-tone-up-wave-suncream",
    "klowId": "cmup3lzkp00rslj01hoo2qdkg",
    "brandSlug": "airmood",
    "name": "Pink Tone-Up Wave Suncream",
    "volume": "50 ml",
    "heroIngredient": "SPF 91+",
    "category": "Sun Care",
    "benefits": ["Sun protection", "Brightening"],
    "samplePrice": 15.5,
    "msrp": 28,
    "moqPrice": 12.5,
    "moq": 124,
    "images": [
      "https://cdn.klow.kr/images/b22dfa43-4747-4cf4-adf8-78e65b73dd5d-3a6ab8de-e599-4fc1-85b5-7f55939cf31a-__________1_.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 15.5
      },
      {
        "min": 124,
        "unit": 12.5
      },
      {
        "min": 372,
        "unit": 11.9
      },
      {
        "min": 992,
        "unit": 11.3
      }
    ],
    "about": "A lightweight hydrating toner formulated with 2% low-molecular hyaluronic acid. The watery texture absorbs quickly to replenish moisture without stickiness, leaving skin fresh, smooth and prepped for the next step.\n\nHow to use: After cleansing, apply to a cotton pad or palms and gently pat onto face until absorbed. Use morning and night.\n\nSold in cartons of 30 pcs.",
    "keyActives": [
      "SPF 91+"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": "Hydrolyzed Hyaluronic Acid"
  },
  {
    "id": "airmood-hyaluronic-snow-cream",
    "klowId": "cmup3lzkp00rrlj018iql71bf",
    "brandSlug": "airmood",
    "name": "Hyaluronic Snow cream",
    "volume": "100 ml",
    "heroIngredient": "Hyaluronic Acid",
    "category": "Skincare",
    "benefits": ["Hydration", "Barrier"],
    "samplePrice": 18,
    "msrp": 27.06,
    "moqPrice": 14.9,
    "moq": 100,
    "images": [
      "https://cdn.klow.kr/images/0a75d3b2-0c3d-4f53-b43f-da9706b62411-66a30303-ed70-4ad7-86ba-856d49e36d2b-____________1_.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 18
      },
      {
        "min": 100,
        "unit": 14.9
      },
      {
        "min": 300,
        "unit": 14.2
      },
      {
        "min": 800,
        "unit": 13.4
      }
    ],
    "about": "A lightweight hydrating toner formulated with 2% low-molecular hyaluronic acid. The watery texture absorbs quickly to replenish moisture without stickiness, leaving skin fresh, smooth and prepped for the next step.\n\nHow to use: After cleansing, apply to a cotton pad or palms and gently pat onto face until absorbed. Use morning and night.\n\nSold in cartons of 30 pcs.",
    "keyActives": [
      "Hyaluronic Acid"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": "Hydrolyzed Hyaluronic Acid"
  },
  {
    "id": "airmood-hyaluronic-snow-ampoule",
    "klowId": "cmup3lzkp00rqlj01gk6g2y0t",
    "brandSlug": "airmood",
    "name": "Hyaluronic Snow Ampoule",
    "volume": "50 ml",
    "heroIngredient": "Hyaluronic Acid",
    "category": "Skincare",
    "benefits": ["Hydration"],
    "samplePrice": 16,
    "msrp": 29.5,
    "moqPrice": 13.5,
    "moq": 100,
    "images": [
      "https://cdn.klow.kr/images/b0e8b297-8967-4a67-a62a-fcf555125392-a53ba8ae-5762-47f3-be49-9f748f2b3cd1-______.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 16
      },
      {
        "min": 100,
        "unit": 13.5
      },
      {
        "min": 300,
        "unit": 12.8
      },
      {
        "min": 800,
        "unit": 12.2
      }
    ],
    "about": null,
    "keyActives": [
      "Hyaluronic Acid"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": "Hydrolyzed Hyaluronic Acid"
  },
  {
    "id": "inyoe-gleamy-milk-toner",
    "klowId": "cmqhr177m001kmo0x2fdnn8mz",
    "brandSlug": "inyoe",
    "name": "Gleamy Milk Toner with 10% 6-Ceramide Complex + Rice Milk",
    "volume": "200 ml",
    "heroIngredient": "Ceramide",
    "category": "Skincare",
    "benefits": ["Hydration", "Barrier", "Brightening"],
    "samplePrice": 13,
    "msrp": 32.8,
    "moqPrice": 13,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/c9b5a87d-1ec3-4d96-afff-b1fcb6987992-451de4d7-2062-43bf-a9ef-1b433ec11f21-thum_toner_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 13
      },
      {
        "min": 30,
        "unit": 13
      },
      {
        "min": 90,
        "unit": 12.22
      },
      {
        "min": 240,
        "unit": 11.44
      },
      {
        "min": 600,
        "unit": 10.66
      }
    ],
    "about": null,
    "keyActives": [
      "Ceramide 10%",
      "Rice Milk"
    ],
    "forText": null,
    "madeIn": "Korea",
    "ingredients": "AQUA, BUTYLENE GLYCOL, PROPANEDIOL, GLYCERIN, NIACINAMIDE, 2,3-BUTANEDIOL, 1,2-HEXANEDIOL, DIPROPYLENE GLYCOL, TRIETHYLHEXANOIN, DIPHENYL DIMETHICONE, GLYCERETH-26, METHYL GLUCETH-20, PENTYLENE GLYCOL, POLYGLYCERYL-10 MYRISTATE, POLYACRYLATE CROSSPOLYMER-6, HYDROXYACETOPHENONE, C12-14 ALKETH-12, SPHINGOMONAS FERMENT EXTRACT, HYDROLYZED SCLEROTIUM GUM, CAPRYLIC/CAPRIC TRIGLYCERIDE, HYDROGENATED LECITHIN, BETA-GLUCAN, ETHYLHEXYLGLYCERIN, ZINC LACTATE, ADENOSINE, CETEARYL ALCOHOL, DISODIUM EDTA, STEARIC ACID, PANTHENOL, CERAMIDE NP, CYNANCHUM ATRATUM EXTRACT, ALTHAEA ROSEA FLOWER EXTRACT, CHOLESTEROL, PHYTOSPHINGOSINE, CERAMIDE NG, CERAMIDE NS, CERAMIDE AP, CERAMIDE AS, SOYMILK, ORYZA SATIVA EXTRACT, TOCOPHEROL, CERAMIDE EOP"
  },
  {
    "id": "inyoe-hydrozy-oil-serum",
    "klowId": "cmqhr177m001jmo0xs0oh7ofs",
    "brandSlug": "inyoe",
    "name": "Hydrozy Oil Serum with 10% Betaine + Apple Seed Oil",
    "volume": "30 ml",
    "heroIngredient": "Betaine",
    "category": "Skincare",
    "benefits": ["Hydration", "Barrier"],
    "samplePrice": 20,
    "msrp": 33.57,
    "moqPrice": 20,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/a8275406-5128-493f-addc-2a742fbf1dc7-b6cb4ee1-1578-4152-add5-1fe8be7062a9-thum_serum_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 20
      },
      {
        "min": 30,
        "unit": 20
      },
      {
        "min": 90,
        "unit": 18.8
      },
      {
        "min": 240,
        "unit": 17.6
      },
      {
        "min": 600,
        "unit": 16.4
      }
    ],
    "about": null,
    "keyActives": [
      "Betaine 10%",
      "Apple Seed Oil 3%"
    ],
    "forText": null,
    "madeIn": "Korea",
    "ingredients": "AQUA, CAPRYLIC/CAPRIC TRIGLYCERIDE, BETAINE, ALCOHOL DENAT., PYRUS MALUS SEED OIL, 1,2-HEXANEDIOL, NIACINAMIDE, PROPANEDIOL, SODIUM CHLORIDE, PERSEA GRATISSIMA OIL, SALIX ALBA BARK EXTRACT, XANTHAN GUM, ETHYLHEXYLGLYCERIN, LACTOBACILLUS FERMENT LYSATE, BUTYROSPERMUM PARKII BUTTER EXTRACT, PYRUS MALUS FRUIT EXTRACT, BETULA PLATYPHYLLA JAPONICA JUICE, CENTELLA ASIATICA LEAF WATER, CHAMAECYPARIS OBTUSA WATER, TOCOPHEROL, SEA WATER, GLYCERIN, BUTYLENE GLYCOL, GLYCERYL CAPRYLATE, OCTANEDIOL, PENTYLENE GLYCOL"
  },
  {
    "id": "inyoe-pdrn-tensi-cream",
    "klowId": "cmqhr177m001lmo0xcb3w69cn",
    "brandSlug": "inyoe",
    "name": "PDRN Tensi Cream with 10% Fenugreek PDRN Complex",
    "volume": "50 ml",
    "heroIngredient": "PDRN",
    "category": "Skincare",
    "benefits": ["Anti-aging", "Barrier"],
    "samplePrice": 25,
    "msrp": 38.14,
    "moqPrice": 25,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/1b02eaa4-da31-4370-9b87-36b737e80bd4-a74180b8-7d5b-419e-88ad-ecc1316c7e54-thum_cream_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 25
      },
      {
        "min": 30,
        "unit": 25
      },
      {
        "min": 90,
        "unit": 23.5
      },
      {
        "min": 240,
        "unit": 22
      },
      {
        "min": 600,
        "unit": 20.5
      }
    ],
    "about": null,
    "keyActives": [
      "PDRN",
      "Fenugreek Extract"
    ],
    "forText": null,
    "madeIn": "KOREA",
    "ingredients": null
  },
  {
    "id": "inyoe-dough-cleansing-foam",
    "klowId": "cmqhr177n001nmo0xdsj6sv1v",
    "brandSlug": "inyoe",
    "name": "Dough Cleansing Foam with 3% Amino Acid Complex + Rice Bran Water",
    "volume": "120 ml",
    "heroIngredient": "Amino Acids",
    "category": "Skincare",
    "benefits": ["Cleansing", "Pores"],
    "samplePrice": 25,
    "msrp": 24.41,
    "moqPrice": 25,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/c9ec5855-9965-4230-8308-939fddb89793-c21bbc71-328a-45b9-9e51-41ac1913d9c5-thum_foam_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 25
      },
      {
        "min": 30,
        "unit": 25
      },
      {
        "min": 90,
        "unit": 23.5
      },
      {
        "min": 240,
        "unit": 22
      },
      {
        "min": 600,
        "unit": 20.5
      }
    ],
    "about": null,
    "keyActives": [
      "Amino Acids",
      "Rice Bran Water"
    ],
    "forText": null,
    "madeIn": "Korea",
    "ingredients": "AQUA, GLYCERIN, SODIUM COCOYL GLYCINATE, CELLULOSE, HYDRATED SILICA, SODIUM LAUROYL GLUTAMATE, KAOLIN, 1,2-HEXANEDIOL, SODIUM SWEETALMONDAMPHOACETATE, LAURYL BETAINE, SODIUM METHYL COCOYL TAURATE, SODIUM POLYACRYLATE, CITRIC ACID, SODIUM CHLORIDE, ETHYLHEXYLGLYCERIN, BETAINE, HYDROXYACETOPHENONE, SODIUM PCA, BUTYLENE GLYCOL, ACRYLATES/C10-30 ALKYL ACRYLATE CROSSPOLYMER, ZEA MAYS GERM OIL, SORBITOL, ORYZA SATIVA BRAN WATER, POLYGLYCERIN-3, PHYTOSTERYL/OCTYLDODECYL LAUROYL GLUTAMATE, SERINE, GLYCINE, GLUTAMIC ACID, CAPRYLIC/CAPRIC TRIGLYCERIDE, ALANINE, ARGININE, LYSINE, THREONINE, HYDROXYPROPYL METHYLCELLULOSE, HYDROGENATED LECITHIN, PROLINE, PAEONIA SUFFRUTICOSA ROOT EXTRACT, CENTELLA ASIATICA EXTRACT, FICUS CARICA FRUIT EXTRACT, BETA-GLUCAN, BIOSACCHARIDE GUM-1, CERAMIDE NP, PENTAERYTHRITYL TETRA-DI-T-BUTYL HYDROXYHYDROCINNAMATE, HYDROXYETHYLCELLULOSE, TOCOPHEROL"
  },
  {
    "id": "inyoe-the-6-essentials-gift-box",
    "klowId": "cmqi05ybw0022mo0xgqzsljy5",
    "brandSlug": "inyoe",
    "name": "The 6 Essentials Gift Box",
    "volume": "Set",
    "heroIngredient": "",
    "category": "Sets",
    "benefits": ["Hydration", "Barrier"],
    "samplePrice": 55,
    "msrp": 115.26,
    "moqPrice": 55,
    "moq": 20,
    "images": [
      "https://cdn.klow.kr/brands/cmqhqzg9c001gmo0x2peaeo51/images/f98646e7-8b22-428c-8730-15951341d8d5-thum_gift_box_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 55
      },
      {
        "min": 20,
        "unit": 55
      },
      {
        "min": 60,
        "unit": 51.7
      },
      {
        "min": 160,
        "unit": 48.4
      },
      {
        "min": 400,
        "unit": 45.1
      }
    ],
    "about": null,
    "keyActives": [],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "inyoe-3-seed-cleansing-oil",
    "klowId": "cmqhr177m001mmo0x065zb05u",
    "brandSlug": "inyoe",
    "name": "3-Seed Cleansing Oil with 5% Olive Squalane",
    "volume": "200 ml",
    "heroIngredient": "Olive Squalane",
    "category": "Skincare",
    "benefits": ["Cleansing", "Pores"],
    "samplePrice": 25,
    "msrp": 36.28,
    "moqPrice": 25,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/d37c87c8-1adf-44ae-abf0-e2ce0bd73c26-037772f4-2025-4ae0-9a42-58b4b6eafaa8-thum_oil_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 25
      },
      {
        "min": 30,
        "unit": 25
      },
      {
        "min": 90,
        "unit": 23.5
      },
      {
        "min": 240,
        "unit": 22
      },
      {
        "min": 600,
        "unit": 20.5
      }
    ],
    "about": null,
    "keyActives": [
      "Olive Squalane",
      "Seed Oils"
    ],
    "forText": null,
    "madeIn": "KOREA",
    "ingredients": "ETHYLHEXYL PALMITATE, SORBETH-30 TETRAOLEATE, SQUALANE, POLYSORBATE 60, HELIANTHUS ANNUUS SEED OIL, SIMMONDSIA CHINENSIS SEED OIL, VITIS VINIFERA SEED OIL"
  },
  {
    "id": "inyoe-youth-sun-serum",
    "klowId": "cmqhr177n001omo0xkjuw4hse",
    "brandSlug": "inyoe",
    "name": "Youth Sun Serum with 10% Tomato Water + Peptide",
    "volume": "50 ml",
    "heroIngredient": "Tomato Water",
    "category": "Skincare",
    "benefits": ["Sun protection", "Anti-aging"],
    "samplePrice": 25,
    "msrp": 28.99,
    "moqPrice": 25,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/f23e1ba7-ba39-4931-b235-bdb6edd49656-2a02dc39-7a99-4789-b52a-f3196aa977fb-thum_sun_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 25
      },
      {
        "min": 30,
        "unit": 25
      },
      {
        "min": 90,
        "unit": 23.5
      },
      {
        "min": 240,
        "unit": 22
      },
      {
        "min": 600,
        "unit": 20.5
      }
    ],
    "about": null,
    "keyActives": [
      "Tomato Water",
      "Peptide"
    ],
    "forText": null,
    "madeIn": "KOREA",
    "ingredients": null
  },
  {
    "id": "inyoe-hydra-glow-duo",
    "klowId": "cmqjpga0h0034ps0x0u6t4euv",
    "brandSlug": "inyoe",
    "name": "Hydra Glow Duo",
    "volume": "Set",
    "heroIngredient": "",
    "category": "Sets",
    "benefits": ["Hydration", "Brightening"],
    "samplePrice": 35,
    "msrp": 51.95,
    "moqPrice": 35,
    "moq": 20,
    "images": [
      "https://cdn.klow.kr/images/a475ff33-97fc-432b-9022-7da186d3e098-474af46c-a609-4502-941b-ef375700f179-thum_duo_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 35
      },
      {
        "min": 20,
        "unit": 35
      },
      {
        "min": 60,
        "unit": 32.9
      },
      {
        "min": 160,
        "unit": 30.8
      },
      {
        "min": 400,
        "unit": 28.7
      }
    ],
    "about": null,
    "keyActives": [],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "inyoe-hydra-barrier-trio",
    "klowId": "cmqjpe5zt0032ps0x9fgzhfi6",
    "brandSlug": "inyoe",
    "name": "Hydra Barrier Trio",
    "volume": "Set",
    "heroIngredient": "",
    "category": "Sets",
    "benefits": ["Hydration", "Barrier"],
    "samplePrice": 40,
    "msrp": 71.02,
    "moqPrice": 40,
    "moq": 20,
    "images": [
      "https://cdn.klow.kr/images/282289c2-2d4e-4a25-b8f9-2720fb830ee0-28f799d2-befb-42bd-9831-23e66ded0df4-thum_trio_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 40
      },
      {
        "min": 20,
        "unit": 40
      },
      {
        "min": 60,
        "unit": 37.6
      },
      {
        "min": 160,
        "unit": 35.2
      },
      {
        "min": 400,
        "unit": 32.8
      }
    ],
    "about": null,
    "keyActives": [],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "droasislab-supergen-triple-spicule-ampoule",
    "klowId": "cmqq7xl5x008jpc0xwemh8myp",
    "brandSlug": "droasislab",
    "name": "Supergen Triple Spicule Ampoule",
    "volume": "",
    "heroIngredient": "EC-Spicule",
    "category": "Skincare",
    "benefits": ["Pores", "Anti-aging", "Soothing"],
    "samplePrice": 22,
    "msrp": 38.34,
    "moqPrice": 22,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/0eea11b2-84b7-49b6-b011-9e92e2c080a5-4dbd7ddc-15c3-4c0d-8deb-691388a1f7a6-KakaoTalk_20260805_142043642_01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 22
      },
      {
        "min": 30,
        "unit": 22
      },
      {
        "min": 90,
        "unit": 20.68
      },
      {
        "min": 240,
        "unit": 19.36
      },
      {
        "min": 600,
        "unit": 18.04
      }
    ],
    "about": null,
    "keyActives": [
      "EC-Spicule",
      "Sodium DNA",
      "Centella Asiatica Complex"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "droasislab-supergen-triple-rebalancing-cream",
    "klowId": "cmqq7xl5x008kpc0xzor8pgca",
    "brandSlug": "droasislab",
    "name": "Supergen Triple Rebalancing Cream",
    "volume": "",
    "heroIngredient": "Biome PDRN",
    "category": "Skincare",
    "benefits": ["Anti-aging", "Hydration"],
    "samplePrice": 16,
    "msrp": 30.67,
    "moqPrice": 16,
    "moq": 20,
    "images": [
      "https://cdn.klow.kr/images/91cd1bab-ed31-4a5a-a95a-03fa2d0254a0-1ed443df-a288-418e-9107-8d11b8e45d29-________________4.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 16
      },
      {
        "min": 20,
        "unit": 16
      },
      {
        "min": 60,
        "unit": 15.04
      },
      {
        "min": 160,
        "unit": 14.08
      },
      {
        "min": 400,
        "unit": 13.12
      }
    ],
    "about": null,
    "keyActives": [
      "Biome PDRN",
      "T3 collagen",
      "Triple hyaluronic acid"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "droasislab-supergen-triple-glow-gel-mist",
    "klowId": "cmqq7xl5x008lpc0xfae0po2v",
    "brandSlug": "droasislab",
    "name": "Supergen Triple Glow Gel Mist",
    "volume": "",
    "heroIngredient": "Bifita fermented filtrate",
    "category": "Skincare",
    "benefits": ["Brightening", "Hydration"],
    "samplePrice": 16,
    "msrp": 30.67,
    "moqPrice": 16,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/650cafb8-22d9-471e-8c9c-2512678cd40a-11324936-1ae4-4bab-a6e3-03041b58b56e-__________________3.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 16
      },
      {
        "min": 30,
        "unit": 16
      },
      {
        "min": 90,
        "unit": 15.04
      },
      {
        "min": 240,
        "unit": 14.08
      },
      {
        "min": 600,
        "unit": 13.12
      }
    ],
    "about": null,
    "keyActives": [
      "Bifita fermented filtrate",
      "Biome PDRN",
      "T3 collagen"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "droasislab-supergen-triple-dual-cream",
    "klowId": "cmqq7xl5y008npc0xyfecpgbs",
    "brandSlug": "droasislab",
    "name": "Supergen Triple Dual Cream",
    "volume": "",
    "heroIngredient": "Ectoin",
    "category": "Skincare",
    "benefits": ["Barrier", "Soothing"],
    "samplePrice": 17,
    "msrp": 30.67,
    "moqPrice": 17,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/brands/cmqq7vlad008gpc0xxq06lvoj/images/42ecd048-7e0e-4dc4-8a52-0da2ba24a1fd-_____________1.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 17
      },
      {
        "min": 30,
        "unit": 17
      },
      {
        "min": 90,
        "unit": 15.98
      },
      {
        "min": 240,
        "unit": 14.96
      },
      {
        "min": 600,
        "unit": 13.94
      }
    ],
    "about": null,
    "keyActives": [
      "Ectoin",
      "Ceramide NP",
      "Hydrolyzed Collagen"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "droasislab-supergen-triple-boosting-skin",
    "klowId": "cmqq7xl5y008mpc0xe1o94x56",
    "brandSlug": "droasislab",
    "name": "Supergen Triple Boosting Skin",
    "volume": "",
    "heroIngredient": "AQP3",
    "category": "Skincare",
    "benefits": ["Hydration", "Soothing"],
    "samplePrice": 17,
    "msrp": 34.5,
    "moqPrice": 17,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/46bba966-e83f-4fd8-9dc3-9f07796915fc-6c41d738-9227-405b-a9a5-a63a8456aa30-_______________1.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 17
      },
      {
        "min": 30,
        "unit": 17
      },
      {
        "min": 90,
        "unit": 15.98
      },
      {
        "min": 240,
        "unit": 14.96
      },
      {
        "min": 600,
        "unit": 13.94
      }
    ],
    "about": null,
    "keyActives": [
      "AQP3",
      "Hyaluronic Acid",
      "CICA"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-milk-peel-toner-to-essence",
    "klowId": "cmrd98tcf002jpe0x5v67fatr",
    "brandSlug": "simplete",
    "name": "Milk Peel Toner To Essence",
    "volume": "200 ml",
    "heroIngredient": "Triple AHA",
    "category": "Skincare",
    "benefits": ["Pores", "Brightening"],
    "samplePrice": 18,
    "msrp": 38.98,
    "moqPrice": 18,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/df70437f-e30d-434b-ba29-822db5c40f31-7fa94133-26fb-4ed1-bbdf-56f8a9a81e02-simplete_14_1_____.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 18
      },
      {
        "min": 30,
        "unit": 18
      },
      {
        "min": 90,
        "unit": 16.92
      },
      {
        "min": 240,
        "unit": 15.84
      },
      {
        "min": 600,
        "unit": 14.76
      }
    ],
    "about": null,
    "keyActives": [
      "Triple AHA 10%",
      "Milk Protein",
      "Vitamin C"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-radiance-moisture-booster-serum",
    "klowId": "cmrd98tcf002kpe0x27znitph",
    "brandSlug": "simplete",
    "name": "Radiance & Moisture Booster Serum",
    "volume": "50 ml",
    "heroIngredient": "Triple Hyaluronic Acids",
    "category": "Skincare",
    "benefits": ["Hydration", "Brightening"],
    "samplePrice": 18,
    "msrp": 35.17,
    "moqPrice": 18,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/c19be697-e5d8-47d7-9d33-fc9b3064585a-99d1680f-dcc2-42bc-97f3-95e9f89e6027-simplete_14_4_____.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 18
      },
      {
        "min": 30,
        "unit": 18
      },
      {
        "min": 90,
        "unit": 16.92
      },
      {
        "min": 240,
        "unit": 15.84
      },
      {
        "min": 600,
        "unit": 14.76
      }
    ],
    "about": null,
    "keyActives": [
      "Triple Hyaluronic Acids",
      "Milk Protein",
      "Glutathione"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-lift-glow-ampoule",
    "klowId": "cmrd98tcf002lpe0xj7vu58n7",
    "brandSlug": "simplete",
    "name": "Lift & Glow Ampoule",
    "volume": "30 ml",
    "heroIngredient": "Exosome",
    "category": "Skincare",
    "benefits": ["Anti-aging"],
    "samplePrice": 18,
    "msrp": 43.18,
    "moqPrice": 18,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/6868aca4-4dca-43ea-b941-e984969bdc13-ebb1fa0e-cd7f-4b1d-b931-b59484f92766-simplete_14_3_____.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 18
      },
      {
        "min": 30,
        "unit": 18
      },
      {
        "min": 90,
        "unit": 16.92
      },
      {
        "min": 240,
        "unit": 15.84
      },
      {
        "min": 600,
        "unit": 14.76
      }
    ],
    "about": null,
    "keyActives": [
      "Exosome",
      "Bakuchiol",
      "7 Peptides"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-time-recovery-cream",
    "klowId": "cmrd98tcf002mpe0x0ihhtajg",
    "brandSlug": "simplete",
    "name": "Time Recovery Cream",
    "volume": "35 ml",
    "heroIngredient": "Barrier CCC™",
    "category": "Skincare",
    "benefits": ["Anti-aging", "Barrier"],
    "samplePrice": 16,
    "msrp": 33.64,
    "moqPrice": 16,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/7606b26c-277d-4dcf-80c9-72d45c4ee3a1-dfdf98ba-5515-463b-b64e-4bbc14bfac50-simplete_14_2_____.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 16
      },
      {
        "min": 30,
        "unit": 16
      },
      {
        "min": 90,
        "unit": 15.04
      },
      {
        "min": 240,
        "unit": 14.08
      },
      {
        "min": 600,
        "unit": 13.12
      }
    ],
    "about": null,
    "keyActives": [
      "Barrier CCC™",
      "Milk Protein",
      "Retinol"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-strawberry-milky-tone-up-sun-ampoule",
    "klowId": "cmrd98tcf002npe0xor5mc8qx",
    "brandSlug": "simplete",
    "name": "Strawberry Milky Tone-Up Sun Ampoule",
    "volume": "30 ml",
    "heroIngredient": "Niacinamide",
    "category": "Skincare",
    "benefits": ["Sun protection", "Brightening"],
    "samplePrice": 16,
    "msrp": 30.21,
    "moqPrice": 16,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/b573c29d-4e16-470d-91b6-fb342d22122d-edb86213-f974-4cba-a553-24bdeb475bcf-___.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 16
      },
      {
        "min": 30,
        "unit": 16
      },
      {
        "min": 90,
        "unit": 15.04
      },
      {
        "min": 240,
        "unit": 14.08
      },
      {
        "min": 600,
        "unit": 13.12
      }
    ],
    "about": null,
    "keyActives": [
      "Niacinamide",
      "Strawberry Extract",
      "Panthenol"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "simplete-brightening-glow-mist-serum",
    "klowId": "cmrd98tcf002ope0x078c0b0r",
    "brandSlug": "simplete",
    "name": "Brightening Glow Mist Serum",
    "volume": "80 ml",
    "heroIngredient": "PDRN",
    "category": "Skincare",
    "benefits": ["Brightening", "Hydration"],
    "samplePrice": 17,
    "msrp": 32.5,
    "moqPrice": 17,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/b1c1f8bc-09db-41c1-ba00-81f358a18487-d903feda-0295-48c6-81ee-8af361066194-___3.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 17
      },
      {
        "min": 30,
        "unit": 17
      },
      {
        "min": 90,
        "unit": 15.98
      },
      {
        "min": 240,
        "unit": 14.96
      },
      {
        "min": 600,
        "unit": 13.94
      }
    ],
    "about": null,
    "keyActives": [
      "PDRN",
      "Milk Protein",
      "Glutathione"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-saffron-on-rose-the-essential-3",
    "klowId": "cmt718x4v01wtmq0xb49jop5c",
    "brandSlug": "liita",
    "name": "SAFFRON ON ROSE : The Essential 3",
    "volume": "Set",
    "heroIngredient": "Niacinamide",
    "category": "Sets",
    "benefits": ["Soothing", "Brightening", "Barrier"],
    "samplePrice": 78,
    "msrp": 144.14,
    "moqPrice": 78,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/4b83ffe1-6e0b-489f-b85d-cdd5348b826d-9c92b546-9a4f-4531-aaff-e244ce6b47b8-KLOW-3___________01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 78
      },
      {
        "min": 30,
        "unit": 78
      },
      {
        "min": 90,
        "unit": 73.32
      },
      {
        "min": 240,
        "unit": 68.64
      },
      {
        "min": 600,
        "unit": 63.96
      }
    ],
    "about": null,
    "keyActives": [
      "Niacinamide",
      "Panthenol",
      "Ceramide"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-saffron-on-rose-the-complete-4",
    "klowId": "cmt71g8bh01wvmq0xgbnevseo",
    "brandSlug": "liita",
    "name": "SAFFRON ON ROSE : The Complete 4",
    "volume": "Set",
    "heroIngredient": "Hyaluronic Acid",
    "category": "Sets",
    "benefits": ["Hydration", "Brightening", "Soothing"],
    "samplePrice": 81,
    "msrp": 159.47,
    "moqPrice": 81,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/09bde44a-7988-4892-aa3b-6e00bdc50fdc-f6ce1bbd-4d9e-40dd-a82e-c2523f0631e0-KLOW-4___________01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 81
      },
      {
        "min": 30,
        "unit": 81
      },
      {
        "min": 90,
        "unit": 76.14
      },
      {
        "min": 240,
        "unit": 71.28
      },
      {
        "min": 600,
        "unit": 66.42
      }
    ],
    "about": null,
    "keyActives": [
      "Hyaluronic Acid",
      "Niacinamide",
      "Panthenol"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-toner-to-calm",
    "klowId": "cmt6vvqvc01ttmq0xlf4a3seb",
    "brandSlug": "liita",
    "name": "toner to calm",
    "volume": "",
    "heroIngredient": "May Rose water",
    "category": "Skincare",
    "benefits": ["Soothing", "Hydration"],
    "samplePrice": 22,
    "msrp": 42.17,
    "moqPrice": 22,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/dd9b9535-3213-4b6d-9781-48b533358e6c-6622900e-7c82-410b-94b4-02aebb78f45f-KLOW-________03.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 22
      },
      {
        "min": 30,
        "unit": 22
      },
      {
        "min": 90,
        "unit": 20.68
      },
      {
        "min": 240,
        "unit": 19.36
      },
      {
        "min": 600,
        "unit": 18.04
      }
    ],
    "about": null,
    "keyActives": [
      "May Rose water 63%",
      "Hyaluronic Acid",
      "Saffron Stigma Extract"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-serum-to-shine",
    "klowId": "cmt6womjg01uzmq0x526n0h59",
    "brandSlug": "liita",
    "name": "serum to shine",
    "volume": "",
    "heroIngredient": "May Rose water",
    "category": "Skincare",
    "benefits": ["Brightening"],
    "samplePrice": 27,
    "msrp": 49.84,
    "moqPrice": 27,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/279ff7a9-0faf-4908-bb0e-05d72b8cbf16-0cfd8adb-6472-4d4d-b43e-a062c446103d-KLOW-_________03.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 27
      },
      {
        "min": 30,
        "unit": 27
      },
      {
        "min": 90,
        "unit": 25.38
      },
      {
        "min": 240,
        "unit": 23.76
      },
      {
        "min": 600,
        "unit": 22.14
      }
    ],
    "about": null,
    "keyActives": [
      "May Rose water 59%",
      "Niacinamide",
      "Saffron Stigma Extract"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-cream-to-enrich",
    "klowId": "cmt6x0jaq01v3mq0xdh94hdd9",
    "brandSlug": "liita",
    "name": "cream to enrich",
    "volume": "",
    "heroIngredient": "May Rose water",
    "category": "Skincare",
    "benefits": ["Barrier", "Hydration"],
    "samplePrice": 37,
    "msrp": 67.47,
    "moqPrice": 37,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/82b34a04-df61-4829-93c4-a905ceffb2cd-e478d000-26af-4c86-8f98-3578f8bdb5b6-KLOW-_________03.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 37
      },
      {
        "min": 30,
        "unit": 37
      },
      {
        "min": 90,
        "unit": 34.78
      },
      {
        "min": 240,
        "unit": 32.56
      },
      {
        "min": 600,
        "unit": 30.34
      }
    ],
    "about": null,
    "keyActives": [
      "May Rose water 54%",
      "Vagestop",
      "Saffron Stigma Extract"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-balm-to-bloom",
    "klowId": "cmt70mq7k01wrmq0xq6c5wdka",
    "brandSlug": "liita",
    "name": "balm to bloom",
    "volume": "",
    "heroIngredient": "Botanical Oil Complex",
    "category": "Skincare",
    "benefits": ["Barrier", "Hydration"],
    "samplePrice": 14,
    "msrp": 22.24,
    "moqPrice": 14,
    "moq": 30,
    "images": [
      "https://cdn.klow.kr/images/2316ae5d-d9e3-4fd9-ad0c-0250904b018c-71bca1d2-5150-474e-a9b8-6042aea8384b-KLOW-__________01.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 14
      },
      {
        "min": 30,
        "unit": 14
      },
      {
        "min": 90,
        "unit": 13.16
      },
      {
        "min": 240,
        "unit": 12.32
      },
      {
        "min": 600,
        "unit": 11.48
      }
    ],
    "about": null,
    "keyActives": [
      "Botanical Oil Complex",
      "Tocopherol (Vitamin E)",
      "Saffron Stigma Extract"
    ],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  },
  {
    "id": "liita-paper-gift-bag",
    "klowId": "cmt71kpbt01wxmq0x731ru73w",
    "brandSlug": "liita",
    "name": "LIITA PAPER GIFT BAG",
    "volume": "",
    "heroIngredient": "",
    "category": "Accessories",
    "benefits": [],
    "samplePrice": 1.5,
    "msrp": 2.26,
    "moqPrice": 1.5,
    "moq": 100,
    "images": [
      "https://cdn.klow.kr/brands/cmse9v9wf0048o10xgu1g7d1u/images/18bc66c3-d09c-4212-b96b-ac13e9f529f2-__________________.webp"
    ],
    "tiers": [
      {
        "min": 1,
        "unit": 1.5
      },
      {
        "min": 100,
        "unit": 1.5
      },
      {
        "min": 300,
        "unit": 1.41
      },
      {
        "min": 800,
        "unit": 1.32
      },
      {
        "min": 2000,
        "unit": 1.23
      }
    ],
    "about": null,
    "keyActives": [],
    "forText": null,
    "madeIn": "Republic of Korea",
    "ingredients": null
  }
];
