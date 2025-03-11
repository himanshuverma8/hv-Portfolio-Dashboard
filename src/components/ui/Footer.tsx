import ColourfulText from "./colourful-text";
import { motion } from "motion/react";
const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent w-full mx-auto p-4 dark:bg-transparent shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
      <h1 className="text-xs font-bold text-center text-white relative z-2 font-sans">
      © {new Date().getFullYear()}<ColourfulText text={` hv`} />
      </h1>
    <a href="mailto:hvinprimary@gmail.com">
      <p className="text-xs text-center">
      <ColourfulText text="collabarate with me" />
      </p>
    </a>
  </footer>  
  
  );
};

export default Footer;
