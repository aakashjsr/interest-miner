import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

class VennDiagram extends Component {
  state = {
    modal: false,
    user_1_exclusive_interest: [],
    user_2_exclusive_interest: [],
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
  componentDidMount() {
    const data = [
      {
        user_1_exclusive_interest: ["python", "java", "swift"],
        user_2_exclusive_interest: ["pan", "pot", "catalog"],
        similar_interests: {
          development: {
            user: "user_1",
            related_interests: ["sublime", "matlab"],
          },
          sublime: {
            user: "user_2",
            related_interests: ["development"],
          },
          matlab: {
            user: "user_2",
            related_interests: ["development"],
          },
        },
      },
    ];
    console.log("data", data);
    let similar_interests_key = Object.keys(data[0].similar_interests);

    // if (Object.values(similar_interests_key.user) === "user_1") {
    //   alert();
    //   let similar_interests_user_1 = Object.keys(
    //     similar_interests_key.related_interests
    //   );
    //   console.log(similar_interests_user_1);
    // }
    this.setState({
      user_1_exclusive_interest: data[0].user_1_exclusive_interest,
      user_2_exclusive_interest: data[0].user_2_exclusive_interest,
    });
  }

  render() {
    console.log(this.state.user_1_exclusive_interest);
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
