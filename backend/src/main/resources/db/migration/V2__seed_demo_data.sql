-- V2 Seed Realistic Demonstration Data
INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active)
VALUES 
('11111111-1111-1111-1111-111111111111', 'NirmanSetu Administrator', 'admin@nirmansetu.in', '+919999900001', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.KjEaKk3N7qZ8R2oQWj9Bw5tSgT2dOq', 'ADMIN', true),
('22222222-2222-2222-2222-222222222222', 'Anil Mehta (Homeowner)', 'anil.mehta@example.com', '+919876511223', '$2a$10$7EqJtq98hPqEX7fNZaFWoO.KjEaKk3N7qZ8R2oQWj9Bw5tSgT2dOq', 'CUSTOMER', true)
ON CONFLICT (email) DO NOTHING;

INSERT INTO contractors (
    id, business_name, proprietor_name, profile_photo_url, city, state, primary_locality,
    phone, whatsapp_number, email, bio, experience_years, verification_status,
    govt_id_verified, gst_verified, site_inspected, completed_projects_count, ongoing_projects_count,
    avg_rating, review_count, is_published, is_demo_record
) VALUES 
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Shree Ram Civil Constructions & Thekedar',
    'Ram Kishore Yadav',
    'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80',
    'Noida', 'Uttar Pradesh', 'Sector 78 & Greater Noida West',
    '+91 98712 34560', '+919871234560', 'shreeram.civil@example.com',
    'Experienced 2nd generation civil thekedar specializing in G+1, G+2 independent houses and turnkey villa construction across Noida & Delhi NCR.',
    18, 'VERIFIED', true, true, true, 142, 5, 4.8, 38, true, true
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Dakshin BuiltTech Turnkey Solutions',
    'Venkat Raman',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    'Bengaluru', 'Karnataka', 'Whitefield & Sarjapur Road',
    '+91 99801 22334', '+919980122334', 'dakshin.builttech@example.com',
    'Engineered home construction firm backed by qualified civil engineers and master masons. Specialists in earthquake-resistant RCC frame duplexes.',
    12, 'VERIFIED', true, true, true, 89, 7, 4.9, 46, true, true
)
ON CONFLICT (id) DO NOTHING;
