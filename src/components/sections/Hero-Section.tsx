import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const languages = [
  "English", "English", "English", "English", "English", "English",
  "Français", "Français", "Français", "Français", "Français", "Français",
  "Italiano", "Italiano", "Italiano", "Italiano", "Italiano", "Italiano",
  "Português", "Português", "Português", "Português", "Português", "Português"
];

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-emerald-900/40 dark:from-emerald-900/40 dark:to-black/60 z-10" />
      
    

      {/* Language Floating Elements */}
      {languages.map((lang, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-100/30 dark:text-emerald-100/20 font-bold text-2xl md:text-4xl select-none pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            filter: 'blur(1px)'
          }}
        >
          {lang}
        </motion.div>
      ))}

      <div className="relative z-30 text-center px-4">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Explore Chile
          <br />
          <span className="text-emerald-100">Without Barriers</span>
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Connect with local multilingual drivers and discover the best of Chile
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate('/register')}
          >
            Start Your Journey
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            onClick={() => navigate('/login')}
          >
            Join as Driver
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
       
      </motion.div>
    </motion.div>
  );
};
