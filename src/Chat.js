import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;
        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message: input });
            const botMessage = { role: "bot", content: response.data.response };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error communicating with the chatbot:", error);
        }

        setInput("");
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role === "user" ? "user-message" : "bot-message"}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
