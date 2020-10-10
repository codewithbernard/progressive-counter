import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const App = () => {
  const [count, setCount] = useState(0);
  const [{ xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const interpolateCount = xy.interpolate(
    (x, y) =>
      `perspective(200px) translate(${x / 100}px, ${y / 100}px) rotateY(${
        x / 50
      }deg) rotateX(${-y / 50}deg)`
  );
  const buttonRef = useRef(null);
  const onMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    []
  );
  const onScroll = useCallback((e) => set({ st: e.target.scrollTop / 30 }), []);

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
    <div id="container" onMouseMove={onMove} onScroll={onScroll}>
      <div id="counter">
        <animated.h2 style={{ transform: interpolateCount }}>
          {count}
        </animated.h2>
        <span
          ref={buttonRef}
          role="img"
          aria-label="Decrease count"
          onClick={decreaseCount}
        >
          👇
        </span>
      </div>
    </div>
  );
};

export default App;
