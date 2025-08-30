# Breathship - Breathwork Website

A modern, responsive website for breathwork services with a comprehensive admin panel for content management.

## 🚀 Features

- **Modern React + TypeScript** - Built with Vite for fast development
- **Responsive Design** - Works perfectly on all devices
- **Admin Panel** - Full CRUD operations for content management
- **Database Integration** - Supabase backend for persistent data
- **Image Management** - Easy background and content image updates
- **Form Handling** - Contact forms with Getform.io integration
- **Real-time Updates** - Changes appear immediately across the site

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Getform.io account (for contact forms)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd breathship
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

1. Create a new project in [Supabase](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the entire contents of `database_complete.sql`
4. Execute the SQL script
5. Note down your Supabase URL and anon key

**The script handles everything automatically:**
- ✅ **Enum constraints** - Automatically converts any existing enum constraints
- ✅ **Existing objects** - Uses `DROP IF EXISTS` to handle conflicts
- ✅ **Complete setup** - Creates all tables, indexes, triggers, and policies
- ✅ **Default data** - Inserts sample content, blogs, sessions, and testimonials
- ✅ **Verification** - Shows confirmation and record counts

**For complete reset (optional):**
- Uncomment the reset section at the top of `database_complete.sql`
- This will completely clear the database before setup

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GETFORM_ENDPOINT=your_getform_endpoint
```

### 5. Update API Configuration

Edit `src/config/api.ts` with your actual credentials:

```typescript
export const API_CONFIG = {
  SUPABASE: {
    URL: 'your_supabase_url',
    ANON_KEY: 'your_supabase_anon_key',
  },
  GETFORM: {
    ENDPOINT: 'your_getform_endpoint',
  },
  APP: {
    NAME: 'Breathship',
    DESCRIPTION: 'Transform your life through conscious breathing',
    VERSION: '1.0.0',
  }
}
```

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

The application uses the following tables:

- **content** - Website content management (hero, about, footer, etc.)
- **blogs** - Blog posts with rich content
- **sessions** - Breathwork sessions and workshops
- **testimonials** - Client testimonials and reviews

All tables include:
- Row Level Security (RLS) for data protection
- Automatic timestamps (created_at, updated_at)
- Proper indexing for performance
- Default data for immediate use

## 🔐 Admin Access

- **URL**: `/myadmin`
- **Password**: `1234`

### Admin Features:
- **Content Management** - Edit all website text and images
- **Blog Management** - Create, edit, delete blog posts
- **Session Management** - Manage breathwork sessions
- **Testimonial Management** - Handle client testimonials
- **Image Management** - Update background and content images

## 🖼️ Image Management

### Supported Image Sources:
- **Unsplash**: `https://images.unsplash.com/photo-...`
- **Cloudinary**: `https://res.cloudinary.com/...`
- **Direct URLs**: Any direct image URL

### How to Update Images:
1. Go to `/myadmin` and login
2. Navigate to "Home Content" tab
3. Find image fields (hero_background_image, about_me_image)
4. Paste the image URL
5. Click Save - changes appear immediately

## 📝 Content Management

### Available Content Sections:
- **Hero Section** - Main landing page content
- **About Me** - Personal information and image
- **About Breathship** - Service description
- **Why Choose Us** - Features and benefits
- **Header/Footer** - Navigation and contact info
- **Contact** - Contact form and information
- **Corporate** - Corporate wellness programs

### How to Edit Content:
1. Access admin panel at `/myadmin`
2. Click on "Home Content" tab
3. Find the field you want to edit
4. Click "Edit" button
5. Make your changes
6. Click "Save" - changes are live immediately

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `vercel.json` file is already configured for proper routing.

### Environment Variables for Production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GETFORM_ENDPOINT`

## 🔧 Development

### Available Scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure:
```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── api/           # API functions
├── config/        # Configuration files
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design System** - Brand colors and typography
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Framer Motion for interactions

## 📱 Features

### Public Pages:
- **Home** - Landing page with hero section
- **Sessions** - Available breathwork sessions
- **Blogs** - Blog posts and articles
- **Contact** - Contact form and information
- **Corporate** - Corporate wellness programs

### Admin Features:
- **Real-time Updates** - Changes appear immediately
- **Image Previews** - See images before saving
- **Form Validation** - Proper error handling
- **Bulk Operations** - Export/import content
- **Responsive Admin** - Works on all devices

## 🔒 Security

- **Row Level Security** - Database-level security
- **Admin Authentication** - Simple password protection
- **Input Validation** - Form validation and sanitization
- **CORS Protection** - Proper API security

## 📊 Performance

- **Vite Build** - Fast development and optimized builds
- **Image Optimization** - Responsive images and lazy loading
- **Code Splitting** - Automatic route-based code splitting
- **Caching** - Proper cache headers and strategies

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify Supabase URL and key in config
   - Check if database schema is properly set up

2. **Database Schema Errors**
   - The `database_complete.sql` script handles all common errors automatically
   - For complete reset, uncomment the reset section at the top of the script
   - Make sure you're using the latest version of the SQL script

3. **Admin Panel Not Loading**
   - Ensure vercel.json is present for routing
   - Check browser console for errors

4. **Images Not Loading**
   - Verify image URLs are accessible
   - Check CORS settings for external images

5. **Form Submission Issues**
   - Verify Getform.io endpoint is correct
   - Check network tab for API errors

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify all environment variables are set
4. Ensure database schema is properly executed

## 📄 License

This project is licensed under the MIT License.

---

**Breathship** - Transform your life through conscious breathing
