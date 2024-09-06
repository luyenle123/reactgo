// import { getImageUrl } from "./utils";
import {useState} from 'react'
import { sculptureList } from "./Data";

export default function Gallery() {  

  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick(){
    let id = index + 1;

    if(id>sculptureList.length-1)
      id = 0;

    setIndex(id);
  }

  function handleBackClick(){
    let id = index - 1;

    if(id <= 0)
      id = 0;

    setIndex(id);
  }  

  function handleMoreClick(){
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];

  return (

    <div  className = "gallery-container">
      <button onClick={handleBackClick}>
        Back
      </button>    
      <button onClick={handleNextClick}>
        Next
      </button>

      <br /><br />
      <h2>
        <i>{sculpture.name}</i> by {sculpture.artist}
      </h2>

      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>

      <img src={sculpture.url} alt={sculpture.alt}/>

      <button onClick={handleMoreClick} >
        {showMore ? 'Hide' : 'Show'} details
      </button>

      {showMore && <p>{sculpture.description}</p>}

    </div>

    // <div className = "gallery-container">
    //   <h1>Notable Scientists</h1>
    //   <section className="profile">
    //     <h2>Maria Skłodowska-Curie</h2>
    //     <img
    //       className="avatar"
    //       src={getImageUrl('szV5sdG')}
    //       alt="Maria Skłodowska-Curie"
    //       width={70}
    //       height={70}
    //     />
    //     <ul>
    //       <li>
    //         <b>Profession: </b> 
    //         physicist and chemist
    //       </li>
    //       <li>
    //         <b>Awards: 4 </b> 
    //         (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
    //       </li>
    //       <li>
    //         <b>Discovered: </b>
    //         polonium (chemical element)
    //       </li>
    //     </ul>
    //   </section>
    //   <section className="profile">
    //     <h2>Katsuko Saruhashi</h2>
    //     <img
    //       className="avatar"
    //       src={getImageUrl('YfeOqp2')}
    //       alt="Katsuko Saruhashi"
    //       width={70}
    //       height={70}
    //     />
    //     <ul>
    //       <li>
    //         <b>Profession: </b> 
    //         geochemist
    //       </li>
    //       <li>
    //         <b>Awards: 2 </b> 
    //         (Miyake Prize for geochemistry, Tanaka Prize)
    //       </li>
    //       <li>
    //         <b>Discovered: </b>
    //         a method for measuring carbon dioxide in seawater
    //       </li>
    //     </ul>
    //   </section>
    // </div>
  );
}

export function Profile(){
    return(
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
      />
    );
  }
