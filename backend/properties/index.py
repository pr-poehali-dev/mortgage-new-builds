import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для управления новостройками - получение списка и создание объектов'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            city = query_params.get('city')
            is_active = query_params.get('is_active', 'true')
            limit = int(query_params.get('limit', 100))
            offset = int(query_params.get('offset', 0))
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                conditions = []
                if city:
                    conditions.append(f"city = '{city}'")
                if is_active == 'true':
                    conditions.append("is_active = true")
                
                where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""
                
                cur.execute(f"""
                    SELECT id, title, developer, location, city, district, 
                           price_from, image_url, deadline, rooms, description,
                           area_from, area_to, website_url, is_active,
                           created_at, updated_at
                    FROM t_p44352831_mortgage_new_builds.properties
                    {where_clause}
                    ORDER BY created_at DESC
                    LIMIT {limit} OFFSET {offset}
                """)
                properties = cur.fetchall()
                
                cur.execute(f"""
                    SELECT COUNT(*) as total
                    FROM t_p44352831_mortgage_new_builds.properties
                    {where_clause}
                """)
                total = cur.fetchone()['total']
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'properties': properties,
                    'total': total,
                    'limit': limit,
                    'offset': offset
                }, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            admin_key = event.get('headers', {}).get('X-Admin-Key') or event.get('headers', {}).get('x-admin-key')
            expected_key = os.environ.get('ADMIN_KEY')
            
            if not expected_key or admin_key != expected_key:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Forbidden'}),
                    'isBase64Encoded': False
                }
            
            body = json.loads(event.get('body', '{}'))
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    INSERT INTO t_p44352831_mortgage_new_builds.properties
                    (title, developer, location, city, district, price_from, image_url, 
                     deadline, rooms, description, area_from, area_to, website_url, is_active)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, title, developer, location, city, district, price_from,
                              image_url, deadline, rooms, description, area_from, area_to,
                              website_url, is_active, created_at, updated_at
                """, (
                    body.get('title'),
                    body.get('developer'),
                    body.get('location'),
                    body.get('city', 'Самара'),
                    body.get('district'),
                    body.get('price_from'),
                    body.get('image_url'),
                    body.get('deadline'),
                    body.get('rooms'),
                    body.get('description'),
                    body.get('area_from'),
                    body.get('area_to'),
                    body.get('website_url'),
                    body.get('is_active', True)
                ))
                new_property = cur.fetchone()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(new_property, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            admin_key = event.get('headers', {}).get('X-Admin-Key') or event.get('headers', {}).get('x-admin-key')
            expected_key = os.environ.get('ADMIN_KEY')
            
            if not expected_key or admin_key != expected_key:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Forbidden'}),
                    'isBase64Encoded': False
                }
            
            body = json.loads(event.get('body', '{}'))
            property_id = body.get('id')
            
            if not property_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Property ID is required'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    UPDATE t_p44352831_mortgage_new_builds.properties
                    SET title = %s, developer = %s, location = %s, city = %s, district = %s,
                        price_from = %s, image_url = %s, deadline = %s, rooms = %s,
                        description = %s, area_from = %s, area_to = %s, website_url = %s,
                        is_active = %s, updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                    RETURNING id, title, developer, location, city, district, price_from,
                              image_url, deadline, rooms, description, area_from, area_to,
                              website_url, is_active, created_at, updated_at
                """, (
                    body.get('title'),
                    body.get('developer'),
                    body.get('location'),
                    body.get('city', 'Самара'),
                    body.get('district'),
                    body.get('price_from'),
                    body.get('image_url'),
                    body.get('deadline'),
                    body.get('rooms'),
                    body.get('description'),
                    body.get('area_from'),
                    body.get('area_to'),
                    body.get('website_url'),
                    body.get('is_active', True),
                    property_id
                ))
                updated_property = cur.fetchone()
            
            if not updated_property:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Property not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(updated_property, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            admin_key = event.get('headers', {}).get('X-Admin-Key') or event.get('headers', {}).get('x-admin-key')
            expected_key = os.environ.get('ADMIN_KEY')
            
            if not expected_key or admin_key != expected_key:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Forbidden'}),
                    'isBase64Encoded': False
                }
            
            query_params = event.get('queryStringParameters') or {}
            property_id = query_params.get('id')
            
            if not property_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Property ID is required'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("""
                    DELETE FROM t_p44352831_mortgage_new_builds.properties
                    WHERE id = %s
                """, (property_id,))
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Property deleted'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        conn.close()
