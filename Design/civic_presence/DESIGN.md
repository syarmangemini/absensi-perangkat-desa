---
name: Civic Presence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#40484d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#70787d'
  outline-variant: '#c0c8cd'
  surface-tint: '#236580'
  primary: '#00475e'
  on-primary: '#ffffff'
  primary-container: '#1a5f7a'
  on-primary-container: '#9bd7f7'
  inverse-primary: '#92cfee'
  secondary: '#006a68'
  on-secondary: '#ffffff'
  secondary-container: '#85f1ed'
  on-secondary-container: '#006e6c'
  tertiary: '#214558'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a5d71'
  on-tertiary-container: '#b0d5ec'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c0e8ff'
  primary-fixed-dim: '#92cfee'
  on-primary-fixed: '#001e2b'
  on-primary-fixed-variant: '#004d66'
  secondary-fixed: '#88f4f0'
  secondary-fixed-dim: '#6ad8d4'
  on-secondary-fixed: '#00201f'
  on-secondary-fixed-variant: '#00504e'
  tertiary-fixed: '#c3e8ff'
  tertiary-fixed-dim: '#a7cbe2'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#274b5e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for the specific needs of village governance, where authority must meet accessibility. The brand personality is **Reliable**, **Transparent**, and **Institutional**. It balances the formal weight of government service with the ease of use required for field-based village officials.

The visual style follows a **Corporate / Modern** approach with a focus on high legibility and utility. It utilizes a clean, systematic layout that prioritizes data integrity and quick action. To ensure the application remains functional for officials working outdoors or in varying light conditions, the design emphasizes high-contrast elements and large, touch-friendly tap targets.

## Colors

This color palette is designed to instill a sense of trust and professional duty. 

- **Primary (Deep Government Blue):** Used for headers, primary actions, and branding elements to establish authority.
- **Secondary (Professional Teal):** Used for accenting positive interactions and secondary navigational elements.
- **Semantic Statuses:** Vivid colors are used for attendance states (*Hadir*, *Izin*, *Alpha*) to ensure they are instantly recognizable at a glance.
- **Background & Surface:** A very light cool grey (`#F8FAFC`) background provides a soft canvas for pure white (`#FFFFFF`) surface cards, creating a clear distinction between the application frame and interactive content.

## Typography

The design system exclusively uses **Inter** to maximize legibility across all digital interfaces. The hierarchy is intentionally strict to handle data-heavy views like attendance logs and official rosters.

- **Weight Usage:** Bold (700) is reserved for high-level page titles. Semi-bold (600) is used for section headers and primary button labels to ensure clear information architecture.
- **Readability:** Line heights are generous to prevent eye fatigue during data entry.
- **Accessibility:** Label styles use slightly increased letter spacing to ensure small metadata remains legible for older officials or in bright sunlight.

## Layout & Spacing

The layout utilizes a **Fluid Grid** system that optimizes for mobile-first field use. 

- **Spacing Rhythm:** Based on a 4px baseline, with 16px (`md`) being the standard padding for containers and buttons to ensure ample "hit area."
- **Grid:** On mobile devices, a 4-column grid with 16px margins is used. On desktop/tablet views for administrative staff, this expands to a 12-column grid.
- **Field Utility:** Vertical spacing between interactive elements (like inputs and buttons) is kept at a minimum of 12px-16px to prevent accidental taps when used on the move.

## Elevation & Depth

To maintain a professional and clean appearance, the design system uses **Tonal Layers** combined with **Ambient Shadows**.

- **Level 0 (Background):** `#F8FAFC` - The base of the application.
- **Level 1 (Cards/Surfaces):** White background with a subtle, very soft shadow (Blur: 8px, Y: 2px, Opacity: 4%, Color: `#1A5F7A`). This provides a hint of depth without looking "game-like."
- **Level 2 (Active Elements):** For elements being interacted with or floating buttons (FABs), shadows increase (Blur: 16px, Y: 4px, Opacity: 8%).
- **Outlines:** Used primarily for input fields and secondary buttons to maintain a structured, government-standard aesthetic.

## Shapes

The design system employs a **Rounded** shape language to soften the authoritative tone and make the application feel modern and approachable.

- **Standard Elements:** Buttons, input fields, and small cards use a 12px (`0.75rem`) radius.
- **Large Containers:** Dashboard summaries and primary modules use a 16px (`1rem`) radius.
- **Status Pills:** Use a full "Pill" shape (999px) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid `#1A5F7A` with white text. Height: 56px for mobile "Check-in" actions to ensure ease of use.
- **Secondary:** Outlined with 1.5px border in Primary color. 
- **Success/Danger:** Used sparingly for definitive actions like "Clock In" or "Delete Log."

### Input Fields
- White fill with a 1px border in `#CBD5E1`. On focus, the border thickens to 2px using the Secondary Teal color.
- Labels are always visible above the field (never hidden as placeholders) to assist in quick data entry.

### Cards
- White surface with 16px internal padding. 
- Cards for attendance entries include a vertical "status strip" on the left edge (Green for Hadir, Red for Alpha) for instant visual scanning.

### Chips & Badges
- Used for categories (e.g., "Sakit," "Izin," "Dinas Luar"). 
- Use a low-opacity background of the semantic color with high-opacity text of the same hue to ensure readability.

### Lists
- Lists of officials or logs use a divider-less design, relying on white-space and soft-grey background separators to group information logically.

### Map Interface
- For GPS-based attendance, the map container should have the same 12px roundedness as other UI elements, with a subtle border to separate the map from the UI background.