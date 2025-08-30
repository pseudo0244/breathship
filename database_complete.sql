-- =====================================================
-- BREATHSHIP COMPLETE DATABASE SETUP
-- =====================================================
-- This file contains everything needed to set up the database
-- It handles existing data, enum constraints, and provides reset options
-- =====================================================

-- =====================================================
-- SECTION 1: RESET AND CLEANUP (OPTIONAL)
-- =====================================================
-- Uncomment the lines below if you want to completely reset the database
-- WARNING: This will delete all existing data!

/*
-- Drop all tables
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS content CASCADE;

-- Drop trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop any enum types that might exist
DO $$ 
DECLARE
    enum_record RECORD;
BEGIN
    FOR enum_record IN 
        SELECT typname 
        FROM pg_type 
        WHERE typtype = 'e' 
        AND (typname LIKE '%content%' OR typname LIKE '%section%')
    LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || enum_record.typname || ' CASCADE';
    END LOOP;
END $$;
*/

-- =====================================================
-- SECTION 2: ENUM CONSTRAINT HANDLING
-- =====================================================
-- Handle existing enum constraints on content table
DO $$ 
BEGIN
    -- If content table exists and has enum constraint, alter it to VARCHAR
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'content') THEN
        -- Alter the section column to VARCHAR if it's currently an enum
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'content' 
            AND column_name = 'section' 
            AND data_type = 'USER-DEFINED'
        ) THEN
            ALTER TABLE content ALTER COLUMN section TYPE VARCHAR(100);
        END IF;
    END IF;
END $$;

-- =====================================================
-- SECTION 3: CORE DATABASE SETUP
-- =====================================================

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Content table for managing website content
CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    field_value TEXT,
    field_type VARCHAR(50) DEFAULT 'text',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, field_name)
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_link VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(100),
    price DECIMAL(10,2),
    image_link VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    image_link VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SECTION 4: INDEXES FOR PERFORMANCE
-- =====================================================

-- Content indexes
CREATE INDEX IF NOT EXISTS idx_content_section ON content(section);
CREATE INDEX IF NOT EXISTS idx_content_field_name ON content(field_name);
CREATE INDEX IF NOT EXISTS idx_content_is_active ON content(is_active);

-- Blogs indexes
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON blogs(is_published);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);

-- Sessions indexes
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at);

-- =====================================================
-- SECTION 5: TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_content_updated_at ON content;
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;

-- Create triggers for updated_at
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SECTION 6: ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for content" ON content;
DROP POLICY IF EXISTS "Public read access for blogs" ON blogs;
DROP POLICY IF EXISTS "Public read access for sessions" ON sessions;
DROP POLICY IF EXISTS "Public read access for testimonials" ON testimonials;

-- Create policies for public read access
CREATE POLICY "Public read access for content" ON content FOR SELECT USING (true);
CREATE POLICY "Public read access for blogs" ON blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for sessions" ON sessions FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- =====================================================
-- SECTION 7: DEFAULT DATA
-- =====================================================

