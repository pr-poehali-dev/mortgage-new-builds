CREATE TABLE IF NOT EXISTS t_p44352831_mortgage_new_builds.properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    developer VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Самара',
    district VARCHAR(100),
    price_from BIGINT NOT NULL,
    image_url TEXT,
    deadline VARCHAR(100),
    rooms VARCHAR(100),
    description TEXT,
    area_from DECIMAL(10,2),
    area_to DECIMAL(10,2),
    website_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_properties_city ON t_p44352831_mortgage_new_builds.properties(city);
CREATE INDEX idx_properties_active ON t_p44352831_mortgage_new_builds.properties(is_active);
CREATE INDEX idx_properties_price ON t_p44352831_mortgage_new_builds.properties(price_from);