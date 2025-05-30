import re

def process_email(content):
    sender_match = re.search(r"From:\s*(.*)", content)
    sender = sender_match.group(1).strip() if sender_match else 'Unknown'

    urgency = 'High' if 'urgent' in content.lower() else 'Medium'
    body = content.split("\n\n", 1)[-1].strip()

    return {
        'sender': sender,
        'urgency': urgency,
        'body': body,
        'formatted': f"Email from {sender} with urgency {urgency}"
    }
