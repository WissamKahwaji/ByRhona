import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-32 h-32"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <img
          src={logo}
          alt="Loading"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  );
};

export default LoadingPage;
