# Booking Calendar - Setup Guide

## Overview

This is a Next.js booking calendar application with Google authentication, admin functionality, and MongoDB integration. The application allows users to book appointments and provides admin tools for managing events.

## Features

- **Google Authentication** via NextAuth.js
- **Booking System** with calendar interface
- **Admin Dashboard** for managing events and users
- **MongoDB Integration** via Prisma
- **Responsive Design** with Tailwind CSS

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database (local or cloud)
- Google OAuth credentials

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment Setup:**
   Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```
   
   Then configure your environment variables in `.env.local`:

   ```env
   # Database
   DATABASE_URL="your-mongodb-connection-string"
   
   # NextAuth Configuration
   AUTH_SECRET="your-secure-secret-key"
   AUTH_GOOGLE_ID="your-google-client-id"
   AUTH_GOOGLE_SECRET="your-google-client-secret"
   
   # Application URL
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Setup:**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

4. **Start Development Server:**
   ```bash
   pnpm dev
   ```

   The application will be available at http://localhost:3000

## Development Notes

- The application gracefully handles missing database connections during development
- Pages requiring authentication are protected by middleware
- Admin functionality requires setting up admin users in the database
- The build process works even without a database connection (with warnings)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm typecheck` - Run TypeScript type checking

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utility functions and database config
- `/prisma` - Database schema and migrations
- `auth.ts` - NextAuth configuration
- `config.ts` - Application configuration

## Authentication Setup

To set up Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to your `.env.local`

## Database Schema

The application uses the following main models:
- `Event` - Confirmed booking events
- `RequestedEvent` - Pending booking requests  
- `Admin` - Admin user management
- `CardInformation` - Homepage service cards
- `CalendarLink` - Google Calendar integration links

## Troubleshooting

**Build fails with database errors:**
- This is expected without a database connection
- The application includes graceful error handling
- Pages will render with empty data when database is unavailable

**Authentication not working:**
- Verify Google OAuth credentials are correct
- Check that redirect URIs match in Google Console
- Ensure AUTH_SECRET is set to a secure random string

**Linting errors:**
- Run `pnpm lint` to check for issues
- Most configuration file issues are already handled