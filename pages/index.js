import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Mic, Send, Bot, Sparkles, Image as ImageIcon, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const sessionId = "rave-user-muneeb-123";

  const sendToN8N = async (data, type) => {
    const userMsg = { id: Date.now(), role: "user", content: type === "text" ? data : "Sent " + type };
    setMessages((prev) => [...prev, userMsg]);
    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("type", type);
    if (type === "text") formData.append("message", data);
    else formData.append("file", data);

    try {
      const response = await fetch("https://muneeb0.app.n8n.cloud/webhook-test/rave-chat-logic", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.responses) {
        result.responses.forEach((text, i) => {
          setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + i, role: "assistant", content: text }]);
          }, i * 800);
        });
      }
    } catch (error) { console.error("Error:", error); }
  };

  const toggleRecording = async () => {
    if (isRecording) { mediaRecorder.current?.stop(); setIsRecording(false); }
    else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        const chunks = [];
        mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.current.onstop = () => {
          sendToN8N(new Blob(chunks), "audio");
          stream.getTracks().forEach(t => t.stop());
        };
        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (e) { alert("Allow mic access in settings"); }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a] text-white">
      <Head>
        <title>AI Appointment Setter</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* DANCING BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], x: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0], x: [20, -20, 20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px]"
        />
      </div>

      <main className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl h-[85vh] flex flex-col bg-white/5 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden border border-white/10"
        >
          {/* Professional Header */}
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight">AI Appointment <span className="text-blue-400 font-light">Setter</span></h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Next-Gen Intelligence</p>
              </div>
            </div>
            <div className="px-4 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-green-400 font-bold uppercase">Online</span>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Bot size={64} className="mb-4 opacity-20" />
                <p className="text-sm">Welcome. How can I help you book your next session?</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-4 px-6 rounded-[1.5rem] max-w-[85%] shadow-xl ${
                    m.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-white/10 text-slate-100 rounded-tl-none border border-white/10"
                  }`}>
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Glowing Input Area */}
          <div className="p-8 bg-black/20">
            <div className="flex items-center gap-3 bg-white/5 p-2 px-3 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all">
              <label className="p-3 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                 <ImageIcon size={20} />
                 <input type="file" className="hidden" accept="image/*" onChange={(e) => sendToN8N(e.target.files[0], "image")} />
              </label>
              
              <button onClick={toggleRecording} className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:bg-white/5'}`}>
                {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>

              <input 
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500" 
                placeholder={isRecording ? "Listening..." : "Tell me when you're free..."} 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && inputText && (sendToN8N(inputText, "text"), setInputText(""))}
              />

              <button 
                onClick={() => { if(inputText) { sendToN8N(inputText, "text"); setInputText(""); } }} 
                className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        body { background: #0f172a; }
      `}</style>
    </div>
  );
}