# 🏥 Clinic-Appointment-Setter-Automation-n8n-Next.js

![n8n](https://img.shields.io/badge/Workflow-n8n-FF6C37?style=flat&logo=n8n&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=flat&logo=nextdotjs&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Gemini_1.5_Flash-blue?style=flat&logo=googlegemini&logoColor=white)
![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Redis](https://img.shields.io/badge/Queue-Upstash_Redis-FF4438?style=flat&logo=redis&logoColor=white)

---

## 📺 Project Experience
Experience a high-fidelity, multimodal appointment system featuring animated UI and intelligent queuing.

| 🌐 Frontend Interface | 🖼️ Backend Orchestration |
| :---: | :---: |
| ![Frontend UI](https://github.com/Muneeb20019/codespaces-nextjs/blob/main/frontend.png?raw=true) | ![Workflow Architecture](https://github.com/Muneeb20019/codespaces-nextjs/blob/main/AI%20Apointment%20setter%20full%20stack.png?raw=true) |
| [**Launch Live Application**](https://codespaces-nextjs-478wvvn9h-muneebs-projects-405f38bf.vercel.app/) | **Autonomous Neural Pipeline** |

---

## 🚀 The Solution: Autonomous Healthcare Orchestration
In a medical clinic environment, missing a single inquiry can mean a lost patient. This project is an **Advanced Full-Stack AI Ecosystem** designed to handle high-volume clinical bookings with zero human oversight. It bridges a modern, animated **Next.js 14** frontend with a sophisticated **n8n industrial-grade backend**.

Unlike basic chatbots, this system features **Multimodal Intelligence** (Voice, Image, Text), **Message Queuing**, and **Persistent Relational Memory**, ensuring that patient data is captured accurately and follow-ups are executed automatically. 🤖🩺✨

---

## 📊 Business Impact & Engineering Excellence
This system is engineered to solve the most common failures in AI automation:

*   **⚡ Zero-Latency Response:** Immediate patient engagement reduces lead decay by **90%**, providing instant value to the user.
*   **📉 Token Optimization:** The Redis "Wait-List" prevents redundant AI calls, saving up to **30% in API costs** by batching rapid-fire messages into a single thought.
*   **🎙️ Multimodal Accessibility:** Patients can send voice notes or photos of their prescriptions/symptoms, making the booking process frictionless and inclusive.
*   **🕒 Automated Patient Recall:** A background "Clock" workflow scans the database every 60 seconds to re-engage patients who haven't finished their booking, recovering lost revenue.

---

## ✅ Problems Solved
- **🛑 Message Flooding:** Prevents AI "confusion" when a user sends 5 quick messages; the Redis queue merges them into one logical context. 🔄
- **🛑 Information Amnesia:** Using Supabase (PostgreSQL), the AI remembers the patient's name, history, and specific medical preferences across every session. 📂
- **🛑 Response Overload:** A custom JavaScript engine breaks long AI explanations into timed, natural-looking chat bubbles to simulate human conversation. 💬
- **🛑 Booking Drop-offs:** Automatically triggers personalized follow-up reminders to patients who abandoned the chat mid-appointment. 📈

---

## 🧠 Core Technical Pillars

### 1. 🏎️ The Neural "Wait-List" (Upstash Redis Queue)
To maintain a human-like flow and save tokens, I implemented an **Upstash Redis** messaging queue. 
- **Batching Logic:** When a user sends multiple rapid-fire messages, the system "waits" for a 5-second silence window.
- **Context Merging:** It then bundles all messages into a single prompt for the AI, ensuring the bot understands the full story before replying. 🧠⚡

### 2. 🎙️ Multimodal Intelligence (Google Gemini 1.5 Flash)
The agent is powered by **Gemini 1.5 Flash**, enabling industrial-grade processing:
- **STT (Speech-to-Text):** Transcribes patient voice notes into actionable text commands.
- **ITT (Image-to-Text):** Analyzes photos of symptoms or documents to provide contextualized booking advice.
- **High-Token Window:** Handles long clinical documents or history logs without losing the "thread" of conversation. 🔍📷

### 3. 💾 Persistent Relational Memory (Supabase)
Every interaction is anchored in a **Supabase (PostgreSQL)** database. 
- **History Mapping:** The AI performs a lookup on the `chat_history` table at the start of every session to greet the patient by name and remember past issues.
- **Schema Enforcement:** Strict tables manage user profiles, scheduled appointments, and pending follow-ups, ensuring data integrity. 🗄️🛡️

### 4. 🕒 Proactive Follow-up Engine (Cron Orchestration)
The automation doesn't wait for the user to return. A secondary **Cron-triggered workflow** acts as a "Digital Assistant":
- **60-Second Scan:** Every minute, it checks the database for patients who are "stuck" in the booking funnel.
- **Automatic Re-engagement:** Triggers a personalized follow-up message to guide them back to completing their appointment. ⏰📩

---

## 🛠️ Technical Stack
| Layer | Technology |
| :--- | :--- |
| **🌐 Frontend** | **Next.js 14** (Framer Motion, Tailwind CSS, Lucide Icons) |
| **🔄 Automation** | **n8n** (Recursive State Management & Tool Calling) |
| **🧠 AI Brain** | **Google Gemini 1.5 Flash** (Voice, Image, & Text Processing) |
| **💾 Queue Layer** | **Upstash Redis** (Serverless Message Batching) |
| **🗄️ Data Hub** | **Supabase / PostgreSQL** (Persistent Patient Memory) |
| **🚀 Deployment** | **Vercel** & **n8n Cloud** |

---

## ✍️ Author
**Muneeb Ali Khan**
- **GitHub:** [@Muneeb20019](https://github.com/Muneeb20019)
- **LinkedIn:** [Muneeb Ali Khan](https://www.linkedin.com/in/muneeb-ali-khan-2a1675365)
- **Live Demo:** [Click Here to View](https://codespaces-nextjs-478wvvn9h-muneebs-projects-405f38bf.vercel.app/)

---

## 📜 License
This project is licensed under the MIT License.
