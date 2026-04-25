import { useState } from 'react';
import { Search, X, Phone, MessageCircle, Leaf, MapPin, Filter, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TreeCategory {
  id: string;
  name: string;
  nameHi: string;
  totalTrees: number;
  image: string;
  description: string;
  descriptionHi: string;
  isVariety: boolean;
  priceTiers: PriceTier[];
  varieties?: TreeVariety[];
}

interface TreeVariety {
  id: string;
  name: string;
  nameHi: string;
  image: string;
  description: string;
  descriptionHi: string;
  season: string;
  seasonHi: string;
  location: string;
  locationHi: string;
  featured: boolean;
}

interface PriceTier {
  minKg: number;
  maxKg: number;
  price: number;
}

const treeCategories: TreeCategory[] = [
  {
    id: 'doodhiya-maldah',
    name: 'Doodhiya Maldah',
    nameHi: 'दूधिया मालदह',
    totalTrees: 1000,
    image: '/images/81Cowg3BA8L.jpg',
    description: 'Premium quality mangoes with exceptional sweetness and aroma',
    descriptionHi: 'असाधारण मिठास और खुशबू वाले प्रीमियम गुणवत्ता वाले आम',
    isVariety: false,
    priceTiers: [
      { minKg: 30, maxKg: 40, price: 8000 },
      { minKg: 40, maxKg: 55, price: 10000 },
      { minKg: 55, maxKg: 75, price: 15000 },
    ],
  },
  {
    id: 'bambai',
    name: 'Bambai',
    nameHi: 'बांबई',
    totalTrees: 1000,
    image: '/images/51XOJA09KbL._AC_UF1000,1000_QL80_.jpg',
    description: 'Classic mango variety known for its rich flavor and texture',
    descriptionHi: 'अपने समृद्ध स्वाद और बनावट के लिए जानी जाने वाली क्लासिक आम की किस्म',
    isVariety: false,
    priceTiers: [
      { minKg: 30, maxKg: 40, price: 5000 },
      { minKg: 40, maxKg: 55, price: 6000 },
      { minKg: 55, maxKg: 75, price: 7000 },
    ],
  },
  {
    id: 'jardalu',
    name: 'Jardalu',
    nameHi: 'जर्दालू',
    totalTrees: 200,
    image: '/images/jardalu_mango_1622809194.avif',
    description: 'Royal mango variety with premium quality and authentic taste',
    descriptionHi: 'प्रीमियम गुणवत्ता और प्रामाणिक स्वाद के साथ राजसी आम की किस्म',
    isVariety: false,
    priceTiers: [
      { minKg: 30, maxKg: 40, price: 10000 },
      { minKg: 40, maxKg: 55, price: 15000 },
      { minKg: 55, maxKg: 75, price: 20000 },
    ],
  },
  {
    id: 'other-varieties',
    name: 'Other Unique Varieties',
    nameHi: 'अन्य अद्वितीय किस्में',
    totalTrees: 140,
    image: '/images/81Cowg3BA8L.jpg',
    description: 'Mixed collection of rare and premium mango varieties',
    descriptionHi: 'दुर्लभ और प्रीमियम आम की किस्मों का मिश्रित संग्रह',
    isVariety: true,
    priceTiers: [
      { minKg: 40, maxKg: 55, price: 10000 },
    ],
    varieties: [
      {
        id: 'mishribhog',
        name: 'Mishribhog',
        nameHi: 'मिष्रीभोग',
        image: '/images/mishribhog.jpg',
        description: 'Sweet aromatic mango perfect for dessert lovers',
        descriptionHi: 'मिठाई प्रेमियों के लिए परिपूर्ण मीठा सुगंधित आम',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: true,
      },
      {
        id: 'rambhog',
        name: 'Rambhog',
        nameHi: 'रामभोग',
        image: '/images/rambhog.jpg',
        description: 'Premium quality mango with excellent fiber content',
        descriptionHi: 'उत्कृष्ट फाइबर सामग्री वाला प्रीमियम गुणवत्ता का आम',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: false,
      },
      {
        id: 'krishnabhog',
        name: 'Krishnabhog',
        nameHi: 'कृष्णभोग',
        image: '/images/krishnabhog.jpg',
        description: 'Divine taste with perfect blend of sweetness',
        descriptionHi: 'मिठास का परिपूर्ण मिश्रण के साथ दिव्य स्वाद',
        season: 'May - July',
        seasonHi: 'मई - जुलाई',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: false,
      },
      {
        id: 'karpuria',
        name: 'Karpuria',
        nameHi: 'कर्पूरिया',
        image: '/images/karpuria.jpg',
        description: 'Unique variety with distinct aromatic properties',
        descriptionHi: 'विशिष्ट सुगंधित गुणों वाली अद्वितीय किस्म',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: false,
      },
      {
        id: 'gulaabkhaas',
        name: 'Gulaabkhaas',
        nameHi: 'गुलाबखास',
        image: '/images/gulaabkhaas.jpg',
        description: 'Rose-scented mango with exotic flavor profile',
        descriptionHi: 'विदेशी स्वाद प्रोफाइल वाला गुलाब सुगंधित आम',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: false,
      },
      {
        id: 'sinduria',
        name: 'Sinduria',
        nameHi: 'सिंदुरिया',
        image: '/images/sinduria.jpg',
        description: 'Traditional variety with rich heritage taste',
        descriptionHi: 'समृद्ध विरासत स्वाद वाली पारंपरिक किस्म',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: false,
      },
      {
        id: 'chausa',
        name: 'Chausa',
        nameHi: 'चौसा',
        image: '/images/chausa.jpg',
        description: 'Sweet and aromatic mango loved by all',
        descriptionHi: 'सभी द्वारा पसंद किया जाने वाला मीठा और सुगंधित आम',
        season: 'June - August',
        seasonHi: 'जून - अगस्त',
        location: 'Noida, Uttar Pradesh',
        locationHi: 'नोएडा, उत्तर प्रदेश',
        featured: true,
      },
    ],
  },
];

export default function RentATree() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ [key: string]: number }>({});
  const { language } = useLanguage();

  const filteredCategories = treeCategories.filter(cat => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (cat.isVariety && cat.varieties) {
        return cat.name.toLowerCase().includes(query) ||
               cat.varieties.some(v => v.name.toLowerCase().includes(query));
      }
      return cat.name.toLowerCase().includes(query);
    }
    return true;
  });

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleContact = (type: 'whatsapp' | 'call', category: TreeCategory) => {
    const phone = '918076910390';
    
    if (type === 'whatsapp') {
      const message = language === 'hi'
        ? `नमस्ते! मुझे ${category.nameHi} किराए पर लेना है। कृपया जानकारी दें।`
        : `Hello! I want to rent ${category.name}. Please share more details.`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      window.open(`tel:${phone}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'hi' ? 'अपना पेड़ चुनें' : 'Pick Your Tree'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'hi'
              ? 'प्रमाणित खेतों से अपना फल का पेड़ अपनाएं। ताज़ी फसल का आनंद लें।'
              : 'Adopt your own fruit tree from certified farms. Enjoy fresh harvests.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'पेड़ खोजें...' : 'Search trees...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                showOnlyAvailable 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
              }`}
            >
              <Filter className="w-5 h-5" />
              {language === 'hi' ? 'उपलब्ध' : 'Available'}
              {showOnlyAvailable && <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-6 p-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'hi' ? category.nameHi : category.name}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {language === 'hi' ? category.descriptionHi : category.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Leaf className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {category.totalTrees} {language === 'hi' ? 'पेड़' : 'trees'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Noida, Uttar Pradesh</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'hi' ? 'शुरू से' : 'Starting from'}
                      </p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        ₹{category.priceTiers[0].price.toLocaleString()}
                      </p>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCategory === category.id && (
                <div className="border-t border-gray-100 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700/50">
                  {category.isVariety && category.varieties ? (
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                        {category.varieties.map((variety) => (
                          <div
                            key={variety.id}
                            className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 text-center"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                              {language === 'hi' ? variety.nameHi : variety.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {language === 'hi' ? variety.seasonHi : variety.season}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'hi' ? '40kg - 55kg अनुमानित उपज' : '40kg - 55kg Estimated Yield'}
                          </p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                            ₹10,000 <span className="text-sm font-normal text-gray-500">/{language === 'hi' ? 'मौसम' : 'season'}</span>
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => handleContact('whatsapp', category)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleContact('call', category)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Phone className="w-5 h-5" />
                            {language === 'hi' ? 'कॉल करें' : 'Call'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {language === 'hi' ? 'मूल्य स्तर' : 'Price Tiers'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {category.priceTiers.map((tier, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedTier({ [category.id]: index })}
                            className={`bg-white dark:bg-gray-800 rounded-xl p-4 cursor-pointer transition-all border-2 ${
                              selectedTier[category.id] === index
                                ? 'border-green-500 shadow-md'
                                : 'border-gray-100 dark:border-gray-700 hover:border-green-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {language === 'hi' ? 'वजन सीमा' : 'Weight Range'}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {tier.minKg}kg - {tier.maxKg}kg
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                  ₹{tier.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {selectedTier[category.id] === index && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleContact('whatsapp', category);
                                }}
                                className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
                                {language === 'hi' ? 'WhatsApp पर संपर्क करें' : 'Contact via WhatsApp'}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {language === 'hi' ? 'किराए पर पेड़ लेने के लाभ' : 'Benefits of Renting a Tree'}
              </h3>
              <p className="text-green-100">
                {language === 'hi'
                  ? 'सीज़न के दौरान ताज़ी फसल सीधे आपके दरवाज़े पर'
                  : 'Fresh harvest delivered to your doorstep during the season'}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const phone = '918076910390';
                  const message = language === 'hi'
                    ? 'नमस्ते! मुझे पेड़ किराए पर लेना है। कृपया जानकारी दें।'
                    : 'Hello! I am interested in renting a fruit tree. Please share more details.';
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={() => {
                  window.open('tel:918076910390', '_blank');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {language === 'hi' ? 'कॉल करें' : 'Call Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}