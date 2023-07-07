import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBBtn
} from 'mdb-react-ui-kit';



function Header(props) {
  function handleSearch(event) {
    props.onSearch(event.target.value);
  }

  const callLogout = (event) =>{
    event.preventDefault()
    props.handleLogout();
  }
  return (


    <MDBNavbar light bgColor='primary' className="mb-2 p-2">
      <MDBContainer fluid>
        <MDBNavbarBrand>Work Board</MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto'>
          <input  onChange={handleSearch} className='form-control' placeholder="Search a task" aria-label="Search" type='Search' />
          <MDBBtn onClick={callLogout} rounded className="ms-4" color='danger'>Logout</MDBBtn>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>



   
  );
}

export default Header;


