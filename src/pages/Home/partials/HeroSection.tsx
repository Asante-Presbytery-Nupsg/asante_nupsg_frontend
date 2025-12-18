import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../../../assets/Rectangle 1.svg";
import img2 from "../../../assets/Rectangle 2.svg";
import img3 from "../../../assets/Rectangle 5.svg";

const textVariant = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 15,
      mass: 0.8,
    },
  },
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 18,
      mass: 0.8,
      delay: 0.3,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 16,
      mass: 0.8,
      delay: 0.2 * i + 0.2,
    },
  }),
};

const HeroSection: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide lg:leading-16 xl:leading-20 text-blue-900 font-extrabold text-center pt-12 pb-6 capitalize"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          Welcome to the Presbyterians Registration Portal
        </motion.div>

        <motion.div
          className="text-center text-base sm:text-lg md:text-xl pt-2 text-slate-500 px-2 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <p>
            Are you a new student entering a tertiary institution this academic
            year?
          </p>
          <p>
            Welcome to the National Union of Presbyterian Students-Ghana
            (NUPS-G)!
          </p>
        </motion.div>

        <div className="w-full flex flex-col items-center py-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariant}
            className="pt-4"
          >
            <Link to="/register">
              <button className="bg-blue-700 py-3 sm:py-4 px-8 sm:px-10 md:px-14 text-lg sm:text-xl text-white rounded-2xl transition-all duration-300 hover:bg-blue-800 cursor-pointer">
                Register Now
              </button>
            </Link>
          </motion.div>

          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end gap-4 mt-10">
            {[img1, img2, img3].map((src, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={imageVariant}
                className="w-full sm:w-1/3"
              >
                <img
                  src={src}
                  alt={`image-${index}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
