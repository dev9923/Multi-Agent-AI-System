# Multi-Agent AI system

This project implements a multi-agent AI system that:
- Accepts inputs in Email, JSON, or PDF format
- Classifies format and intent
- Routes to a specialized agent (Email, JSON)
- Maintains shared memory/context using Redis or SQLite

## Run Locally

### Install
```bash
pip install -r requirements.txt
```

### Run
```bash
python main.py samples/email_sample.txt
```

Logs are saved in `logs/output_log.txt`.
