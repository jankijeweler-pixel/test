import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919999769192?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#4A7C59] hover:bg-[#2D5A27] text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
          <div className="bg-[#2D5A27] p-4 text-white">
            <h3 className="font-bold">Chat with Us</h3>
            <p className="text-sm text-#E8F5E9">Typically replies within minutes</p>
          </div>
          <div className="p-4 bg-[#e5ddd5] dark:bg-gray-800 h-48 overflow-y-auto">
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none shadow-sm mb-3 max-w-[80%]">
              <p className="text-sm dark:text-white">Hello! How can we help you today? 😊</p>
              <span className="text-xs text-gray-400 mt-1 block">Just now</span>
            </div>
          </div>
          <div className="p-3 border-t dark:border-gray-700 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-#F1F8E90 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 bg-[#2D5A27] text-white rounded-full flex items-center justify-center hover:bg-[#1E3D1A]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
