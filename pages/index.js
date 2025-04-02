import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [task, setTask] = useState('');

  const sendToGPT = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, data.reply]);
  };

  const addTask = async () => {
    await fetch('/api/send-task-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    alert('Đã gửi email với nhiệm vụ mới!');
    setTask('');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Apex Assistant</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Chat GPT</h2>
        <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 100 }}>
          {messages.map((m, i) => (
            <div key={i}><b>{m.role}:</b> {m.content}</div>
          ))}
        </div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập câu hỏi..." />
        <button onClick={sendToGPT}>Gửi</button>
      </section>

      <section>
        <h2>Tạo nhiệm vụ</h2>
        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Nhập tên nhiệm vụ..." />
        <button onClick={addTask}>Thêm & Gửi Email</button>
      </section>
    </main>
  );
}