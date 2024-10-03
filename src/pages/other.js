// import { Clock } from '../components/DEMO/Clock.js';

import { Accordion } from '../components/DEMO/Accordion.js';
// import { SyncedInputs } from '../components/DEMO/SyncedInputs.js';
import ArrState from '../components/DEMO/ArrState/arrstate.js';
import CHookApp from '../components/DEMO/CustomHook/chookApp.js';
import MyForm from '../components/DEMO/Form/myform.js';
import {MemoTest} from '../components/DEMO/Memo/test.js';
import Testprop from '../components/DEMO/Props/testprop.js';
import Car from '../components/DEMO/RClass/car.js';
import Container from '../components/DEMO/RClass/container .js';
import Gallery from '../components/DEMO/State/Gallery.js';
import TaskApp from '../components/DEMO/Task/TaskApp.js';
import TodoApp from '../components/DEMO/UCallback/TodoApp.js';
import Component1 from '../components/DEMO/UContext/Component1.js';
// import { Parent } from '../components/DEMO/UC/parent.js';
// import ProductList from '../components/DEMO/UC/productList.js';
// import { Garage } from '../components/DEMO/UC/proptest.js';
import { Counter } from '../components/DEMO/UE/counter.js';
import NoUseMemoApp from '../components/DEMO/UMemo/noumemoapp.js';
import UseMemoApp from '../components/DEMO/UMemo/umemoapp.js';
import Todos from '../components/DEMO/UReducer/Todo.js';
import UReftTest1 from '../components/DEMO/URef/test1.js';
import TrackState from '../components/DEMO/URef/trackstate.js';

const OtherPage = () => {
    return(
      <>      
        {/* <Clock /> */}
        <div className='group'>
          <TaskApp/>    
        </div> 

        <div className='group'>
          <h1>Arr State</h1>

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

        <div className='group'>
          <h1>SSBC</h1>
          <Accordion/>

          <br/>
          {/* <SyncedInputs/>       */}
        </div>

        <div className='group'>
          <h1>React Class</h1>
          <Car model='Mustang' color='Red'/>

          <Container/>
        </div>

        <div className='group'>
          <h1>React Props</h1>

          <Testprop p1={'p1'}/>
        </div>
        
        <div className='group'>
          <h1 style={{color:"red"}}>Form</h1>

          <MyForm/>
        </div>
        
        <div className='group'>
          <h1>Use Context</h1>

          <Component1/>
        </div>

        <div className='group'>
          <h1>UseRef</h1>

          <UReftTest1/> <br/><br/>
          <TrackState/>
        </div>

        <div className='group'>
          <h1>UseReducer</h1>

          <Todos/>
        </div>        

        <div className='group'>
          <h1>UseCallback</h1>

          <TodoApp/>
        </div>

        <div className='group'>
          <h1>UseMemo</h1>

          <p>no memo</p>
          <NoUseMemoApp/>

          <p>use memo</p>
          <UseMemoApp/>
        </div>
        
        <div className='group'>
          <h1>Custom Hook</h1>

          <CHookApp/>
        </div>
        
      </>
    );
  };
  
  export default OtherPage;