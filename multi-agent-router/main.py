import sys
import json
from agents.classifier_agent import classify_input
from agents.email_agent import process_email
from agents.json_agent import process_json
from memory.memory_store import MemoryStore

# Init memory store
memory = MemoryStore()

def route_input(input_path):
    with open(input_path, 'r') as f:
        content = f.read()

    fmt, intent = classify_input(content)

    if fmt == 'Email':
        result = process_email(content)
    elif fmt == 'JSON':
        result = process_json(json.loads(content))
    else:
        result = {'error': 'Unsupported format'}

    memory.log({
        'source': input_path,
        'type': fmt,
        'intent': intent,
        'values': result
    })
    print("--- Processing Complete ---")
    print(result)

if __name__ == '__main__':
    input_file = sys.argv[1]
    route_input(input_file)
