import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);
    const [count1, setCount1] = useState(0);

    //console.log('>> render Counter');
  
    useEffect(() => {
        console.log('Calculation');
      setCalculation(() => count * 2);
    }, [count]); 

    const changeClick = (e) => {
        setCount1((c) => c + 1);
    }
    
  
    return (
      <>
        <h1>useEffect</h1>
        <p>Count: {count}</p>
        <p>Count1: {count1}</p>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={changeClick}>change Count1</button>
        <p>Calculation: {calculation}</p>
      </>
    );
  }

  export {Counter}