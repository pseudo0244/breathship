# Breathship - Breathwork Website

A modern, responsive website for breathwork services built with React, TypeScript, and Tailwind CSS. The website integrates with Google Sheets for easy content management.

## 🚀 Features

- **Google Sheets Integration**: All content is managed through Google Sheets for easy updates
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Content Management**: Three Google Sheets for managing different types of content:
  - **Content Management**: Website text, images, and general content
  - **Sessions Management**: Breathwork sessions with booking links
  - **Blogs Management**: Blog posts and articles
- **Real-time Updates**: Changes in Google Sheets are reflected on the website
- **Booking Integration**: Direct links to booking platforms for sessions
- **Contact Forms**: Integrated contact and corporate inquiry forms

## 📊 Google Sheets Setup

### 1. Content Management Sheet
**Sheet ID**: `1SVk5WjWwiEVa00JbwpjEih7pSJPNrYhWHT7M6wYdN8g`

**Columns**:
- `Field Name` - The content field identifier
- `Section` - Content section (hero, about_me, etc.)
- `Value` - The actual content text
- `Type` - Content type (text, textarea, image)

### 2. Sessions Management Sheet
**Sheet ID**: `15sMEHT9g7GF3HFuBEyeNqs6nrXjLBtwjpLmdo8fVCuA`

**Columns**:
- `Title` - Session title
- `Description` - Session description
- `Duration` - Session duration (e.g., "60 minutes")
- `Price` - Session price (e.g., "$75")
- `Image Link` - Session image URL
- `Session Tag` - Session category (Beginner, Advanced, Corporate)
- `Payment Link` - Booking/payment link
- `Is Active` - Whether session is active (TRUE/FALSE)

### 3. Blogs Management Sheet
**Sheet ID**: `1IcvwfS4QEV_kU22BKCOY6OEH6NRvJ0RFum2XbiJ3W8Y`

**Columns**:
- `Title` - Blog post title
- `Excerpt` - Short description
- `Content` - Full blog content (HTML format)
- `Image Link` - Blog image URL
- `Is Published` - Whether blog is published (TRUE/FALSE)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Sheets**
   - Make sure all three Google Sheets are set to "Anyone with the link can view"
   - The sheet IDs are already configured in `src/services/googleSheets.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Content Management

### Updating Website Content
1. Open the **Content Management** Google Sheet
2. Edit any field in the "Value" column
3. Changes will be reflected on the website immediately

### Managing Sessions
1. Open the **Sessions Management** Google Sheet
2. Add new sessions or edit existing ones
3. Make sure to include:
   - Valid image URLs
   - Working payment/booking links
   - Set "Is Active" to TRUE for visible sessions

### Managing Blogs
1. Open the **Blogs Management** Google Sheet
2. Add new blog posts or edit existing ones
3. Use HTML formatting in the "Content" column
4. Set "Is Published" to TRUE to make blogs visible

## 🎨 Customization

### Styling
- The website uses Tailwind CSS for styling
- Brand colors are defined in `tailwind.config.js`
- Custom fonts are configured for a premium look

### Components
- All components are in `src/components/`
- Layout components in `src/components/Layout/`
- Page-specific components in `src/components/Home/`

## 📱 Pages

- **Home** (`/`) - Landing page with hero, about, sessions, and testimonials
- **Sessions** (`/sessions`) - All available breathwork sessions
- **Blogs** (`/blogs`) - Blog posts and articles
- **Blog Detail** (`/blogs/:id`) - Individual blog post pages
- **Contact** (`/contact`) - Contact form and information
- **Corporate** (`/corporate`) - Corporate wellness programs

## 🔧 Technical Details

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Data**: Google Sheets API (CSV export)

### File Structure
```
src/
├── components/          # React components
│   ├── Home/           # Home page components
│   ├── Layout/         # Header, Footer, etc.
│   └── UI/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # Google Sheets integration
└── types/              # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the React app
3. Deploy with default settings

### Other Platforms
The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 📞 Support

For questions or support:
- Check the Google Sheets for content management
- Ensure all sheet permissions are set to "Anyone can view"
- Verify that image URLs are accessible

## 📄 License

This project is licensed under the MIT License.
