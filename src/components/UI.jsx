import React, { useState } from 'react';
import { Search, Compass, Gamepad2, Info, Menu, X, ArrowRight, Download, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = ({ onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass shadow-sm border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <Gamepad2 size={24} />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                HindiGyan
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-100/50 leading-5 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all shadow-inner"
                placeholder="Search for games..."
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center gap-1.5 text-slate-600 hover:text-primary font-medium transition-colors">
              <Compass size={18} />
              Home
            </Link>
            <a href="#" className="flex items-center gap-1.5 text-slate-600 hover:text-primary font-medium transition-colors">
              <Info size={18} />
              Categories
            </a>
            <button className="btn btn-primary text-sm shadow-md">Join Us</button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="px-3 pb-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-100/50 leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Search games..."
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-100 transition-all">Home</Link>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-100 transition-all">Categories</a>
              <div className="px-3 pt-4">
                <button className="w-full btn btn-primary">Join Community</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Sidebar = ({ games }) => {
  const popularGames = games.slice(0, 5);
  const newGames = [...games].reverse().slice(0, 5);

  return (
    <aside className="space-y-8">
      {/* Popular Games Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Star className="text-accent" fill="currentColor" size={20} /> Popular Games
        </h3>
        <div className="space-y-4">
          {popularGames.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className="flex gap-4 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-50">
                <img src={game.icon || `https://api.dicebear.com/7.x/shapes/svg?seed=${game.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm truncate">{game.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-0.5 text-accent font-bold">
                    <Star size={12} fill="currentColor" /> {game.rating}
                  </span>
                  <span>•</span>
                  <span>{game.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button className="w-full mt-6 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors border border-primary/20">
          View All Popular
        </button>
      </div>

      {/* New Releases Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Download className="text-primary" size={20} /> New Releases
        </h3>
        <div className="space-y-4">
          {newGames.map((game) => (
            <Link to={`/game/${game.id}`} key={game.id} className="flex gap-4 group cursor-pointer">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm border border-slate-50">
                <img src={game.icon || `https://api.dicebear.com/7.x/shapes/svg?seed=${game.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm truncate">{game.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{game.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Subscription / Newsletter */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <h3 className="text-lg font-bold mb-2 relative z-10">Get Updates!</h3>
        <p className="text-white/80 text-xs mb-4 relative z-10">Subscribe for newest APKs.</p>
        <div className="relative z-10">
          <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30 transition-all mb-3 text-sm" />
          <button className="w-full bg-white text-primary font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-lg text-sm">Subscribe</button>
        </div>
      </div>
    </aside>
  );
};

export const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Gamepad2 size={20} />
            </div>
            <span className="text-xl font-bold text-white">HindiGyan</span>
          </div>
          <p className="max-w-md text-slate-500 mb-8 leading-relaxed">
            The ultimate destination for discovering free and premium mobile games. We provide secure downloads, detailed reviews, and the latest updates on your favorite titles.
          </p>
          <div className="flex space-x-4">
            {/* Simple social icons */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Star size={18} fill="currentColor" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-primary transition-colors">Popular Games</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">New Releases</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Action</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Simulation</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-6">Support</h3>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">DMCA</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} HindiGyan. All rights reserved.</p>
        <p>Made with ❤️ for gamers.</p>
      </div>
    </div>
  </footer>
);

export const GameCard = ({ game, onClick }) => (
  <motion.div
    whileHover={{ y: -8 }}
    whileTap={{ scale: 0.98 }}
    className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col h-full"
    onClick={() => onClick(game)}
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${game.title}`}
        alt={game.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <span className="text-white text-sm font-medium flex items-center gap-1">
          View Details <ArrowRight size={14} />
        </span>
      </div>
      <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold text-primary shadow-sm border border-primary/10">
        {game.category.toUpperCase()}
      </div>
    </div>
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors truncate">
          {game.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1 text-accent font-bold">
            <Star size={14} fill="currentColor" />
            {game.rating}
          </span>
          <span>•</span>
          <span>{game.downloads}</span>
        </div>
      </div>
      <button className="w-full btn btn-secondary text-sm group-hover:btn-primary group-hover:border-primary py-2.5">
        Get it for {game.price}
      </button>
    </div>
  </motion.div>
);
