
import React from "react";
// react plugin used to create google maps
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'
import { handleServerErrors } from "utils/errorHandler";

// reactstrap components
import {
  Modal, ModalHeader, ModalBody, ModalFooter ,Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import user from '../services/api';


// core components
import Header from "components/Headers/Header.js";


class ViewPaper extends React.Component {

  state = {
            data:[],
            paperDetail:[],
            isLoding: false,
            modal: false
       }

  componentDidMount(){

 this.setState({ isLoding: true })
    this.getPaperData();
  }

  getPaperData=()=>{
    user.getListPaper().then(response => {
        // loder false ka code 
        console.log('ADD PAPER RES:++>')
        this.setState({ 
          isLoding: false,
          data : response.data
         })

      }).catch(error => {
        this.setState({ isLoding: false })
        console.log(error)
        
      })
}

  deleteEnquiry = (id)=>{
    console.log('DELETE ID ++>',id) 
    user.deletePaper(id).then(response => {
       
         toast.success("Delete Papaer !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        });
       
       this.getPaperData();

      }).catch(error => {
        this.setState({ isLoding: false })
        console.log(error)
      })
    
  }



  showEnquiry = (id)=>{
user.getPaper(id).then(response => {
        // loder false ka code 
        console.log('GET A PAPER RES:++>',response.data)
        this.setState({ 
          isLoding: false,
          modal : !this.state.modal,
          paperDetail : response.data
         })

      }).catch(error => {
        this.setState({ isLoding: false })
        console.log(error)
        
      })
  }

    editEnquiry = (id)=>{
      console.log('PAPER ID:>>',id)
// user.getPaper(id).then(response => {
//         // loder false ka code 
//         console.log('GET A PAPER RES:++>',response.data)
//         this.setState({ 
//           isLoding: false,
//           modal : !this.state.modal,
//           paperDetail : response.data
//          })

//       }).catch(error => {
//         this.setState({ isLoding: false })
//         console.log(error)
        
//       })
  }


  toggle = (id) => {
    this.setState({
      modal : !this.state.modal
    })
    };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
             <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Papers tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">URL</th>
                      <th scope="col">Year</th>
                      {/* <th scope="col">Users</th> */}
                      <th scope="col">Abstract</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                   {this.state.data ? 
                    this.state.data.map((value,index)=>(
                       <tr key={value.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          {/* <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/bootstrap.jpg")}
                            />
                          </a> */}
                          <Media>
                            <span className="mb-0 text-sm">
                              {value.title}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{value.url}</td>
                      <td>
                      {value.year}
                        {/* <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          pending
                        </Badge> */}
                      </td>
                      {/* <td>
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip742438047"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip742438047"
                          >
                            Ryan Tompson
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip941738690"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-2-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip941738690"
                          >
                            Romina Hadid
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip804044742"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-3-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip804044742"
                          >
                            Alexander Smith
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip996637554"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("assets/img/theme/team-4-800x800.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip996637554"
                          >
                            Jessica Doe
                          </UncontrolledTooltip>
                        </div>
                      </td> */}
                      <td>
                      {`${value.abstract.slice(0, 15)} ...`}
                        {/* <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-danger"
                            />
                          </div>
                        </div> */}
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
      {/* <Button size="sm" color="danger" onClick={this.showEnquiry(value.id)}></Button> */}

                            <DropdownItem
                              onClick={()=>this.showEnquiry(value.id)}
                            >
                              View
                            </DropdownItem>
                            <DropdownItem   
                             onClick={()=>this.editEnquiry(value.id)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                            // href="#"
                              onClick={() => this.deleteEnquiry(value.id)}
                            >
                              Remove
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    ))
                   
                    
                   
                   :<div className="text-center"><Loader type="Puff" color="#00BFFF" height={100} width={100} /></div>}
                    
                  </tbody>
                </Table>
                {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}
              </Card>
               {/* //  Start Modal */}
                   <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} >
        <ModalHeader toggle={this.toggle}>Paper Detail</ModalHeader>
        <ModalBody>
          <strong>Title: </strong> {this.state.paperDetail && this.state.paperDetail.title}<br/>
          <strong>Year: </strong> {this.state.paperDetail && this.state.paperDetail.year}<br/>
          <strong>URL: </strong> {this.state.paperDetail && this.state.paperDetail.url}<br/>
          <strong>Abstract: </strong> <br/> {this.state.paperDetail && this.state.paperDetail.abstract}

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
              {/* //  End Modal   */}
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ViewPaper;