-- Insert default content
INSERT INTO content (section, field_name, field_value, field_type, display_order, is_active) VALUES
-- Hero Section
('hero', 'hero_text', 'Breathe. Heal. Transform.', 'text', 1, true),
('hero', 'hero_subtitle', 'Discover the transformative power of conscious breathing. Experience deep healing, stress relief, and inner peace through ancient wisdom and modern science.', 'textarea', 2, true),
('hero', 'hero_badge_text', 'Transform Your Life Through Conscious Breathing', 'text', 3, true),
('hero', 'hero_cta_primary', 'Start Your Journey', 'text', 4, true),
('hero', 'hero_cta_secondary', 'Watch Introduction', 'text', 5, true),
('hero', 'hero_stats_clients', '500+', 'text', 6, true),
('hero', 'hero_stats_clients_text', 'Clients Transformed', 'text', 7, true),
('hero', 'hero_stats_experience', '5+', 'text', 8, true),
('hero', 'hero_stats_experience_text', 'Years Experience', 'text', 9, true),
('hero', 'hero_stats_rating', '4.9/5', 'text', 10, true),
('hero', 'hero_stats_rating_text', 'Rating', 'text', 11, true),
('hero', 'hero_trust_1', 'Certified Breathwork Facilitator', 'text', 12, true),
('hero', 'hero_trust_2', 'Evidence-Based Techniques', 'text', 13, true),
('hero', 'hero_trust_3', 'Safe & Supportive Environment', 'text', 14, true),
('hero', 'hero_background_image', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop', 'image', 15, true),

-- About Me Section
('about_me', 'about_me_title', 'About Me', 'text', 1, true),
('about_me', 'about_me_subtitle', 'Your Journey to Inner Peace Starts Here', 'text', 2, true),
('about_me', 'about_me_description', 'I am a certified breathwork facilitator with over 5 years of experience helping people transform their lives through conscious breathing. My approach combines ancient wisdom with modern science to create powerful healing experiences.', 'textarea', 3, true),
('about_me', 'about_me_image', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', 'image', 4, true),

-- About Breathship Section
('about_breathship', 'about_breathship_title', 'What is Breathship?', 'text', 1, true),
('about_breathship', 'about_breathship_subtitle', 'The Science of Conscious Breathing', 'text', 2, true),
('about_breathship', 'about_breathship_description', 'Breathship is a comprehensive approach to breathwork that combines traditional techniques with modern understanding of the nervous system. Our sessions help you release stress, heal trauma, and access deeper states of consciousness.', 'textarea', 3, true),

-- Why Choose Us Section
('why_choose_us', 'why_choose_us_title', 'Why Choose Breathship?', 'text', 1, true),
('why_choose_us', 'why_choose_us_subtitle', 'Experience the Difference', 'text', 2, true),
('why_choose_us', 'why_choose_us_feature_1_title', 'Certified Expertise', 'text', 3, true),
('why_choose_us', 'why_choose_us_feature_1_description', 'Learn from certified breathwork facilitators with extensive training and experience.', 'textarea', 4, true),
('why_choose_us', 'why_choose_us_feature_2_title', 'Evidence-Based', 'text', 5, true),
('why_choose_us', 'why_choose_us_feature_2_description', 'Our techniques are backed by scientific research and proven to be effective.', 'textarea', 6, true),
('why_choose_us', 'why_choose_us_feature_3_title', 'Safe Environment', 'text', 7, true),
('why_choose_us', 'why_choose_us_feature_3_description', 'Create a safe, supportive space for your healing journey.', 'textarea', 8, true),

-- Header Section
('header', 'header_company_name', 'Breathship', 'text', 1, true),
('header', 'header_logo_alt', 'Breathship Logo', 'text', 2, true),

-- Footer Section
('footer', 'footer_description', 'Transform your life through the power of conscious breathing. Experience deep healing, stress relief, and inner peace with our evidence-based breathwork programs.', 'textarea', 1, true),
('footer', 'footer_copyright', '© 2024 Breathship. All rights reserved.', 'text', 2, true),
('footer', 'footer_privacy_link', '/privacy', 'text', 3, true),
('footer', 'footer_terms_link', '/terms', 'text', 4, true),
('footer', 'contact_email', 'hello@breathship.com', 'text', 5, true),
('footer', 'contact_phone', '+1 (555) 123-4567', 'text', 6, true),

-- Contact Section
('contact', 'contact_title', 'Get in Touch', 'text', 1, true),
('contact', 'contact_subtitle', 'Ready to Start Your Journey?', 'text', 2, true),
('contact', 'contact_description', 'Book a session or ask us any questions. We are here to support your breathwork journey.', 'textarea', 3, true),
('contact', 'contact_address', '123 Breathing Street, Peace City, PC 12345', 'text', 4, true),
('contact', 'contact_email', 'hello@breathship.com', 'text', 5, true),
('contact', 'contact_phone', '+1 (555) 123-4567', 'text', 6, true),

-- Corporate Section
('corporate', 'corporate_title', 'Corporate Wellness Programs', 'text', 1, true),
('corporate', 'corporate_subtitle', 'Transform your workplace culture with evidence-based breathwork programs designed to reduce stress, improve focus, and enhance team collaboration.', 'textarea', 2, true),
('corporate', 'corporate_description', 'Our corporate wellness programs are designed to help your team manage stress, improve focus, and create a healthier workplace culture through the power of conscious breathing.', 'textarea', 3, true)
ON CONFLICT (section, field_name) DO UPDATE SET 
    field_value = EXCLUDED.field_value,
    field_type = EXCLUDED.field_type,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Insert default blogs
INSERT INTO blogs (title, excerpt, content, image_link, is_published, published_at) VALUES
('The Science Behind Breathwork', 'Discover the fascinating research that proves how conscious breathing can transform your physical and mental health.', '<h2>The Science Behind Breathwork</h2><p>Breathwork isn''t just a spiritual practice—it''s backed by solid scientific research. Studies have shown that conscious breathing can:</p><ul><li>Reduce cortisol levels by up to 23%</li><li>Increase oxygen saturation in the blood</li><li>Activate the parasympathetic nervous system</li><li>Improve cognitive function and focus</li></ul><p>When we breathe consciously, we''re essentially hacking our nervous system to promote relaxation and healing.</p>', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', true, NOW()),
('5 Simple Breathing Techniques for Daily Stress Relief', 'Learn five powerful breathing techniques you can use anywhere, anytime to reduce stress and find calm.', '<h2>5 Simple Breathing Techniques for Daily Stress Relief</h2><p>Stress is an inevitable part of modern life, but you don''t have to let it control you. Here are five simple breathing techniques you can use throughout your day:</p><h3>1. Box Breathing (4-4-4-4)</h3><p>Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 5-10 times.</p><h3>2. 4-7-8 Breathing</h3><p>Inhale for 4, hold for 7, exhale for 8. This technique is especially effective for falling asleep.</p><h3>3. Belly Breathing</h3><p>Place your hand on your belly and breathe deeply, feeling your belly rise and fall.</p><h3>4. Alternate Nostril Breathing</h3><p>Close one nostril, inhale through the other, then switch and exhale. This balances the nervous system.</p><h3>5. Sigh Breathing</h3><p>Take a deep breath and let out a long, audible sigh. This releases tension immediately.</p>', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, NOW()),
('How Breathwork Changed My Life', 'A personal journey from chronic anxiety to inner peace through the power of conscious breathing.', '<h2>How Breathwork Changed My Life</h2><p>Three years ago, I was struggling with chronic anxiety that was affecting every aspect of my life. I couldn''t sleep, my relationships were suffering, and I felt like I was constantly on edge.</p><p>That''s when I discovered breathwork. At first, I was skeptical. How could something as simple as breathing differently make such a profound difference?</p><p>But within just a few weeks of daily practice, I began to notice changes:</p><ul><li>My anxiety levels decreased significantly</li><li>I was sleeping better than I had in years</li><li>I felt more present and connected to others</li><li>My overall sense of well-being improved dramatically</li></ul><p>Today, breathwork is an essential part of my daily routine. It''s not just a practice—it''s a way of life that has transformed how I experience the world.</p>', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', true, NOW())
ON CONFLICT DO NOTHING;

-- Insert default sessions
INSERT INTO sessions (title, description, duration, price, image_link, is_active) VALUES
('Introduction to Breathwork', 'Perfect for beginners, this session introduces you to the fundamentals of conscious breathing and its benefits for stress relief and relaxation.', '60 minutes', 75.00, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true),
('Deep Healing Session', 'An intensive breathwork session designed to release deep-seated tension, trauma, and emotional blockages for profound healing.', '90 minutes', 120.00, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop', true),
('Corporate Wellness Workshop', 'A group session designed for workplaces to reduce stress, improve focus, and enhance team collaboration through breathwork techniques.', '120 minutes', 500.00, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', true)
ON CONFLICT DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (client_name, client_title, content, rating, image_link, is_active) VALUES
('Sarah Johnson', 'Marketing Director', 'Breathship transformed my approach to stress management. The techniques I learned have become essential tools in my daily routine. I feel more centered and focused than ever before.', 5, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop', true),
('Michael Chen', 'Software Engineer', 'I was skeptical at first, but the science behind breathwork is undeniable. After just a few sessions, I noticed significant improvements in my sleep quality and overall stress levels.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', true),
('Emily Rodriguez', 'Yoga Instructor', 'As someone who works in wellness, I''m always looking for new tools to help my clients. Breathship''s approach is both scientifically grounded and deeply transformative.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SECTION 8: VERIFICATION
-- =====================================================

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;

-- Show table counts
SELECT 'content' as table_name, COUNT(*) as record_count FROM content
UNION ALL
SELECT 'blogs' as table_name, COUNT(*) as record_count FROM blogs
UNION ALL
SELECT 'sessions' as table_name, COUNT(*) as record_count FROM sessions
UNION ALL
SELECT 'testimonials' as table_name, COUNT(*) as record_count FROM testimonials;

-- =====================================================
-- COMPLETE DATABASE SETUP FINISHED
-- =====================================================
-- Your Breathship database is now ready!
-- All tables, indexes, triggers, policies, and default data are in place.
-- =====================================================
