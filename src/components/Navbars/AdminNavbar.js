
import React from "react";
import { Link } from "react-router-dom";
import {logout} from "../../helper/index";
import { getItem } from "utils/localStorage";
import { BASE_URL } from "../../constants";
import axios from "axios";
import Suggestion from '../suggestion'
import Autosuggest from 'react-autosuggest';
import './AdminNav.css'
import SearchUserHeader from '../Headers/SearchUserHeader'

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

function getSuggestionValue(suggestion) {
  // debugger;
  return suggestion.first_name;
}

function renderSuggestion(suggestion) {
  // debugger;

  return (
    <Link to={`/admin/profile/${suggestion.id}`} >

    <div style={{padding:'10px 20px',borderBottom:'1px solid'}}>{`${suggestion.first_name} ${suggestion.last_name}`}</div>
    </Link>
  );
}

class AdminNavbar extends React.Component {

  
  state = {
    query: '', 
    results: [],
    activeSuggestion: 0,
    showSuggestions: false,
    popupVisible: false,
    suggestions:[],
    value:''
  }


  

  getInfo = () => {
    const TOKEN = getItem("accessToken");
    axios({
      method: "get",
      url: `${BASE_URL}/api/accounts/user-search/${this.state.value}/`,
      headers: {
          "Content-Type": "application/json",
            Accept: "application/json",
           'Authorization' :  `Token ${TOKEN}`
    }
    }).then(({ data }) => {
        this.setState({
          suggestions: data,
          popupVisible: !this.state.popupVisible,
        })
      })
  }

  
 
  handleInputChange = (e) => {
    console.log('SERC',e.target.value)
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    // this.setState(prevState => ({
    //    popupVisible: !prevState.popupVisible,
    // }));

    this.setState({
      query: e.currentTarget.value,
     
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }

 

  // onKeyDown = e => {
  //   const { activeSuggestion, results } = this.state;

  //   if (e.keyCode === 13) {
  //     this.setState({
  //       activeSuggestion: 0,
  //       showSuggestions: false,
  //       query: results[activeSuggestion]
  //     });
  //   } else if (e.keyCode === 38) {
  //     if (activeSuggestion === 0) {
  //       return;
  //     }

  //     this.setState({ activeSuggestion: activeSuggestion - 1 });
  //   } else if (e.keyCode === 40) {
  //     if (activeSuggestion - 1 === results.length) {
  //       return;
  //     }

  //     this.setState({ activeSuggestion: activeSuggestion + 1 });
  //   }
  // };

  handleClick=()=> {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
       results:[]
    }));
  }

  handleOutsideClick=(e)=> {
    // ignore clicks on the component itself
    // if (this.node.contains(e.target)) {
    //   return;
    // }
    
    this.handleClick();
    
  }

  _onBlur=()=> {
    this.setState({
      value: '',
      // activeSuggestion: 0,
      // showSuggestions: true,
      // results:[]
  });
    // setTimeout(() => {
    //     if (this.state.value) {
    //         this.setState({
    //             vlaue: '',
    //             // activeSuggestion: 0,
    //             // showSuggestions: true,
    //             // results:[]
    //         });
    //     }
    // }, 0);
}
// _onFocus=()=> {
//   console.log('FOCUS')
//     // if (!this.state.query) {
//     //     this.setState({
//     //         query: '',
//     //         // results:[]
//     //     });
//     // }
//   }

//** START SUGGESTION**//
onChange = (event, { newValue, method }) => {
  this.setState({
    value: newValue
  });
};

onSuggestionsFetchRequested = ({ value }) => {
  this.getInfo();
  // this.setState({
  //   suggestions: getSuggestions(value)
  // });
};

onSuggestionsClearRequested = () => {
  this.setState({
    suggestions: []
  });
};




//**END SUGGESTION *//
  render() {
    console.log('asa',this.state)
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for users..",
      value,
      onChange: this.onChange,
      onBlur:this._onBlur
    };
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            {/* <SearchUserHeader/> */}
            <Form  className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {/* <Input 
                      placeholder="Search for users.." type="text" 
                      name='query'
                      value={this.state.query}
                      // onKeyDown={this.onKeyDown}
                      // ref={input => this.search = input}
                      onChange={this.handleInputChange} 
                      // onFocus={this._onFocus}
                        onBlur={this._onBlur}
                  /> */}

<Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
                  
                </InputGroup>
              </FormGroup>


            </Form>

           
        
            {/* <div className="popover-container" ref={node => { this.node = node; }}>
       
        {this.state.popupVisible && ('s'
            // <Suggestion results={this.state.results} myClick={this.handleOutsideClick}  />
          // </div>
         )}
      </div> */}
            
            

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                    <i class="fas fa-user-tie"></i>
                      {/* <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      /> */}
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {getItem("name")? getItem("name"):'User' }
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem to="/" onClick={e => logout()}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
