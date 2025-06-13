import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const languages = [
  { id: "en", text: "English" },
  { id: "en2", text: "English" },
  { id: "en3", text: "English" },
  { id: "fr", text: "Français" },
  { id: "fr2", text: "Français" },
  { id: "fr3", text: "Français" },
  { id: "it", text: "Italiano" },
  { id: "it2", text: "Italiano" },
  { id: "it3", text: "Italiano" },
  { id: "pt", text: "Português" },
  { id: "pt2", text: "Português" },
  { id: "pt3", text: "Português" },
  { id: "es", text: "Español" },
  { id: "es2", text: "Español" },
  { id: "es3", text: "Español" },
  { id: "de", text: "Deutsch" },
  { id: "de2", text: "Deutsch" },
  { id: "de3", text: "Deutsch" },
  { id: "jp", text: "日本語" },
  { id: "jp2", text: "日本語" },
  { id: "jp3", text: "日本語" },
  { id: "zh", text: "中文" },
  { id: "zh2", text: "中文" },
  { id: "zh3", text: "中文" }
];

function getRandomProps() {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    scale: 0.8 + Math.random() * 0.4,
    zIndex: Math.floor(Math.random() * 10),
    opacity: 0.3 + Math.random() * 0.2,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 0.5,
    xMove: `${Math.random() * 50 - 25}%`,
    yMove: `${Math.random() * 50 - 25}%`
  };
}

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen snap-start flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-900"
    >
      {/* Animated background gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-emerald-900/40 dark:from-emerald-900/40 dark:to-black/60 z-10"
        animate={{
          background: [
            'linear-gradient(to bottom, rgba(5, 150, 105, 0.2), rgba(6, 95, 70, 0.4))',
            'linear-gradient(to bottom, rgba(6, 95, 70, 0.4), rgba(5, 150, 105, 0.2))',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated circles in background */}
      <motion.div
        className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full bg-emerald-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          top: '20%',
          left: '10%',
        }}
      />
      <motion.div
        className="absolute w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full bg-emerald-300/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          bottom: '20%',
          right: '10%',
        }}
      />

      {/* Language Floating Elements */}
      {languages.map((lang) => {
        const props = getRandomProps();
        return (
          <motion.div
            key={lang.id}
            className="absolute text-emerald-100/30 dark:text-emerald-100/20 font-bold text-base sm:text-lg md:text-xl lg:text-2xl select-none pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [props.opacity, props.opacity + 0.1, props.opacity],
              scale: [props.scale, props.scale + 0.1, props.scale],
              x: ["0%", props.xMove, "0%"],
              y: ["0%", props.yMove, "0%"],
            }}
            transition={{
              duration: props.duration,
              repeat: Infinity,
              delay: props.delay,
              ease: "linear"
            }}
            style={{
              left: props.left,
              top: props.top,
              filter: 'blur(0.5px)',
              zIndex: props.zIndex,
              opacity: props.opacity,
              willChange: 'transform, opacity'
            }}
          >
            {lang.text}
          </motion.div>
        );
      })}

      <div className="relative z-30 text-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
          >
            Explore Chile
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-white">
              Without Barriers
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Connect with local multilingual drivers and discover the best of Chile
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-700 rounded-full font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => navigate('/register')}
          >
            Start Your Journey
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 transition-all duration-200"
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
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
