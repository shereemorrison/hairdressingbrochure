# Celebrate Hairdressing - Digital Brochure

An interactive React brochure for Bendigo TAFE's hairdressing celebration.  Complete front end project

## Features

### Preloader Screen
- Animated scissors with video background
- Loading progress indication
- Smooth transition to main content

### Acknowledgment of Country
- Respectful Indigenous recognition with flags
- Cultural acknowledgment before main content

### Loading Screen
- Vanta Birds Background - Animated 3D bird flock with Three.js
- Interactive Lanyard - 3D ticket that falls and becomes clickable
- 50-year celebration messaging for industry, hairshows, apprentices, and educators
- Smooth transitions between loading phases

### Tabs
- **Gallery Tab** - Historical photo journey through campus locations (1975-present)
- **Teachers Tab** - Vintage polaroid-style photo carousel with aging effects
- **Awards Tab** - Comprehensive award winners database with chronological ordering
- **Refreshments Tab** - Event menu presentation with beverages section
- **Entertainment Tab** - Event details with music, hair show, and future talent
- **Movie Tab** - Exclusive documentary premiere with producer credits


## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── tabs/              # Interactive tab components
│   │   │   ├── gallery-tab.tsx
│   │   │   ├── teachers-tab.tsx
│   │   │   ├── awards-tab.tsx
│   │   │   ├── refreshments-tab.tsx
│   │   │   ├── celebrate-tab.tsx
│   │   │   └── movie-tab.tsx
│   │   ├── loading-screen.tsx # Vanta birds + lanyard experience
│   │   ├── main-brochure.tsx  # Tab orchestration & unlock schedule
│   │   ├── VantaBirdsBackground.tsx
│   │   └── ui/               # Reusable UI components
│   ├── data/
│   │   ├── students.ts       # Awards data
│   │   ├── teachers.ts       # Teachers data
│   │   └── gallery.ts        # Historical campus photos
│   ├── types/
│   │   ├── student.ts        # TypeScript interfaces
│   │   └── teacher.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Mobile detection
│   │   └── use-toast.ts      # Notification system
│   ├── lib/
│   │   ├── utils.ts          # Utility functions
│   │   └── queryClient.ts    # React Query setup
│   └── index.css             # Global styles & polaroid effects
├── public/
│   ├── assets/
│   │   ├── students/         # Award winner photos
│   │   ├── teachers/         # Teacher photos
│   │   └── buildingimages/   # Campus photos
│   ├── three.min.js          # Three.js library
│   └── vanta.birds.min.js    # Vanta.js birds effect
├── index.html                # Main HTML with script loading
└── vite.config.ts           # Vite configuration
```


## Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```


## Deployment

Deployed on:
- Vercel

