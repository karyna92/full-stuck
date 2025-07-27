import { useState, useRef, useEffect } from "react";
import { getBot } from "../../api/userApi";
import styles from "./SupportChat.module.css";

const SupportChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Привіт! Я — ваш віртуальний помічник. Питайте про тарифи, замовлення або щось інше 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await getBot({ message: input });
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res?.data?.reply || "🤖 Не можу відповісти..." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "😓 Помилка з'єднання із сервером" },
      ]);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatWindow}>
        <div className={styles.header}>
          Чат підтримки
          <button className={styles.link} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body} ref={bodyRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.from === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Напишіть повідомлення..."
          />
          <button onClick={sendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

export default SupportChatModal;
