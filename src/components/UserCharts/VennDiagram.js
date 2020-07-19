import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../../services/api";
import { toast } from "react-toastify";
import "../../assets/scss/custom.css";
import { getItem } from "utils/localStorage";
class VennDiagram extends Component {
  state = {
    modal: false,
    user_1_exclusive_interest: [],
    user_2_exclusive_interest: [],
    similar_user_1: [],
    similar_user_2: [],
    selectedUser: null,
    selectedKeyword: null,
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

  getMarkedAbstract = (words) => {
    let text = document.getElementById("user2").innerHTML;
    words &&
      words.map(
        (data, idx) => (text = text.split(data).join(`<mark>${data}</mark>`))
      );
    document.getElementById("user2").innerHTML = text;
  };
  getMarkedAbstractUser2 = (words) => {
    let text = document.getElementById("user1").innerHTML;
    words &&
      words.map(
        (data, idx) => (text = text.split(data).join(`<mark>${data}</mark>`))
      );
    document.getElementById("user1").innerHTML = text;
  };

  componentDidMount() {
    RestAPI.getScore(getItem("userId"))
      .then((response) => {
        const data = response.data.venn_chart_data;
        this.setState({
          user_1_exclusive_interest: data.user_1_exclusive_interest,
          user_2_exclusive_interest: data.user_2_exclusive_interest,
          similar_user_1: data.similar_interests.user_1,
          similar_user_2: data.similar_interests.user_2,
        });
      })
      .catch((error) => {
        handleServerErrors(error, toast.error);
      });
  }
  componentDidUpdate(prevPro) {
    if (prevPro.paramid !== this.props.paramid) {
      RestAPI.getScore(this.props.paramid)
        .then((response) => {
          const data = response.data.venn_chart_data;
          this.setState({
            user_1_exclusive_interest: data.user_1_exclusive_interest,
            user_2_exclusive_interest: data.user_2_exclusive_interest,
            similar_user_1: data.similar_interests.user_1,
            similar_user_2: data.similar_interests.user_2,
          });
        })
        .catch((error) => {
          handleServerErrors(error, toast.error);
        });
    }
  }

  setHoveredKeyword = (user, keyword) => {
    this.setState({ selectedUser: user, selectedKeyword: keyword });
  };
  clearHoveredKeyword = () => {
    this.setState({ selectedUser: null, selectedKeyword: null });
  };

  getUser1Keywords = () => {
    const {
      selectedUser,
      selectedKeyword,
      similar_user_1,
      similar_user_2,
    } = this.state;
    let items = [];
    let relatedKeywords = [];
    if (selectedUser == "user_2") {
      relatedKeywords = similar_user_1[selectedKeyword];
    }
    let keys = Object.keys(similar_user_1);
    for (let index = 0; index < Object.keys(similar_user_1).length; index++) {
      let appliedClass = "highlight-keywords";
      if (keys[index].toString().indexOf(relatedKeywords) !== -1) {
        appliedClass = "";
      }
      items.push(
        <div
          className={appliedClass}
          onMouseOver={(e) => this.setHoveredKeyword("user_1", keys[index])}
          onMouseOut={this.clearHoveredKeyword}
        >
          {keys[index]}
        </div>
      );
    }
    return items;
  };

  getUser2Keywords = () => {
    const {
      selectedUser,
      selectedKeyword,
      similar_user_1,
      similar_user_2,
    } = this.state;
    let items = [];
    let relatedKeywords = [];
    if (selectedUser == "user_1") {
      relatedKeywords = similar_user_2[selectedKeyword];
    }
    let keys = Object.keys(similar_user_2);
    for (let index = 0; index < Object.keys(similar_user_2).length; index++) {
      let appliedClass = "highlight-keywords";
      if (keys[index].toString().indexOf(relatedKeywords) !== -1) {
        appliedClass = "";
      }
      items.push(
        <div
          className={appliedClass}
          onMouseOver={(e) => this.setHoveredKeyword("user_2", keys[index])}
          onMouseOut={this.clearHoveredKeyword}
        >
          {keys[index]}
        </div>
      );
    }
    console.log("nnnnnnnnnn", items);
    return items;
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
            User 1
          </div>
          <div
            style={{
              width: "35%",
              marginLeft: "15%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            User 2
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
              <div
                style={{ width: "50%", cursor: "pointer" }}
                className="user1"
              >
                {this.getUser1Keywords()}
              </div>
              <div style={{ width: "50%", cursor: "pointer" }} id="user2">
                {/* {this.state.similar_user_2 &&
                  Object.keys(this.state.similar_user_2).map((intersest, idx) => (
                    <p
                      onMouseOver={() => this.getMarkedAbstractUser2(this.state.similar_user_2[intersest])}
                      style={{ textAlign: "center" }}>{intersest}</p>
                  ))} */}
                {this.getUser2Keywords()}
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
