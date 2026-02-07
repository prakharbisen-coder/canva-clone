# 🎨 The Canvas - Canva Clone

A modern, feature-rich design platform built with Next.js 14, TypeScript, and Fabric.js. Create stunning graphics, social media posts, presentations, and more with an intuitive drag-and-drop editor.

![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Visual Design Editor** - Powerful canvas-based editor powered by Fabric.js
- **Pre-built Templates** - 12+ professional templates for various use cases
- **Shape Tools** - 11 different shapes (circle, rectangle, triangle, star, heart, arrow, hexagon, pentagon, and more)
- **Text Editing** - Rich text with custom fonts, sizes, and styling
- **Image Upload** - Upload and manipulate images
- **Layers Management** - Organize and reorder design elements
- **Color Picker** - Advanced color selection with presets
- **Filters & Effects** - Apply filters to images and objects

### 🔐 Authentication & User Management
- **NextAuth v5** - Secure authentication with credentials
- **User Sessions** - Database-backed session management
- **Protected Routes** - Middleware-based route protection

### 💾 Data Management
- **Real-time Saving** - Auto-save designs as you work
- **Project Management** - Create, duplicate, and delete projects
- **Template System** - Free and Pro templates
- **PostgreSQL Database** - Reliable data storage with Neon

### 🎨 Design Capabilities
- **Infinite Canvas** - Pan and zoom for large designs
- **Undo/Redo** - Full history management
- **Copy/Paste** - Duplicate elements easily
- **Alignment Tools** - Snap to grid and align objects
- **Export Options** - Download as PNG, JPG, or SVG
- **Responsive Sizes** - Pre-configured sizes for social media platforms

### 💳 Premium Features
- **Stripe Integration** - Pro subscription management
- **AI Image Generation** - Generate images with Replicate AI
- **Background Removal** - AI-powered background removal
- **Unsplash Integration** - Access millions of stock photos

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.4 (App Router, Server Components)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Canvas Engine**: Fabric.js 5.3.0
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI, Lucide Icons
- **State Management**: Zustand, TanStack Query

### Backend
- **API Framework**: Hono 4.4.12
- **Database**: Neon PostgreSQL (Serverless)
- **ORM**: Drizzle ORM 0.31.4
- **Authentication**: NextAuth v5
- **Validation**: Zod

### Third-Party Services
- **Payments**: Stripe
- **AI**: Replicate
- **Images**: Unsplash
- **File Upload**: UploadThing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Neon recommended)
- npm/yarn/pnpm/bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/canva-clone.git
cd canva-clone
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Authentication
AUTH_SECRET="your-auth-secret-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Optional: AI Features
REPLICATE_API_TOKEN="your-replicate-token"

# Optional: Stock Photos
UNSPLASH_ACCESS_KEY="your-unsplash-key"

# Optional: File Upload
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Optional: Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# Optional: OAuth
AUTH_GITHUB_ID="your-github-oauth-id"
AUTH_GITHUB_SECRET="your-github-oauth-secret"
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"
```

4. **Generate AUTH_SECRET**
```bash
openssl rand -base64 32
```

5. **Set up the database**

Run database migrations:
```bash
npm run db:generate
npm run db:migrate
```

Or use the custom migration script:
```bash
node migrate.js
```

6. **Seed templates (optional)**
```bash
node seed-templates.js
```

7. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
canva-clone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── editor/            # Design editor
│   ├── components/            # Reusable components
│   │   └── ui/               # UI primitives
│   ├── db/                    # Database schema
│   ├── features/              # Feature modules
│   │   ├── ai/               # AI integration
│   │   ├── auth/             # Authentication
│   │   ├── editor/           # Editor logic
│   │   ├── images/           # Image handling
│   │   ├── projects/         # Project management
│   │   └── subscriptions/    # Payment logic
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities
├── public/                    # Static assets
├── drizzle/                   # Database migrations
└── .env.local                # Environment variables
```

## 🗄️ Database Schema

The application uses 7 main tables:
- **users** - User accounts
- **accounts** - OAuth accounts
- **sessions** - User sessions
- **authenticators** - 2FA authenticators
- **verificationTokens** - Email verification
- **projects** - User designs and templates
- **subscriptions** - Pro subscriptions

## 🎨 Available Templates

The application includes 12 pre-built templates:

**Free Templates:**
1. Flash Sale (900x1200)
2. Travel Adventure (1080x1080)
3. Social Media Post (1080x1080)
4. Instagram Story (1080x1920)
5. YouTube Thumbnail (1280x720)
6. Presentation Slide (1920x1080)
7. Twitter Post (1200x675)

**Pro Templates:**
1. Car Sale Promo (1200x630)
2. Coming Soon (1080x1350)
3. Business Card (1050x600)
4. Facebook Cover (1640x924)
5. Email Header (1200x400)

## 🔧 Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio

# Custom Scripts
node migrate.js           # Run custom migration
node seed-templates.js    # Seed templates
node verify-templates.js  # Verify template data
```

## 🌟 Key Features Walkthrough

### Design Editor
1. **Canvas Manipulation** - Pan, zoom, and navigate large designs
2. **Object Editing** - Resize, rotate, and transform any element
3. **Layering** - Bring forward, send backward with layer controls
4. **Styling** - Change colors, strokes, opacity, and more
5. **Text Tools** - Add text with custom fonts and formatting
6. **Image Tools** - Upload, crop, and apply filters to images

### Shape Tools (11 Shapes)
- Circle, Rectangle (rounded & sharp)
- Triangle (upright & inverted)
- Diamond, Star, Heart
- Arrow, Hexagon, Pentagon

### Project Management
- Create new designs from scratch or templates
- Duplicate existing projects
- Auto-save functionality
- Project history and versioning

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get session

### Projects
- `GET /api/projects` - List user projects
- `GET /api/projects/templates` - List templates
- `GET /api/projects/:id` - Get project
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/duplicate` - Duplicate project

### Users
- `GET /api/users/current` - Get current user

### Subscriptions
- `GET /api/subscriptions/current` - Get subscription status

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Fabric.js](http://fabricjs.com/) - Canvas manipulation library
- [Next.js](https://nextjs.org/) - React framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL

---

**Built with ❤️ using Next.js, TypeScript, and Fabric.js**
