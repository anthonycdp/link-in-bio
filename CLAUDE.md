# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Link-in-Bio application for a medical professional (Dr. Larissa Freitas) built with React, TypeScript, and Vite. The application showcases clinic information and provides easy appointment booking through WhatsApp integration.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (builds client and server)
npm run build

# Start production server
npm start

# Type checking
npm run check

# Database migrations (if using database features)
npm run db:push
```

## Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state
- **Styling**: TailwindCSS with custom Serenity theme colors
- **Components**: shadcn/ui component library with custom UI components
- **Testing**: Vitest with React Testing Library

### Project Structure

```
link-in-bio/
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # Reusable components (Header, ClinicSection, etc.)
│   │   ├── pages/       # Page components (home, not-found)
│   │   ├── lib/         # Utilities and configurations
│   │   └── App.tsx      # Main application entry with routing
│   └── index.html       # HTML entry point
├── shared/              # Shared code between client and server
└── package.json         # Main dependencies and scripts
```

### Key Components

1. **App.tsx**: Main application wrapper with QueryClient, routing, and providers
2. **Home Page**: Landing page displaying doctor information and clinic sections
3. **Header Component**: Doctor profile with photo and specialty information
4. **ClinicSection Component**: Reusable clinic card with:
   - WhatsApp appointment booking integration
   - Google Maps location viewing
   - Transportation options modal (Uber, 99, Google Maps)

### Styling System

The application uses a custom "Serenity" color theme:
- Primary colors: `serenity-rose`, `serenity-wine`
- Background: `serenity-bg`
- Text colors: `serenity-text`, `serenity-text-secondary`

### Path Aliases

- `@/` → `./client/src/`
- `@shared/` → `./shared/`
- `@assets/` → Assets imported through Vite

## Testing

Run tests with:
```bash
npm test
```

Tests are located alongside components with `.test.tsx` extension using Vitest and React Testing Library.

## Important Patterns

1. **Component Props**: All components use TypeScript interfaces for type safety
2. **Responsive Design**: Mobile-first approach with `sm:` breakpoints for larger screens
3. **Device Detection**: Custom utility in ClinicSection for mobile/desktop specific behaviors
4. **WhatsApp Integration**: Universal approach using `wa.me` URLs that work across all devices
5. **Data Attributes**: Components include `data-testid` for testing

## Development Notes

- The project appears to be transitioning from a server setup (references in package.json) but currently functions as a static frontend
- No active backend/server code is present despite server references in configuration
- Database configuration exists (Drizzle ORM) but is not currently utilized
- The application is optimized for mobile viewing with responsive breakpoints