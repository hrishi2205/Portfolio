import React from "react";
import styled from "styled-components";

// OPTIMIZATION: Use React.forwardRef to allow passing a ref to the inner button
export const ShimmerButton = React.forwardRef(
  ({ children, onClick, className = "", ...props }, ref) => {
    return (
      <ButtonWrapper className={className}>
        <button ref={ref} onClick={onClick} {...props}>
          {" "}
          {/* Apply the ref and any other props */}
          {children}
        </button>
      </ButtonWrapper>
    );
  }
);

const ButtonWrapper = styled.div`
  button {
    --border-radius: 30px;
    --border-width: 4px;
    appearance: none;
    position: relative;
    padding: 0.6em 1.5em;
    border: 0;
    background-color: #000;
    font-family: "Roboto", Arial, "Segoe UI", sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    z-index: 2;
    cursor: pointer;
    border-radius: var(--border-radius);
    overflow: hidden;
    width: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }

  button::after {
    --m-i: linear-gradient(#000, #000);
    --m-o: content-box, padding-box;
    content: "";
    position: absolute;
    inset: 0;
    padding: var(--border-width);
    border-radius: var(--border-radius);
    background-image: conic-gradient(#0ea5e9, #3b82f6, #38bdf8, #0ea5e9);
    -webkit-mask-image: var(--m-i), var(--m-i);
    mask-image: var(--m-i), var(--m-i);
    -webkit-mask-origin: var(--m-o);
    mask-origin: var(--m-o);
    -webkit-mask-clip: var(--m-o);
    mask-composite: exclude;
    -webkit-mask-composite: destination-out;
    filter: hue-rotate(0);
    animation: rotate-hue linear 2s infinite;
    animation-play-state: paused;
    pointer-events: none;
  }

  button:hover::after {
    animation-play-state: running;
  }

  @keyframes rotate-hue {
    to {
      filter: hue-rotate(1turn);
    }
  }

  button:active {
    --border-width: 5px;
  }
`;
