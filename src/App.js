import React, { Fragment, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => count && setCount(count - 1);

  return (
    <Fragment>
      <div id="counter">
        <h2>{count}</h2>
        <span role="img" aria-label="Decrease count" onClick={decreaseCount}>
          👇
        </span>
      </div>
    </Fragment>
  );
};

export default App;
