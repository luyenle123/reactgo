// import { Clock } from '../components/DEMO/Clock.js';

// import { Accordion } from '../components/DEMO/Accordion.js';
// import { SyncedInputs } from '../components/DEMO/SyncedInputs.js';
import {MemoTest} from '../components/DEMO/Memo/test.js';
// import { Parent } from '../components/DEMO/UC/parent.js';
import ProductList from '../components/DEMO/UC/productList.js';
// import { Garage } from '../components/DEMO/UC/proptest.js';
import { Counter } from '../components/DEMO/UE/counter.js';

const OtherPage = () => {
    return(
      <>
        {/* <Clock /> */}

        <div className='group'>
          <MemoTest/>    
        </div> 

        <div className='group'>
          <Counter/>    
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
        <div className='group'>
          <ProductList />
        </div> 

      </>
    );
  };
  
  export default OtherPage;