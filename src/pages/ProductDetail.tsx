import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Award, Minus, Plus, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const localProducts: any = {
  1: {
    id: 1,
    name: 'Premium Makhana',
    category: 'makhana',
    price: 450,
    original_price: 550,
    images: [
      '/images/Premium Makhana/WhatsApp Image 2026-04-24 at 00.41.53.jpeg',
      '/images/Premium Makhana/WhatsApp Image 2026-04-24 at 00.41.54.jpeg',
      '/images/Premium Makhana/WhatsApp Image 2026-04-24 at 00.41.55.jpeg',
    ],
    description: 'Premium roasted makhana - gluten-free, high protein, low calorie. The perfect healthy snack for fitness enthusiasts and health-conscious families. Sourced from the best farms.',
    rating: 4.5,
    featured: true,
    stock: 100
  },
  2: {
    id: 2,
    name: 'Phool Makhana',
    category: 'makhana',
    price: 350,
    original_price: 450,
    images: [
      '/images/Phool Makhana/WhatsApp Image 2026-04-24 at 00.44.46.jpeg',
      '/images/Phool Makhana/WhatsApp Image 2026-04-24 at 00.44.51 (1).jpeg',
    ],
    video: '/images/Phool Makhana/WhatsApp Video 2026-04-24 at 00.46.23.mp4',
    description: 'Phool makhana - light and crispy, perfect for snacking and recipes. A traditional favorite.',
    rating: 4.3,
    featured: true,
    stock: 100
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<number | 'video'>(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const viewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
      const filtered = viewed.filter((p: any) => p.id !== product.id);
      const newViewed = [{ id: product.id, name: product.name, price: product.price, image: product.images?.[0] }, ...filtered].slice(0, 10);
      localStorage.setItem('recently_viewed', JSON.stringify(newViewed));
    }
  }, [product]);

  const fetchProduct = () => {
    setLoading(true);
    const productId = parseInt(id || '0');
    const productData = localProducts[productId];
    
    if (productData) {
      setProduct(productData);
      const relatedProducts = Object.values(localProducts)
        .filter((p: any) => p.category === productData.category && p.id !== productId)
        .slice(0, 4);
      setRelated(relatedProducts);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/checkout');
  };

  const toggleWishlist = async () => {
    if (!user) {
      alert('Please sign in to add to wishlist');
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url: window.location.href });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin w-8 h-8 border-4 border-[#2D5A27] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-[#2D5A27]">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/#products')} className="hover:text-[#2D5A27]">Products</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              {product.video && activeImage === 'video' ? (
                <video
                  src={product.video}
                  controls
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={product.images?.[activeImage as number] || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {product.video && (
                <button
                  onClick={() => setActiveImage('video')}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-gray-900 ${
                    activeImage === 'video' ? 'border-[#2D5A27]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-white text-xs">Video</span>
                </button>
              )}
              {product.images?.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-[#2D5A27]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[#2D5A27] text-sm font-medium capitalize">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-#D4A017 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-gray-600 dark:text-gray-400 ml-1">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#1E3D1A]">₹{product.price}</span>
              {product.original_price > product.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.original_price}</span>
                  <span className="text-red-500 font-medium">
                    {Math.round((1 - product.price / product.original_price) * 100)}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-xl">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-medium dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-xl">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <button onClick={toggleWishlist} className={`p-3 border rounded-xl ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleShare} className="p-3 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="flex-1 py-4 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 py-4 bg-[#D4A017] hover:bg-[#D4A017] text-white font-semibold rounded-xl">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-[#2D5A27] mb-1" />
                <p className="text-xs">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto text-[#2D5A27] mb-1" />
                <p className="text-xs">Secure Payment</p>
              </div>
              <div className="text-center">
                <Award className="w-6 h-6 mx-auto text-[#2D5A27] mb-1" />
                <p className="text-xs">Certified Organic</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-[#4A7C59]' : 'bg-red-500'}`} />
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-6">
          <div className="flex gap-8 border-b dark:border-gray-700 mb-6 overflow-x-auto">
            {['description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'text-[#2D5A27] border-b-2 border-[#2D5A27]' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {tab === 'description' ? 'Description' : 'Reviews'}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="text-gray-600 dark:text-gray-400">
              <p>{product.description}</p>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Key Benefits:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2D5A27]" /> 100% Organic & Natural</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2D5A27]" /> Sourced directly from farmers</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2D5A27]" /> No preservatives or additives</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#2D5A27]" /> Eco-friendly packaging</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h3>
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {related.map((item) => (
                <button key={item.id} onClick={() => { navigate(`/product/${item.id}`); window.location.reload(); }} className="text-left group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-gray-800 mb-3">
                    <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="font-medium line-clamp-1 dark:text-white">{item.name}</h3>
                  <p className="text-[#2D5A27] font-bold">₹{item.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}