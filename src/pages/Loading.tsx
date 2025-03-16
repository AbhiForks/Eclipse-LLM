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
        navigate('/chat');
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
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-900/40 to-orange-600/30 blur-3xl"
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3],
              x: ["-50%", "-45%", "-50%"],
              y: ["0%", "5%", "0%"]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-600/30 to-red-700/20 blur-3xl"
            initial={{ scale: 0.6, opacity: 0.2 }}
            animate={{ 
              scale: [0.6, 1, 0.6],
              opacity: [0.2, 0.4, 0.2],
              x: ["0%", "5%", "0%"],
              y: ["0%", "-5%", "0%"]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          />
        </div>
        
        <Logo variant="loading" size={70} />
        
        {/* Mystical particles */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 4 + 2, 
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <motion.div className="absolute bottom-20 w-full max-w-md px-6">
          <div className="h-[2px] w-full bg-purple-900/30 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-600 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          <div className="mt-4 flex justify-between text-sm">
            <motion.span 
              className="text-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing Eclipse
            </motion.span>
            <motion.span 
              className="text-orange-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {Math.round(progress)}%
            </motion.span>
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
