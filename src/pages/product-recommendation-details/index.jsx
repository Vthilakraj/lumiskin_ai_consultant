import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import IngredientsSection from './components/IngredientsSection';
import UsageInstructions from './components/UsageInstructions';
import CustomerTestimonials from './components/CustomerTestimonials';
import StickyBottomBar from './components/StickyBottomBar';
import SimilarProducts from './components/SimilarProducts';

const ProductRecommendationDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id') || '1';
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProducts = {
    '1': {
      id: '1',
      name: 'LumiSkin Vitamin C Brightening Serum',
      brand: 'LumiSkin',
      category: 'Face Serum',
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      priceNote: 'Inclusive of all taxes • Free shipping above ₹999',
      rating: 4.8,
      reviewCount: 1247,
      inStock: true,
      stockCount: 7,
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop'
      ],
      keyBenefits: [
        'Brightens dull skin in 2 weeks',
        'Reduces dark spots & pigmentation',
        'Boosts natural collagen production',
        'Provides antioxidant protection',
        'Suitable for all skin types',
        'Dermatologically tested'
      ],
      variants: [
        { id: 'v1', size: '15ml', price: 1299 },
        { id: 'v2', size: '30ml', price: 2499 },
        { id: 'v3', size: '50ml', price: 3999 }
      ],
      description: `Transform your skin with our premium Vitamin C Brightening Serum, formulated with 20% L-Ascorbic Acid and natural botanical extracts. This powerful serum works to brighten dull skin, reduce dark spots, and provide long-lasting hydration.\n\nOur unique formula combines the potency of Vitamin C with gentle, skin-loving ingredients like Hyaluronic Acid and Niacinamide to deliver visible results without irritation. Perfect for daily use, this serum helps achieve a radiant, even-toned complexion.`,
      keyIngredients: [
        {
          name: 'Vitamin C (L-Ascorbic Acid)',
          type: 'active',
          concentration: '20%',
          description: 'A powerful antioxidant that brightens skin, stimulates collagen production, and protects against environmental damage. Our stabilized form ensures maximum potency and minimal irritation.',
          benefits: [
            'Brightens and evens skin tone',
            'Stimulates collagen synthesis',
            'Provides antioxidant protection',
            'Reduces appearance of fine lines'
          ],
          suitableFor: 'All skin types, especially dull and aging skin'
        },
        {
          name: 'Hyaluronic Acid',
          type: 'natural',
          concentration: '2%',
          description: 'A naturally occurring humectant that can hold up to 1000 times its weight in water, providing intense hydration and plumping effects.',
          benefits: [
            'Provides deep hydration',
            'Plumps and smooths skin',
            'Reduces appearance of fine lines',
            'Maintains skin barrier function'
          ],
          suitableFor: 'All skin types, especially dry and dehydrated skin'
        },
        {
          name: 'Niacinamide (Vitamin B3)',
          type: 'scientific',
          concentration: '5%',
          description: 'A versatile ingredient that helps regulate oil production, minimize pores, and improve skin texture while being gentle on sensitive skin.',
          benefits: [
            'Regulates sebum production',
            'Minimizes pore appearance',
            'Improves skin texture',
            'Reduces inflammation'
          ],
          suitableFor: 'Oily, combination, and sensitive skin'
        },
        {
          name: 'Rosehip Seed Oil',
          type: 'natural',
          concentration: '3%',
          description: 'Rich in essential fatty acids and vitamins A and C, this natural oil helps regenerate skin cells and improve skin texture.',
          benefits: [
            'Promotes skin regeneration',
            'Improves skin texture',
            'Provides natural moisture',
            'Rich in antioxidants'
          ],
          suitableFor: 'Mature, dry, and damaged skin'
        }
      ],
      usageInstructions: [
        {
          step: 1,
          timing: 'Morning & Evening',
          description: 'Cleanse your face thoroughly with a gentle cleanser and pat dry with a clean towel.',
          tips: 'Use lukewarm water to avoid stripping natural oils from your skin.'
        },
        {
          step: 2,
          timing: 'After cleansing',
          description: 'Apply 2-3 drops of serum to your fingertips and gently pat onto face and neck, avoiding the eye area.',
          tips: 'Start with 1-2 drops if you have sensitive skin and gradually increase as your skin builds tolerance.',
          warning: 'Avoid direct contact with eyes. If contact occurs, rinse thoroughly with water.'
        },
        {
          step: 3,
          timing: 'Wait 10-15 minutes',
          description: 'Allow the serum to fully absorb before applying moisturizer or sunscreen.',
          tips: 'Use this time for other parts of your skincare routine like applying eye cream.'
        },
        {
          step: 4,
          timing: 'Morning use',
          description: 'Always follow with a broad-spectrum SPF 30+ sunscreen during the day as Vitamin C can increase photosensitivity.',
          warning: 'Sun protection is essential when using Vitamin C products to prevent irritation and maximize benefits.'
        }
      ],
      testimonials: [
        {
          customerName: 'Priya Sharma',
          customerImage: 'https://randomuser.me/api/portraits/women/32.jpg',
          rating: 5,
          timeAgo: '2 weeks ago',
          skinType: 'Combination Skin',
          concerns: ['Dark Spots', 'Dullness'],
          review: 'This serum has completely transformed my skin! I noticed brighter, more even-toned skin within just 10 days. The dark spots from old acne are fading beautifully. The texture is lightweight and absorbs quickly without any stickiness.',
          beforeAfter: {
            before: 'https://images.unsplash.com/photo-1594824804732-ca8db4a6e69c?w=200&h=200&fit=crop',
            after: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=200&fit=crop',
            duration: '3 weeks'
          }
        },
        {
          customerName: 'Anita Patel',
          customerImage: 'https://randomuser.me/api/portraits/women/45.jpg',
          rating: 5,
          timeAgo: '1 month ago',
          skinType: 'Dry Skin',
          concerns: ['Fine Lines', 'Dullness'],
          review: 'At 35, I was looking for something to help with early signs of aging. This Vitamin C serum has exceeded my expectations! My skin looks more radiant and the fine lines around my eyes have softened significantly.',
          beforeAfter: {
            before: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop',
            after: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop',
            duration: '6 weeks'
          }
        },
        {
          customerName: 'Meera Reddy',
          customerImage: 'https://randomuser.me/api/portraits/women/28.jpg',
          rating: 4,
          timeAgo: '3 weeks ago',
          skinType: 'Sensitive Skin',
          concerns: ['Pigmentation', 'Uneven Tone'],
          review: 'I have very sensitive skin and was hesitant to try Vitamin C, but this formula is so gentle! No irritation at all, and my melasma patches are definitely lighter. Will definitely repurchase.',
          beforeAfter: null
        }
      ]
    }
  };

  const similarProducts = [
    {
      id: '2',
      name: 'LumiSkin Niacinamide Pore Refining Serum',
      brand: 'LumiSkin',
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      rating: 4.7,
      reviewCount: 892,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'LumiSkin Retinol Anti-Aging Night Serum',
      brand: 'LumiSkin',
      price: 3299,
      originalPrice: 4199,
      discount: 21,
      rating: 4.9,
      reviewCount: 654,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'LumiSkin Hyaluronic Acid Hydrating Serum',
      brand: 'LumiSkin',
      price: 2199,
      originalPrice: 2899,
      discount: 24,
      rating: 4.6,
      reviewCount: 1123,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop'
    },
    {
      id: '5',
      name: 'LumiSkin Alpha Arbutin Brightening Serum',
      brand: 'LumiSkin',
      price: 2799,
      originalPrice: 3599,
      discount: 22,
      rating: 4.8,
      reviewCount: 789,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const productData = mockProducts?.[productId] || mockProducts?.['1'];
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async ({ product, quantity }) => {
    // Simulate add to cart API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Added to cart:', { productId: product?.id, quantity });
    // In real app, this would update cart state and show success message
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualHeader 
          title="Loading..."
          onSearchClick={() => navigate('/product-search-browse')}
          onSettingsClick={() => navigate('/settings')}
        />
        <div className="pt-16 md:pt-18 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="animate-pulse space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualHeader 
          title="Product Not Found"
          onSearchClick={() => navigate('/product-search-browse')}
          onSettingsClick={() => navigate('/settings')}
        />
        <div className="pt-16 md:pt-18 pb-20 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-semibold text-2xl text-foreground">
                Product Not Found
              </h1>
              <p className="text-muted-foreground font-body">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/product-search-browse')}
                className="text-primary hover:text-primary/80 font-body font-medium"
              >
                Browse All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader 
        title="Product Details"
        onSearchClick={() => navigate('/product-search-browse')}
        onSettingsClick={() => navigate('/settings')}
      />
      <BottomTabNavigation />
      <main className="pt-16 md:pt-30 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Product Images - Takes 60% on desktop */}
            <div className="lg:col-span-2">
              <ProductImageGallery 
                images={product?.images} 
                productName={product?.name} 
              />
            </div>
            
            {/* Product Info - Takes 40% on desktop */}
            <div className="lg:col-span-1">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Details Sections */}
          <div className="space-y-12">
            {/* Ingredients */}
            <IngredientsSection ingredients={product?.keyIngredients} />
            
            {/* Usage Instructions */}
            <UsageInstructions instructions={product?.usageInstructions} />
            
            {/* Customer Testimonials */}
            <CustomerTestimonials testimonials={product?.testimonials} />
            
            {/* Similar Products */}
            <SimilarProducts products={similarProducts} />
          </div>
        </div>
      </main>
      {/* Sticky Bottom Bar */}
      <StickyBottomBar 
        product={product} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  );
};

export default ProductRecommendationDetails;