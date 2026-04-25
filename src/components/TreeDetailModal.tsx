import { X, MessageCircle, Phone, MapPin, Calendar, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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

interface TreeCategory {
  id: string;
  name: string;
  nameHi: string;
}

interface TreeDetailModalProps {
  variety: TreeVariety;
  category: TreeCategory;
  onClose: () => void;
}

export default function TreeDetailModal({ variety, category, onClose }: TreeDetailModalProps) {
  const { language } = useLanguage();
  const phone = '918076910390';

  const handleWhatsApp = () => {
    const message = language === 'hi'
      ? `नमस्ते! मुझे ${variety.nameHi} (${category.nameHi}) किराए पर लेना है।`
      : `Hello! I want to rent ${variety.name} (${category.name}).`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="relative h-48 sm:h-64">
          <img
            src={variety.image}
            alt={variety.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
              <span>{language === 'hi' ? category.nameHi : category.name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {language === 'hi' ? variety.nameHi : variety.name}
            </h2>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {language === 'hi' ? variety.descriptionHi : variety.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'hi' ? 'स्थान' : 'Location'}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {language === 'hi' ? variety.locationHi : variety.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'hi' ? 'मौसम' : 'Season'}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {language === 'hi' ? variety.seasonHi : variety.season}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {language === 'hi' ? 'मूल्य स्तर' : 'Price Tier'}
            </h3>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">kg</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    40kg - 55kg
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'hi' ? 'अनुमानित उपज' : 'Estimated Yield'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  ₹10,000
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  /{language === 'hi' ? 'मौसम' : 'season'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {language === 'hi' ? 'विशेषताएं' : 'Features'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                language === 'hi' ? 'प्रमाणित खेत' : 'Certified Farm',
                language === 'hi' ? 'ताज़ी फसल' : 'Fresh Harvest',
                language === 'hi' ? 'दरवाज़े तक डिलीवरी' : 'Doorstep Delivery',
                language === 'hi' ? 'गुणवत्ता गारंटी' : 'Quality Guarantee',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </button>
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {language === 'hi' ? 'कॉल करें' : 'Call'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}