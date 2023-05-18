import searchIcon from '/icons/searchIcon.svg';
import './search.css';

function Search() {
    return ( 
        <div className='searchBar'>
            <input type='text' placeholder='Enter City Name' id='citySearch' />
            <div className='searchIcon'>
                <img src={searchIcon}  alt="Search Icon"/>
            </div>
        </div>
     );
}

export default Search;