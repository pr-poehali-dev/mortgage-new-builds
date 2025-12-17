-- Создание таблицы подписок для хранения информации о платежах и тарифах

CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL,
    order_id VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'pending',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_email ON subscriptions(email);
CREATE INDEX idx_subscriptions_order_id ON subscriptions(order_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
