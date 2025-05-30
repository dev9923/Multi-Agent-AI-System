# 🧠 Multi-Agent AI System

This project implements a multi-agent document router system that:
- Accepts inputs in Email, JSON, or PDF format
- Classifies format and intent
- Routes to a specialized agent (Email, JSON)
- Maintains shared memory/context using Redis or SQLite

---

## 🔧 How It Works

1. **Input** → Email / JSON / PDF
2. **Classifier Agent** → Identifies format and intent
3. **Routing** → Forwards to EmailAgent or JSONAgent
4. **Processing** → Data extracted and logged
5. **Shared Memory** → Stores thread ID, intent, metadata

---

## 🧠 Agents

- `ClassifierAgent`: Detects format and intent
- `EmailAgent`: Extracts sender, urgency, formats content
- `JSONAgent`: Validates and transforms structured data
- `MemoryStore`: Lightweight Redis or in-memory shared storage

---

## 📁 Sample Inputs

Located in the `/samples` folder:
- `email_sample.txt`
- `json_sample.json`
- `pdf_sample.pdf` *(placeholder)*

---

## 📋 Sample Log

Located in `/logs/output_log.txt`:


### Install
```bash
pip install -r requirements.txt
```

### Run
```bash
python main.py samples/email_sample.txt
```

Logs are saved in `logs/output_log.txt`.
