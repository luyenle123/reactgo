import React, { useState, useEffect } from 'react'
import '../../styles/searchBox.css';

export default function SearchBox({handleSearch, text = null}){
    const [key, setKey] = useState('');

    useEffect(() => {
        if(text && text.length >= 3)
        {
            setKey(text);
        }        
    }, [text]); 

    const handleSearchClick = async (event) => {
        if (key && key.length>=3) {
            handleSearch(key);
        }
    }    

    const handleSearchKeyDown = async (event) => {
        if (event.key === 'Enter' && key && key.length>=3) {
            handleSearch(key);
        }
    }

    const handleOnChange = (value) => {
        setKey(value);
    }

  return (
    <div className='search-page-box'>
        <div className='search-page-form'>
        <div className="search-textbox">
            <input id='searchtextbox' value={key} autoFocus onChange={(e) => handleOnChange(e.target.value)} onKeyDown={handleSearchKeyDown}></input>
        </div>
        <div className='search-button'>
            <button onClick={handleSearchClick} onKeyDown={handleSearchKeyDown}>Search</button>
        </div>
        </div>
    </div>
  )
}
