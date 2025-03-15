
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GlowEffect from "@/components/GlowEffect";
import FloatingParticle from "@/components/FloatingParticle";
import { ArrowRight, MessageSquare, Sparkles, Brain, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  // Parallax effect for background objects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background effects */}
      <GlowEffect />
      <FloatingParticle size={8} top="10%" left="10%" duration={25} />
      <FloatingParticle size={10} top="20%" right="15%" duration={30} delay={2} />
      <FloatingParticle size={6} bottom="30%" left="20%" duration={20} delay={5} />
      <FloatingParticle size={12} bottom="20%" right="25%" duration={28} delay={3} />
      <FloatingParticle size={8} top="15%" right="40%" duration={22} delay={7} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          <Logo size={36} />
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            </nav>
            
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="cosmic-button">Log in</Button>
              </Link>
              <Link to="/chat">
                <Button className="cosmic-button">Start chatting</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="relative min-h-screen pt-32 px-6 sm:px-12 md:px-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Seize the unexpected</span><br/>
            <span className="text-white/80">with Eclipse AI</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Navigate the new challenges of our world with an AI assistant that understands you and helps you push the boundaries of what's possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="cosmic-button group">
                Start chatting
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="cosmic-button">
                Explore features
              </Button>
            </a>
          </div>
        </motion.div>
        
        {/* Hero visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 w-full max-w-5xl relative"
        >
          <div className="relative rounded-xl overflow-hidden aspect-video neo-blur shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-sm"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Experience the future of AI conversation</h3>
              <p className="text-muted-foreground mb-6 max-w-md">Fluid, responsive, and intelligent - Eclipse redefines how you interact with AI.</p>
              <Link to="/chat">
                <Button variant="secondary" className="cosmic-button">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Try it now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Features section */}
      <section id="features" className="py-24 px-6 sm:px-12 md:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Supercharged Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
      
      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-12 md:px-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-cosmic/70 opacity-80" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to experience Eclipse?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the thousands of professionals and creators who rely on Eclipse to push the boundaries of what's possible.
          </p>
          
          <Link to="/chat">
            <Button size="lg" className="cosmic-button">
              Start your journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-6 sm:px-12 md:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo size={30} />
            <p className="mt-4 text-sm text-muted-foreground">
              Eclipse is a next-generation AI assistant designed to help you navigate the challenges of our world.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
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
      className="cosmic-card p-6 rounded-xl"
    >
      <div className="p-3 rounded-full bg-cosmic-blue/20 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Home;
