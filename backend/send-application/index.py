import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправка заявки с формы в Telegram (через ссылку)
    Принимает: POST с полями name, phone, message (опционально)
    Возвращает: ссылку на Telegram с предзаполненным текстом
    """
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
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    message = body_data.get('message', '')
    form_type = body_data.get('formType', 'contact')
    
    loan_amount = body_data.get('loanAmount', '')
    initial_payment = body_data.get('initialPayment', '')
    loan_term = body_data.get('loanTerm', '')
    interest_rate = body_data.get('interestRate', '')
    monthly_payment = body_data.get('monthlyPayment', '')
    
    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Укажите имя и телефон'}),
            'isBase64Encoded': False
        }
    
    if form_type == 'calculator':
        text = f"""Новая заявка на ипотеку!

Имя: {name}
Телефон: {phone}

Расчёт ипотеки:
💰 Стоимость: {loan_amount} ₽
📊 Первый взнос: {initial_payment} ₽
📅 Срок: {loan_term} лет
📈 Ставка: {interest_rate}%
💳 Платёж: {monthly_payment} ₽/мес"""
    else:
        text = f"""Новая заявка!

Имя: {name}
Телефон: {phone}"""
        if message:
            text += f"\n\nСообщение:\n{message}"
    
    telegram_username = "iNexus63"
    telegram_url = f"https://t.me/{telegram_username}?text={text}"
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': 'Заявка принята',
            'telegramUrl': telegram_url
        }),
        'isBase64Encoded': False
    }