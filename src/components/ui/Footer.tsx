const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent w-full mx-auto p-4 dark:bg-transparent shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
    <p className="text-xs text-center">
      © {new Date().getFullYear()} hv
    </p>
    <a href="mailto:hvinprimary@gmail.com">
      <p className="text-xs text-center text-blue-300 hover:underline">
        collaborate with me
      </p>
    </a>
  </footer>
  
  );
};

export default Footer;
