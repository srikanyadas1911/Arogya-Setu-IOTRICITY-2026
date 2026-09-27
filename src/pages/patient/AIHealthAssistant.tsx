import { useState } from "react";
import {
    Bot,
    Send,
    UserRound,
    Sparkles,
    ShieldCheck,
    RotateCcw,
} from "lucide-react";

import "./AIHealthAssistant.css";

type Message = {
    id: number;
    sender: "assistant" | "user";
    text: string;
};

const initialMessages: Message[] = [
    {
        id: 1,
        sender: "assistant",
        text:
            "Hello! 👋 I'm your Arogya Setu AI Health Assistant. How can I help you today?",
    },
    {
        id: 2,
        sender: "assistant",
        text:
            "You can ask me about your medicines, appointments, prescriptions, or general health information.",
    },
];

const quickQuestions = [
    "What medicines do I have today?",
    "When is my next appointment?",
    "Explain my prescription",
    "How can I stay healthy?",
];

function AIHealthAssistant() {
    const [messages, setMessages] =
        useState<Message[]>(initialMessages);

    const [input, setInput] = useState("");

    const generateReply = (question: string) => {
        const lowerQuestion = question.toLowerCase();

        if (
            lowerQuestion.includes("medicine") ||
            lowerQuestion.includes("medicines")
        ) {
            return "According to your current medication schedule, you have Vitamin D at 8:00 AM, Metformin at 1:00 PM, Calcium at 6:00 PM, and Medicine X at 9:00 PM.";
        }

        if (
            lowerQuestion.includes("appointment") ||
            lowerQuestion.includes("doctor")
        ) {
            return "Your next appointment is with Dr. Ananya Sharma, General Physician, today at 10:30 AM. You can join the consultation from the Join Consultation section.";
        }

        if (
            lowerQuestion.includes("prescription")
        ) {
            return "Your latest prescription was issued by Dr. Ananya Sharma for Fever & Viral Infection. It contains 3 medicines.";
        }

        if (
            lowerQuestion.includes("healthy") ||
            lowerQuestion.includes("health")
        ) {
            return "For general wellness, focus on regular sleep, balanced meals, hydration, physical activity, and taking prescribed medicines on schedule.";
        }

        return "I can help you with your medicines, appointments, prescriptions, and general health information. Please tell me what you would like to know.";
    };

    const sendMessage = (messageText?: string) => {
        const text = (messageText ?? input).trim();

        if (!text) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text,
        };

        const assistantMessage: Message = {
            id: Date.now() + 1,
            sender: "assistant",
            text: generateReply(text),
        };

        setMessages((currentMessages) => [
            ...currentMessages,
            userMessage,
            assistantMessage,
        ]);

        setInput("");
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
                                Your intelligent health companion from Arogya Setu.
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

            {/* AI Disclaimer */}

            <div className="ai-disclaimer">
                <ShieldCheck size={19} />

                <span>
                    This AI assistant provides general health information
                    and does not replace professional medical advice.
                </span>
            </div>

            {/* Chat Layout */}

            <div className="ai-chat-container">

                {/* Chat Header */}

                <div className="chat-header">
                    <div className="chat-bot-avatar">
                        <Bot size={21} />
                    </div>

                    <div>
                        <strong>Arogya AI</strong>

                        <span>
                            <span className="online-dot"></span>
                            Online
                        </span>
                    </div>
                </div>

                {/* Messages */}

                <div className="chat-messages">

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${message.sender === "user"
                                    ? "user-message"
                                    : "assistant-message"
                                }`}
                        >

                            {message.sender === "assistant" && (
                                <div className="message-avatar assistant-avatar">
                                    <Bot size={17} />
                                </div>
                            )}

                            <div className="message-content">
                                <div className="message-bubble">
                                    {message.text}
                                </div>
                            </div>

                            {message.sender === "user" && (
                                <div className="message-avatar user-avatar">
                                    <UserRound size={17} />
                                </div>
                            )}

                        </div>
                    ))}

                </div>

                {/* Quick Questions */}

                <div className="quick-questions">

                    <div className="quick-title">
                        <Sparkles size={15} />
                        Suggested questions
                    </div>

                    <div className="quick-question-list">

                        {quickQuestions.map((question) => (
                            <button
                                key={question}
                                type="button"
                                onClick={() => sendMessage(question)}
                            >
                                {question}
                            </button>
                        ))}

                    </div>

                </div>

                {/* Input */}

                <div className="chat-input-area">

                    <input
                        type="text"
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Ask your health question..."
                    />

                    <button
                        type="button"
                        className="send-message-button"
                        onClick={() => sendMessage()}
                        disabled={!input.trim()}
                        title="Send message"
                    >
                        <Send size={19} />
                    </button>

                </div>

                <div className="chat-footer">
                    Arogya Setu AI • For informational purposes only
                </div>

            </div>

        </div>
    );
}

export default AIHealthAssistant;