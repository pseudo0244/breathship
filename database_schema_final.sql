-- Breathship Website Database Schema - FINAL VERSION
-- Execute this in Supabase SQL Editor

-- Step 1: Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_content_updated_at ON content;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

-- Step 2: Create custom types
DO $$ BEGIN
    CREATE TYPE session_type AS ENUM ('One-on-One', 'Group', 'Corporate', 'Workshop');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE content_section AS ENUM (
      'hero', 'about_me', 'about_breathship', 'sessions', 'why_choose_us', 
      'testimonials', 'blogs', 'contact', 'footer', 'header'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 3: Add 'corporate' to existing content_section enum if it doesn't exist
DO $$ BEGIN
    ALTER TYPE content_section ADD VALUE 'corporate';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 4: Create content table for all editable website content
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  section content_section NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  field_value TEXT,
  field_type VARCHAR(50) DEFAULT 'text',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, field_name)
);

-- Step 5: Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  session_type session_type NOT NULL,
  payment_link VARCHAR(500),
  image_link VARCHAR(500),
  max_participants INTEGER,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_link VARCHAR(500),
  author VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 7: Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  image_link VARCHAR(500),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 8: Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 9: Insert default content for the website (excluding corporate for now)
INSERT INTO content (section, field_name, field_value, field_type, display_order) VALUES
-- Hero Section
('hero', 'hero_text', 'Breathe. Heal. Transform.', 'text', 1),
('hero', 'hero_subtitle', 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.', 'textarea', 2),
('hero', 'hero_badge_text', 'Transform Your Life Through Conscious Breathing', 'text', 3),
('hero', 'hero_cta_primary', 'Start Your Journey', 'text', 4),
('hero', 'hero_cta_secondary', 'Watch Introduction', 'text', 5),
('hero', 'hero_stats_clients', '500+', 'text', 6),
('hero', 'hero_stats_clients_text', 'Clients Transformed', 'text', 7),
('hero', 'hero_stats_experience', '5+', 'text', 8),
('hero', 'hero_stats_experience_text', 'Years Experience', 'text', 9),
('hero', 'hero_stats_rating', '4.9/5', 'text', 10),
('hero', 'hero_stats_rating_text', 'Rating', 'text', 11),
('hero', 'hero_trust_1', 'Certified Breathwork Facilitator', 'text', 12),
('hero', 'hero_trust_2', 'Evidence-Based Techniques', 'text', 13),
('hero', 'hero_trust_3', 'Safe & Supportive Environment', 'text', 14),

-- About Me Section
('about_me', 'about_me_title', 'About Me', 'text', 1),
('about_me', 'about_me_subtitle', 'Your Journey to Inner Peace Starts Here', 'text', 2),
('about_me', 'about_me_description', 'I am a certified breathwork facilitator with over 5 years of experience helping people transform their lives through conscious breathing. My approach combines ancient wisdom with modern science to create powerful healing experiences.', 'textarea', 3),
('about_me', 'about_me_image', 'src/public/pattern.jpg', 'image', 4),

-- About Breathship Section
('about_breathship', 'about_breathship_title', 'What is Breathship?', 'text', 1),
('about_breathship', 'about_breathship_subtitle', 'The Science of Conscious Breathing', 'text', 2),
('about_breathship', 'about_breathship_description', 'Breathship is a comprehensive approach to breathwork that combines traditional techniques with modern understanding of the nervous system. Our sessions help you release stress, heal trauma, and access deeper states of consciousness.', 'textarea', 3),

-- Why Choose Us Section
('why_choose_us', 'why_choose_us_title', 'Why Choose Breathship?', 'text', 1),
('why_choose_us', 'why_choose_us_subtitle', 'Experience the Difference', 'text', 2),
('why_choose_us', 'why_choose_us_feature_1_title', 'Certified Expertise', 'text', 3),
('why_choose_us', 'why_choose_us_feature_1_description', 'Learn from certified breathwork facilitators with extensive training and experience.', 'textarea', 4),
('why_choose_us', 'why_choose_us_feature_2_title', 'Evidence-Based', 'text', 5),
('why_choose_us', 'why_choose_us_feature_2_description', 'Our techniques are backed by scientific research and proven to be effective.', 'textarea', 6),
('why_choose_us', 'why_choose_us_feature_3_title', 'Safe Environment', 'text', 7),
('why_choose_us', 'why_choose_us_feature_3_description', 'Create a safe, supportive space for your healing journey.', 'textarea', 8),

-- Header Section
('header', 'header_company_name', 'Breathship', 'text', 1),
('header', 'header_logo_alt', 'Breathship Logo', 'text', 2),

-- Footer Section
('footer', 'footer_description', 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.', 'textarea', 1),
('footer', 'footer_copyright', '© 2024 Breathship. All rights reserved.', 'text', 2),
('footer', 'footer_privacy_link', '/privacy', 'text', 3),
('footer', 'footer_terms_link', '/terms', 'text', 4),
('footer', 'contact_email', 'hello@breathship.com', 'text', 5),
('footer', 'contact_phone', '+1 (555) 123-4567', 'text', 6),

-- Contact Section
('contact', 'contact_title', 'Get in Touch', 'text', 1),
('contact', 'contact_subtitle', 'Ready to Start Your Journey?', 'text', 2),
('contact', 'contact_description', 'Book a session or ask us any questions. We are here to support your breathwork journey.', 'textarea', 3),
('contact', 'contact_address', '123 Breathing Street, Peace City, PC 12345', 'text', 4),
('contact', 'contact_email', 'hello@breathship.com', 'text', 5),
('contact', 'contact_phone', '+1 (555) 123-4567', 'text', 6)
ON CONFLICT (section, field_name) DO NOTHING;

-- Step 10: Insert corporate content in a separate transaction
DO $$
BEGIN
    INSERT INTO content (section, field_name, field_value, field_type, display_order) VALUES
    ('corporate', 'corporate_title', 'Corporate Wellness Programs', 'text', 1),
    ('corporate', 'corporate_subtitle', 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.', 'textarea', 2),
    ('corporate', 'corporate_description', 'Our corporate wellness programs are designed to help your team manage stress, improve focus, and create a healthier workplace culture through the power of conscious breathing.', 'textarea', 3)
    ON CONFLICT (section, field_name) DO NOTHING;
EXCEPTION
    WHEN invalid_parameter_value THEN
        -- If corporate enum value doesn't exist yet, skip this insertion
        NULL;
END $$;

-- Step 11: Insert sample sessions
INSERT INTO sessions (title, description, date, time, session_type, payment_link, max_participants, price, is_active) VALUES
('Introduction to Breathwork', 'Perfect for beginners. Learn the basics of conscious breathing and experience your first breathwork session.', '2024-02-15', '10:00:00', 'One-on-One', 'https://pay.link/intro', 1, 75.00, true),
('Group Healing Session', 'Join a supportive group for a powerful collective breathwork experience.', '2024-02-20', '18:00:00', 'Group', 'https://pay.link/group', 12, 45.00, true),
('Corporate Wellness Workshop', 'Bring breathwork to your workplace. Reduce stress and improve team wellbeing.', '2024-02-25', '14:00:00', 'Corporate', 'https://pay.link/corporate', 20, 500.00, true),
('Advanced Breathwork', 'Deep dive into advanced techniques for experienced practitioners.', '2024-03-01', '16:00:00', 'Workshop', 'https://pay.link/advanced', 8, 120.00, true)
ON CONFLICT DO NOTHING;

-- Step 12: Insert sample blogs
INSERT INTO blogs (title, excerpt, content, author, is_published, published_at) VALUES
('The Science Behind Breathwork', 'Discover how conscious breathing affects your nervous system and overall wellbeing.', 'Breathwork is more than just breathing exercises. It is a powerful tool that directly impacts your nervous system and can transform your life.', 'Breathship Team', true, NOW()),
('5 Breathing Techniques for Stress Relief', 'Simple techniques you can use anywhere to reduce stress and anxiety.', 'Stress is a natural part of life, but it does not have to control you. These five breathing techniques can help you find peace and calm.', 'Breathship Team', true, NOW()),
('How Breathwork Changed My Life', 'A personal story of transformation through conscious breathing.', 'I never thought something as simple as breathing could change my life so profoundly. Here is my story of transformation.', 'Sarah Johnson', true, NOW())
ON CONFLICT DO NOTHING;

-- Step 13: Insert sample testimonials
INSERT INTO testimonials (name, text, rating, is_featured, is_active) VALUES
('Sarah Johnson', 'Breathship completely transformed my relationship with stress. I feel more peaceful and centered than ever before.', 5, true, true),
('Michael Chen', 'The sessions are incredibly powerful. I have experienced deep healing and emotional release I never thought possible.', 5, true, true),
('Emily Rodriguez', 'Professional, caring, and effective. The breathwork techniques I learned here have become essential to my daily routine.', 5, true, true),
('David Thompson', 'Amazing experience! The group sessions are supportive and the individual attention is incredible.', 5, false, true),
('Lisa Wang', 'I was skeptical at first, but the results speak for themselves. My anxiety has decreased significantly.', 5, false, true)
ON CONFLICT DO NOTHING;

-- Step 14: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);
CREATE INDEX IF NOT EXISTS idx_content_active ON content(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);

-- Step 15: Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 16: Create triggers for updated_at
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 17: Enable Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 18: Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to content" ON content;
DROP POLICY IF EXISTS "Allow public read access to sessions" ON sessions;
DROP POLICY IF EXISTS "Allow public read access to blogs" ON blogs;
DROP POLICY IF EXISTS "Allow public read access to testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow all operations on content" ON content;
DROP POLICY IF EXISTS "Allow all operations on sessions" ON sessions;
DROP POLICY IF EXISTS "Allow all operations on blogs" ON blogs;
DROP POLICY IF EXISTS "Allow all operations on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow all operations on admin_users" ON admin_users;

-- Step 19: Create RLS policies for public read access
CREATE POLICY "Allow public read access to content" ON content FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access to sessions" ON sessions FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access to blogs" ON blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read access to testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- Step 20: Create RLS policies for admin full access (for now, allow all operations)
CREATE POLICY "Allow all operations on content" ON content FOR ALL USING (true);
CREATE POLICY "Allow all operations on sessions" ON sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations on blogs" ON blogs FOR ALL USING (true);
CREATE POLICY "Allow all operations on testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow all operations on admin_users" ON admin_users FOR ALL USING (true);

-- Step 21: Verify setup
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as content_count FROM content;
SELECT COUNT(*) as sessions_count FROM sessions;
SELECT COUNT(*) as blogs_count FROM blogs;
SELECT COUNT(*) as testimonials_count FROM testimonials;
-- End of code