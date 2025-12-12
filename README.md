# Forest4Life - Forest Restoration Website

A modern, content-managed website for Forest4Life, an organization dedicated to restoring degraded land in Rwanda through reforestation, agroforestry, and sustainable land management practices.

## 🌳 Overview

Forest4Life is a Next.js-based website that showcases the organization's mission, projects, programs, and impact in forest restoration and community empowerment across Rwanda. The site features a headless CMS powered by Keystatic, allowing non-technical users to manage content through an intuitive admin interface.

## ✨ Features

### Content Management
- **Keystatic CMS Integration**: Full-featured content management system accessible at `/keystatic`
- **Markdoc Support**: Rich text content with Markdoc for flexible formatting
- **Image Management**: Built-in image upload and management system
- **Relationship Fields**: Link content across collections (e.g., projects to partners, blogs to authors)

### Pages & Sections
- **Homepage**: Hero section, mission statement, featured projects and programs
- **About Page**: Organization story, mission, values, and partner showcase
- **Projects**: Comprehensive project listings with search, filtering, and detailed project pages
- **Programs/Services**: Service listings with detailed program information
- **Blog**: Blog post listings and individual blog post pages with author attribution
- **Contact**: Contact information and contact form

### Technical Features
- **Next.js 16**: Latest Next.js with App Router and Server Components
- **React 19**: Modern React with server-side rendering
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **SEO Optimized**: Meta tags, Open Graph images, and structured content
- **Performance**: Optimized images, code splitting, and static generation

### Design System
- **Custom Color Palette**: Forest4Life brand colors (HSL-based)
- **Component Library**: Reusable UI components built with Radix UI
- **Global Padding System**: Centralized container padding via CSS variables
- **Dark Mode Ready**: CSS variables support for future dark mode implementation

## 🛠️ Tech Stack

### Core
- **Next.js 16.0.10**: React framework with App Router
- **React 19.2.3**: UI library
- **TypeScript 5.5.3**: Type-safe JavaScript

### Content Management
- **Keystatic 0.5.48**: Headless CMS
- **Markdoc 0.4.0**: Rich text content authoring

### Styling
- **Tailwind CSS 3.4.16**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

### Additional Libraries
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class utilities
- **react-hook-form**: Form handling
- **sonner**: Toast notifications

## 📁 Project Structure

```
forest4life/
├── app/                      # Next.js App Router pages and components
│   ├── about/               # About page
│   ├── blog/                # Blog listing and detail pages
│   ├── contact/             # Contact page
│   ├── project/             # Project listing and detail pages
│   ├── services/            # Programs/Services pages
│   ├── keystatic/           # Keystatic admin UI
│   ├── api/                 # API routes
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components (Radix UI)
│   │   ├── Header.tsx       # Site header
│   │   ├── Footer.tsx        # Site footer
│   │   └── ...              # Other components
│   ├── globals.css          # Global styles and CSS variables
│   └── layout.tsx           # Root layout
├── content/                  # Keystatic content files (tracked in Git)
│   ├── about/               # About page content
│   ├── authors/             # Author profiles
│   ├── blogs/               # Blog posts
│   ├── home/                # Homepage content
│   ├── partners/            # Partner information
│   ├── projects/            # Project data
│   ├── services/            # Program/service data
│   └── settings/            # Site settings
├── public/                  # Static assets
│   └── images/              # Images organized by content type
├── keystatic.config.ts      # Keystatic configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-Creative-ltd/forest4life-new.git
   cd forest4life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if using GitHub storage)
   Create a `.env.local` file in the root directory:
   ```env
   KEYSTATIC_GITHUB_CLIENT_ID=your_client_id
   KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
   KEYSTATIC_SECRET=your_secret
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=your_app_slug
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin UI: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

## 📝 Content Management

### Accessing the Admin UI

Navigate to `/keystatic` in your browser to access the Keystatic admin interface. The admin UI allows you to:

- Edit homepage content
- Manage projects and programs
- Create and edit blog posts
- Add partners and authors
- Update site settings
- Upload and manage images

### Content Collections

#### Projects
- **Fields**: Title, summary, status, location, dates, impact metrics, partners, activities, timeline
- **Rich Content**: Background, objectives, methodology, findings, conclusions (Markdoc)
- **Relationships**: Linked partners, contact person (author)

