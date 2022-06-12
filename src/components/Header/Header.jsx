import React from "react";
import './Header.css'


function Header(props){



    function handleSearch(event){
        props.onSearch(event.target.value);

    }


    return(
        <div className="heading">
             <h1>Work Board</h1>
            <form>
                <input 
                    name='searchbar'
                    className="searchbar"
                    type='text'
                    placeholder="Search for Task."
                    onChange={handleSearch}
                    ></input>
            </form>
        </div>
    );
}

export default Header;