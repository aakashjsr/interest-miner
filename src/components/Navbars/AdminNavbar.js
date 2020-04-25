
import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../helper/index";
import { getItem } from "utils/localStorage";
import { BASE_URL } from "../../constants";
import axios from "axios";
import Autosuggest from 'react-autosuggest';
import './AdminNav.css'

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
    <Link to={`/app/profile/${suggestion.id}`} >

      <div style={{ padding: '10px 20px' }}>{`${suggestion.first_name} ${suggestion.last_name}`}</div>
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
    suggestions: [],
    value: ''
  }



  getInfo = () => {
    const TOKEN = getItem("accessToken");
    axios({
      method: "get",
      url: `${BASE_URL}/api/accounts/user-search/${this.state.value}/`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Token ${TOKEN}`
      }
    }).then(({ data }) => {
      this.setState({
        suggestions: data,
        popupVisible: !this.state.popupVisible,
      })
    })
  }



  handleInputChange = (e) => {
    if (!this.state.popupVisible) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
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



  handleClick = () => {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible,
      results: []
    }));
  }

  handleOutsideClick = (e) => {
    this.handleClick();

  }

  _onBlur = () => {
    this.setState({
      value: '',

    });
  }


  //** START SUGGESTION**//
  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.getInfo();
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };




  //**END SUGGESTION *//
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for users..",
      value,
      onChange: this.onChange,
      onBlur: this._onBlur
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
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    {/* <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText> */}
                  </InputGroupAddon>

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


            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <i class="fas fa-user-tie"></i>

                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {getItem("name") ? getItem("name") : 'User'}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/app/user-profile" tag={Link}>
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
