# 🔍 **Database Status Check**

## **How to Check if Database is Set Up**

### **Method 1: Browser Console**

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Type: `debugAPI()` and press Enter
4. Look for the output to see what's happening

### **Method 2: Check Supabase Dashboard**

1. Go to: https://supabase.com/dashboard
2. Select your project: `uemamlkocdgqnkedjcou`
3. Click "Table Editor" in the left sidebar
4. You should see these tables:
   - ✅ `content`
   - ✅ `sessions`
   - ✅ `blogs`
   - ✅ `testimonials`
   - ✅ `admin_users`

### **Method 3: Test Admin Panel**

1. Visit: `http://localhost:5174/myadmin`
2. Enter password: `1234`
3. If you see "Database not set up yet" message → Database needs setup
4. If you see content sections → Database is working

## **Common Issues & Solutions**

### **Issue: "Database not set up yet"**

**Solution:** Execute the database schema

1. Go to Supabase SQL Editor
2. Copy entire `database_schema.sql` content
3. Paste and run in SQL Editor

### **Issue: "404 Not Found"**

**Solution:** Tables don't exist

- Execute the database schema
- Check if you're in the correct Supabase project

### **Issue: "JSON Parse Error"**

**Solution:** API response is empty or malformed

- Check if tables exist
- Verify RLS policies are set up
- Check API credentials

### **Issue: "Permission Denied"**

**Solution:** RLS policies need to be set

- Execute the complete database schema
- Check Supabase project settings

## **Quick Test Commands**

### **In Browser Console:**

```javascript
// Test basic connection
debugAPI();

// Test specific endpoint
fetch("https://uemamlkocdgqnkedjcou.supabase.co/rest/v1/content?select=count", {
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbWFtbGtvY2RncW5rZWRqY291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjQ3ODAsImV4cCI6MjA3MjEwMDc4MH0.gAB333dXumqfH1ybXtOQye69l4oBgfWOuR76G104KlM",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbWFtbGtvY2RncW5rZWRqY291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MjQ3ODAsImV4cCI6MjA3MjEwMDc4MH0.gAB333dXumqfH1ybXtOQye69l4oBgfWOuR76G104KlM",
  },
})
  .then((r) => r.text())
  .then(console.log);
```

## **Expected Results**

### **If Database is Set Up Correctly:**

- ✅ `debugAPI()` shows "Content table exists and accessible"
- ✅ Admin panel loads content sections
- ✅ No 404 or JSON errors

### **If Database is NOT Set Up:**

- ❌ `debugAPI()` shows "Content table not found"
- ❌ Admin panel shows "Database not set up yet"
- ❌ 404 errors in console

---

**Run `debugAPI()` in your browser console to see the current status!** 🔍
