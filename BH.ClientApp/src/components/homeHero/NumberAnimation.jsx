import { useSpring, animated } from 'react-spring';
import React, { useEffect, useState } from 'react';

const NumberAnimation = ({ n }) => {
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    setDisplayNumber(n);
  }, [n]);

  const { number } = useSpring({
    from: { number: 0 },
    number: displayNumber,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};

export default NumberAnimation;
