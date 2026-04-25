import { Leaf, ShieldCheck, Users, Truck, HeartHandshake, Sprout, Award, Recycle } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "All products are certified organic, grown without harmful pesticides or chemical fertilizers. Pure nature, nothing else.",
    color: "from-[#4A7C59] to-[#2D5A27]"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Rigorous quality checks at every stage. From farm to your doorstep, we ensure only the best reaches you.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Farmer First",
    description: "Direct partnerships with 500+ farmers ensuring fair prices, sustainable livelihoods, and community growth.",
    color: "from-[#D4A017]500 to-[#D4A017]"
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    description: "Fast, reliable delivery across all states. Temperature-controlled packaging maintains freshness.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: HeartHandshake,
    title: "24/7 Support",
    description: "Dedicated customer care team ready to assist you anytime. Your satisfaction is our priority.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Sprout,
    title: "Sustainable Farming",
    description: "Eco-friendly agricultural practices that protect our planet for future generations.",
    color: "from-teal-500 to-teal-600"
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#E8F5E9]/30 dark:bg-[#E8F5E9]/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/30 dark:bg-amber-900/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8F5E9] dark:bg-[#E8F5E9]/30 text-[#1E3D1A] dark:text-[#4A7C59] rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1E3D1A] via-green-600 to-[#D4A017] bg-clip-text text-transparent">
              The Givashu Difference
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
            We are committed to bringing you the finest organic products while supporting 
            Indian farmers and protecting our environment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#2D5A27] dark:group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-gray-100 dark:to-gray-700/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Sustainability Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-6 p-6 bg-[#F1F8E9] dark:bg-[#E8F5E9]/20 rounded-2xl">
            <div className="w-16 h-16 bg-[#4A7C59] rounded-2xl flex items-center justify-center">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1E3D1A] dark:text-[#4A7C59]">Zero</p>
              <p className="text-gray-600 dark:text-gray-400">Plastic Packaging</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
            <div className="w-16 h-16 bg-[#D4A017] rounded-2xl flex items-center justify-center">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700 dark:text-#D4A017">10K+</p>
              <p className="text-gray-600 dark:text-gray-400">Trees Planted</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">500+</p>
              <p className="text-gray-600 dark:text-gray-400">Farmer Families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
