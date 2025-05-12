import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Mail, Phone, ShoppingBag, Truck, Leaf, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock product data for detail page
const productData = {
  id: 1,
  name: 'Organic Apples',
  description: 'Fresh organic apples grown without pesticides. These sweet and juicy apples are harvested from our family-owned orchard. We prioritize sustainable farming practices to ensure the highest quality produce while protecting the environment.',
  longDescription: 'Our organic apples are grown using traditional farming methods without the use of synthetic pesticides or fertilizers. We use natural compost to nourish the soil and beneficial insects to control pests. These apples are harvested at peak ripeness to ensure maximum flavor and nutritional value. Perfect for eating fresh, baking, or making homemade applesauce.',
  image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=800',
  price: 120,
  unit: 'kg',
  category: 'Fruits',
  rating: 4.7,
  reviews: 24,
  availableQuantity: 50,
  farmingMethod: 'Organic',
  harvestDate: '3 days ago',
  seller: {
    name: 'Green Valley Farms',
    location: 'Shivamogga, Karnataka',
    joinedDate: 'Member since March 2023',
    phone: '+91 98765 43210',
    email: 'contact@greenvalleyfarms.com',
    responseRate: '95%',
    otherProducts: 12
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // In a real app, we would fetch the product using the ID
  // For demo, we're using the mock data
  const product = productData;
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const totalPrice = product.price * quantity;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Marketplace
      </Link>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div>
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-gray-700 ml-1">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-500">{product.reviews} reviews</span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                ₹{product.price} <span className="text-sm font-normal text-gray-600">per {product.unit}</span>
              </p>
              <p className="text-green-600 font-medium">{product.availableQuantity} {product.unit} available</p>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Farming Method</p>
                    <p className="font-medium text-gray-700">{product.farmingMethod}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Harvested</p>
                    <p className="font-medium text-gray-700">{product.harvestDate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-50"
                >
                  <span className="sr-only">Decrease</span>
                  <span className="text-gray-600">−</span>
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 border-t border-b border-gray-300 text-center py-2"
                />
                <button
                  onClick={increaseQuantity}
                  className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-50"
                >
                  <span className="sr-only">Increase</span>
                  <span className="text-gray-600">+</span>
                </button>
                <span className="ml-3 text-gray-600">
                  {product.unit}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart • ₹{totalPrice}
              </button>
              <button className="flex-1 bg-white border border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                Contact Seller
              </button>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Details</h2>
            <p className="text-gray-600 mb-6">{product.longDescription}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start mb-4">
                    <Truck className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Local Delivery</p>
                      <p className="text-gray-600 text-sm">Free delivery within 10km radius. ₹50 delivery charge otherwise.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Delivery Time</p>
                      <p className="text-gray-600 text-sm">Usually within 24-48 hours of ordering</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Seller Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">{product.seller.name}</h4>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{product.seller.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{product.seller.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{product.seller.joinedDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Response Rate: {product.seller.responseRate}</span>
                    <span>{product.seller.otherProducts} other products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;