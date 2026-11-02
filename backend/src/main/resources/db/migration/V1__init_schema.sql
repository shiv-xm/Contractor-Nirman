-- NirmanSetu V1 Initial Relational Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('ADMIN', 'CUSTOMER', 'CONTRACTOR')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. CONTRACTORS
CREATE TABLE contractors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    business_name VARCHAR(180) NOT NULL,
    proprietor_name VARCHAR(120) NOT NULL,
    profile_photo_url TEXT,
    logo_url TEXT,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    primary_locality VARCHAR(120) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    whatsapp_number VARCHAR(25),
    email VARCHAR(160) NOT NULL,
    bio TEXT,
    experience_years INT NOT NULL DEFAULT 0,
    verification_status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (verification_status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    govt_id_verified BOOLEAN NOT NULL DEFAULT FALSE,
    gst_verified BOOLEAN NOT NULL DEFAULT FALSE,
    site_inspected BOOLEAN NOT NULL DEFAULT FALSE,
    completed_projects_count INT NOT NULL DEFAULT 0,
    ongoing_projects_count INT NOT NULL DEFAULT 0,
    avg_rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
    review_count INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    is_demo_record BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. CONTRACTOR_LOCATIONS
CREATE TABLE contractor_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    city VARCHAR(80) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    pincode VARCHAR(10),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE
);

-- 4. CONSTRUCTION_PROJECTS
CREATE TABLE construction_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    building_type VARCHAR(40) NOT NULL CHECK (building_type IN ('INDEPENDENT_HOUSE', 'VILLA', 'APARTMENT', 'COMMERCIAL', 'OFFICE', 'RENOVATION', 'OTHER')),
    project_status VARCHAR(30) NOT NULL DEFAULT 'COMPLETED' CHECK (project_status IN ('COMPLETED', 'ONGOING', 'PLANNED')),
    city VARCHAR(80) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    plot_area_sqft NUMERIC(10, 2),
    built_up_area_sqft NUMERIC(10, 2) NOT NULL,
    floors INT NOT NULL DEFAULT 1,
    approx_cost_inr NUMERIC(14, 2) NOT NULL,
    start_date DATE NOT NULL,
    completion_date DATE,
    cover_image TEXT NOT NULL,
    description TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. PROJECT_MEDIA
CREATE TABLE project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES construction_projects(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(20) NOT NULL DEFAULT 'IMAGE' CHECK (media_type IN ('IMAGE', 'VIDEO', 'BLUEPRINT')),
    caption TEXT,
    stage VARCHAR(30) NOT NULL CHECK (stage IN ('FOUNDATION', 'BRICKWORK', 'PLASTER', 'FINISHING', 'COMPLETED')),
    display_order INT NOT NULL DEFAULT 0
);

-- 6. CONTRACTOR_RATES
CREATE TABLE contractor_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    building_category VARCHAR(40) NOT NULL,
    package_type VARCHAR(40) NOT NULL CHECK (package_type IN ('LABOUR_ONLY', 'LABOUR_PLUS_MATERIAL', 'STRUCTURE_ONLY', 'TURNKEY', 'RENOVATION')),
    min_rate_per_sqft NUMERIC(10, 2) NOT NULL,
    max_rate_per_sqft NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'sq.ft',
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    pricing_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. ENQUIRIES
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    building_type VARCHAR(40) NOT NULL,
    city VARCHAR(80) NOT NULL,
    locality VARCHAR(120) NOT NULL,
    built_up_area_sqft NUMERIC(10, 2) NOT NULL,
    floors INT DEFAULT 1,
    estimated_budget_inr NUMERIC(14, 2) NOT NULL,
    package_type VARCHAR(40) NOT NULL,
    requirement_description TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'DISCUSSION', 'QUOTATION', 'WON', 'LOST')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. CONVERSATIONS & MESSAGES
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    last_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. REVIEWS & RATINGS
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    project_id UUID REFERENCES construction_projects(id) ON DELETE SET NULL,
    review_type VARCHAR(30) NOT NULL DEFAULT 'PROJECT_REVIEW' CHECK (review_type IN ('PROJECT_REVIEW', 'INTERACTION_FEEDBACK')),
    overall_rating INT NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    work_quality_rating INT CHECK (work_quality_rating BETWEEN 1 AND 5),
    timeliness_rating INT CHECK (timeliness_rating BETWEEN 1 AND 5),
    communication_rating INT CHECK (communication_rating BETWEEN 1 AND 5),
    budget_transparency_rating INT CHECK (budget_transparency_rating BETWEEN 1 AND 5),
    feedback_text TEXT NOT NULL,
    moderation_status VARCHAR(30) NOT NULL DEFAULT 'APPROVED' CHECK (moderation_status IN ('PENDING', 'APPROVED', 'REJECTED')),
    is_verified_homeowner BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. VERIFICATION_RECORDS
CREATE TABLE verification_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contractor_id UUID NOT NULL REFERENCES contractors(id) ON DELETE CASCADE,
    id_proof_type VARCHAR(40) NOT NULL,
    id_proof_number_masked VARCHAR(60) NOT NULL,
    document_url TEXT,
    verified_by_admin_id UUID REFERENCES users(id),
    admin_notes TEXT,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. AUDIT_LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(80) NOT NULL,
    performed_by VARCHAR(120) NOT NULL,
    target_entity VARCHAR(80) NOT NULL,
    target_id UUID,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Useful Indexes
CREATE INDEX idx_contractors_city ON contractors(city);
CREATE INDEX idx_contractors_verification ON contractors(verification_status);
CREATE INDEX idx_projects_contractor ON construction_projects(contractor_id);
CREATE INDEX idx_rates_contractor ON contractor_rates(contractor_id);
CREATE INDEX idx_enquiries_customer ON enquiries(customer_id);
CREATE INDEX idx_enquiries_contractor ON enquiries(contractor_id);
CREATE INDEX idx_reviews_contractor ON reviews(contractor_id);
