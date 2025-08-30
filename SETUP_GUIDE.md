# Breathship Website Setup Guide

## 🗄️ Database Setup

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings > API
3. Update the API configuration in `src/api/content.ts`:

```typescript
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://your-project.supabase.co' // Your actual Supabase URL
const SUPABASE_ANON_KEY = 'your-supabase-anon-key' // Your actual anon key
```

### 2. Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire contents of `database_schema.sql`
4. Execute the script

This will create:
- ✅ Content table for all editable website content
- ✅ Sessions table for breathwork sessions
- ✅ Blogs table for blog posts
- ✅ Testimonials table for client testimonials
- ✅ Admin users table for authentication
- ✅ Sample data for all sections

## 📝 Form Setup (Getform.io)

### 1. Getform.io Setup
1. Go to [getform.io](https://getform.io) and create an account
2. Create a new form endpoint
3. Copy your form endpoint URL
4. Update the form configuration in `src/api/forms.ts`:

```typescript
// Replace this with your actual getform.io endpoint
const GETFORM_ENDPOINT = 'https://getform.io/f/your-form-endpoint' // Your actual form endpoint
```

### 2. Form Types Available
- ✅ Contact form (general inquiries)
- ✅ Newsletter subscription
- ✅ Session booking form
- ✅ Corporate inquiry form

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Endpoints
Update the following files with your actual credentials:

**`src/api/content.ts`**:
```typescript
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-supabase-anon-key'
```

**`src/api/forms.ts`**:
```typescript
const GETFORM_ENDPOINT = 'https://getform.io/f/your-form-endpoint'
```

### 3. Start Development Server
```bash
npm run dev
```

## 📝 Admin Panel Access

### 1. Create Admin User
In your Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (email, password_hash, name, role) 
VALUES ('admin@breathship.com', 'hashed-password', 'Admin User', 'admin');
```

### 2. Access Admin Panel
Navigate to `/admin` in your browser to access the content management system.

## 🎨 Content Management

### What's Editable

#### Hero Section
- Main heading and subtitle
- Call-to-action buttons
- Statistics (clients, experience, rating)
- Trust indicators
- Background image

#### About Sections
- About Me content and image
- About Breathship content
- Section titles and descriptions

#### Sessions
- Session titles and descriptions
- Dates, times, and pricing
- Session types and capacity
- Payment links and images

#### Why Choose Us
- Section title and subtitle
- Feature descriptions
- Call-to-action content

#### Testimonials
- Client names and testimonials
- Profile images
- Ratings and featured status

#### Blogs
- Blog titles and content
- Excerpts and images
- Author information
- Publication status

#### Contact Information
- Email and phone
- Location details
- Contact quotes

#### Footer
- Company description
- Copyright text
- Privacy and terms links

#### Header
- Company name
- Logo alt text

### How to Edit Content

1. **Navigate to Admin Panel**: Go to `/admin` in your browser
2. **Select Section**: Choose the section you want to edit
3. **Edit Content**: Click the "Edit" button next to any content item
4. **Save Changes**: Click "Save" to update the content
5. **Toggle Visibility**: Use the "Active/Inactive" button to show/hide content

### Content Types

- **Text**: Short text fields (headings, buttons, etc.)
- **Textarea**: Long text content (descriptions, testimonials)
- **Image**: Image URLs for backgrounds and profile pictures
- **Number**: Numeric values (prices, statistics)
- **Boolean**: True/false values (active status, featured status)

## 🔧 Technical Details

### Database Structure

#### Content Table
```sql
- id: Primary key
- section: Content section (hero, about_me, etc.)
- field_name: Field identifier
- field_value: Actual content
- field_type: Content type (text, textarea, image, etc.)
- display_order: Sorting order
- is_active: Visibility status
- created_at/updated_at: Timestamps
```

#### Sessions Table
```sql
- id: Primary key
- title: Session title
- description: Session description
- date/time: Session scheduling
- session_type: One-on-One, Group, Corporate, Workshop
- payment_link: Payment URL
- image_link: Session image
- max_participants: Capacity
- price: Session cost
- is_active: Availability status
```

#### Blogs Table
```sql
- id: Primary key
- title: Blog title
- excerpt: Short description
- content: Full blog content (HTML)
- image_link: Featured image
- author: Author name
- is_published: Publication status
- published_at: Publication date
```

#### Testimonials Table
```sql
- id: Primary key
- name: Client name
- text: Testimonial content
- image_link: Profile image
- rating: 1-5 star rating
- is_featured: Featured status
- is_active: Visibility status
```

### API Endpoints

The website uses these API endpoints:

- `GET /api/content` - Get all content
- `PUT /api/content/:id` - Update content item
- `GET /api/sessions` - Get all sessions
- `GET /api/blogs` - Get all blogs
- `GET /api/testimonials` - Get all testimonials

### Form Integration

Forms are handled through getform.io:

- Contact form submissions
- Newsletter subscriptions
- Session booking requests
- Corporate inquiries

### Fallback System

If the API fails, the website falls back to mock data to ensure it always displays content.

## 🎯 Client-Friendly Features

### Zero Technical Knowledge Required
- ✅ Simple text editing interface
- ✅ Visual content organization by sections
- ✅ One-click save functionality
- ✅ Preview of changes in real-time
- ✅ Easy image URL management
- ✅ Toggle content visibility on/off

### Content Organization
- ✅ Grouped by website sections
- ✅ Clear field labels and descriptions
- ✅ Visual indicators for content types
- ✅ Search and filter capabilities
- ✅ Bulk editing options

### User Experience
- ✅ Responsive design for all devices
- ✅ Intuitive navigation
- ✅ Success/error feedback
- ✅ Auto-save functionality
- ✅ Content validation

## 🔒 Security Considerations

### Row Level Security
The database includes RLS policies to protect your data. You may want to customize these based on your authentication setup.

### API Security
- Use hardcoded credentials for development
- Implement proper authentication for admin access
- Validate all input data
- Use HTTPS in production

## 🚀 Deployment

### 1. Build for Production
```bash
npm run build
```

### 2. Deploy to Your Hosting Platform
- Vercel: Connect your GitHub repository
- Netlify: Drag and drop the `dist` folder
- AWS S3: Upload the `dist` folder
- Any static hosting service

### 3. Update Production Credentials
Make sure to update the API credentials in the production build:
- `src/api/content.ts` - Supabase credentials
- `src/api/forms.ts` - Getform.io endpoint

## 📞 Support

If you need help with:
- Database setup
- Content management
- Customization
- Deployment

Contact your developer or refer to the Supabase documentation.

## 🔄 Updates and Maintenance

### Regular Tasks
- ✅ Backup your database regularly
- ✅ Monitor API usage
- ✅ Update content as needed
- ✅ Review and update testimonials
- ✅ Add new blog posts
- ✅ Update session schedules

### Content Strategy
- ✅ Keep testimonials fresh and relevant
- ✅ Update blog content regularly
- ✅ Maintain accurate session information
- ✅ Review and update contact information
- ✅ Refresh hero section content periodically

---

**Note**: This setup provides a complete content management system that allows your client to manage every aspect of the website without any technical knowledge. All content is stored in a secure database and can be updated in real-time. Forms are handled through getform.io for reliable form submissions.
