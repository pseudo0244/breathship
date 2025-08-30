# Quick Configuration Guide

## 🚀 Quick Setup

### 1. Update API Configuration

Edit `src/config/api.ts` and replace the placeholder values:

```typescript
export const API_CONFIG = {
  SUPABASE: {
    URL: "https://your-project.supabase.co", // ← Your Supabase URL
    ANON_KEY: "your-supabase-anon-key", // ← Your Supabase anon key
  },
  GETFORM: {
    ENDPOINT: "https://getform.io/f/your-form-endpoint", // ← Your getform.io endpoint
  },
  // ... rest of config
};
```

### 2. Set Up Database

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key
4. Run the SQL from `database_schema.sql` in your Supabase SQL Editor

### 3. Set Up Forms

1. Go to [getform.io](https://getform.io)
2. Create an account and new form endpoint
3. Copy your form endpoint URL

### 4. Start Development

```bash
npm run dev
```

## 📝 What You Need

### Supabase Credentials

- **Project URL**: Found in Settings > API
- **Anon Key**: Found in Settings > API

### Getform.io Endpoint

- **Form Endpoint**: Created when you set up a new form

## ✅ Verification

The app will show warnings in the browser console if configuration is missing. Check the console for:

- "API Configuration Issues" warnings
- Missing credentials notifications

## 🔧 Troubleshooting

### Common Issues

1. **Build errors**: Make sure all credentials are updated
2. **API errors**: Verify Supabase URL and anon key
3. **Form errors**: Check getform.io endpoint URL

### Font Warnings

The font warnings during build are normal - they're resolved at runtime when you add the font files to your `/public/fonts/` directory.

## 📞 Support

If you need help:

1. Check the browser console for configuration warnings
2. Verify all credentials are correctly set
3. Ensure database schema is properly executed
4. Test form submissions in getform.io dashboard
