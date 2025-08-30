# Google Sheets Setup Guide

This guide will help you set up the three Google Sheets needed for the Breathship website.

## 📊 Required Google Sheets

### 1. Content Management Sheet

**Purpose**: Manage all website text, images, and general content

**Setup**:

1. Create a new Google Sheet
2. Name it "Breathship - Content Management"
3. Set sharing to "Anyone with the link can view"
4. Copy the sheet ID from the URL (the long string between /d/ and /edit)

**Columns** (add these as headers in row 1):

- `Field Name` - The content field identifier
- `Section` - Content section (hero, about_me, etc.)
- `Value` - The actual content text
- `Type` - Content type (text, textarea, image)

**Sample Data**:

```
Field Name | Section | Value | Type
hero_text | hero | Breathe. Heal. Transform. | text
hero_subtitle | hero | Discover the transformative power of conscious breathing... | textarea
hero_background_image | hero | https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop | image
about_me_title | about_me | About Me | text
about_me_description | about_me | I am a certified breathwork facilitator... | textarea
```

### 2. Sessions Management Sheet

**Purpose**: Manage breathwork sessions with booking links

**Setup**:

1. Create a new Google Sheet
2. Name it "Breathship - Sessions Management"
3. Set sharing to "Anyone with the link can view"
4. Copy the sheet ID from the URL

**Columns** (add these as headers in row 1):

- `Title` - Session title
- `Description` - Session description
- `Duration` - Session duration (e.g., "60 minutes")
- `Price` - Session price (e.g., "$75")
- `Image Link` - Session image URL
- `Session Tag` - Session category (Beginner, Advanced, Corporate)
- `Payment Link` - Booking/payment link
- `Date` - Session date (e.g., "2024-02-15")
- `Time` - Session time (e.g., "10:00 AM")
- `Is Active` - Whether session is active (TRUE/FALSE)

**Sample Data**:

```
Title | Description | Duration | Price | Image Link | Session Tag | Payment Link | Date | Time | Is Active
Introduction to Breathwork | Perfect for beginners... | 60 minutes | $75 | https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop | Beginner | https://calendly.com/breathship/intro-session | 2024-02-15 | 10:00 AM | TRUE
Deep Healing Session | An intensive breathwork session... | 90 minutes | $120 | https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop | Advanced | https://calendly.com/breathship/deep-healing | 2024-02-20 | 2:00 PM | TRUE
```

### 3. Blogs Management Sheet

**Purpose**: Manage blog posts and articles

**Setup**:

1. Create a new Google Sheet
2. Name it "Breathship - Blogs Management"
3. Set sharing to "Anyone with the link can view"
4. Copy the sheet ID from the URL

**Columns** (add these as headers in row 1):

- `Title` - Blog post title
- `Excerpt` - Short description
- `Content` - Full blog content (HTML format)
- `Image Link` - Blog image URL
- `Is Published` - Whether blog is published (TRUE/FALSE)

**Sample Data**:

```
Title | Excerpt | Content | Image Link | Is Published
The Science Behind Breathwork | Discover the fascinating research... | <h2>The Science Behind Breathwork</h2><p>Breathwork isn't just a spiritual practice...</p> | https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop | TRUE
5 Simple Breathing Techniques | Learn five powerful breathing techniques... | <h2>5 Simple Breathing Techniques</h2><p>Stress is an inevitable part...</p> | https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop | TRUE
```

## 🔧 Configuration

### Update Sheet IDs

Once you have created all three sheets, update the sheet IDs in `src/services/googleSheets.ts`:

```typescript
const CONTENT_SHEET_ID = "YOUR_CONTENT_SHEET_ID";
const SESSIONS_SHEET_ID = "YOUR_SESSIONS_SHEET_ID";
const BLOGS_SHEET_ID = "YOUR_BLOGS_SHEET_ID";
```

### Sheet Permissions

Make sure all sheets are set to:

- **Sharing**: "Anyone with the link can view"
- **Editor access**: Only you (for security)
- **Viewer access**: Anyone with the link

## 📝 Content Guidelines

### Images

- Use high-quality images (minimum 800x600px)
- Recommended sources: Unsplash, Cloudinary, or direct URLs
- Make sure images are publicly accessible

### HTML Content (Blogs)

- Use simple HTML tags: `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`
- Avoid complex CSS or JavaScript
- Test your HTML in a simple editor first

### Links

- Use full URLs (https://...)
- Test all payment/booking links before publishing
- Make sure links open in new tabs when appropriate

## 🚀 Testing

### Verify Setup

1. Start the development server: `npm run dev`
2. Check the browser console for any errors
3. Verify that content loads from your sheets
4. Test updating content in sheets and refreshing the website

### Common Issues

- **Content not loading**: Check sheet permissions and IDs
- **Images not showing**: Verify image URLs are accessible
- **Links not working**: Test URLs in browser
- **Formatting issues**: Check HTML syntax in blog content

## 📞 Support

If you encounter issues:

1. Check that all sheet IDs are correct
2. Verify sheet permissions are set correctly
3. Test image URLs in browser
4. Check browser console for errors
5. Ensure all required columns are present

## 🎯 Best Practices

### Content Management

- Keep content concise and engaging
- Use consistent formatting across sheets
- Regular backups of your sheets
- Test changes before publishing

### Performance

- Optimize images for web (compress if needed)
- Keep blog content reasonable in length
- Use descriptive image alt text
- Monitor website loading speed

### Security

- Don't share edit access to sheets publicly
- Use secure payment links
- Regular review of published content
- Backup important data
