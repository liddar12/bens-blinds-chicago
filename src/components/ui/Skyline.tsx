interface SkylineProps { height?: number; opacity?: number; color?: string }

export function Skyline({ height = 120, opacity = 0.14, color = 'currentColor' }: SkylineProps) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="xMidYEnd slice"
      style={{ width: '100%', height, display: 'block', color, opacity }}
      aria-hidden="true"
    >
      <g fill={color} opacity="0.5">
        <rect x="0" y="110" width="1440" height="50"/>
        <rect x="60"   y="80"  width="60" height="80"/>
        <rect x="180"  y="60"  width="48" height="100"/>
        <rect x="280"  y="90"  width="72" height="70"/>
        <rect x="420"  y="70"  width="54" height="90"/>
        <rect x="540"  y="96"  width="60" height="64"/>
        <rect x="680"  y="84"  width="48" height="76"/>
        <rect x="800"  y="70"  width="66" height="90"/>
        <rect x="950"  y="92"  width="54" height="68"/>
        <rect x="1080" y="78"  width="60" height="82"/>
        <rect x="1220" y="88"  width="54" height="72"/>
        <rect x="1340" y="100" width="80" height="60"/>
      </g>
      <g fill={color}>
        {/* Willis Tower */}
        <rect x="330" y="20" width="70" height="140"/>
        <rect x="342" y="6"  width="12" height="14"/>
        <rect x="376" y="6"  width="12" height="14"/>
        <rect x="355" y="40" width="20" height="120"/>
        {/* Tribune Tower */}
        <rect x="500" y="50" width="46" height="110"/>
        <polygon points="523,32 500,50 546,50"/>
        <rect x="520" y="14" width="6" height="20"/>
        {/* Trump Tower */}
        <rect x="720" y="30" width="46" height="130"/>
        <rect x="706" y="60" width="20" height="100"/>
        <rect x="730" y="18" width="4"  height="14"/>
        {/* Aon Center */}
        <rect x="870" y="38" width="54" height="122"/>
        <rect x="892" y="22" width="10" height="18"/>
        {/* Hancock */}
        <polygon points="1020,40 1074,40 1064,160 1030,160"/>
        <line x1="1022" y1="60"  x2="1070" y2="100" stroke={color} strokeWidth="2"/>
        <line x1="1070" y1="60"  x2="1024" y2="100" stroke={color} strokeWidth="2"/>
        <line x1="1026" y1="100" x2="1068" y2="140" stroke={color} strokeWidth="2"/>
        <line x1="1066" y1="100" x2="1028" y2="140" stroke={color} strokeWidth="2"/>
        <rect x="1044" y="20" width="4" height="22"/>
        <rect x="1050" y="20" width="4" height="22"/>
        {/* Modern slim towers */}
        <rect x="1180" y="44" width="36" height="116"/>
        <rect x="1240" y="58" width="40" height="102"/>
      </g>
    </svg>
  )
}
