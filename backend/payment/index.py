import json
import os
from typing import Dict, Any
import psycopg2
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка платежей и создание подписок для тарифных планов.
    Создает заказ, сохраняет в БД, возвращает данные для оплаты.
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    raw_body = event.get('body', '{}')
    if not raw_body or raw_body == '{}':
        body_data = {}
    else:
        body_data = json.loads(raw_body)
    
    email: str = body_data.get('email', '').strip()
    plan_name: str = body_data.get('plan_name', '').strip()
    amount: int = body_data.get('amount', 0)
    
    if not email or not plan_name or amount <= 0:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email, название тарифа и сумма обязательны'}),
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Database configuration missing'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        # Создаем заказ в БД
        order_id = f"ORDER-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        expires_at = datetime.now() + timedelta(days=30)
        
        cur.execute('''
            INSERT INTO subscriptions (email, plan_name, amount, order_id, status, expires_at, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
            RETURNING id, order_id
        ''', (email, plan_name, amount, order_id, 'pending', expires_at))
        
        result = cur.fetchone()
        subscription_id = result[0]
        order_id = result[1]
        
        conn.commit()
        cur.close()
        conn.close()
        
        # В реальном приложении здесь была бы интеграция с ЮKassa/Stripe/etc
        # Пока возвращаем mock данные для демонстрации
        payment_url = f"https://demo-payment.botbuilder.com/pay/{order_id}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заказ создан успешно',
                'subscription_id': subscription_id,
                'order_id': order_id,
                'payment_url': payment_url,
                'amount': amount,
                'plan_name': plan_name,
                'expires_at': expires_at.isoformat()
            }),
            'isBase64Encoded': False
        }
        
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка базы данных: {str(e)}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }
