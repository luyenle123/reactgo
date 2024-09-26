import React, { useState, useEffect } from 'react'
import '../../styles/searchBox.css';

export default function SearchBox({handleSearch, type = 1, text = null}){
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

    var formspacecl = type === 1 ? 'form-p-default' : 'form-p-xl';

  return (    
    <div className='search-page-box'>
        <div className={'search-page-form ' + formspacecl}>
            <div className="search-textbox">
                <input id='searchtextbox' placeholder='Search product. Ex: kitchen, drink ...' value={key} autoFocus onChange={(e) => handleOnChange(e.target.value)} onKeyDown={handleSearchKeyDown}></input>
            </div>
            <div className='search-button'>
                <button onClick={handleSearchClick} onKeyDown={handleSearchKeyDown}>Search</button>
            </div>
        </div>
    </div>
  )
}
