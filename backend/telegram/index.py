import json
import os
import re
from typing import Dict, Any
import psycopg2
from urllib import request, error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Регистрация и валидация Telegram ботов через Bot API.
    Проверяет токен, сохраняет в БД, возвращает информацию о боте.
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
    bot_token: str = body_data.get('bot_token', '').strip()
    
    if not email or not bot_token:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email и токен бота обязательны'}),
            'isBase64Encoded': False
        }
    
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный формат email'}),
            'isBase64Encoded': False
        }
    
    if not re.match(r'^\d+:[A-Za-z0-9_-]+$', bot_token):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Неверный формат токена бота'}),
            'isBase64Encoded': False
        }
    
    try:
        api_url = f'https://api.telegram.org/bot{bot_token}/getMe'
        req = request.Request(api_url, method='GET')
        
        with request.urlopen(req, timeout=10) as response:
            api_response = json.loads(response.read().decode('utf-8'))
            
            if not api_response.get('ok'):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Неверный токен бота или бот не найден'}),
                    'isBase64Encoded': False
                }
            
            bot_info = api_response['result']
            bot_username = bot_info.get('username', '')
            bot_first_name = bot_info.get('first_name', '')
            
    except error.HTTPError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка проверки токена: {e.code}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка соединения с Telegram API: {str(e)}'}),
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
        
        cur.execute('''
            INSERT INTO telegram_bots (email, bot_token, bot_username, bot_name, created_at)
            VALUES (%s, %s, %s, %s, NOW())
            ON CONFLICT (bot_token) 
            DO UPDATE SET email = EXCLUDED.email, updated_at = NOW()
            RETURNING id, bot_username, bot_name, created_at
        ''', (email, bot_token, bot_username, bot_first_name))
        
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': f'Бот @{bot_username} успешно зарегистрирован!',
                'bot': {
                    'id': result[0],
                    'username': result[1],
                    'name': result[2],
                    'registered_at': result[3].isoformat() if result[3] else None
                }
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