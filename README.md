# 🎓 SFU Marketplace

The exclusive marketplace for Simon Fraser University students. Buy, sell, and trade with confidence within the SFU community.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with SFU email verification
- **📱 Modern UI/UX**: Premium design with GSAP animations and smooth transitions
- **🛍️ Marketplace Features**:
  - Browse listings with advanced filters
  - Create, edit, and delete your own listings
  - Category-based organization
  - Real-time search functionality
- **🎨 SFU Branding**: Official SFU color palette (Red #CC0633, Dark Red #A6192E)
- **📊 Dashboard**: Comprehensive user dashboard with stats and listing management
- **💬 Contact Support**: Built-in contact form for user assistance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account with database configured
- npm or yarn package manager

### Database Setup

Ensure your Supabase database has the following tables:

**accounts table:**
```sql
CREATE TABLE accounts (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**posts table:**
```sql
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES accounts(user_id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Sfu-Market
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_JWT_SECRET=your_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
Sfu-Market/
├── app/
│   ├── api/                 # Backend API routes
│   │   ├── account/         # Account management endpoints
│   │   │   └── login/       # Login endpoint
│   │   └── posts/           # Posts CRUD endpoints
│   │       └── [id]/        # Update/delete specific post
│   ├── components/          # Reusable React components
│   │   ├── Navbar.js        # Navigation bar
│   │   └── Footer.js        # Footer component
│   ├── contact/             # Contact page
│   ├── dashboard/           # User dashboard
│   ├── login/               # Login/signup page
│   ├── page.js              # Homepage/landing page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── lib/
│   ├── auth.js              # JWT authentication utilities
│   ├── api.js               # API helper functions
│   ├── edgeCrypo.js         # Cryptography utilities
│   └── supabaseAdmin.js     # Supabase admin client
└── public/                  # Static assets
```

## 🎨 Color Palette

- **Primary Red**: `#CC0633` - Main brand color
- **Dark Red**: `#A6192E` - Accent and hover states
- **Dark Grey**: `#54585A` - Supporting elements
- **Black**: `#000000` - Background and text

## 🔑 Key Pages

### Homepage (`/`)
- Long-form landing page with multiple sections
- GSAP-powered scroll animations
- Feature highlights and statistics
- Call-to-action buttons

### Login/Signup (`/login`)
- Combined login and signup interface
- SFU email validation (@sfu.ca required)
- Backend integration with JWT token generation
- Smooth toggle animations

### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- View all marketplace listings
- Create new listings with category selection
- Edit and delete your own listings
- Advanced filtering and search
- Contact sellers for purchases

### Contact (`/contact`)
- Support request form
- Contact information display
- FAQ section
- Accessible from all pages

## 🔐 Authentication Flow

1. User signs up with SFU email
2. Password is hashed using SHA-256
3. JWT token is generated and stored in cookies
4. Token is verified on protected routes
5. User data is accessible throughout the app

## 🛠️ Technologies

- **Framework**: Next.js 15.5.4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT (jose)
- **Animations**: GSAP
- **Styling**: Tailwind CSS 4
- **Cookie Management**: js-cookie

## 📝 API Endpoints

### Account Management
- `POST /api/account` - Create new account
- `POST /api/account/login` - Login with credentials
- `PATCH /api/account/[id]` - Update account
- `DELETE /api/account/[id]` - Delete account

### Posts Management
- `GET /api/posts` - Get all posts (with optional filters)
- `POST /api/posts` - Create new post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
npm run build
npm start
```

## 📄 License

This project is built for Simon Fraser University students.

## 🤝 Support

For issues or questions, visit the Contact page or reach out to support@sfumarket.ca

---

Made with ❤️ for the SFU Community
