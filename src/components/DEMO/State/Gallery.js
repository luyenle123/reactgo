import { useState } from 'react';
import { sculptureList } from '../Data';

export default function Gallery({name}) {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const [number, setNumber] = useState(0);

  console.log('>> render Gallery: ' + name);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <h1>{number}</h1>
      <button onClick={() => {
        // let count = 0;
        // let inter = setInterval(() => {
        //   if(count < 3)
        //   {
        //     setNumber(n => n + 1);
        //   }
        //   else{
        //     clearInterval(inter);
        //   }
        //   count++;
        // }, 1);
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(number + 5);
      }}>
        +3
      </button>      
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
