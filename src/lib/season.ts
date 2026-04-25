export type SeasonKey = 'spring' | 'summer' | 'fall' | 'winter' | 'severe' | 'heatwave'
export type ToneKey = 'warm' | 'premium'

export interface SeasonData {
  label: string
  icon: string
  hi: number
  lo: number
  cond: string
  rec: string
}

export const SEASONS: Record<SeasonKey, SeasonData> = {
  spring:   { label:'Spring',       icon:'leaf',  hi:62,  lo:45,  cond:'Mild',      rec:'Light-filtering roller & cellular shades' },
  summer:   { label:'Summer',       icon:'sun',   hi:88,  lo:72,  cond:'Sunny',     rec:'Solar screens, motorized shades, UV filters' },
  fall:     { label:'Fall',         icon:'cloud', hi:58,  lo:42,  cond:'Crisp',     rec:'Layered drapery, wood blinds, warm tones' },
  winter:   { label:'Winter',       icon:'snow',  hi:28,  lo:14,  cond:'Cold',      rec:'Insulating cellular shades, draft blockers' },
  severe:   { label:'Polar Vortex', icon:'wind',  hi:-4,  lo:-12, cond:'Extreme',   rec:'Blackout + insulation + storm shutters' },
  heatwave: { label:'Heatwave',     icon:'flame', hi:102, lo:82,  cond:'Scorching', rec:'Heat-blocking solar & motorized shades' },
}

export function detectSeasonFromMonth(month: number): SeasonKey {
  if ([11, 0, 1].includes(month)) return 'winter'
  if ([2, 3, 4].includes(month))  return 'spring'
  if ([5, 6, 7].includes(month))  return 'summer'
  return 'fall'
}

export function detectSeasonFromTemp(tempF: number): SeasonKey {
  if (tempF <= -4)  return 'severe'
  if (tempF >= 95)  return 'heatwave'
  if (tempF <= 32)  return 'winter'
  if (tempF <= 50)  return 'fall'
  if (tempF <= 70)  return 'spring'
  return 'summer'
}

export const PRODUCTS = [
  { key:'cellular',  name:'Cellular shades',     blurb:'Insulates up to 3× better than standard shades.',   variant:'cellular', palette:'warm',  recommend:['winter','severe','fall'] as SeasonKey[] },
  { key:'solar',     name:'Solar screens',        blurb:'Blocks 85% of UV and solar heat. Keeps the view.',  variant:'solar',    palette:'cool',  recommend:['summer','heatwave'] as SeasonKey[] },
  { key:'roller',    name:'Roller shades',        blurb:'Clean, modern, endlessly customizable.',            variant:'roller',   palette:'mono',  recommend:['spring','summer'] as SeasonKey[] },
  { key:'wood',      name:'Wood blinds',          blurb:'Warm, craftsman-ready. Ideal for vintage windows.', variant:'wood',     palette:'warm',  recommend:['fall','winter'] as SeasonKey[] },
  { key:'shutters',  name:'Plantation shutters',  blurb:'Architectural, permanent, beautifully Midwestern.',variant:'shutter',  palette:'mono',  recommend:['fall','spring'] as SeasonKey[] },
  { key:'roman',     name:'Roman shades',         blurb:'Tailored folds. Fabric you can feel from the couch.',variant:'roman',  palette:'sage',  recommend:['spring','fall'] as SeasonKey[] },
  { key:'motorized', name:'Motorized & smart',    blurb:'Somfy-powered. Alexa, Google, Apple Home.',        variant:'roller',   palette:'dark',  recommend:['summer','heatwave'] as SeasonKey[] },
  { key:'drapery',   name:'Drapery & curtains',   blurb:'Layer with any shade. Custom-fabricated here.',    variant:'roman',    palette:'terra', recommend:['fall','winter'] as SeasonKey[] },
]

export const NEIGHBORHOODS = [
  { name:'Lincoln Park',   sub:'Bay windows · tall ceilings',    hood:'lincolnPark' },
  { name:'Lakeview',       sub:'East-facing high-rises',          hood:'lakeview' },
  { name:'Gold Coast',     sub:'Pre-war condos · sound-block',    hood:'goldCoast' },
  { name:'Wicker Park',    sub:'Greystones · vintage sash',       hood:'wickerPark' },
  { name:'Logan Square',   sub:'Two-flats · bay windows',         hood:'logan' },
  { name:'Pilsen',         sub:'Row-house bungalows',             hood:'pilsen' },
  { name:'West Loop',      sub:'Loft windows · industrial',       hood:'westLoop' },
  { name:'Hyde Park',      sub:'Historic · landmark-approved',    hood:'hydePark' },
  { name:'River North',    sub:'Floor-to-ceiling glass',          hood:'goldCoast' },
  { name:'Lincoln Square', sub:'Craftsman · wood trim',           hood:'lincolnPark' },
  { name:'Edgewater',      sub:'Lakefront light profile',         hood:'lakeview' },
  { name:'Oak Park',       sub:'Prairie style · wood blinds',     hood:'lincolnPark' },
]
