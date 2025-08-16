import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProductDetailsSlideup from '../../components/ui/ProductDetailsSlideup';
import AuthenticationModal from '../../components/ui/AuthenticationModal';

import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import QuickActions from './components/QuickActions';
import TypingIndicator from './components/TypingIndicator';
import WelcomeMessage from './components/WelcomeMessage';

const LumiChatConsultationInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Mock product data
  const mockProducts = [
    {
      id: 'lumiskin-vitamin-c-serum',
      name: 'Vitamin C Brightening Serum',
      brand: 'LumiSkin',
      price: 2499,
      originalPrice: 3299,
      image: 'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?w=300&h=300&fit=crop',
      description: `Advanced Vitamin C serum with 20% L-Ascorbic Acid for radiant, even-toned skin.\n\nThis powerful antioxidant serum helps reduce dark spots, brighten complexion, and protect against environmental damage. Perfect for daily use to achieve that coveted glow.`,
      keyIngredients: ['Vitamin C 20%', 'Hyaluronic Acid', 'Vitamin E', 'Ferulic Acid'],
      variants: [
        { id: 'serum-30ml', size: '30ml', price: 2499 },
        { id: 'serum-50ml', size: '50ml', price: 3999 }
      ],
      images: [
        'https://images.pexels.com/photos/7755226/pexels-photo-7755226.jpeg?w=400&h=400&fit=crop',
        'https://images.pixabay.com/photo/2020/05/25/20/14/soap-5219020_1280.jpg?w=400&h=400&fit=crop'
      ]
    },
    {
      id: 'lumiskin-niacinamide-serum',
      name: 'Niacinamide Pore Refining Serum',
      brand: 'LumiSkin',
      price: 1899,
      originalPrice: 2499,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
      description: `10% Niacinamide serum that minimizes pores, controls oil production, and improves skin texture.\n\nFormulated with zinc and botanical extracts to balance sebum production while maintaining skin hydration. Ideal for oily and combination skin types.`,
      keyIngredients: ['Niacinamide 10%', 'Zinc PCA', 'Hyaluronic Acid', 'Green Tea Extract'],
      variants: [
        { id: 'niacinamide-30ml', size: '30ml', price: 1899 }
      ],
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop'
      ]
    },
    {
      id: 'lumiskin-retinol-cream',
      name: 'Advanced Retinol Night Cream',
      brand: 'LumiSkin',
      price: 3299,
      originalPrice: 4199,
      image: 'https://images.pexels.com/photos/7755224/pexels-photo-7755224.jpeg?w=300&h=300&fit=crop',
      description: `Gentle yet effective retinol cream that reduces fine lines, improves skin texture, and promotes cell renewal.\n\nEnriched with ceramides and peptides to minimize irritation while delivering powerful anti-aging benefits. Use 2-3 times per week initially.`,
      keyIngredients: ['Retinol 0.5%', 'Ceramides', 'Peptides', 'Squalane'],
      variants: [
        { id: 'retinol-50ml', size: '50ml', price: 3299 }
      ],
      images: [
        'https://images.pexels.com/photos/7755224/pexels-photo-7755224.jpeg?w=400&h=400&fit=crop'
      ]
    }
  ];

  // Assessment flow data
  const assessmentFlow = {
    skin_analysis: [
      {
        question: "Let\'s start with your skin type! How would you describe your skin? 🤔",
        options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'],
        key: 'skinType'
      },
      {
        question: "What are your main skin concerns? (You can choose multiple) 💭",
        options: ['Acne', 'Dark Spots', 'Fine Lines', 'Dullness', 'Large Pores', 'Dryness'],
        key: 'skinConcerns',
        multiple: true
      },
      {
        question: "How\'s your current skincare routine? ✨",
        options: ['Just starting out', 'Basic routine', 'Comprehensive routine', 'Professional treatments'],
        key: 'routineLevel'
      }
    ]
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = (duration = 2000) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, duration);
    });
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: Date.now() + Math.random(),
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async (content) => {
    // Add user message
    addMessage({
      sender: 'user',
      type: 'text',
      content,
      status: 'sent'
    });

    setShowQuickActions(false);

    // Simulate Lumi's response
    await simulateTyping(1500);

    // Generate contextual response
    const response = generateLumiResponse(content);
    addMessage(response);
  };

  const generateLumiResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();

    // Product recommendation triggers
    if (lowerMessage?.includes('recommend') || lowerMessage?.includes('product') || lowerMessage?.includes('suggest')) {
      return {
        sender: 'lumi',
        type: 'product_recommendation',
        content: `Based on what you've shared, I've found some amazing LumiSkin products that would be perfect for you! ✨\n\nThese are carefully selected to address your specific skin needs:`,
        products: mockProducts?.slice(0, 2)
      };
    }

    // Skin analysis triggers
    if (lowerMessage?.includes('skin') && (lowerMessage?.includes('analysis') || lowerMessage?.includes('assess'))) {
      startAssessment('skin_analysis');
      return {
        sender: 'lumi',
        type: 'assessment',
        content: "Perfect! I'd love to help you understand your skin better. Let's do a quick assessment! 🌟\n\nThis will help me recommend the most suitable products for you.",
        options: assessmentFlow?.skin_analysis?.[0]?.options,
        assessmentKey: 'skin_analysis',
        questionIndex: 0
      };
    }

    // Ingredient information
    if (lowerMessage?.includes('ingredient') || lowerMessage?.includes('vitamin c') || lowerMessage?.includes('retinol') || lowerMessage?.includes('niacinamide')) {
      return {
        sender: 'lumi',
        type: 'text',
        content: `Great question about ingredients! 🧪✨\n\nLet me share some key insights:\n\n🌟 **Vitamin C**: Brightens skin, reduces dark spots, and provides antioxidant protection\n🌟 **Retinol**: Reduces fine lines, improves texture, and promotes cell renewal\n🌟 **Niacinamide**: Minimizes pores, controls oil, and strengthens skin barrier\n\nWould you like specific product recommendations based on any of these ingredients?`
      };
    }

    // Routine help
    if (lowerMessage?.includes('routine') || lowerMessage?.includes('order') || lowerMessage?.includes('steps')) {
      return {
        sender: 'lumi',
        type: 'text',
        content: `I'd love to help you build the perfect skincare routine! 📋✨\n\n**Basic Routine Order:**\n1. Cleanser\n2. Toner (optional)\n3. Serum (Vitamin C in AM, Retinol in PM)\n4. Moisturizer\n5. Sunscreen (AM only)\n\n**Pro Tips:**\n• Start with 1-2 products and gradually add more\n• Always patch test new products\n• Consistency is key! 💪\n\nWhat's your current routine like? I can help you optimize it!`
      };
    }

    // Default friendly responses
    const responses = [
      `That's interesting! Tell me more about your skin concerns so I can help you better. 😊\n\nAre you looking for products to address specific issues like acne, dryness, or aging?`,
      `I'm here to help with all your skincare questions! 💫\n\nWould you like me to:\n• Analyze your skin type\n• Recommend products\n• Explain ingredients\n• Help build a routine?`,
      `Thanks for sharing that with me! 🌟\n\nTo give you the best recommendations, could you tell me about your skin type and main concerns?`,
      `I love helping with skincare journeys! ✨\n\nLet me know what specific areas you'd like to focus on - whether it's brightening, anti-aging, acne care, or general maintenance.`
    ];

    return {
      sender: 'lumi',
      type: 'text',
      content: responses?.[Math.floor(Math.random() * responses?.length)]
    };
  };

  const startAssessment = (type) => {
    setCurrentAssessment({
      type,
      currentQuestion: 0,
      answers: {}
    });
  };

  const handleQuickReply = async (option) => {
    // Add user's quick reply
    addMessage({
      sender: 'user',
      type: 'text',
      content: option,
      status: 'sent'
    });

    await simulateTyping(1000);

    // Handle assessment flow
    if (currentAssessment) {
      const assessment = assessmentFlow?.[currentAssessment?.type];
      const currentQ = assessment?.[currentAssessment?.currentQuestion];
      
      // Store answer
      const updatedAnswers = {
        ...currentAssessment?.answers,
        [currentQ?.key]: currentQ?.multiple 
          ? [...(currentAssessment?.answers?.[currentQ?.key] || []), option]
          : option
      };

      // Check if there are more questions
      if (currentAssessment?.currentQuestion < assessment?.length - 1) {
        const nextQuestion = assessment?.[currentAssessment?.currentQuestion + 1];
        setCurrentAssessment({
          ...currentAssessment,
          currentQuestion: currentAssessment?.currentQuestion + 1,
          answers: updatedAnswers
        });

        addMessage({
          sender: 'lumi',
          type: 'progress',
          content: `Great choice! ${option} - noted! 📝\n\n${nextQuestion?.question}`,
          progress: Math.round(((currentAssessment?.currentQuestion + 1) / assessment?.length) * 100),
          options: nextQuestion?.options,
          assessmentKey: currentAssessment?.type,
          questionIndex: currentAssessment?.currentQuestion + 1
        });
      } else {
        // Assessment complete
        setCurrentAssessment(null);
        completeAssessment(updatedAnswers);
      }
    } else {
      // Handle regular quick reply
      const response = generateLumiResponse(option);
      addMessage(response);
    }
  };

  const completeAssessment = (answers) => {
    // Generate personalized recommendations based on assessment
    let recommendedProducts = [];
    
    if (answers?.skinType === 'Oily' || answers?.skinConcerns?.includes('Large Pores')) {
      recommendedProducts?.push(mockProducts?.[1]); // Niacinamide
    }
    
    if (answers?.skinConcerns?.includes('Dark Spots') || answers?.skinConcerns?.includes('Dullness')) {
      recommendedProducts?.push(mockProducts?.[0]); // Vitamin C
    }
    
    if (answers?.skinConcerns?.includes('Fine Lines') || answers?.routineLevel === 'Comprehensive routine') {
      recommendedProducts?.push(mockProducts?.[2]); // Retinol
    }

    // Fallback to first product if no specific matches
    if (recommendedProducts?.length === 0) {
      recommendedProducts = [mockProducts?.[0]];
    }

    addMessage({
      sender: 'lumi',
      type: 'product_recommendation',
      content: `Perfect! Based on your assessment, I've curated the ideal LumiSkin products for your ${answers?.skinType?.toLowerCase()} skin! 🎯✨\n\nThese recommendations are specifically chosen to address your concerns and fit your routine level:`,
      products: recommendedProducts?.slice(0, 3)
    });
  };

  const handleQuickAction = async (actionId) => {
    setShowQuickActions(false);
    
    await simulateTyping(1000);

    switch (actionId) {
      case 'skin_analysis': startAssessment('skin_analysis');
        addMessage({
          sender: 'lumi',
          type: 'assessment',
          content: "Wonderful! Let's analyze your skin to find the perfect products for you! 🔍✨\n\nI'll ask you a few quick questions to understand your skin better.",
          options: assessmentFlow?.skin_analysis?.[0]?.options,
          assessmentKey: 'skin_analysis',
          questionIndex: 0
        });
        break;

      case 'product_recommendation':
        addMessage({
          sender: 'lumi',
          type: 'product_recommendation',
          content: "Here are some of our most popular LumiSkin products! These are loved by thousands of customers for their effectiveness and quality. ⭐\n\nWhich one catches your eye?",
          products: mockProducts
        });
        break;

      case 'routine_help':
        addMessage({
          sender: 'lumi',
          type: 'text',
          content: `I'd love to help you create the perfect skincare routine! 📋💫\n\n**The Golden Rules:**\n\n🌅 **Morning Routine:**\n• Gentle cleanser\n• Vitamin C serum\n• Moisturizer\n• Sunscreen (SPF 30+)\n\n🌙 **Evening Routine:**\n• Cleanser\n• Treatment serum (Retinol/Niacinamide)\n• Night moisturizer\n\n**Pro Tips:**\n• Start slow with active ingredients\n• Always patch test new products\n• Consistency beats perfection! 💪\n\nWhat's your current routine like? I can help you optimize it!`
        });
        break;

      case 'ingredient_info':
        addMessage({
          sender: 'lumi',
          type: 'text',
          content: `Let me share the magic behind LumiSkin's powerful ingredients! 🧪✨\n\n🌟 **Star Ingredients:**\n\n**Vitamin C** - The glow-getter! Brightens, protects, and evens skin tone\n**Retinol** - The age-defier! Smooths lines and improves texture\n**Niacinamide** - The multitasker! Controls oil, minimizes pores\n**Hyaluronic Acid** - The hydrator! Plumps and moisturizes\n**Ceramides** - The protector! Strengthens skin barrier\n\n💡 **Fun Fact:** All our ingredients are carefully selected and tested for maximum efficacy and gentleness!\n\nWhich ingredient interests you most? I can recommend specific products! 🎯`
        });
        break;

      default:
        addMessage({
          sender: 'lumi',
          type: 'text',
          content: "I'm here to help with all your skincare needs! What would you like to know more about? 😊✨"
        });
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleImageUpload = async (file) => {
    // Add user message about image upload
    addMessage({
      sender: 'user',
      type: 'text',
      content: '📸 *Uploaded skin photo*',
      status: 'sent'
    });

    await simulateTyping(3000);

    // Simulate AI analysis response
    addMessage({
      sender: 'lumi',
      type: 'text',
      content: `Thank you for sharing your photo! 📸✨\n\nI can see your skin has some lovely qualities! Based on the image analysis, I notice:\n\n🔍 **Observations:**\n• Generally healthy skin tone\n• Some areas that could benefit from hydration\n• Good overall skin texture\n\n💡 **My Recommendations:**\n• Focus on gentle hydration\n• Consider vitamin C for brightness\n• Don't forget daily SPF protection!\n\nWould you like specific product recommendations based on this analysis?`
    });
  };

  const handleMenuClick = () => {
    navigate('/consultation-history-profile');
  };

  const handleSettingsClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthenticated = (userData) => {
    setUserProfile(userData);
    // Could trigger personalized greeting here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ContextualHeader 
        title="Lumi Skincare Consultant"
        onSearchClick={() => {}}
        onSettingsClick={handleSettingsClick}
      />
      {/* Main Chat Area */}
      <div className="pt-16 md:pt-30 pb-20 md:pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Chat Messages */}
          <div className="px-4 py-6 space-y-4">
            {/* Welcome Message */}
            <WelcomeMessage />

            {/* Quick Actions (shown when no messages) */}
            {showQuickActions && messages?.length === 0 && (
              <QuickActions 
                onActionClick={handleQuickAction}
                disabled={isTyping}
              />
            )}

            {/* Messages */}
            {messages?.map((message) => (
              <ChatMessage
                key={message?.id}
                message={message}
                onProductClick={handleProductClick}
                onQuickReply={handleQuickReply}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      {/* Chat Input */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            onImageUpload={handleImageUpload}
            disabled={isTyping}
          />
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Product Details Slideup */}
      <ProductDetailsSlideup
        isOpen={showProductDetails}
        onClose={() => setShowProductDetails(false)}
        product={selectedProduct}
        sourceContext="chat"
      />
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
        initialMode="login"
      />
    </div>
  );
};

export default LumiChatConsultationInterface;