// SVG-based room scene and neighborhood image generator.
// Returns data: URLs safe to use in <img src="...">: no external fetches.

const P = {
  wallWarm:    ['#E8DFCF','#D4C5A8'],
  wallCool:    ['#D8DEE5','#B4BDC8'],
  wallWhite:   ['#F3EFE8','#DED6C7'],
  wallGreen:   ['#CDD5BE','#A8B496'],
  wallDark:    ['#4A4638','#2A2820'],
  wallTerra:   ['#E8D4BC','#C69A74'],
  floorOak:    ['#B08860','#7C5B38'],
  floorWalnut: ['#6A4A2E','#38240F'],
  floorGray:   ['#9A988F','#6A6860'],
  trimWhite:   '#F7F3EC',
  trimCream:   '#EEE6D4',
  cellularCream:['#F0E6CF','#CFB98A'],
  cellularCool: ['#D4DCE8','#8A9CB8'],
  solarBlue:   ['#5A768E','#2A3E56'],
  solarCharcoal:['#3E3E3E','#1C1C1C'],
  rollerWhite: ['#F2EDE2','#CFC6B2'],
  rollerLinen: ['#E6DCC8','#B8A882'],
  rollerTaupe: ['#B8A894','#82725E'],
  woodOak:     ['#C4956A','#8A5E38'],
  woodWalnut:  ['#6E4A2E','#3A2410'],
  woodWhite:   ['#F4EFE4','#C8BFA8'],
  romanSage:   ['#B8C2A6','#788466'],
  romanLinen:  ['#E0D4B8','#A8986A'],
  drapeLinen:  ['#E8DFC8','#B8A88A'],
  skyDay:      ['#CEE3F2','#9EC4E4'],
  skyDusk:     ['#E8C09E','#B86A5A'],
  skyWinter:   ['#E8EDF2','#B8C4D2'],
  skyStorm:    ['#7888A0','#3A4858'],
} as const

let uid = 0
const gid = () => `g${++uid}`

