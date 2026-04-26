import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface Category {
  id: number;
  name: string;
  nameHi: string;
  slug: string;
  image_url: string;
  description: string;
  descriptionHi: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Makhana',
    nameHi: 'मखाना',
    slug: 'makhana',
    image_url: '/images/makhana.jpeg',
    description: 'Premium roasted makhana',
    descriptionHi: 'प्रीमियम रोस्टेड मखाना'
  },
  {
    id: 2,
    name: 'Mangoes',
    nameHi: 'आम',
    slug: 'mangoes',
    image_url: '/images/magoes.jpg',
    description: 'Alphonso & Kesar mangoes',
    descriptionHi: 'अल्फोंसो और केसर आम'
  },
  {
    id: 3,
    name: 'Pickle',
    nameHi: 'अचार',
    slug: 'pickle',
    image_url: '/images/pickle.jpeg.jpeg',
    description: 'Traditional Indian pickles',
    descriptionHi: 'पारंपरिक भारतीय अचार'
  },
];

export default function Categories() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <section id="categories" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8F5E9]/50 dark:bg-[#E8F5E9]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-#D4A017 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Browse Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1E3D1A] via-green-600 to-[#D4A017] bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our curated collection of organic products across multiple categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => navigate(`/products?category=${category.slug}`)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <img
                src={category.image_url}
                alt={language === 'hi' ? category.nameHi : category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-white font-bold text-lg mb-1 transform group-hover:translate-y-0 transition-transform duration-300">
                  {language === 'hi' ? category.nameHi : category.name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {language === 'hi' ? category.descriptionHi : category.description}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-#F1F8E90/50 transition-colors duration-300" />
            </button>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: 'Homegrown Products' },
            { value: '500+', label: 'Happy Customers' },
            { value: '100%', label: 'Certified Products' },
            { value: '15+', label: 'States Delivered' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2D5A27] to-[#D4A017] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
