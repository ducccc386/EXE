/**
 * pages/ChatPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Trang nhắn tin real-time giữa gia sư và phụ huynh.
 * Hỗ trợ WebSocket (tự động fallback REST).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/usePreferences";
import { STORAGE_KEYS } from "../constants";
import {
  MOCK_FRIENDS,
  MOCK_MESSAGES,
  createChatSocket,
  sendMessageRest,
  markAsRead,
} from "../api/chatApi";

// ─── i18n ──────────────────────────────────────────────────────────────────────
const TEXT = {
  vi: {
    messaging:        "Nhắn tin",
    selectFriend:     "Chọn người để trò chuyện",
    noFriends:        "Chưa có bạn bè. Hãy kết nối để bắt đầu trò chuyện!",
    selectPrompt:     "Chọn người để bắt đầu trò chuyện",
    typeMessage:      "Nhập tin nhắn...",
    online:           "Đang hoạt động",
    offline:          "Ngoại tuyến",
    send:             "Gửi",
    today:            "Hôm nay",
    searchFriend:     "Tìm kiếm...",
    you:              "Bạn: ",
    unreadMessages:   (n) => `${n} tin chưa đọc`,
    tutor:            "Gia sư",
    parent:           "Phụ huynh",
    admin:            "Admin",
    connectionError:  "Mất kết nối. Đang thử lại...",
    connected:        "Đã kết nối",
  },
  en: {
    messaging:        "Messaging",
    selectFriend:     "Select a friend to chat with",
    noFriends:        "No friends yet. Add friends to start chatting!",
    selectPrompt:     "Select a friend to start chatting",
    typeMessage:      "Type a message...",
    online:           "Online",
    offline:          "Offline",
    send:             "Send",
    today:            "Today",
    searchFriend:     "Search...",
    you:              "You: ",
    unreadMessages:   (n) => `${n} unread`,
    tutor:            "Tutor",
    parent:           "Parent",
    admin:            "Admin",
    connectionError:  "Connection lost. Reconnecting...",
    connected:        "Connected",
  },
};

// ─── Avatar helper ─────────────────────────────────────────────────────────────
function Avatar({ name, size = "md", online }) {
  const initials = name
    ? name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase()
    : "?";

  const sizeClass = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }[size];

  // Deterministic color from name
  const colors = [
    "from-blue-400 to-blue-600",
    "from-orange-400 to-orange-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-teal-400 to-teal-600",
  ];
  const colorIdx = name
    ? name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length
    : 0;

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClass} rounded-full bg-gradient-to-br ${colors[colorIdx]} flex items-center justify-center text-white font-bold shadow-sm`}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
            online ? "bg-green-400" : "bg-gray-300"
          }`}
        />
      )}
    </div>
  );
}

// ─── Role badge ────────────────────────────────────────────────────────────────
function RoleBadge({ role, t }) {
  const map = {
    TUTOR:  { label: t.tutor,  cls: "bg-blue-50 text-blue-600 border-blue-100" },
    PARENT: { label: t.parent, cls: "bg-orange-50 text-orange-600 border-orange-100" },
    ADMIN:  { label: t.admin,  cls: "bg-gray-50 text-gray-600 border-gray-100" },
  };
  const { label, cls } = map[role] || map.ADMIN;
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

// ─── Friend list item ─────────────────────────────────────────────────────────
function FriendItem({ friend, active, onClick, t }) {
  return (
    <button
      onClick={() => onClick(friend)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left group ${
        active
          ? "bg-blue-50 border border-blue-100 shadow-sm"
          : "hover:bg-gray-50 border border-transparent"
      }`}
    >
      <Avatar name={friend.fullName} online={friend.online} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className={`text-sm font-semibold truncate ${active ? "text-blue-700" : "text-gray-800"}`}>
            {friend.fullName}
          </span>
          <span className="text-[10px] text-gray-400 flex-shrink-0">{friend.lastMessageTime}</span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <p className="text-xs text-gray-400 truncate">{friend.lastMessage}</p>
          {friend.unread > 0 && (
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
              {friend.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg, isMe }) {
  return (
    <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isMe
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
        }`}
      >
        <p>{msg.content}</p>
        <span
          className={`block text-[10px] mt-1 ${
            isMe ? "text-blue-200 text-right" : "text-gray-400"
          }`}
        >
          {msg.time}
        </span>
      </div>
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ t }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
        <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm font-medium">{t.selectPrompt}</p>
    </div>
  );
}

// ─── No friends state ──────────────────────────────────────────────────────────
function NoFriendsState({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm">{t.noFriends}</p>
    </div>
  );
}

// ─── Main ChatPage ────────────────────────────────────────────────────────────
export default function ChatPage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = TEXT[lang] || TEXT.vi;

  const [friends, setFriends]           = useState(MOCK_FRIENDS);
  const [filteredFriends, setFiltered]  = useState(MOCK_FRIENDS);
  const [selectedFriend, setSelected]   = useState(null);
  const [messages, setMessages]         = useState([]);
  const [input, setInput]               = useState("");
  const [search, setSearch]             = useState("");
  const [wsStatus, setWsStatus]         = useState("idle"); // idle | connected | error
  const [sending, setSending]           = useState(false);
  const [dropdownOpen, setDropdown]     = useState(false);

  const wsRef         = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef      = useRef(null);

  // ── Auto-scroll ──────────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Filter friends ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(friends);
    } else {
      const q = search.toLowerCase();
      setFiltered(friends.filter((f) => f.fullName.toLowerCase().includes(q)));
    }
  }, [search, friends]);

  // ── Load messages khi chọn friend ───────────────────────────────────────────
  useEffect(() => {
    if (!selectedFriend) return;
    const msgs = MOCK_MESSAGES[selectedFriend.id] || [];
    setMessages(msgs);

    // Mark as read
    if (selectedFriend.unread > 0) {
      setFriends((prev) =>
        prev.map((f) => (f.id === selectedFriend.id ? { ...f, unread: 0 } : f))
      );
      markAsRead(selectedFriend.id).catch(() => {});
    }

    // Focus input
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [selectedFriend]);

  // ── WebSocket setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!token) return;

    const ws = createChatSocket(token, {
      onOpen:  () => setWsStatus("connected"),
      onClose: () => setWsStatus("idle"),
      onError: () => setWsStatus("error"),
      onMessage: (payload) => {
        if (payload.senderId === selectedFriend?.id) {
          setMessages((prev) => [...prev, {
            id:       Date.now().toString(),
            senderId: payload.senderId,
            content:  payload.content,
            time:     new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
            type:     "text",
          }]);
        } else {
          // Update unread badge
          setFriends((prev) =>
            prev.map((f) =>
              f.id === payload.senderId
                ? { ...f, unread: (f.unread || 0) + 1, lastMessage: payload.content, lastMessageTime: "Vừa xong" }
                : f
            )
          );
        }
      },
    });

    wsRef.current = ws;
    return () => ws.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // ── Send message ─────────────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const content = input.trim();
    if (!content || !selectedFriend || sending) return;

    const newMsg = {
      id:       Date.now().toString(),
      senderId: "me",
      content,
      time:     new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      type:     "text",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Update friend preview
    setFriends((prev) =>
      prev.map((f) =>
        f.id === selectedFriend.id
          ? { ...f, lastMessage: content, lastMessageTime: newMsg.time }
          : f
      )
    );

    // Send via WebSocket or REST
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ receiverId: selectedFriend.id, content }));
    } else {
      setSending(true);
      try {
        await sendMessageRest(selectedFriend.id, content);
      } catch {
        // Silent fail — message already shown optimistically
      } finally {
        setSending(false);
      }
    }
  }, [input, selectedFriend, sending]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectFriend = (friend) => {
    setSelected(friend);
    setDropdown(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Connection status */}
        {wsStatus === "error" && (
          <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.connectionError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex"
          style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}>

          {/* ── Left Sidebar ──────────────────────────────────────────────────── */}
          <aside className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col bg-white">
            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-extrabold text-gray-900 mb-3">{t.messaging}</h2>

              {/* Dropdown select */}
              <div className="relative">
                <button
                  onClick={() => setDropdown((v) => !v)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm text-gray-500 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <span className="truncate">
                    {selectedFriend ? selectedFriend.fullName : t.selectFriend}
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-52 overflow-y-auto">
                    {friends.length === 0 ? (
                      <p className="px-4 py-3 text-sm text-gray-400">{t.noFriends}</p>
                    ) : (
                      friends.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => handleSelectFriend(f)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-left"
                        >
                          <Avatar name={f.fullName} size="sm" online={f.online} />
                          <span className="text-sm font-medium text-gray-700 truncate">{f.fullName}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.searchFriend}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-100 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Friend list */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 scrollbar-thin">
              {filteredFriends.length === 0 ? (
                <NoFriendsState t={t} />
              ) : (
                filteredFriends.map((friend) => (
                  <FriendItem
                    key={friend.id}
                    friend={friend}
                    active={selectedFriend?.id === friend.id}
                    onClick={handleSelectFriend}
                    t={t}
                  />
                ))
              )}
            </div>
          </aside>

          {/* ── Right: Chat Area ──────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0">
            {selectedFriend ? (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white flex-shrink-0">
                  <Avatar name={selectedFriend.fullName} size="md" online={selectedFriend.online} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{selectedFriend.fullName}</h3>
                      <RoleBadge role={selectedFriend.role} t={t} />
                    </div>
                    <p className={`text-xs mt-0.5 font-medium ${selectedFriend.online ? "text-green-500" : "text-gray-400"}`}>
                      {selectedFriend.online ? t.online : t.offline}
                    </p>
                  </div>

                  {/* WS indicator */}
                  {wsStatus === "connected" && (
                    <div className="ml-auto flex items-center gap-1.5 text-[11px] text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      {t.connected}
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50/60">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-gray-300">—</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        isMe={msg.senderId === "me"}
                      />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t.typeMessage}
                        rows={1}
                        style={{ resize: "none", maxHeight: "120px" }}
                        className="w-full px-4 py-2.5 pr-4 text-sm border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition placeholder-gray-300 leading-relaxed"
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || sending}
                      className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150 shadow-sm hover:shadow-md active:scale-95"
                    >
                      {sending ? (
                        <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No friend selected */
              <div className="flex flex-col h-full">
                <div className="px-5 py-3.5 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-400">{t.selectFriend}</h3>
                </div>
                <EmptyState t={t} />
                {/* Disabled input bar */}
                <div className="px-4 py-3 border-t border-gray-100 bg-white flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-4 py-2.5 text-sm border border-gray-100 rounded-2xl bg-gray-50 text-gray-300 cursor-not-allowed select-none">
                      {t.typeMessage}
                    </div>
                    <button disabled className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-not-allowed">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
