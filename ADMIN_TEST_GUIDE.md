# 🔧 **Admin Panel Test Guide**

## **Database Setup**

### **1. Execute Database Schema**

1. Go to: https://supabase.com/dashboard
2. Select project: `uemamlkocdgqnkedjcou`
3. Open SQL Editor → New Query
4. Copy entire content from `database_schema_final.sql`
5. Paste and click "Run"

### **2. Verify Database Setup**

You should see:

```
Database setup completed successfully!
content_count: 43
sessions_count: 4
blogs_count: 3
testimonials_count: 5
```

## **Admin Panel Access**

### **URL:** `http://localhost:5174/myadmin`

### **Password:** `1234`

## **Test Real-Time Updates**

### **Test 1: Hero Section**

1. **Go to Admin Panel** → `http://localhost:5174/myadmin`
2. **Login** with password `1234`
3. **Click "Home Content"** tab
4. **Find "Hero Section"**
5. **Edit "hero_text"** → Change to "Breathe. Transform. Live."
6. **Click Save**
7. **Open main website** → `http://localhost:5174/`
8. **Verify** → Hero text should show "Breathe. Transform. Live."

### **Test 2: About Section**

1. **In Admin Panel** → Find "About Me Section"
2. **Edit "about_me_title"** → Change to "About Our Journey"
3. **Click Save**
4. **Refresh main website**
5. **Verify** → About section title should show "About Our Journey"

### **Test 3: Footer**

1. **In Admin Panel** → Find "Footer Section"
2. **Edit "contact_email"** → Change to "hello@breathship.com"
3. **Click Save**
4. **Scroll to footer on main website**
5. **Verify** → Email should show "hello@breathship.com"

### **Test 4: Contact Page**

1. **In Admin Panel** → Find "Contact Section"
2. **Edit "contact_title"** → Change to "Contact Us Today"
3. **Click Save**
4. **Go to Contact page** → `http://localhost:5174/contact`
5. **Verify** → Page title should show "Contact Us Today"

### **Test 5: Corporate Page**

1. **In Admin Panel** → Find "Corporate Section"
2. **Edit "corporate_title"** → Change to "Corporate Wellness"
3. **Click Save**
4. **Go to Corporate page** → `http://localhost:5174/corporate`
5. **Verify** → Page title should show "Corporate Wellness"

## **Test All Pages**

### **✅ Home Page** (`/`)

- Hero section content
- About sections
- Why choose us
- Testimonials
- Upcoming sessions
- Blog preview

### **✅ Sessions Page** (`/sessions`)

- Session listings from database
- Session details and booking

### **✅ Blogs Page** (`/blogs`)

- Blog listings from database
- Blog previews

### **✅ Blog Detail Page** (`/blogs/:id`)

- Individual blog content
- Blog metadata

### **✅ Contact Page** (`/contact`)

- Contact form (submits to Getform.io)
- Contact information from database

### **✅ Corporate Page** (`/corporate`)

- Corporate content from database
- Corporate form

## **Expected Behavior**

### **✅ Real-Time Updates**

- Changes in admin panel appear immediately on main website
- No page refresh needed
- All content sections update instantly

### **✅ Form Submissions**

- Contact form submits to Getform.io
- Corporate form submits to Getform.io
- Success/error messages display properly

### **✅ Database Integration**

- All content comes from Supabase database
- Sessions, blogs, testimonials from database
- No hardcoded content

### **✅ Admin Panel Features**

- 4-digit password protection
- Content organized by sections
- Inline editing
- Save/refresh functionality
- Visual feedback for changes

## **Troubleshooting**

### **If Admin Panel Shows "Database not set up yet":**

1. Execute the database schema in Supabase
2. Check browser console for errors
3. Verify Supabase credentials in `src/config/api.ts`

### **If Changes Don't Appear:**

1. Check browser console for errors
2. Verify database connection
3. Check if content is being fetched properly

### **If Forms Don't Submit:**

1. Check Getform.io endpoint in `src/config/api.ts`
2. Verify network connection
3. Check browser console for errors

## **Success Criteria**

✅ **Database Schema Executes** without errors
✅ **Admin Panel Accessible** with password `1234`
✅ **Real-Time Updates** work on all pages
✅ **All Content Editable** from admin panel
✅ **Forms Submit** to Getform.io
✅ **No Console Errors** in browser
✅ **All Pages Load** content from database

---

**Your admin panel should now work perfectly with real-time updates across all pages!** 🎉