function linear(id: string, c0: string, c1: string, x1=0, y1=0, x2=1, y2=1) {
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="${c0}"/><stop offset="100%" stop-color="${c1}"/></linearGradient>`
}

function buildRoom(scene: {
  wall: readonly string[]; floor: readonly string[]; sky: readonly string[]; product: string;
  tone: readonly string[]; vig: string; open: number
}): string {
  const w=gid(),f=gid(),s=gid(),l=gid()
  const bg = {
    defs: [
      linear(w, scene.wall[0], scene.wall[1]),
      linear(f, scene.floor[0], scene.floor[1], 0.5,0,0.5,1),
      `<linearGradient id="${s}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#000" stop-opacity="0.2"/><stop offset="35%" stop-color="#000" stop-opacity="0"/></linearGradient>`,
      `<radialGradient id="${l}" cx="0.5" cy="0.3" r="0.8"><stop offset="0%" stop-color="#FFFBE8" stop-opacity="0.22"/><stop offset="60%" stop-color="#FFFBE8" stop-opacity="0"/></radialGradient>`,
    ],
    body: [
      `<rect width="1000" height="750" fill="url(#${w})"/>`,
      `<rect width="1000" height="750" fill="url(#${s})"/>`,
      `<polygon points="0,560 1000,560 1000,750 0,750" fill="url(#${f})"/>`,
      ...[0,1,2,3,4].map(i=>`<line x1="0" y1="${590+i*38}" x2="1000" y2="${590+i*38}" stroke="#000" stroke-opacity="0.14" stroke-width="1"/>`),
      `<rect x="0" y="552" width="1000" height="8" fill="#F7F3EC" opacity="0.9"/>`,
      `<rect width="1000" height="750" fill="url(#${l})"/>`,
    ]
  }

  const skyG=gid()
  const winDefs = [`<linearGradient id="${skyG}" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="${scene.sky[0]}"/><stop offset="100%" stop-color="${scene.sky[1]}"/></linearGradient>`]
  const trim = (scene.wall as unknown) === P.wallDark ? P.trimCream : P.trimWhite
  const win = [
    `<rect x="242" y="102" width="516" height="448" fill="#000" opacity="0.08"/>`,
    `<rect x="240" y="100" width="520" height="440" fill="${trim}"/>`,
    `<rect x="250" y="110" width="500" height="430" fill="url(#${skyG})"/>`,
    `<rect x="498" y="110" width="4" height="430" fill="${trim}"/>`,
    `<rect x="250" y="323" width="500" height="4" fill="${trim}"/>`,
    `<rect x="234" y="538" width="532" height="14" fill="${trim}"/>`,
  ]

  const x=250,y=110,w2=500,h=430
  const shown = h*(1-scene.open)
  let shadeDefs: string[]=[], shadeBody: string[]=[]
  const tone = scene.tone as unknown as string[]

  if(scene.product==='cellular'){
    const g=gid(),cells=Math.max(1,Math.floor(shown/14))
    shadeDefs=[linear(g,tone[0],tone[1],0,0,1,0)]
    shadeBody=[
      `<rect x="${x-4}" y="${y-6}" width="${w2+8}" height="6" fill="#2A2420"/>`,
      `<rect x="${x}" y="${y}" width="${w2}" height="${shown}" fill="url(#${g})"/>`,
      ...Array.from({length:cells},(_,i)=>`<line x1="${x}" y1="${y+(i+1)*14}" x2="${x+w2}" y2="${y+(i+1)*14}" stroke="${tone[1]}" stroke-opacity="0.45"/>`),
      `<rect x="${x-2}" y="${y+shown-3}" width="${w2+4}" height="5" fill="${tone[1]}"/>`,
    ]
  } else if(scene.product==='roller'){
    const g=gid()
    shadeDefs=[linear(g,tone[0],tone[1])]
    shadeBody=[
      `<rect x="${x-6}" y="${y-8}" width="${w2+12}" height="10" fill="#2A2420" rx="2"/>`,
      `<rect x="${x}" y="${y}" width="${w2}" height="${shown}" fill="url(#${g})"/>`,
      `<rect x="${x-2}" y="${y+shown-4}" width="${w2+4}" height="5" fill="${tone[1]}"/>`,
    ]
  } else if(scene.product==='solar'){
    const g=gid(),m=gid()
    shadeDefs=[linear(g,tone[0],tone[1]),`<pattern id="${m}" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.8" fill="${tone[0]}" opacity="0.6"/></pattern>`]
    shadeBody=[
      `<rect x="${x-4}" y="${y-6}" width="${w2+8}" height="6" fill="#1A1A1A"/>`,
      `<rect x="${x}" y="${y}" width="${w2}" height="${shown}" fill="url(#${g})" opacity="0.88"/>`,
      `<rect x="${x}" y="${y}" width="${w2}" height="${shown}" fill="url(#${m})"/>`,
    ]
  } else if(scene.product==='wood'){
    const g=gid(),slats=Math.floor(shown/16)
    shadeDefs=[`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${tone[0]}"/><stop offset="50%" stop-color="${tone[1]}" stop-opacity="0.7"/><stop offset="100%" stop-color="${tone[0]}"/></linearGradient>`]
    shadeBody=[
      `<rect x="${x-6}" y="${y-10}" width="${w2+12}" height="12" fill="${tone[1]}"/>`,
      ...Array.from({length:slats},(_,i)=>`<rect x="${x}" y="${y+i*16}" width="${w2}" height="14" fill="url(#${g})"/>`),
    ]
  } else if(scene.product==='roman'){
    const g=gid(),folds=4,foldH=shown/folds
    shadeDefs=[linear(g,tone[0],tone[1],0.5,0,0.5,1)]
    shadeBody=[`<rect x="${x-4}" y="${y-8}" width="${w2+8}" height="8" fill="#2A2420"/>`]
    for(let i=0;i<folds;i++){
      shadeBody.push(`<rect x="${x}" y="${y+i*foldH}" width="${w2}" height="${foldH}" fill="url(#${g})"/>`)
      shadeBody.push(`<rect x="${x}" y="${y+(i+1)*foldH-4}" width="${w2}" height="4" fill="#000" opacity="0.18"/>`)
    }
  } else if(scene.product==='drapery'){
    const g=gid(),panels=8,panelW=w2/panels
    shadeDefs=[linear(g,tone[1],tone[0],0,0.5,1,0.5)]
    shadeBody=[`<rect x="${x-12}" y="${y-6}" width="${w2+24}" height="3" fill="#8A7560"/>`]
    for(let i=0;i<panels;i++) shadeBody.push(`<rect x="${x+i*panelW}" y="${y}" width="${panelW}" height="${h}" fill="url(#${g})"/>`)
  }

  const VIGS: Record<string,string> = {
    living:`<g opacity="0.88"><rect x="300" y="510" width="420" height="130" rx="10" fill="#3E4A4E"/><rect x="300" y="500" width="420" height="30" rx="10" fill="#4C595E"/><rect x="340" y="515" width="70" height="55" rx="6" fill="#C49B76"/><rect x="620" y="515" width="70" height="55" rx="6" fill="#8A6A4E"/></g>`,
    bedroom:`<g opacity="0.88"><rect x="220" y="520" width="560" height="140" rx="6" fill="#2F2A22"/><rect x="230" y="500" width="540" height="40" rx="4" fill="#F0E8D8"/><rect x="230" y="540" width="540" height="100" fill="#D4C4A8"/></g>`,
    kitchen:`<g opacity="0.88"><rect x="0" y="570" width="1000" height="80" fill="#F0EDE2"/><rect x="0" y="650" width="1000" height="100" fill="#E8E2D4"/></g>`,
    dining:`<g opacity="0.88"><rect x="240" y="550" width="520" height="80" rx="4" fill="#4A321E"/><rect x="250" y="630" width="10" height="90" fill="#3A2418"/><rect x="740" y="630" width="10" height="90" fill="#3A2418"/></g>`,
    office:`<g opacity="0.88"><rect x="180" y="540" width="620" height="18" fill="#6A4A2E"/><rect x="380" y="420" width="280" height="180" rx="6" fill="#1A1A1A"/><rect x="390" y="430" width="260" height="155" fill="#3E566E"/></g>`,
    condo:`<g opacity="0.88"><rect x="0" y="655" width="1000" height="95" fill="#D4D0CC"/><rect x="160" y="560" width="680" height="100" rx="4" fill="#4A4A4E"/></g>`,
    greystone:`<g opacity="0.88"><rect x="0" y="480" width="1000" height="160" fill="#EEE6D4" opacity="0.5"/><rect x="240" y="520" width="180" height="140" rx="10" fill="#6A4838"/></g>`,
    samples:`<g opacity="0.92"><g transform="translate(400 430) rotate(-8)"><rect width="120" height="160" rx="6" fill="#E8DCC0"/></g><g transform="translate(380 460) rotate(-2)"><rect width="120" height="160" rx="6" fill="#B8A88A"/></g><g transform="translate(420 470) rotate(6)"><rect width="120" height="160" rx="6" fill="#8A6A4E"/></g></g>`,
  }

  const defs = [...bg.defs, ...winDefs, ...shadeDefs]
  const vig = VIGS[scene.vig] || ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice"><defs>${defs.join('')}</defs>${bg.body.join('')}${win.join('')}${shadeBody.join('')}${vig}</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

