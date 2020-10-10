import React, { Fragment, useState, useEffect, useRef } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const buttonRef = useRef(null);

  const decreaseCount = () => count && setCount(count - 1);
  const increaseCount = ({ target }) =>
    target !== buttonRef.current && setCount((count) => count + 1);

  // Listen for any click or key
  useEffect(() => {
    window.addEventListener("click", increaseCount);
    window.addEventListener("keydown", increaseCount);

    return () => {
      window.removeEventListener("click", increaseCount);
      window.removeEventListener("keydown", increaseCount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div id="counter">
        <h2>{count}</h2>
        <span
          ref={buttonRef}
          role="img"
          aria-label="Decrease count"
          onClick={decreaseCount}
        >
          👇
        </span>
      </div>
    </Fragment>
  );
};

export default App;
