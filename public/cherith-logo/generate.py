import os

styles = {
    'master': {'bg': 'none', 'red': '#E31B23', 'blue': '#263678', 'hex_grey': '#D3D3D3', 'hex_white': '#FFFFFF', 'inner_circle': '#FFFFFF', 'text_red': '#E31B23', 'text_blue': '#263678', 'drone': '#263678'},
    'icon_only': {'bg': 'none', 'red': '#E31B23', 'blue': '#263678', 'hex_grey': '#D3D3D3', 'hex_white': '#FFFFFF', 'inner_circle': '#FFFFFF', 'text_red': '#E31B23', 'text_blue': '#263678', 'drone': '#263678'},
    'text_only': {'bg': 'none', 'text_red': '#E31B23', 'text_blue': '#263678'},
    'black': {'bg': 'none', 'red': '#000000', 'blue': '#000000', 'hex_grey': '#999999', 'hex_white': '#FFFFFF', 'inner_circle': '#FFFFFF', 'text_red': '#000000', 'text_blue': '#000000', 'drone': '#000000'},
    'white': {'bg': 'none', 'red': '#FFFFFF', 'blue': '#FFFFFF', 'hex_grey': '#AAAAAA', 'hex_white': '#000000', 'inner_circle': '#000000', 'text_red': '#FFFFFF', 'text_blue': '#FFFFFF', 'drone': '#FFFFFF'},
    'color_digital': {'bg': 'none', 'red': '#F01A24', 'blue': '#1A296D', 'hex_grey': '#CCCCCC', 'hex_white': '#FFFFFF', 'inner_circle': '#FFFFFF', 'text_red': '#F01A24', 'text_blue': '#1A296D', 'drone': '#1A296D'},
    'bg_white': {'bg': '#FFFFFF', 'red': '#E31B23', 'blue': '#263678', 'hex_grey': '#D3D3D3', 'hex_white': '#FFFFFF', 'inner_circle': '#FFFFFF', 'text_red': '#E31B23', 'text_blue': '#263678', 'drone': '#263678'},
    'bg_dark': {'bg': '#111111', 'red': '#E31B23', 'blue': '#4E6EEF', 'hex_grey': '#444444', 'hex_white': '#111111', 'inner_circle': '#111111', 'text_red': '#FF4D53', 'text_blue': '#4E6EEF', 'drone': '#4E6EEF'},
}

svg_template = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" width="100%" height="100%">
  <defs>
    <!-- hex pattern grey -->
    <pattern id="hex-grey" width="34.64" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(0.55)">
      <path fill="none" stroke="{hex_grey}" stroke-width="3" d="M34.64 15L17.32 5 0 15v20l17.32 10 17.32-10V15z M0 45l17.32 10 17.32-10M17.32 55L17.32 65M17.32 5L17.32 -5"/>
    </pattern>

    <!-- hex pattern background -->
    <pattern id="hex-white" width="34.64" height="60" patternUnits="userSpaceOnUse" patternTransform="scale(0.55)">
      <path fill="none" stroke="{hex_white}" stroke-width="3" d="M34.64 15L17.32 5 0 15v20l17.32 10 17.32-10V15z M0 45l17.32 10 17.32-10M17.32 55L17.32 65M17.32 5L17.32 -5"/>
    </pattern>

    <path id="pinPath" fill-rule="evenodd" clip-rule="evenodd" d="M 0 160 C 40 120 80 60 80 0 A 80 80 0 1 0 -80 0 C -80 60 -40 120 0 160 Z M 0 -62 A 62 62 0 1 1 0 62 A 62 62 0 1 1 0 -62 Z"/>
    
    <clipPath id="pinClip">
      <use href="#pinPath" />
    </clipPath>

    <radialGradient id="fadeGridGrey" cx="-30" cy="110" r="90" gradientUnits="userSpaceOnUse">
       <stop stop-color="white" stop-opacity="1" offset="0%"/>
       <stop stop-color="white" stop-opacity="0" offset="100%"/>
    </radialGradient>
    <mask id="greyHexMask">
      <rect x="-150" y="0" width="150" height="200" fill="url(#fadeGridGrey)"/>
    </mask>

    <linearGradient id="fadeGridWhite" x1="0" y1="160" x2="0" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="white" stop-opacity="0.8" offset="0%"/>
      <stop stop-color="white" stop-opacity="0" offset="100%"/>
    </linearGradient>
    <mask id="whiteHexMask">
      <rect x="-80" y="-80" width="160" height="250" fill="url(#fadeGridWhite)"/>
    </mask>
  </defs>

  {bg_rect}

  <!-- ICON -->
  {icon_group}

  <!-- TEXT -->
  {text_group}
