import { useEffect, useState } from 'react';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const heroSlides = [
  {
    titleEn: "Pick Your Tree",
    titleHi: "अपना पेड़ चुनें",
    subtitleEn: "Rent a Fruit Tree",
    subtitleHi: "फल का पेड़ किराए पर लें",
    descriptionEn: "Rent your own mango tree for the entire season and enjoy the fresh harvest at the best quality.",
    descriptionHi: "प्रमाणित खेतों से अपना फल का पेड़ अपनाएं। आम, लीची और अधिक की ताज़ी फसल का आनंद लें - सीधे आपके दरवाजे तक पहुंचाया जाता है।",
    image: "/images/hero-harvest.jpeg",
    ctaEn: "Rent a Tree",
    ctaHi: "पेड़ किराए पर लें",
    color: "from-[#228B22] to-[#006400]",
    isWhatsApp: true
  },
  {
    titleEn: "Pick Your Tree",
    titleHi: "अपना पेड़ चुनें",
    subtitleEn: "Rent a Fruit Tree",
    subtitleHi: "फल का पेड़ किराए पर लें",
    descriptionEn: "Rent your own mango tree for the entire season and enjoy the fresh harvest at the best quality.",
    descriptionHi: "प्रमाणित खेतों से अपना फल का पेड़ अपनाएं। आम, लीची और अधिक की ताज़ी फसल का आनंद लें - सीधे आपके दरवाजे तक पहुंचाया जाता है।",
    image: "/images/hero.2.jpeg",
    ctaEn: "Rent a Tree",
    ctaHi: "पेड़ किराए पर लें",
    color: "from-[#228B22] to-[#006400]",
    isWhatsApp: true
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.2),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2 h-2 bg-[#D4A017] rounded-full animate-pulse" />
              <span className="text-[#D4A017] text-sm font-medium">Trusted by 10,000+ Customers</span>
            </div>

            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`space-y-6 transition-all duration-700 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <div>
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-gradient-to-r ${slide.color} text-white shadow-lg`}>
                        {language === 'hi' ? slide.subtitleHi : slide.subtitleEn}
                      </span>
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                        {language === 'hi' ? slide.titleHi : slide.titleEn}
                      </h1>
                    </div>
                    
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                      {language === 'hi' ? slide.descriptionHi : slide.descriptionEn}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <button 
                        onClick={() => navigate('/trees')}
                        className={`group px-8 py-4 bg-gradient-to-r ${slide.color} text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 hover:-translate-y-1`}
                      >
                        {language === 'hi' ? slide.ctaHi : slide.ctaEn}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-10 bg-[#D4A017]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
