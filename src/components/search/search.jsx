import React from 'react';
import searchIcon from '/icons/searchIcon.svg';

function Search() {
    return ( 
        <>
        <div className='searchBar'>
            <input type='text' placeholder='Enter City Name' id='citySearch' />
            <div className='searchIcon'>
                <img src={searchIcon}  alt="Magnifying glass"/>
            </div>
        </div>
        </>
     );
}

export default Search;