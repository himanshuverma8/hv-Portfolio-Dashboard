const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent w-full mx-auto p-4 rounded-xl dark:bg-transparent shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
      <p className="text-xs text-center">
        © {new Date().getFullYear()} hv
      </p>
    </footer>
  );
};

export default Footer;