function buildNeighborhood(kind: string): string {
  const themes: Record<string,{sky:readonly string[];back:string;front:string;density:string}> = {
    goldCoast:   { sky:P.skyDusk,   back:'#3E5A78', front:'#1E3454', density:'highrise' },
    lincolnPark: { sky:P.skyDay,    back:'#6A4838', front:'#3A2418', density:'lowmid' },
    lakeview:    { sky:P.skyDay,    back:'#7A5846', front:'#4A2A1E', density:'midrise' },
    logan:       { sky:P.skyDay,    back:'#7A6A58', front:'#3E3428', density:'greystone' },
    westLoop:    { sky:P.skyDusk,   back:'#3E3428', front:'#1A1410', density:'industrial' },
    pilsen:      { sky:P.skyDay,    back:'#B85A44', front:'#6A2818', density:'rowhouse' },
    wickerPark:  { sky:P.skyDay,    back:'#6A4838', front:'#3A2418', density:'greystone' },
    hydePark:    { sky:P.skyDay,    back:'#5A4838', front:'#2A1A10', density:'historic' },
  }
  const t = themes[kind] || themes.goldCoast
  const sg = gid()
  const defs = `<linearGradient id="${sg}" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="${t.sky[0]}"/><stop offset="100%" stop-color="${t.sky[1]}"/></linearGradient>`
  const parts: string[] = [`<rect width="1000" height="600" fill="url(#${sg})"/>`]
  if(t.sky===P.skyDusk) parts.push(`<circle cx="780" cy="140" r="28" fill="#FFE4B8" opacity="0.8"/>`)

  parts.push(`<g fill="${t.back}" opacity="0.7">`)
  if(t.density==='highrise') [[80,180,90,300],[190,120,110,360],[420,80,130,400],[570,160,90,320],[680,110,120,370]].forEach(b=>parts.push(`<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}"/>`))
  else if(t.density==='greystone') [50,170,290,410,530,650].forEach(x=>{parts.push(`<rect x="${x}" y="280" width="110" height="220"/>`);parts.push(`<polygon points="${x},280 ${x+55},240 ${x+110},280" fill="${t.front}"/>`)})
  else if(t.density==='lowmid') [60,200,340,480,620,760].forEach(x=>parts.push(`<rect x="${x}" y="240" width="130" height="260"/>`))
  else if(t.density==='midrise') [40,180,340,500,660,820].forEach(x=>parts.push(`<rect x="${x}" y="180" width="150" height="320"/>`))
  parts.push(`</g>`)

  parts.push(`<g fill="${t.front}">`)
  if(t.density==='highrise') [[140,230,100,270],[270,140,130,360],[430,100,140,400],[600,170,120,330]].forEach(b=>parts.push(`<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}"/>`))
  else if(t.density==='greystone') [110,310,510].forEach(x=>{parts.push(`<rect x="${x}" y="300" width="130" height="200"/>`);parts.push(`<polygon points="${x-6},300 ${x+65},250 ${x+136},300"/>`)})
  parts.push(`</g>`)
  parts.push(`<rect x="0" y="500" width="1000" height="100" fill="#2A2824"/>`)
  parts.push(`<rect x="0" y="500" width="1000" height="4" fill="#F7E4B8" opacity="0.3"/>`)
  ;[100,280,520,780].forEach(x=>{
    parts.push(`<rect x="${x-2}" y="440" width="4" height="60" fill="#2A1810" opacity="0.75"/>`)
    parts.push(`<circle cx="${x}" cy="430" r="28" fill="#3E5A3E" opacity="0.75"/>`)
  })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${parts.join('')}</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

function buildAvatar(kind: 'female1'|'female2'|'male1'): string {
  const palettes = {
    female1: { skin:'#E8C4A0', hair:'#2A1810', top:'#C4846A', bg:'#E8DFC8' },
    female2: { skin:'#C49876', hair:'#1A1010', top:'#5A7A9A', bg:'#D8DEE5' },
    male1:   { skin:'#D4A082', hair:'#3A2418', top:'#3E4A4E', bg:'#CDD5BE' },
  }
  const p = palettes[kind]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="${p.bg}"/><path d="M6 48 Q6 34 24 34 Q42 34 42 48 Z" fill="${p.top}"/><rect x="20" y="28" width="8" height="7" fill="${p.skin}"/><ellipse cx="24" cy="22" rx="9" ry="10" fill="${p.skin}"/><path d="M14 22 Q14 10 24 10 Q34 10 34 22 Q34 17 30 16 Q24 14 18 16 Q14 17 14 22 Z" fill="${p.hair}"/></svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

// Pre-built scene catalog
const SCENE_DEFS = {
  heroLiving:    { wall:P.wallWarm,  floor:P.floorOak,    sky:P.skyWinter, product:'cellular', tone:P.cellularCream,  vig:'living',    open:0.45 },
  heroBedroom:   { wall:P.wallGreen, floor:P.floorOak,    sky:P.skyDay,    product:'roller',   tone:P.rollerLinen,    vig:'bedroom',   open:0.5  },
  heroKitchen:   { wall:P.wallWhite, floor:P.floorOak,    sky:P.skyDay,    product:'solar',    tone:P.solarBlue,      vig:'kitchen',   open:0.2  },
  heroDining:    { wall:P.wallWarm,  floor:P.floorWalnut, sky:P.skyDusk,   product:'wood',     tone:P.woodOak,        vig:'dining',    open:0.3  },
  cellular:      { wall:P.wallWarm,  floor:P.floorOak,    sky:P.skyWinter, product:'cellular', tone:P.cellularCream,  vig:'living',    open:0.35 },
  solar:         { wall:P.wallWhite, floor:P.floorGray,   sky:P.skyDay,    product:'solar',    tone:P.solarBlue,      vig:'condo',     open:0.2  },
  roller:        { wall:P.wallCool,  floor:P.floorOak,    sky:P.skyDay,    product:'roller',   tone:P.rollerWhite,    vig:'bedroom',   open:0.45 },
  wood:          { wall:P.wallWarm,  floor:P.floorWalnut, sky:P.skyDusk,   product:'wood',     tone:P.woodOak,        vig:'greystone', open:0.25 },
  shutters:      { wall:P.wallWhite, floor:P.floorOak,    sky:P.skyDay,    product:'roller',   tone:P.woodWhite,      vig:'living',    open:0.35 },
  roman:         { wall:P.wallGreen, floor:P.floorOak,    sky:P.skyDay,    product:'roman',    tone:P.romanSage,      vig:'living',    open:0.35 },
  motorized:     { wall:P.wallDark,  floor:P.floorGray,   sky:P.skyDusk,   product:'roller',   tone:P.rollerTaupe,    vig:'condo',     open:0.3  },
  drapery:       { wall:P.wallTerra, floor:P.floorWalnut, sky:P.skyDusk,   product:'drapery',  tone:P.drapeLinen,     vig:'dining',    open:0    },
  condoHighRise: { wall:P.wallDark,  floor:P.floorGray,   sky:P.skyDusk,   product:'roller',   tone:P.rollerTaupe,    vig:'condo',     open:0.25 },
  greystone:     { wall:P.wallWarm,  floor:P.floorWalnut, sky:P.skyDay,    product:'wood',     tone:P.woodOak,        vig:'greystone', open:0.3  },
  loft:          { wall:P.wallCool,  floor:P.floorGray,   sky:P.skyDay,    product:'roller',   tone:P.rollerWhite,    vig:'condo',     open:0.2  },
  singleFamily:  { wall:P.wallWhite, floor:P.floorOak,    sky:P.skyDay,    product:'roller',   tone:P.woodWhite,      vig:'living',    open:0.35 },
  commercial:    { wall:P.wallCool,  floor:P.floorGray,   sky:P.skyDay,    product:'solar',    tone:P.solarCharcoal,  vig:'office',    open:0.15 },
  samples:       { wall:P.wallWarm,  floor:P.floorOak,    sky:P.skyDay,    product:'roman',    tone:P.romanLinen,     vig:'samples',   open:0.5  },
  consultation:  { wall:P.wallWarm,  floor:P.floorOak,    sky:P.skyDay,    product:'cellular', tone:P.cellularCream,  vig:'samples',   open:0.45 },
}

// Lazy-build cache so images are only generated when first accessed
const _cache: Record<string, string> = {}

function get(key: keyof typeof SCENE_DEFS): string {
  if (!_cache[key]) _cache[key] = buildRoom(SCENE_DEFS[key] as Parameters<typeof buildRoom>[0])
  return _cache[key]
}

const _hoodCache: Record<string, string> = {}
function getHood(key: string): string {
  if (!_hoodCache[key]) _hoodCache[key] = buildNeighborhood(key)
  return _hoodCache[key]
}

export const IMG = {
  get heroLiving()    { return '/images/home/hero-spring.jpg' },
  get heroBedroom()   { return '/images/home/hero-winter.jpg' },
  get heroKitchen()   { return get('heroKitchen') },
  get heroDining()    { return get('heroDining') },
  get cellular()      { return '/images/products/cellular-hero.jpg' },
  get solar()         { return '/images/products/solar-hero.jpg' },
  get roller()        { return '/images/products/roller-hero.jpg' },
  get wood()          { return '/images/products/wood-hero.jpg' },
  get shutters()      { return '/images/products/shutters-hero.jpg' },
  get roman()         { return '/images/products/roman-hero.jpg' },
  get motorized()     { return '/images/products/motorized-hero.jpg' },
  get drapery()       { return '/images/products/drapery-hero.jpg' },
  get condoHighRise() { return get('condoHighRise') },
  get greystone()     { return get('greystone') },
  get loft()          { return get('loft') },
  get singleFamily()  { return get('singleFamily') },
  get commercial()    { return get('commercial') },
  get samples()       { return get('samples') },
  get consultation()  { return get('consultation') },
  // neighborhoods
  get goldCoast()     { return '/images/neighborhoods/goldCoast.jpg' },
  get lincolnPark()   { return '/images/neighborhoods/lincolnPark.jpg' },
  get lakeview()      { return '/images/neighborhoods/lakeview.jpg' },
  get logan()         { return '/images/neighborhoods/logan.jpg' },
  get westLoop()      { return '/images/neighborhoods/westLoop.jpg' },
  get pilsen()        { return '/images/neighborhoods/pilsen.jpg' },
  get wickerPark()    { return '/images/neighborhoods/wickerPark.jpg' },
  get hydePark()      { return '/images/neighborhoods/hydePark.jpg' },
  // avatars
  get avatarMaya()    { return buildAvatar('female1') },
  get avatarPriya()   { return buildAvatar('female2') },
  get avatarDarius()  { return buildAvatar('male1') },
}
