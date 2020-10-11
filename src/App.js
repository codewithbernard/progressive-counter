import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";

const App = () => {
  const [count, setCount] = useState(0);
  const [toggleKey, setToggleKey] = useState({ plus: 1, minus: 1 });
  const [{ xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));
  const interpolateCount = xy.interpolate(
    (x, y) =>
      `perspective(200px) translate(${x / 100}px, ${y / 100}px) rotateY(${
        x / 80
      }deg) rotateX(${-y / 80}deg)`
  );
  const onMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    [set]
  );
  const onScroll = useCallback((e) => set({ st: e.target.scrollTop / 30 }), [
    set,
  ]);

  const handleClick = ({ clientX }) => {
    if (clientX - window.innerWidth / 2 > 0) {
      setCount(count + 1);
      setToggleKey({ plus: toggleKey.plus + 1, minus: toggleKey.minus });
    } else {
      count && setCount(count - 1);
      setToggleKey({ plus: toggleKey.plus, minus: toggleKey.minus - 1 });
    }
  };

  const handleKeyDown = () => {
    setCount((count) => count + 1);
    setToggleKey((toggleKey) => ({
      plus: toggleKey.plus + 1,
      minus: toggleKey.minus,
    }));
  };

  // Listen for any click or key
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="container"
      onMouseMove={onMove}
      onScroll={onScroll}
      onClick={handleClick}
    >
      <span key={`plus-${toggleKey.plus}`} id="plus" className="animated">
        +
      </span>
      <span key={`minus-${toggleKey.minus}`} id="minus" className="animated">
        -
      </span>
      <div id="counter">
        <animated.h2 style={{ transform: interpolateCount }}>
          {count}
        </animated.h2>
      </div>
    </div>
  );
};

export default App;
