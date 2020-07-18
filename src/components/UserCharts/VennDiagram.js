import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

class VennDiagram extends Component {
  state = {
    modal: false,
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
  render() {
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
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
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
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
            <p style={{ textAlign: "center" }}>Word1</p>
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
