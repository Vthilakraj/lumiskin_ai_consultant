import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, onImageUpload, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😍', '🤔', '😢', '😴', '🌟', '💖', '👍', '🙏', '✨'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-xl p-3 shadow-warm-lg">
          <div className="flex flex-wrap gap-2">
            {emojis?.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2 p-4 bg-card border-t border-border">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Lumi about your skincare concerns..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-xl border border-border bg-input px-4 py-3 pr-20 font-body text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              overflowY: message?.length > 100 ? 'auto' : 'hidden'
            }}
          />
          
          {/* Input Actions */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-8 h-8"
              disabled={disabled}
            >
              <Icon name="Smile" size={16} />
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
              className="w-8 h-8"
              disabled={disabled}
            >
              <Icon name="Camera" size={16} />
            </Button>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="w-12 h-12 rounded-xl flex-shrink-0"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;