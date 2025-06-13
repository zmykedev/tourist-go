import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen snap-start px-4 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 dark:from-emerald-800 dark:via-emerald-700 dark:to-emerald-900 overflow-hidden flex items-center justify-center"
    >
      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />

      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          whileInView={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-100"
          >
            Ready to Explore Chile?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
          >
            Connect with local drivers who speak your language and know the best spots
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-x-6"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-emerald-700 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group"
              onClick={() => navigate('/register')}
            >
              <span className="relative z-10">Start Exploring →</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
