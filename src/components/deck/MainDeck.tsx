"use client";

import { useEffect, useState } from "react";

const MainDeck = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      // setCount(Math.floor(Math.random() * 10));
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-primary py-4 text-primary-foreground">
      <div className="container">MainDeck: {count}</div>
    </div>
  );
};

export default MainDeck;
