
import { motion } from "framer-motion";
import { CornerDownLeftIcon, SearchIcon } from "lucide-react";

// Card component for welcome screen suggestions
const SuggestionCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <motion.div 
      className="bg-[#121212]/70 border border-gray-800 p-4 rounded-xl flex items-center gap-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rounded-full bg-purple-600/20 p-3">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-white text-lg">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

// Welcome screen shown for new conversations
const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 h-full">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        What do you want to know?
      </motion.h1>
      
      <div className="w-full max-w-xl space-y-4">
        <SuggestionCard 
          icon={<CornerDownLeftIcon className="h-5 w-5" />}
          title="Ask anything"
          description="Get detailed explanations for complex topics"
        />
        <SuggestionCard 
          icon={<SearchIcon className="h-5 w-5" />}
          title="Find information"
          description="Search for facts, data, and resources"
        />
      </div>
    </div>
  );
};

export default WelcomeScreen;
