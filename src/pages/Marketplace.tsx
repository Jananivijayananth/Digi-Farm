import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Star, ChevronDown } from 'lucide-react';

// Types for marketplace
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  unit: string;
  category: string;
  rating: number;
  seller: {
    name: string;
    location: string;
  };
}

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: 'Organic Apples',
      description: 'Fresh organic apples grown without pesticides. Sweet and juicy.',
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 120,
      unit: 'kg',
      category: 'Fruits',
      rating: 4.7,
      seller: {
        name: 'Green Valley Farms',
        location: 'Karnataka'
      }
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      description: 'Ripe and juicy tomatoes, perfect for salads and cooking.',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 60,
      unit: 'kg',
      category: 'Vegetables',
      rating: 4.5,
      seller: {
        name: 'Sunshine Organic Farm',
        location: 'Tamil Nadu'
      }
    },
    {
      id: 3,
      name: 'Fresh Carrots',
      description: 'Crisp and sweet carrots, freshly harvested.',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 40,
      unit: 'kg',
      category: 'Vegetables',
      rating: 4.3,
      seller: {
        name: 'Greenfields',
        location: 'Kerala'
      }
    },
    {
      id: 4,
      name: 'Organic Strawberries',
      description: 'Sweet and aromatic strawberries grown organically.',
      image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 180,
      unit: 'kg',
      category: 'Fruits',
      rating: 4.8,
      seller: {
        name: 'Berry Good Farms',
        location: 'Himachal Pradesh'
      }
    },
    {
      id: 5,
      name: 'Fresh Spinach',
      description: 'Nutrient-rich spinach leaves, freshly harvested.',
      image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 30,
      unit: 'bunch',
      category: 'Vegetables',
      rating: 4.4,
      seller: {
        name: 'Green Earth Farms',
        location: 'Punjab'
      }
    },
    {
      id: 6,
      name: 'Fresh Marigold Flowers',
      description: 'Vibrant marigold flowers for decoration and religious purposes.',
      image: 'https://images.pexels.com/photos/19373325/pexels-photo-19373325/free-photo-of-marigold-flowers-in-bloom.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 50,
      unit: 'bunch',
      category: 'Flowers',
      rating: 4.6,
      seller: {
        name: 'Blooming Fields',
        location: 'Gujarat'
      }
    }
  ];
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = ['Fruits', 'Vegetables', 'Flowers'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Marketplace</h1>
        <p className="text-gray-600 mt-2">Buy and sell farm produce directly with no middlemen</p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full md:w-48 border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span>{categoryFilter || 'All Categories'}</span>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div 
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => {
                    setCategoryFilter('');
                    setIsFilterOpen(false);
                  }}
                >
                  All Categories
                </div>
                {categories.map((category) => (
                  <div 
                    key={category}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setCategoryFilter(category);
                      setIsFilterOpen(false);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Sell Products
          </button>
        </div>
      </div>
      
      {/* Product listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link
              to={`/marketplace/${product.id}`}
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">₹{product.price}<span className="text-sm font-normal text-gray-600">/{product.unit}</span></p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.seller.name} • {product.seller.location}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any products matching your search. Try using different keywords or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;