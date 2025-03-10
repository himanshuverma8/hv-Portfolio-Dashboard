import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <FooterWrapper className="np-tailwind">
      <div className="footer__content">
        <div className="footer__logo">
          <img src="https://files.hvin.tech/lighting_logo.png" alt="Logo" />
        </div>
        <div className="footer__socials">
          <SocialLink href="https://www.instagram.com/hv__in/" aria-label="Instagram" />
          <SocialLink href="https://x.com/hv__in" aria-label="Twitter" />
          <SocialLink href="https://www.linkedin.com/in/himanshuver/" aria-label="LinkedIn" />
        </div>
        <div className="footer__copyright">&copy; {new Date().getFullYear()} hv</div>
      </div>
    </FooterWrapper>
  );
};

interface SocialLinkProps {
  href: string;
  "aria-label": string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, "aria-label": ariaLabel }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <svg
      className="social__icon"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
    </svg>
  </a>
);

const FooterWrapper = styled.footer`
  all: unset,
  background-color: transparent;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  .footer__content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .footer__logo img {
    transition: transform 0.3s ease;
    height: 40px;
    width: auto;
  }

  .footer__logo img:hover {
    transform: scale(1.2);
  }

  .footer__socials {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 10px;
  }

  .social__icon {
    width: 36px;
    height: 36px;
    fill: #fff;
    transition: transform 0.3s ease, fill 0.3s ease;
    cursor: pointer;
  }

  .social__icon:hover {
    transform: scale(1.2);
    fill: #7775fc;
  }

  .footer__copyright {
    font-size: 14px;
    color: #ccc;
  }
`;

export default Footer;
