import React from "react";
import styled from "styled-components";

const Input = ({ userid, platformname, imgpath, link }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert(`Link copied to clipboard: ${link}`);
    });
  };

  return (
    <StyledWrapper platformname={platformname} className="no-tailwind">
      <div className="input__container">
        <div className="shadow__input" />
        <a href={link} target="_blank" rel="noopener noreferrer" className="input__button__link">
          <button className="input__button__shadow">
            <img src={imgpath} alt="button icon" className="button__image" />
          </button>
        </a>
        <input
          value={userid}
          type="text"
          name="username"
          className="input__search"
          placeholder="Enter username"
          readOnly
        />
        <button className="copy__button" onClick={copyToClipboard} title="Copy link to clipboard">
          <svg
            className="clipboard-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

// Styled Components (Ensures No Tailwind Influence)
const StyledWrapper = styled.div`
  all: unset; /* Resets Tailwind styles */
  margin: 40px;

  .input__container {
    position: relative;
    background: #f0f0f0;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border: 4px solid #000;
    max-width: 400px;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-10deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #000;
  }

  .input__container:hover {
    transform: rotateX(5deg) rotateY(-1deg) scale(1.05);
    box-shadow: 25px 25px 0 -5px #9694ff, 25px 25px 0 0 #000;
  }

  .shadow__input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(45deg, rgba(255, 107, 107, 0.4) 0%, rgba(255, 107, 107, 0.1) 100%);
    filter: blur(20px);
  }

  .input__button__link {
    text-decoration: none;
  }

  .input__button__shadow {
    cursor: pointer;
    border: 3px solid #000;
    background: #9694ff;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
  }

  .input__button__shadow:hover {
    background: #9694ff;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .button__image {
    width: 136%;
    height: 136%;
    object-fit: fill;
  }

  .input__search {
    width: 100%;
    outline: none;
    border: 3px solid #000;
    padding: 15px;
    font-size: 18px;
    background: #fff;
    color: #000;
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
  }

  .input__search::placeholder {
    color: #9694ff;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__search:hover,
  .input__search:focus {
    background: #f0f0f0;
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .copy__button {
    cursor: pointer;
    border: 3px solid #000;
    background: #f0f0f0;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    font-weight: bold;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: relative;
    z-index: 3;
    box-shadow: 5px 5px 0 0 #000;
  }

  .copy__button:hover {
    background: #9694ff;
    color: #fff;
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #000;
  }

  .clipboard-icon {
    width: 24px;
    height: 24px;
    color: #000;
  }

  .input__container::before {
    content: "${(props) => props.platformname || ''}";
    position: absolute;
    top: -15px;
    left: 20px;
    background: #9694ff;
    color: #000;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #000;
  }

  @media (max-width: 768px) {
    .input__search {
      display: none;
    }

    .input__container {
      display: flex;
      justify-content: flex-start;
      border: 4px solid #000;
      width: 200px;
    }

    .copy__button {
      margin-left: auto;
    }
  }
`;

export default Input;
