import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

class VennDiagram extends Component {
  state = {
    modal: false,
    user_1_exclusive_interest: [],
    user_2_exclusive_interest: [],
    similar_interests_user_1: [],
    similar_interests_user_2: [],
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  open = () => {
    this.setState({
      modal: true,
    });
  };
  // getMarkedAbstract = (text, word) => {
  //   text = text || "";
  //   text = text.split(word).join(`<mark>${word}</mark>`);
  //   word = word[0].toUpperCase() + word.slice(1);
  //   text = text.split(word).join(`<mark>${word}</mark>`);
  //   return text;
  // };
  // handleToogle = (status) => {
  //   const {
  //     similar_interests_user_2
  //   } = this.state;
  //   let word = document.getElementById("user1").innerHTML; 
  //   for(let i =0;i<similar_interests_user_2.length;i++){
      
  //   }
  //   console.log(word)
  // };
  
  componentDidMount() {
    const data = [
    {
    user_1_exclusive_interest: ["python", "java", "swift"],
    user_2_exclusive_interest: ["pan", "pot", "catalog"],
    similar_interests: {
    	user_1: {
    		development: ["sublime", "matlab"]
    	},
    	user_2: {
    		sublime: ["development"],
    		matlab: ["development"]
    	}
    }
}
    ];
    let similar_interests_user_1 = Object.keys(data[0].similar_interests.user_1)
    let similar_interests_user_2 = Object.keys(data[0].similar_interests.user_2)
    this.setState({
      user_1_exclusive_interest: data[0].user_1_exclusive_interest,
      user_2_exclusive_interest: data[0].user_2_exclusive_interest,
      similar_interests_user_1: similar_interests_user_1,
      similar_interests_user_2: similar_interests_user_2,
    });
  }

  render() {
    console.log(
      this.state.similar_interests_user_1,
      this.state.similar_interests_user_2
    );
    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            border: "1px solid gainsboro",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <div
            style={{
              width: "35%",
              marginRight: "15%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Word1
          </div>
          <div
            style={{
              width: "35%",
              marginLeft: "15%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            Word1
          </div>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              width: "40%",
              borderBottomLeftRadius: "8px",
              background: "rgba(54, 250, 96, 0.28)",
              borderRight: "1px solid ghostwhite",
            }}
          >
            {this.state.user_1_exclusive_interest &&
              this.state.user_1_exclusive_interest.map((intersest, idx) => (
                <p style={{ textAlign: "center" }}>{intersest}</p>
              ))}
          </div>
          <div
            style={{
              width: "30%",
              textAlign: "center",
              background: "rgba(50, 151, 211, 0.18)",
            }}
          >
            <Button
              color="primary"
              onClick={this.open}
              style={{ transform: "translateY(-50%)", top: "50%" }}
            >
              Similar
            </Button>
          </div>
          <div
            style={{
              width: "40%",
              borderBottomRightRadius: "8px",
              borderLeft: "1px solid ghostwhite",
              background: "#b3bef9",
            }}
          >
            {this.state.user_2_exclusive_interest &&
              this.state.user_2_exclusive_interest.map((intersest, idx) => (
                <p style={{ textAlign: "center" }}>{intersest}</p>
              ))}
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          id="modal"
        >
          <ModalBody>
            <h3>Similar Keywords</h3>
            <br />
            <div className="flex">
              {/* <div style={{ width: "50%" }}>
                {this.state.similar_interests_user_1 &&
                  this.state.similar_interests_user_1.map((intersest, idx) => (
                    <p id="user1"   onMouseOver={() => this.handleToogle(true)}
                    onMouseOut={() => this.handleToogle(false)}style={{ textAlign: "center" }}>{intersest}</p>
                  ))}
              </div>

              <div style={{ width: "50%" }}>
                {this.state.similar_interests_user_2 &&
                  this.state.similar_interests_user_2.map((intersest, idx) => (
                    <p id="user2"   onMouseOver={() => this.handleToogle(true)}
                    onMouseOut={() => this.handleToogle(false)}style={{ textAlign: "center" }}>{intersest}</p>
                  ))}
              </div> */}
              <div style={{ width: "50%" }}>
                {this.state.similar_interests_user_1 &&
                  this.state.similar_interests_user_1.map((intersest, idx) => (
                    <p id="user1" style={{ textAlign: "center" }}>{intersest}</p>
                  ))}
              </div>

              <div style={{ width: "50%" }}>
                {this.state.similar_interests_user_2 &&
                  this.state.similar_interests_user_2.map((intersest, idx) => (
                    <p id="user2"  
                    //   dangerouslySetInnerHTML={{
                    //   __html: this.getMarkedAbstract(
                    //   ),
                    // }}
                     style={{ textAlign: "center" }}>{intersest}</p>
                  ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default VennDiagram;
