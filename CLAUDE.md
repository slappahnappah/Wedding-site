# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML wedding website for Kristine & Halfdan's wedding on June 12, 2026. The site features a countdown timer, wedding program, venue information, RSVP form, and image gallery placeholders.

## Architecture & Structure

The project consists of three main files:
- `index.html` - Main responsive wedding website with full functionality
- `bryllup-mobil.html` - Simplified mobile-only version of the site
- `style.css` - Complete stylesheet with responsive design and animations
- `script.js` - JavaScript for interactivity (countdown, navigation, animations)
- `/assets/` - Image directory with placeholder and venue photos

### Key Features
- **Countdown Timer**: Dynamic countdown to wedding date (June 12, 2026 19:00 CET)
- **Responsive Navigation**: Mobile hamburger menu with smooth scrolling
- **RSVP Form**: Formspree integration for guest responses
- **Image Gallery**: Placeholder system for venue photos (Château des Salles, Domaine Rabiega)
- **Scroll Animations**: Fade-in effects and navbar styling changes

### Color Palette & Design System
- Background: `#F6E9E1` (warm beige)
- Accent: `#A66C6C` (dusty rose)  
- Text: `#3D405B` (dark blue-gray)
- Typography: Playfair Display (headings), Inter (body text)

## Development Guidelines

### Content Updates
- **Wedding Date Changes**: Update both `index.html` hero section and `script.js` weddingDate variable
- **Program Updates**: Modify the program section in `index.html` 
- **Image Replacements**: Replace files in `/assets/` and update corresponding `<img>` src attributes
- **Color Changes**: Modify CSS variables in `:root` section of `style.css`

### Form Configuration
- RSVP form currently uses placeholder Formspree endpoint `xyz123`
- Contact email: `halvdan.bigset@gmail.com`
- Phone: `916 80 373`

### File Relationships
- The mobile version (`bryllup-mobil.html`) is a self-contained single file with inline CSS/JS
- Main version uses separate CSS/JS files for better maintainability
- Both versions share the same color scheme and basic functionality

### No Build Process
This is a static site with no build tools, package managers, or dependencies beyond:
- Google Fonts (Inter, Playfair Display)
- Formspree for form handling

To serve locally, simply open `index.html` in a browser or use any static file server.

