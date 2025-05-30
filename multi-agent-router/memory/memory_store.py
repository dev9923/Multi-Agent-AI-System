from datetime import datetime

class MemoryStore:
    def __init__(self):
        self.store = []

    def log(self, entry):
        entry['timestamp'] = str(datetime.now())
        entry['thread_id'] = f"entry_{len(self.store)+1:03}"
        self.store.append(entry)
        with open('logs/output_log.txt', 'a') as f:
            f.write(str(entry) + '\n')
        print(f"Logged entry: {entry['thread_id']}")
