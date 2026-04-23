import { useEffect, useState } from 'react';
import { Search, X, Heart, Grid, List, Loader2, SlidersHorizontal, MapPin, Leaf } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

interface RentTree {
  id: number;
  name: string;
  tree_type: string;
  farm_name: string;
  location: string;
  price: number;
  image_url: string;
  season: string;
  yield_estimate: string;
  description: string;
  featured: boolean;
}

export default function RentATree() {
  const [trees, setTrees] = useState<RentTree[]>([]);
  const [filteredTrees, setFilteredTrees] = useState<RentTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { t, language } = useLanguage();

  const treeTypes = [
    { id: 'all', nameEn: 'All', nameHi: 'सभी' },
    { id: 'mango', nameEn: 'Mango', nameHi: 'आम' },
    { id: 'litchi', nameEn: 'Litchi', nameHi: 'लीची' },
    { id: 'guava', nameEn: 'Guava', nameHi: 'अमरूद' },
    { id: 'banana', nameEn: 'Banana', nameHi: 'केला' },
    { id: 'papaya', nameEn: 'Papaya', nameHi: 'पपीता' },
  ];

  const locations = [
    { id: 'all', nameEn: 'All Locations', nameHi: 'सभी स्थान' },
    { id: 'maharashtra', nameEn: 'Maharashtra', nameHi: 'महाराष्ट्र' },
    { id: 'west-bengal', nameEn: 'West Bengal', nameHi: 'पश्चिम बंगाल' },
    { id: 'gujarat', nameEn: 'Gujarat', nameHi: 'गुजरात' },
    { id: 'uttar-pradesh', nameEn: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
    { id: 'karnataka', nameEn: 'Karnataka', nameHi: 'कर्नाटक' },
  ];

  useEffect(() => {
    fetchTrees();
  }, []);

  useEffect(() => {
    filterTrees();
  }, [trees, searchQuery, selectedType, priceRange, selectedLocation, sortBy]);

  const fetchTrees = async () => {
    console.log("1. Starting fetch...");
    console.log("2. Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("3. Supabase Key:", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.substring(0, 20));
    
    try {
      const { data, error } = await supabase
        .from('rent_trees')
        .select('*');
      
      console.log("4. Result:", { data, error });
      
      if (error) {
        console.error('Error:', error.message);
        setTrees([]);
      } else {
        setTrees(data || []);
      }
    } catch (err: any) {
      console.error('Catch error:', err?.message || err);
      setTrees([]);
    } finally {
      setLoading(false);
    }
  };

  const filterTrees = () => {
    if (!Array.isArray(trees)) {
      setFilteredTrees([]);
      return;
    }
    let result = [...trees];

    if (searchQuery) {
      result = result.filter(tree => 
        tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tree.farm_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tree.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      result = result.filter(tree => tree.tree_type === selectedType);
    }

    result = result.filter(tree => tree.price >= priceRange[0] && tree.price <= priceRange[1]);

    if (selectedLocation !== 'all') {
      result = result.filter(tree => 
        tree.location?.toLowerCase().includes(selectedLocation.replace('-', ' '))
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredTrees(result);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setPriceRange([0, 10000]);
    setSelectedLocation('all');
    setSortBy('default');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-12 h-12 animate-spin text-[#2D5A27]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white mb-2">
            {language === 'hi' ? 'अपना पेड़ चुनें' : 'Pick Your Tree'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTrees.length} {language === 'hi' ? 'पेड़ मिले' : 'trees found'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'hi' ? 'पेड़ खोजें...' : 'Search trees...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl dark:text-white"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {language === 'hi' ? 'फ़िल्टर' : 'Filters'}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white"
            >
              <option value="default">{language === 'hi' ? 'डिफ़ॉल्ट' : 'Default'}</option>
              <option value="price-low">{language === 'hi' ? 'कम कीमत' : 'Price: Low to High'}</option>
              <option value="price-high">{language === 'hi' ? 'उच्च कीमत' : 'Price: High to Low'}</option>
              <option value="name">{language === 'hi' ? 'नाम' : 'Name'}</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-[#2D5A27] text-white' : 'dark:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-[#2D5A27] text-white' : 'dark:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Tree Types */}
                <div>
                  <label className="block text-sm font-medium dark:text-white mb-2">
                    {language === 'hi' ? 'पेड़ का प्रकार' : 'Tree Type'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {treeTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          selectedType === type.id
                            ? 'bg-[#2D5A27] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                        }`}
                      >
                        {language === 'hi' ? type.nameHi : type.nameEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium dark:text-white mb-2">
                    {language === 'hi' ? 'कीमत सीमा' : 'Price Range'}: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-20 px-2 py-1 border dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium dark:text-white mb-2">
                    {language === 'hi' ? 'स्थान' : 'Location'}
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {language === 'hi' ? loc.nameHi : loc.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:underline"
                  >
                    {language === 'hi' ? 'सभी फ़िल्टर हटाएं' : 'Clear All Filters'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trees Grid/List */}
        {filteredTrees.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {language === 'hi' ? 'कोई पेड़ नहीं मिला' : 'No trees found'}
            </p>
            <button onClick={clearFilters} className="mt-4 text-[#2D5A27] hover:underline">
              {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Clear Filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrees.map(tree => (
              <div
                key={tree.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="aspect-square relative">
                  <img
                    src={tree.image_url}
                    alt={tree.name}
                    className="w-full h-full object-cover"
                  />
                  {tree.featured && (
                    <span className="absolute top-3 left-3 bg-[#D4A017] text-white text-xs font-bold px-2 py-1 rounded-full">
                      {language === 'hi' ? 'विशेष' : 'Featured'}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#2D5A27] font-medium uppercase">{tree.tree_type}</p>
                  <h3 className="font-semibold dark:text-white">{tree.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{tree.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-gray-500 dark:text-gray-400 text-sm">
                    <Leaf className="w-3 h-3" />
                    <span>{tree.yield_estimate}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xl font-bold dark:text-white">₹{tree.price}</span>
                      <span className="text-xs text-gray-500">/{language === 'hi' ? 'मौसम' : 'season'}</span>
                    </div>
                    <button className="px-4 py-2 bg-[#2D5A27] text-white rounded-xl hover:bg-[#1E3D1A] transition-colors text-sm">
                      {language === 'hi' ? 'किराए पर लें' : 'Rent'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrees.map(tree => (
              <div
                key={tree.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex gap-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={tree.image_url} alt={tree.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[#2D5A27] font-medium uppercase">{tree.tree_type}</p>
                  <h3 className="text-lg font-semibold dark:text-white">{tree.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{tree.farm_name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{tree.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      <span>{tree.yield_estimate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-xl font-bold dark:text-white">₹{tree.price}</span>
                      <span className="text-xs text-gray-500">/{language === 'hi' ? 'मौसम' : 'season'}</span>
                    </div>
                    <button className="px-4 py-2 bg-[#2D5A27] text-white rounded-xl hover:bg-[#1E3D1A] transition-colors">
                      {language === 'hi' ? 'किराए पर लें' : 'Rent'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}