#### Programs/Services
- **Fields**: Title, description, beneficiaries, goals, cover image, icon
- **Rich Content**: Full description and goals (Markdoc)
- **Media**: Cover images, icons, gallery images

#### Blogs
- **Fields**: Title, excerpt, author, category, tags, featured image
- **Rich Content**: Full blog content (Markdoc)
- **Relationships**: Author relationship

#### Partners
- **Fields**: Name, description, role, scope, contact info, social links
- **Media**: Logo and cover images
- **Status**: Active/inactive toggle

### Storage Options

Currently configured for **local storage** (files in `content/` directory). To switch to GitHub storage:

1. Update `keystatic.config.ts`:
   ```typescript
   storage: {
     kind: 'github',
     repo: {
       owner: 'YOUR_GITHUB_USERNAME',
       name: 'YOUR_REPO_NAME',
     },
   }
   ```

2. Set up GitHub App (Keystatic will guide you on first admin access)
3. Configure environment variables

## 🎨 Customization

### Colors

The design system uses HSL-based CSS variables defined in `app/globals.css`. The primary green color is `hsl(158, 91%, 20%)`.

To update colors, modify the CSS variables in `:root`:
```css
--primary: 158 91% 20%;
--muted-foreground: 158 91% 20%;
```

### Padding

Global container padding is controlled via CSS variables:
```css
--container-padding-mobile: 1rem;
--container-padding-tablet: 1.5rem;
--container-padding-large: 2.5rem;
--container-padding-xl: 6rem;
```

Update these in `app/globals.css` to adjust spacing site-wide.

### Components

Reusable components are in `app/components/`:
- `Header.tsx` / `HeaderWrapper.tsx`: Site navigation
- `Footer.tsx` / `FooterWrapper.tsx`: Site footer with partners
- `Hero.tsx`: Hero section component
- `OurProjects.tsx`: Project showcase
- `OurServices.tsx`: Programs showcase
- `WhoWeAre.tsx`: Mission and values section

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server

### Code Style

- **TypeScript**: Strict null checks enabled
- **Components**: Server Components by default, Client Components marked with `"use client"`
- **Styling**: Tailwind CSS utility classes
- **Imports**: Absolute imports using `@/` alias

### Key Patterns

- **Server Components**: Used for data fetching and static content
- **Client Components**: Used for interactivity (search, filters, forms)
- **Wrapper Components**: Server components that fetch data and pass to client components
- **Type Safety**: Full TypeScript coverage with proper types for Keystatic data

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Recommended Platforms

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Good Next.js support
- **Self-hosted**: Any Node.js hosting with Next.js support

### Environment Variables

For production, ensure all environment variables are set:
- Keystatic GitHub credentials (if using GitHub storage)
- Any API keys or secrets

## 📊 Content Collections Summary

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **Projects** | Showcase restoration projects | Status, location, impact metrics, partners |
| **Services** | Display programs/services | Beneficiaries, goals, gallery |
| **Blogs** | News and articles | Author, category, tags, content |
| **Partners** | Partner organizations | Logo, role, scope, contact info |
| **Authors** | Blog authors | Name, bio, avatar |
| **Settings** | Site configuration | Site name, logo, footer, SEO |
| **Home** | Homepage content | Hero, mission, featured items |
| **About** | About page content | Story, mission, partners list |

## 🔒 Security

- Environment variables for sensitive data
- Server-side data fetching
- Input validation through Keystatic schemas
- No client-side API keys exposed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Forest4Life**
- **Address**: Kayovu, Bugesera, Rwanda
- **Phone**: +250789943032
- **Email**: murenzidavid01@gmail.com
- **Website**: [Coming Soon]

### Social Media
- **Facebook**: [facebook.com](https://facebook.com/)
- **Twitter/X**: [@Forest4lifec](https://x.com/Forest4lifec)
- **LinkedIn**: [linkedin.com/company/forest4life](https://www.linkedin.com/company/forest4life/)
- **Instagram**: [@forest4life](https://instagram.com/forest4life)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Content management by [Keystatic](https://keystatic.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Restoring Rwanda's Forests, Empowering Communities for a Sustainable Future** 🌱
