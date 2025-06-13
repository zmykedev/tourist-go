import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const FeaturesSection: React.FC = () => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, margin: "-100px" });

  const features = [
    {
      title: "Tourist Experience",
      description: "Explore Chile with confidence, regardless of language barriers",
      icon: "🌎",
      subFeatures: ["Easy Booking", "Language Support", "24/7 Assistance"],
      color: "bg-emerald-600 dark:bg-emerald-700"
    },
    {
      title: "Professional Drivers",
      description: "Local experts fluent in multiple languages ready to guide you",
      icon: "🚗",
      subFeatures: ["Multilingual", "Local Knowledge", "Verified Profiles"],
      color: "bg-emerald-600 dark:bg-emerald-700"
    },
    {
      title: "Custom Tours",
      description: "Personalized experiences tailored to your interests",
      icon: "🎯",
      subFeatures: ["Flexible Routes", "Tourist Spots", "Hidden Gems"],
      color: "bg-emerald-600 dark:bg-emerald-700"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      ref={featuresRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-32 px-4 relative min-h-screen snap-start overflow-hidden bg-white dark:bg-emerald-950"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
      
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold text-center mb-24 text-emerald-600 dark:text-white relative z-10"
      >
        Experience the Difference
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative p-8 rounded-3xl bg-white dark:bg-emerald-900/50 shadow-xl">
              <motion.div
                className="floating-icon-container"
         
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-emerald-50 dark:bg-emerald-800 shadow-xl"
                  animate={{
                    y: [-10, 10, -10]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {feature.icon}
                </motion.div>
              </motion.div>

              <h3 className="text-2xl font-bold mt-16 mb-4 text-emerald-800 dark:text-emerald-100">
                {feature.title}
              </h3>
              
              <p className="text-emerald-600 dark:text-emerald-300 mb-6">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.subFeatures.map((subFeature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center space-x-3 text-emerald-700 dark:text-emerald-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2
                      }}
                    />
                    <span>{subFeature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
