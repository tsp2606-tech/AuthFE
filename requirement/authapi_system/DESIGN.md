---
name: AuthAPI System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#424754'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#00628d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007cb1'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 57px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.15px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.5px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.25px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
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
  2xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is rooted in the principles of Material Design 3, adapted for a high-performance SaaS environment. It balances technical precision with a calm, approachable interface to foster a sense of security and reliability for developers and enterprise administrators.

The aesthetic follows **Modern Minimalism** with a focus on:
- **Clarity over Decoration:** Every element serves a functional purpose, utilizing generous whitespace to reduce cognitive load during complex configuration tasks.
- **Systematic Order:** High-density data is managed through strict grid alignment and clear information architecture.
- **Functional Professionalism:** A refined interface that feels like a powerful tool rather than a toy, evoking an emotional response of confidence and calm control.

## Colors

The palette is anchored by a calm Primary Blue, chosen for its association with security and stability in the technology sector. 

- **Primary (#3B82F6):** Used for core action buttons, active states, and critical branding elements.
- **Secondary (#64748B):** A muted slate used for secondary actions and less emphasized UI elements.
- **Neutral Palette:** A comprehensive scale of grays (Slate) ensures depth and contrast. Backgrounds utilize very light cool grays in light mode to reduce eye strain.
- **Semantic Colors:** Success (Emerald) and Error (Red) are highly saturated to ensure immediate recognition of system status changes.
- **Dark Mode:** In dark mode, the system shifts to a deep navy/gray foundation (`#0F172A`). Primary colors are slightly desaturated to maintain accessibility and prevent "vibrating" against dark backgrounds.

## Typography

This design system utilizes **Inter** for all UI elements to ensure maximum legibility and a neutral, professional tone. 

- **Scale:** A typographic scale based on a 4px baseline grid.
- **Hierarchy:** Use `Title-md` for standard card headers and `Label-lg` for button text and input labels. 
- **Code:** For API keys, endpoints, and JSON snippets, use **JetBrains Mono** to distinguish technical data from UI copy.
- **Contrast:** Maintain a minimum 4.5:1 contrast ratio for body text to ensure WCAG AA compliance.

## Layout & Spacing

The layout is built on a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Spacing Rhythm:** An 8px linear scale is used for all layout components, while a 4px scale is used for internal component spacing (e.g., icon to text).
- **Margins & Gutters:** Desktop containers use 24px gutters with 32px outer margins. On mobile, margins reduce to 16px to maximize screen real estate.
- **Structure:** Content is organized into modular cards. Sidebar navigation is fixed at 280px on desktop, collapsing to a bottom navigation bar or hamburger menu on mobile devices.

## Elevation & Depth

In accordance with Material Design 3, elevation is primarily communicated through **Tonal Layers** and subtle **Ambient Shadows**.

- **Level 0 (Flat):** Main background surface.
- **Level 1 (Raised):** Cards and surfaces use a subtle shadow: `0 1px 3px rgba(0,0,0,0.1)`.
- **Level 2 (Elevated):** Primary buttons and interactive elements on hover.
- **Level 3 (Overlay):** Modals, dropdowns, and popovers use more diffused shadows to imply significant distance from the base layer.

In dark mode, elevation is represented by lighter surface overlays rather than shadows, following the "surface tint" principle where higher elevation layers have a slightly lighter hex code.

## Shapes

The shape language is consistently "Rounded" to soften the technical nature of the product.

- **Cards:** Standardized at 16px (`rounded-lg`) to create a modern, friendly container.
- **Buttons & Inputs:** Follow an 8px (`rounded-md`) radius for a professional, sturdy appearance.
- **Badges/Chips:** Utilize a fully rounded (pill-shaped) radius to distinguish them from interactive buttons.
- **Focus States:** Use a 2px offset solid stroke in the Primary color to ensure clear keyboard navigation.

## Components

### Buttons
- **Primary:** Elevated, solid `#3B82F6` with white text. 8px border radius.
- **Secondary:** Outlined with a 1px border of `#E2E8F0` (Light) or `#334155` (Dark).
- **Ghost:** No background/border; used for tertiary actions or within dense headers.

### Input Fields
- **Style:** Outlined with a 1px border. On focus, the border thickens to 2px and changes to the Primary color.
- **Labels:** Always persistent and positioned above the field. Use `Label-lg` typography.

### Cards
- **Construction:** Background color `White` (Light) or `#1E293B` (Dark). 16px border radius. 24px internal padding.
- **Header:** Include a subtle bottom divider if the card contains a list or data table.

### Badges (Roles & Status)
- **Admin Role:** Solid Primary blue with white text.
- **User Role:** Subdued Slate background with darker Slate text.
- **Status:** Use semantic colors (Green for Active, Yellow for Pending, Red for Suspended) with a 10% opacity background of the same color for a "tinted" effect.

### Data Tables
- **Layout:** Minimalist with horizontal dividers only. No vertical lines.
- **Typography:** Use `Body-md` for row data and `Label-sm` (all caps) for column headers.