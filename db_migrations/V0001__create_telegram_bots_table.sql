CREATE TABLE IF NOT EXISTS telegram_bots (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    bot_token VARCHAR(255) NOT NULL UNIQUE,
    bot_username VARCHAR(255),
    bot_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_telegram_bots_email ON telegram_bots(email);
CREATE INDEX IF NOT EXISTS idx_telegram_bots_token ON telegram_bots(bot_token);
