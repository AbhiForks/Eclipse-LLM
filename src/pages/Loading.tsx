
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
      }, 500);
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [progress, navigate]);
  
  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Logo variant="loading" size={60} />
        
        <motion.div className="absolute bottom-20 w-full max-w-md px-6">
          <div className="h-[2px] w-full bg-gray-900 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Loading Eclipse</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
