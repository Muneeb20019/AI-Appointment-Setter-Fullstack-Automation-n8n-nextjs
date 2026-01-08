import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Mic, Send, Bot, ShieldCheck, Image as ImageIcon, StopCircle } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const sessionId = "rave-user-muneeb-123";

  // --- Connection to n8n ---
  const sendToN8N = async (data, type) => {
    const userMsg = { id: Date.now(), role: "user", content: type === "text" ? data : "Sent " + type };
    setMessages((prev) => [...prev, userMsg]);

    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("type", type);

    if (type === "text") {
      formData.append("message", data);
    } else {
      // For Audio/Image, we name the file 'file' so n8n can see it
      formData.append("file", data, type === 'audio' ? 'speech.webm' : 'image.png');
    }

    try {
      const response = await fetch("https://muneeb0.app.n8n.cloud/webhook-test/rave-chat-logic", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      
      if (result.responses && Array.isArray(result.responses)) {
        result.responses.forEach((text, i) => {
          setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + i, role: "assistant", content: text }]);
          }, i * 800);
        });
      }
    } catch (error) {
      console.error("n8n Error:", error);
    }
  };

  // --- Robust Voice Recording Logic ---
  const startRecording = async () => {
    audioChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: true } 
      });
      
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        if (audioBlob.size > 2000) { // Ensure file isn't empty
          sendToN8N(audioBlob, "audio");
        } else {
          alert("Recording too short, please try again.");
        }
        // Turn off the red mic light on Chromebook
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone error: Please open this in a real tab and allow mic access.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
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
              <h1 className="font-bold text-slate-800 text-lg uppercase">FlowSystems</h1>
            </div>
            <div className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">SYSTEM ACTIVE</div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.length === 0 && (
              <div className="text-center text-slate-300 mt-20 flex flex-col items-center">
                <Bot size={40} className="mb-3 opacity-20" />
                <p className="text-sm italic">Task #1: Voice & Image Enabled.</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={m.role === "user" ? "p-3 px-4 rounded-2xl bg-blue-600 text-white max-w-[85%] shadow-md" : "p-3 px-4 rounded-2xl bg-slate-100 text-slate-800 max-w-[85%] border"}>
                  <p className="text-sm">{m.content}</p>
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
              onClick={isRecording ? stopRecording : startRecording} 
              className={`p-3 rounded-full border shadow-sm transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-slate-400'}`}
            >
              {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
            </button>

            <input 
              className="flex-1 p-3 px-5 border rounded-full outline-none text-sm bg-white border-slate-300" 
              placeholder={isRecording ? "Recording... Click Stop to send" : "Ask FlowSystems..."} 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && inputText && (sendToN8N(inputText, "text"), setInputText(""))}
            />
            <button onClick={() => { if(inputText) { sendToN8N(inputText, "text"); setInputText(""); } }} className="p-3 bg-blue-600 text-white rounded-full"><Send size={18} /></button>
          </div>
        </div>
      </main>
    </div>
  );
}