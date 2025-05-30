def process_json(data):
    required = ['invoice_id', 'date', 'amount']
    missing = [f for f in required if f not in data]

    return {
        'normalized': data,
        'missing_fields': missing,
        'anomalies': []
    }
