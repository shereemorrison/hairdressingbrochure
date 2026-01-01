# Celebrate Hairdressing - Digital Brochure

Am interactive React brochure for Bendigo TAFE's hairdressing celebration.  Complete front end project

## Features

### Preloader Screen
- Animated scissors
- Loading progress indication
- Opening transition to content

### Acknowledgment of Country
- Respectful Indigenous recognition with flags
- Cultural acknowledgment before main content

### Loading Screen
- Vanta Birds Background - ReactBits galaxy background
- Interactive Lanyard - 3D ticket that falls and becomes clickable

### Tabs
- **Gallery Tab** - Historical photo journey through campus locations (1975-present)
- **Teachers Tab** - Vintage polaroid-style photo carousel with aging effects and a list of teachers
- **Awards Tab** - Award winners polaroid-style photo carousel and list of award winners
- **Refreshments Tab** - Event menu presentation with beverages section
- **Entertainment Tab** - Event details
- **Movie Tab** - Youtube video to be released after the event - preview content prior to this

Other features
- Timed release of tabs and counter to count down to next section release


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
│   │   ├── loading-screen.tsx
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
│   
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

