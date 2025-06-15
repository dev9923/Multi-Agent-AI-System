import re

from datetime import datetime

def classify_input(content):
    if content.strip().startswith("From:"):
        fmt = 'Email'
    elif content.strip().startswith("{"):
        fmt = 'JSON'
    elif content.lower().endswith(".pdf"):
        fmt = 'PDF'
    else:
        fmt = 'Unknown'

    intent = detect_intent(content)
    return fmt, intent

def detect_intent(text):
    keywords = {
        'invoice': 'Invoice',
        'quotation': 'RFQ',
        'quote': 'RFQ',
        'complaint': 'Complaint',
        'regulation': 'Regulation'
    }
    for k, v in keywords.items():
        if k in text.lower():
            return v
    return 'Unknown'
