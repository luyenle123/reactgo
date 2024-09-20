// import { Clock } from '../components/DEMO/Clock.js';

// import { Accordion } from '../components/DEMO/Accordion.js';
// import { SyncedInputs } from '../components/DEMO/SyncedInputs.js';
import ArrState from '../components/DEMO/ArrState/arrstate.js';
import {MemoTest} from '../components/DEMO/Memo/test.js';
import Gallery from '../components/DEMO/State/Gallery.js';
// import { Parent } from '../components/DEMO/UC/parent.js';
// import ProductList from '../components/DEMO/UC/productList.js';
// import { Garage } from '../components/DEMO/UC/proptest.js';
import { Counter } from '../components/DEMO/UE/counter.js';

const OtherPage = () => {
    return(
      <>      
        {/* <Clock /> */}
        <div className='group'>
          <ArrState/>    
        </div> 

        <div className='group'>
          <MemoTest/>    
        </div> 

        <div className='group'>
          <Counter/>    
        </div>

        <div className='group'>
          <Gallery name={'G1'}/>
          <Gallery name={'G2'}/>
        </div>

        {/* <div className='group'>
          <h1>SSBC</h1>
          <Accordion/>

          <br/>
          <SyncedInputs/>      
        </div> */}

        {/* <div className='group'>
          <Garage/>
        </div>        
        
        <div className='group'>
          <Parent/>    
        </div>
*/}
        {/* <div className='group'>
          <ProductList />
        </div>  */}

      </>
    );
  };
  
  export default OtherPage;