import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup
} from 'mdb-react-ui-kit';


function Header(props) {
  function handleSearch(event) {
    props.onSearch(event.target.value);
  }

  return (


    <MDBNavbar light bgColor='primary' className="mb-2 p-2">
      <MDBContainer fluid>
        <MDBNavbarBrand>Work Board</MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto'>
          <input onChange={handleSearch} className='form-control' placeholder="Search a task" aria-label="Search" type='Search' />
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>



   
  );
}

export default Header;


