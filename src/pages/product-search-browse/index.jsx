import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import SortOptions from './components/SortOptions';
import ProductGrid from './components/ProductGrid';
import AdvancedFilters from './components/AdvancedFilters';
import Button from '../../components/ui/Button';


const ProductSearchBrowse = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock product data
  const mockProducts = [
    {
      id: 'ls-001',
      name: 'Vitamin C Brightening Serum',
      brand: 'LumiSkin',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      rating: 4.5,
      reviewCount: 234,
      keyIngredients: ['Vitamin C', 'Hyaluronic Acid'],
      isNew: true,
      discount: 19,
      description: `Advanced vitamin C serum that brightens skin tone and reduces dark spots with powerful antioxidants and hydrating hyaluronic acid.`,
      variants: [
        { id: 'v1', size: '30ml', price: 1299 },
        { id: 'v2', size: '50ml', price: 1899 }
      ]
    },
    {
      id: 'ls-002',
      name: 'Niacinamide Pore Minimizing Serum',
      brand: 'LumiSkin',
      price: 999,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
      rating: 4.3,
      reviewCount: 189,
      keyIngredients: ['Niacinamide', 'Zinc'],
      discount: 23,
      description: `Oil-control serum with 10% niacinamide that minimizes pores and regulates sebum production for clearer skin.`,
      variants: [
        { id: 'v3', size: '30ml', price: 999 }
      ]
    },
    {
      id: 'ls-003',
      name: 'Hyaluronic Acid Hydrating Moisturizer',
      brand: 'LumiSkin',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      rating: 4.7,
      reviewCount: 312,
      keyIngredients: ['Hyaluronic Acid', 'Ceramides'],
      description: `Deep hydrating moisturizer with multiple molecular weights of hyaluronic acid for 24-hour moisture retention.`,
      variants: [
        { id: 'v4', size: '50ml', price: 1599 },
        { id: 'v5', size: '100ml', price: 2499 }
      ]
    },
    {
      id: 'ls-004',
      name: 'Gentle Foaming Face Cleanser',
      brand: 'LumiSkin',
      price: 799,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      rating: 4.2,
      reviewCount: 156,
      keyIngredients: ['Salicylic Acid', 'Tea Tree'],
      discount: 20,
      description: `Gentle yet effective foaming cleanser that removes impurities while maintaining skin's natural moisture barrier.`,
      variants: [
        { id: 'v6', size: '150ml', price: 799 }
      ]
    },
    {
      id: 'ls-005',
      name: 'Retinol Anti-Aging Night Cream',
      brand: 'LumiSkin',
      price: 2299,
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
      rating: 4.6,
      reviewCount: 278,
      keyIngredients: ['Retinol', 'Peptides'],
      isNew: true,
      description: `Advanced anti-aging night cream with encapsulated retinol and peptides to reduce fine lines and improve skin texture.`,
      variants: [
        { id: 'v7', size: '50ml', price: 2299 }
      ]
    },
    {
      id: 'ls-006',
      name: 'SPF 50 Mineral Sunscreen',
      brand: 'LumiSkin',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400',
      rating: 4.4,
      reviewCount: 201,
      keyIngredients: ['Zinc Oxide', 'Titanium Dioxide'],
      description: `Broad-spectrum mineral sunscreen with SPF 50 that provides superior protection without white cast.`,
      variants: [
        { id: 'v8', size: '50ml', price: 1199 }
      ]
    },
    {
      id: 'gn-001',
      name: 'Turmeric Brightening Face Mask',
      brand: 'Glow Naturals',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400',
      rating: 4.1,
      reviewCount: 143,
      keyIngredients: ['Turmeric', 'Honey'],
      discount: 25,
      description: `Natural brightening face mask with turmeric and honey that evens skin tone and adds natural glow.`,
      variants: [
        { id: 'v9', size: '100g', price: 899 }
      ]
    },
    {
      id: 'pe-001',
      name: 'Rose Water Hydrating Toner',
      brand: 'Pure Essence',
      price: 699,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      rating: 4.0,
      reviewCount: 98,
      keyIngredients: ['Rose Water', 'Glycerin'],
      description: `Alcohol-free hydrating toner with pure rose water that refreshes and prepares skin for skincare routine.`,
      variants: [
        { id: 'v10', size: '200ml', price: 699 }
      ]
    }
  ];

  // Filter and sort products
  const getFilteredAndSortedProducts = useCallback(() => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.keyIngredients?.some(ingredient =>
          ingredient?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply category filters
    if (activeFilters?.category?.length > 0) {
      filtered = filtered?.filter(product => {
        const productCategory = product?.name?.toLowerCase();
        return activeFilters?.category?.some(cat => {
          switch (cat) {
            case 'cleanser': return productCategory?.includes('cleanser') || productCategory?.includes('face wash');
            case 'serum': return productCategory?.includes('serum');
            case 'moisturizer': return productCategory?.includes('moisturizer') || productCategory?.includes('cream');
            case 'sunscreen': return productCategory?.includes('sunscreen') || productCategory?.includes('spf');
            case 'toner': return productCategory?.includes('toner');
            case 'mask': return productCategory?.includes('mask');
            default: return false;
          }
        });
      });
    }

    // Apply price range filters
    if (activeFilters?.priceRange?.length > 0) {
      filtered = filtered?.filter(product => {
        return activeFilters?.priceRange?.some(range => {
          switch (range) {
            case '0-500': return product?.price <= 500;
            case '500-1000': return product?.price > 500 && product?.price <= 1000;
            case '1000-2000': return product?.price > 1000 && product?.price <= 2000;
            case '2000-5000': return product?.price > 2000 && product?.price <= 5000;
            case '5000+': return product?.price > 5000;
            default: return false;
          }
        });
      });
    }

    // Apply quick filters
    if (activeFilters?.bestseller) {
      filtered = filtered?.filter(product => product?.reviewCount > 200);
    }
    if (activeFilters?.new) {
      filtered = filtered?.filter(product => product?.isNew);
    }
    if (activeFilters?.organic) {
      filtered = filtered?.filter(product => 
        product?.keyIngredients?.some(ing => 
          ['Turmeric', 'Honey', 'Rose Water', 'Tea Tree', 'Aloe Vera']?.includes(ing)
        )
      );
    }

    // Apply advanced filters
    if (activeFilters?.ingredients?.length > 0) {
      filtered = filtered?.filter(product =>
        product?.keyIngredients?.some(ingredient =>
          activeFilters?.ingredients?.some(filterIng =>
            ingredient?.toLowerCase()?.includes(filterIng?.replace('-', ' '))
          )
        )
      );
    }

    if (activeFilters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        activeFilters?.brands?.includes(product?.brand?.toLowerCase()?.replace(' ', '-'))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
        break;
      case 'bestseller':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'name-az':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-za':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      default: // relevance
        break;
    }

    return filtered;
  }, [searchQuery, activeFilters, sortBy]);

  // Load products
  const loadProducts = useCallback(async (reset = false) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredProducts = getFilteredAndSortedProducts();
      const itemsPerPage = 12;
      const startIndex = reset ? 0 : (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageProducts = filteredProducts?.slice(startIndex, endIndex);
      
      if (reset) {
        setProducts(pageProducts);
        setCurrentPage(1);
      } else {
        setProducts(prev => [...prev, ...pageProducts]);
      }
      
      setHasMore(endIndex < filteredProducts?.length);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [getFilteredAndSortedProducts, currentPage]);

  // Effects
  useEffect(() => {
    loadProducts(true);
  }, [searchQuery, activeFilters, sortBy]);

  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params?.set('q', searchQuery);
    if (sortBy !== 'relevance') params?.set('sort', sortBy);
    setSearchParams(params);
  }, [searchQuery, sortBy, setSearchParams]);

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterId, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: values
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    loadProducts(false);
  };

  const handleAdvancedFiltersChange = (newFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <ContextualHeader
        title="Search Products"
        showSearch
        onSearchClick={() => document.querySelector('input[type="search"]')?.focus()}
        onSettingsClick={() => {}}
      />
      {/* Main Content */}
      <main className="pt-16 md:pt-30 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex gap-6">
            {/* Advanced Filters Sidebar */}
            <div className="w-80 flex-shrink-0">
              <AdvancedFilters
                isOpen={true}
                onClose={() => {}}
                filters={activeFilters}
                onFiltersChange={handleAdvancedFiltersChange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Filter Chips */}
              <FilterChips
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
              />

              {/* Sort Options */}
              <SortOptions
                currentSort={sortBy}
                onSortChange={handleSortChange}
                resultCount={getFilteredAndSortedProducts()?.length}
              />

              {/* Product Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Filter Chips */}
            <FilterChips
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAllFilters}
            />

            {/* Sort and Filter Actions */}
            <div className="flex items-center justify-between">
              <SortOptions
                currentSort={sortBy}
                onSortChange={handleSortChange}
                resultCount={getFilteredAndSortedProducts()?.length}
              />
              
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(true)}
                iconName="SlidersHorizontal"
                iconPosition="left"
                size="sm"
              >
                Filters
              </Button>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>
      {/* Advanced Filters Modal (Mobile) */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={activeFilters}
        onFiltersChange={handleAdvancedFiltersChange}
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default ProductSearchBrowse;