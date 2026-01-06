import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Mic, Send, Bot, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  
  // Requirement: Fixed session ID for memory
  const sessionId = "rave-user-muneeb-123";

  const sendToN8N = async (data, type) => {
    // 1. Show user message in chat
    const userMsg = { id: Date.now(), role: "user", content: type === "text" ? data : "Sent " + type };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Prepare data for n8n
    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("type", type);
    if (type === "text") formData.append("message", data);
    else formData.append("file", data);

    try {
      // 3. Send to your real n8n Webhook
      const response = await fetch("https://muneeb0.app.n8n.cloud/webhook-test/rave-chat-logic", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // 4. Split message logic: Expecting { "responses": ["part1", "part2"] }
      if (result.responses && Array.isArray(result.responses)) {
        result.responses.forEach((text, i) => {
          setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + i, role: "assistant", content: text }]);
          }, i * 800);
        });
      }
    } catch (error) {
      console.error("Connection Error:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        sendToN8N(blob, "audio");
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (e) { alert("Mic access denied"); }
  };

  return (
    <div className="app-shell">
      <Head>
        <title>FlowSystems Portal</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-slate-200 p-4 font-sans text-slate-900">
        <div className="w-full max-w-2xl h-[85vh] flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden border border-slate-300">
          
          <div className="p-5 border-b bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={24} />
              <h1 className="font-bold text-slate-800 text-lg uppercase tracking-tighter">FlowSystems</h1>
            </div>
            <div className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">CONNECTED</div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.length === 0 && (
              <div className="text-center text-slate-300 mt-20 flex flex-col items-center">
                <Bot size={40} className="mb-3 opacity-20" />
                <p className="text-sm">System Online. Send a message to n8n.</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={m.role === "user" ? "p-3 px-4 rounded-2xl bg-blue-600 text-white max-w-[85%] shadow-md" : "p-3 px-4 rounded-2xl bg-slate-100 text-slate-800 max-w-[85%] border"}>
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-slate-50 flex items-center gap-3">
            <label className="p-3 bg-white text-slate-400 border rounded-full cursor-pointer hover:text-blue-600">
               <ImageIcon size={20} />
               <input type="file" className="hidden" accept="image/*" onChange={(e) => sendToN8N(e.target.files[0], "image")} />
            </label>
            <button 
              onMouseDown={startRecording} 
              onMouseUp={() => { if(mediaRecorder.current) mediaRecorder.current.stop(); setIsRecording(false); }} 
              className={`p-3 rounded-full border shadow-sm ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-slate-400'}`}
            >
              <Mic size={20} />
            </button>
            <input 
              className="flex-1 p-3 px-5 border rounded-full outline-none text-sm bg-white" 
              placeholder="Type to n8n..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && inputText && (sendToN8N(inputText, "text"), setInputText(""))}
            />
            <button onClick={() => { if(inputText) { sendToN8N(inputText, "text"); setInputText(""); } }} className="p-3 bg-blue-600 text-white rounded-full shadow-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}