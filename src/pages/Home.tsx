
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GlowEffect from "@/components/GlowEffect";
import FloatingParticle from "@/components/FloatingParticle";
import NewsCard from "@/components/NewsCard";
import { ArrowRight, MessageSquare, Sparkles, Brain, Layers, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Meta Maneuvers to Block Tell-All Document Release",
    source: "Tech News Daily",
    imageUrl: "https://placehold.co/100x100/3a1c71/ffffff?text=Meta",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "AI Scientist Generates First Peer-Reviewed Research Paper",
    source: "Science Today",
    imageUrl: "https://placehold.co/100x100/662d8c/ffffff?text=AI",
    date: "5 hours ago"
  },
  {
    id: 3,
    title: "New Quantum Computing Breakthrough Challenges Encryption",
    source: "Future Tech",
    imageUrl: "https://placehold.co/100x100/862d9c/ffffff?text=Quantum",
    date: "Yesterday"
  }
];

// Component for animated blobs
const AnimatedBlob = ({ className = "", delay = 0 }) => {
  return (
    <motion.div 
      className={`absolute rounded-full bg-gradient-to-r from-purple-800/30 to-orange-600/20 blur-3xl ${className}`}
      initial={{ opacity: 0.2, scale: 0.8 }}
      animate={{ 
        opacity: [0.2, 0.4, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
    />
  );
};

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  
  // Parallax effects based on scroll
  const bgPositionY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleBlob1 = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotateBlob2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  
  // Mouse parallax effect for background objects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      setMousePosition({ x, y });
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div style={{ y: bgPositionY }} className="h-full w-full">
          <AnimatedBlob className="h-[800px] w-[800px] top-[-100px] left-[-100px]" />
          <motion.div style={{ scale: scaleBlob1 }}>
            <AnimatedBlob className="h-[600px] w-[600px] bottom-[-100px] right-[-100px]" delay={5} />
          </motion.div>
          <motion.div style={{ rotate: rotateBlob2 }}>
            <AnimatedBlob className="h-[500px] w-[500px] top-[40%] left-[30%]" delay={2} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Fixed particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingParticle size={8} top="10%" left="10%" duration={25} />
        <FloatingParticle size={10} top="20%" right="15%" duration={30} delay={2} />
        <FloatingParticle size={6} bottom="30%" left="20%" duration={20} delay={5} />
        <FloatingParticle size={12} bottom="20%" right="25%" duration={28} delay={3} />
        <FloatingParticle size={8} top="15%" right="40%" duration={22} delay={7} />
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 backdrop-blur-md bg-black/20">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/">
            <Logo size={36} />
          </Link>
          
          {isMobile ? (
            // Mobile menu
            <div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-purple-900/30 text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 p-4 bg-gradient-to-b from-purple-900/80 to-black/90 backdrop-blur-lg rounded-b-xl border-t border-purple-500/20"
                >
                  <nav className="flex flex-col gap-4 text-base font-medium mb-4">
                    <a href="#features" className="py-2 text-purple-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#about" className="py-2 text-purple-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="#news" className="py-2 text-purple-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>News</a>
                  </nav>
                  
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-900/30">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white">
                        Start chatting
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            // Desktop menu
            <div className="flex items-center gap-6">
              <nav className="flex gap-8 text-sm font-medium">
                <a href="#features" className="text-purple-300 hover:text-white transition-colors">Features</a>
                <a href="#about" className="text-purple-300 hover:text-white transition-colors">About</a>
                <a href="#news" className="text-purple-300 hover:text-white transition-colors">News</a>
              </nav>
              
              <div className="flex gap-3">
                <Link to="/login">
                  <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-900/30">
                    Log in
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white">
                    Start chatting
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Hero section */}
      <section className="relative min-h-screen pt-32 px-6 sm:px-12 md:px-24 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
          style={{ opacity: opacityHero }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Seize the</span><br/>
            <span className="bg-gradient-to-r from-purple-500 via-orange-400 to-purple-500 bg-clip-text text-transparent">unexpected</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-purple-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Navigate the new challenges of our world with an AI assistant that understands you and helps you push the boundaries of what's possible.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/chat">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white group">
                Start chatting
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-purple-500/30 text-white hover:bg-purple-900/30">
                Explore features
              </Button>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-purple-400 text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="h-6 w-6 text-purple-400" />
        </motion.div>
      </section>
      
      {/* Features section */}
      <section id="features" className="relative z-10 py-24 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Supercharged Capabilities
            </h2>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">
              Eclipse combines cutting-edge AI with a beautiful interface to deliver an experience unlike any other.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6" />}
              title="Advanced Reasoning"
              description="Complex problem-solving capabilities that understand nuance and context in any situation."
            />
            <FeatureCard 
              icon={<Brain className="h-6 w-6" />}
              title="Creative Generation"
              description="Generate ideas, content, and creative solutions that spark imagination and innovation."
            />
            <FeatureCard 
              icon={<Layers className="h-6 w-6" />}
              title="Multi-Modal Understanding"
              description="Process and reason across text, images, and structured data for comprehensive insights."
            />
            <FeatureCard 
              icon={<Globe className="h-6 w-6" />}
              title="Multilingual Support"
              description="Communicate seamlessly in multiple languages with natural-sounding translations."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6" />}
              title="Conversation Memory"
              description="Long-term memory of your conversations for more personalized and contextual interactions."
            />
            <FeatureCard 
              icon={<ArrowRight className="h-6 w-6" />}
              title="Extensible API"
              description="Connect Eclipse to your tools and workflows for enhanced productivity."
            />
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section id="news" className="relative z-10 py-24 px-6 sm:px-12 md:px-24 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              Latest AI News
            </h2>
            <p className="text-lg text-purple-300 max-w-2xl">
              Stay updated with the latest developments in artificial intelligence and technology.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NewsCard
                  title={news.title}
                  source={news.source}
                  imageUrl={news.imageUrl}
                  date={news.date}
                  onClick={() => console.log(`Opening news: ${news.title}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 sm:px-12 md:px-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/60" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Ready to experience Eclipse?
          </h2>
          <p className="text-lg text-purple-300 mb-8 max-w-2xl mx-auto">
            Join the thousands of professionals and creators who rely on Eclipse to push the boundaries of what's possible.
          </p>
          
          <Link to="/chat">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white">
              Start your journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/20 py-12 px-6 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo size={30} />
            <p className="mt-4 text-sm text-purple-300">
              Eclipse is a next-generation AI assistant designed to help you navigate the challenges of our world.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Links</h4>
            <ul className="space-y-2 text-sm text-purple-300">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">News</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-purple-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-500/10 text-center text-sm text-purple-300">
          <p>© {new Date().getFullYear()} Eclipse AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
      className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-6 rounded-xl backdrop-blur-sm"
    >
      <div className="p-3 rounded-full bg-orange-500/20 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-purple-300">{description}</p>
    </motion.div>
  );
};

export default Home;