</svg>"""

bg_rect_tmpl = '<rect x="-160" y="-200" width="{bg_width}" height="400" fill="{bg}"/>'

icon_tmpl = """  <g transform="{icon_transform}">
    <!-- Grey Hexagons out -->
    <rect x="-150" y="0" width="150" height="200" fill="url(#hex-grey)" mask="url(#greyHexMask)"/>

    <!-- Map pin -->
    <use href="#pinPath" fill="{red}"/>
    <rect x="-80" y="-80" width="160" height="250" fill="url(#hex-white)" clip-path="url(#pinClip)" mask="url(#whiteHexMask)"/>
    
    <!-- Inner circle fill (the hole) -->
    <circle cx="0" cy="0" r="62" fill="{inner_circle}"/>
    
    <!-- Outer blue concentric circle inner -->
    <circle cx="0" cy="0" r="54" fill="none" stroke="{blue}" stroke-width="2.5"/>

    <!-- Drone -->
    <g transform="translate(0, -12) scale(0.8)">
      <!-- body -->
      <rect x="-15" y="-14" width="30" height="8" rx="2" fill="{drone}"/>
      <!-- arms -->
      <line x1="-15" y1="-10" x2="-45" y2="-10" stroke="{drone}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="15" y1="-10" x2="45" y2="-10" stroke="{drone}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- props -->
      <line x1="-55" y1="-16" x2="-35" y2="-16" stroke="{drone}" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="35" y1="-16" x2="55" y2="-16" stroke="{drone}" stroke-width="1.8" stroke-linecap="round"/>
      <!-- shafts -->
      <line x1="-45" y1="-10" x2="-45" y2="-16" stroke="{drone}" stroke-width="2"/>
      <line x1="45" y1="-10" x2="45" y2="-16" stroke="{drone}" stroke-width="2"/>
      <!-- legs -->
      <polyline points="-13,2 -10,-6 -7,2" fill="none" stroke="{drone}" stroke-width="2" stroke-linejoin="round"/>
      <line x1="-16" y1="2" x2="-4" y2="2" stroke="{drone}" stroke-width="2" stroke-linecap="round"/>
      <polyline points="7,2 10,-6 13,2" fill="none" stroke="{drone}" stroke-width="2" stroke-linejoin="round"/>
      <line x1="4" y1="2" x2="16" y2="2" stroke="{drone}" stroke-width="2" stroke-linecap="round"/>
    </g>

    <text x="0" y="27" font-family="'Montserrat', 'Century Gothic', 'Segoe UI', Arial, sans-serif" font-size="20" font-weight="600" fill="{red}" text-anchor="middle" letter-spacing="1">RTK</text>

    <!-- Antenna -->
    <g transform="translate(0, -85)">
      <line x1="0" y1="5" x2="0" y2="-15" stroke="{red}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="0" cy="-16" r="3.7" fill="{red}"/>
      <!-- left arcs (flipped horizontally) -->
      <path d="M -9,-6 A 14 14 0 0 0 -9,8" fill="none" stroke="{red}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M -15,-12 A 22 22 0 0 0 -15,14" fill="none" stroke="{red}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- right arcs -->
      <path d="M 9,-6 A 14 14 0 0 1 9,8" fill="none" stroke="{red}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 15,-12 A 22 22 0 0 1 15,14" fill="none" stroke="{red}" stroke-width="2.5" stroke-linecap="round"/>
    </g>

    <!-- Blue Waves (approx angle 20 to 80 deg) -->
    <path d="M 34.2 -94 A 100 100 0 0 1 96.6 -25.9" fill="none" stroke="{blue}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 39.3 -108.1 A 115 115 0 0 1 111.1 -29.8" fill="none" stroke="{blue}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 44.5 -122.2 A 130 130 0 0 1 125.6 -33.7" fill="none" stroke="{blue}" stroke-width="4.5" stroke-linecap="round"/>

    <!-- Red Dots exiting diagonal -->
    <!-- centers roughly on line x = R*0.5, y = -R*0.866 -->
    <circle cx="72.5" cy="-125.6" r="4" fill="{red}"/>
    <circle cx="82.5" cy="-142.9" r="6" fill="{red}"/>
    <circle cx="97.5" cy="-168.9" r="8" fill="{red}"/>
  </g>"""

text_tmpl = """  <g transform="{text_transform}">
    <text x="140" y="0" font-family="'Montserrat', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif" font-size="64" font-weight="700" fill="{text_blue}" letter-spacing="1.5">CHERITH</text>
    <text x="140" y="38" font-family="'Montserrat', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif" font-size="34" font-weight="400" fill="{text_red}" letter-spacing="0.5">Informatics &amp; Mapping Ltd</text>
  </g>"""

out_dir = r"c:\Users\josep\cherith-geosystems\public\cherith-logo"

def write_svg(filename, style_name, mode):
    default_c = {'hex_grey': 'none', 'hex_white': 'none', 'inner_circle': 'none', 'drone': 'none', 'red': 'none', 'blue': 'none', 'text_red': 'none', 'text_blue': 'none', 'bg': 'none'}
    c = {**default_c, **styles[style_name]}
    
    viewbox = "-160 -200 700 380"
    if mode == 'icon_only':
        viewbox = "-160 -200 300 380"
    elif mode == 'text_only':
        viewbox = "130 -60 420 120"
        
    bg_width = "720" if mode != 'icon_only' else "320"
        
    bg_str = ""
    if c['bg'] != 'none':
        bg_str = bg_rect_tmpl.format(bg=c['bg'], bg_width=bg_width)
        
    icon_str = ""
    if mode in ('master', 'icon_only'):
        icon_str = icon_tmpl.format(
            icon_transform="translate(0,0)",
            red=c['red'], blue=c['blue'], hex_grey=c['hex_grey'], hex_white=c['hex_white'],
            inner_circle=c['inner_circle'], drone=c['drone']
        )
        
    text_str = ""
    if mode in ('master', 'text_only'):
        t_trans = "translate(0,0)" if mode != 'text_only' else "translate(0,-10)"
        text_str = text_tmpl.format(
            text_transform=t_trans,
            text_red=c['text_red'], text_blue=c['text_blue']
        )
        
    svg = svg_template.format(
        viewbox=viewbox,
        bg_rect=bg_str,
        icon_group=icon_str,
        text_group=text_str,
        **c
    )
    
    # Remove empty lines that might have happened if missing text_group etc
    lines = [line for line in svg.split('\\n') if line.strip() != '']
    with open(os.path.join(out_dir, filename), 'w', encoding='utf-8') as f:
        f.write('\\n'.join(lines))

write_svg('1_cherith_master.svg', 'master', 'master')
write_svg('2_cherith_icon_only.svg', 'icon_only', 'icon_only')
write_svg('3_cherith_text_only.svg', 'text_only', 'text_only')
write_svg('4_cherith_monochrome_black.svg', 'black', 'master')
write_svg('4_cherith_monochrome_white.svg', 'white', 'master')
write_svg('5_cherith_color_digital.svg', 'color_digital', 'master')
write_svg('6_cherith_bg_white.svg', 'bg_white', 'master')
write_svg('6_cherith_bg_dark.svg', 'bg_dark', 'master')

print("SVGs generated in", out_dir)
