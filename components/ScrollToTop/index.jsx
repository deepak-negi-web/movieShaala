import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles";
import { ChevronUp } from "../../assets";

export function ScrollToTop({ showBelow }) {
  const [show, setShow] = useState(false);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (!show && window.pageYOffset > showBelow) {
        setShow(true);
      } else if (show && window.pageYOffset <= showBelow) {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div>
      {show && (
        <Wrapper onClick={scrollTop}>
          <div className="back_to_top__wrapper">
            <span>
              <ChevronUp size="12" color="#fff" />
            </span>
            <span className="back_to_top__link">Go to Top</span>
          </div>
        </Wrapper>
      )}
    </div>
  );
}
