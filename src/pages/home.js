import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as constants from '../constants/constant';
import SearchBox from '../components/Search/searchBox';
import '../styles/home.css';
import Categoryblock from '../components/blocks/categoryblock';
import Twocolumnblock from '../components/blocks/twocolumnblock';
import Threecolumnblock from '../components/blocks/threecolumnblock';
import Fourcolumnblock from '../components/blocks/fourcolumnblock';

const Home = () => {
  const navigate = useNavigate();
  const handleSearch = async (key) => {
    navigate('/' + constants.NAV_SEARCH + '?text='+key)
    //toast.info('search: ' + key);
  }

    return (
      <div className='home-main'>
        <div className='home-container'>          

        <SearchBox handleSearch={handleSearch} type={2}/>

        <div className='home-category-wraper'>
          <Categoryblock/>
        </div>

        <div className='block-wrapper'>
          <Twocolumnblock/>
        </div>

        <div className='block-wrapper'>
          <Threecolumnblock/>
        </div>

        <div className='block-wrapper'>
          <Fourcolumnblock/>
        </div>        

        </div>
      </div>
    );
  };
  
  export default Home;