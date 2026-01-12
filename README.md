# 🤖 AI Appointment Setter: Full-Stack Automation 🚀

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg?style=for-the-badge)](https://codespaces-nextjs-478wvvn9h-muneebs-projects-405f38bf.vercel.app/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge)](https://vercel.com)
[![n8n](https://img.shields.io/badge/Backend-n8n-orange?style=for-the-badge)](https://n8n.io)

An advanced, full-stack AI automation system designed to manage high-volume client bookings. This system features a modern "dancing" animated UI and a sophisticated backend logic that processes voice, images, and text through industrial-grade queuing and persistent memory.

### 🔗 [Launch the Live Application](https://codespaces-nextjs-478wvvn9h-muneebs-projects-405f38bf.vercel.app/)

---

## 🖼️ System Showcase
| Frontend UI  | Backend n8n Logic System |
|---|---|
| ![Frontend Preview](https://github.com/Muneeb20019/codespaces-nextjs/blob/main/frontend.png?raw=true) | ![Workflow Architecture](https://github.com/Muneeb20019/codespaces-nextjs/blob/main/AI%20Apointment%20setter%20full%20stack.png?raw=true) |

---

## 💎 High-Impact Features

- **🎙️ Multimodal Intelligence (STT/ITT):** Integrated Google Gemini 1.5 Flash to transcribe voice notes and analyze images instantly, allowing users to "show or tell" the AI what they need.
- **⏳ Redis "Wait-List" Queue:** Implements an **Upstash Redis** messaging queue that "batches" multiple rapid-fire messages sent within 5 seconds, processing them as one single request to maintain context and reduce API costs.
- **🧠 Persistent Database Memory:** Powered by **Supabase (PostgreSQL)**, enabling the AI to remember user names, past interactions, and specific preferences across different sessions.
- **💬 Multi-Bubble Splitting Logic:** A custom JavaScript engine that breaks down long AI responses into separate, timed chat bubbles, creating a more natural and human-like user experience.
- **📅 Proactive Follow-up Logic:** A background "Clock" workflow that scans the PostgreSQL database every 60 seconds to automatically trigger scheduled follow-up reminders.

---

## 🚀 Business Logic & Efficiency (Out-of-the-Box Thinking)

Instead of a standard "question-answer" bot, this system was engineered for real-world efficiency:

1. **The Token Saver:** The Redis Queue prevents the AI from triggering 5 separate (expensive) responses if a user sends 5 quick messages. It bundles them into one single logical thought.
2. **The "Non-Hallucination" Protocol:** Strict **System Instructions** and **Input Schemas** ensure the AI actually writes data to the database before confirming success to the user.
3. **The UX Orchestrator:** Large blocks of AI text are overwhelming. This system uses a `|||` delimiter and Regex-based cleaning to provide a segmented, professional conversation flow.

---

## 🛠️ Technical Stack

- **Frontend:** Next.js (React), Tailwind CSS, **Framer Motion** (Animations), Lucide Icons.
- **Automation:** n8n Workflow Engine.
- **Intelligence:** Google Gemini 1.5 Flash.
- **Data Layers:** 
    - **Upstash:** Serverless Redis for message queuing.
    - **Supabase:** PostgreSQL for chat history and follow-up tables.
- **Hosting:** Vercel (Frontend) & n8n Cloud (Backend).

---

## ✍️ Author
**Muneeb Ali Khan**  
*AI Automation Engineer*  
[GitHub Profile](https://github.com/Muneeb20019) | [LinkedIn Profile](https://linkedin.com/in/yourprofile)
