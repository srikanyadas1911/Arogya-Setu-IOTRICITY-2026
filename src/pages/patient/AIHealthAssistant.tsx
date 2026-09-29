import { useState } from "react";
import {
    Bot,
    Send,
    UserRound,
    Sparkles,
    ShieldCheck,
    RotateCcw,
    BookOpen,
} from "lucide-react";
import { sendAIMessage } from "../../services/api";
import "./AIHealthAssistant.css";

type Message = {
    id: number;
    sender: "assistant" | "user";
    text: string;
    sources?: string[];
};

const initialMessages: Message[] = [
    {
        id: 1,
        sender: "assistant",
        text:
            "Hello! 👋 I'm your Arogya Setu AI Health Assistant, powered by our clinical RAG knowledge engine. How can I help you today?",
    },
    {
        id: 2,
        sender: "assistant",
        text:
            "You can ask me about medication schedules, consultation preparation, health tips, or lab readings. I'm here to assist your care journey.",
    },
];

const quickQuestions = [
    "How should I prepare for my upcoming consultation?",
    "What should I do if I miss a dose?",
    "How to manage high blood pressure at home?",
    "Explain prescription instructions",
];

function AIHealthAssistant() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (messageText?: string) => {
        const text = (messageText ?? input).trim();
        if (!text || isTyping) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text,
        };

        setMessages((current) => [...current, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const history = messages.map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
            }));

            const response = await sendAIMessage(text, history);

            const assistantMessage: Message = {
                id: Date.now() + 1,
                sender: "assistant",
                text: response.answer,
                sources: response.sources,
            };

            setMessages((current) => [...current, assistantMessage]);
        } catch {
            const fallbackMessage: Message = {
                id: Date.now() + 1,
                sender: "assistant",
                text: "I am ready to help. Please consult your physician for tailored clinical advice.",
            };
            setMessages((current) => [...current, fallbackMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const resetChat = () => {
        setMessages(initialMessages);
        setInput("");
    };

    return (
        <div className="ai-assistant-page">
            {/* Header */}
            <div className="ai-assistant-header">
                <div>
                    <div className="ai-title-row">
                        <div className="ai-main-icon">
                            <Bot size={25} />
                        </div>

                        <div>
                            <h1>AI Health Assistant</h1>
                            <p>
                                Clinical RAG knowledge &amp; triage assistant for Arogya Setu.
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="reset-chat-button"
                    onClick={resetChat}
                >
                    <RotateCcw size={16} />
                    New Chat
                </button>
            </div>

            {/* Disclaimer */}
            <div className="ai-disclaimer">
                <ShieldCheck size={20} />
                <p>
                    <strong>Medical Disclaimer:</strong> Arogya Setu AI provides evidence-based guidance and consultation preparation. It does not provide medical diagnoses or replace licensed physicians.
                </p>
            </div>

            {/* Quick Suggestions */}
            <div className="quick-questions-card">
                <div className="quick-title">
                    <Sparkles size={16} />
                    <span>Quick Suggestions</span>
                </div>

                <div className="quick-list">
                    {quickQuestions.map((question) => (
                        <button
                            key={question}
                            type="button"
                            className="quick-question-pill"
                            onClick={() => sendMessage(question)}
                        >
                            {question}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-container">
                <div className="messages-list">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message-row ${
                                message.sender === "user"
                                    ? "user-row"
                                    : "assistant-row"
                            }`}
                        >
                            <div className="message-avatar">
                                {message.sender === "user" ? (
                                    <UserRound size={17} />
                                ) : (
                                    <Bot size={17} />
                                )}
                            </div>

                            <div className="message-content">
                                <div style={{ whiteSpace: "pre-line" }}>
                                    {message.text}
                                </div>

                                {message.sources && message.sources.length > 0 && (
                                    <div style={{
                                        marginTop: "10px",
                                        paddingTop: "8px",
                                        borderTop: "1px dashed rgba(0,0,0,0.1)",
                                        fontSize: "11px",
                                        color: "var(--gray-500)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px"
                                    }}>
                                        <BookOpen size={13} color="var(--primary)" />
                                        <span>Sources: {message.sources.join(" • ")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message-row assistant-row">
                            <div className="message-avatar">
                                <Bot size={17} />
                            </div>
                            <div className="message-content" style={{ color: "var(--gray-500)", fontStyle: "italic" }}>
                                Analyzing query against clinical RAG guidelines...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="chat-input-section">
                    <div className="chat-input-box">
                        <textarea
                            placeholder="Ask about medications, symptoms, consultation prep..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            rows={1}
                        />

                        <button
                            type="button"
                            className="send-button"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isTyping}
                            style={{ opacity: !input.trim() || isTyping ? 0.6 : 1 }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIHealthAssistant;