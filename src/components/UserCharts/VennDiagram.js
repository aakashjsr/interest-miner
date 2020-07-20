import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { handleServerErrors } from "utils/errorHandler";
import RestAPI from "../../services/api";
import { toast } from "react-toastify";
import "../../assets/scss/custom.css";
import { getItem } from "utils/localStorage";
import Loader from "react-loader-spinner";

class VennDiagram extends Component {
  state = {
    modal: false,
    user_1_exclusive_interest: [],
    user_2_exclusive_interest: [],
    similar_user_1: [],
    similar_user_2: [],
    selectedUser: null,
    selectedKeyword: null,
    Loader: false,
    isData: false,
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
    this.setState({ Loader: true }, () => {
      RestAPI.getScore(getItem("userId"))
        .then((response) => {
          console.log(response.data.venn_chart_data);
          const data = response.data.venn_chart_data;
          this.setState({
            user_1_exclusive_interest: data.user_1_exclusive_interest,
            user_2_exclusive_interest: data.user_2_exclusive_interest,
            similar_user_1: data.similar_interests.user_1,
            similar_user_2: data.similar_interests.user_2,
            Loader: false,
          });
          if (
            Object.keys(data.similar_interests.user_1).length > 0 ||
            Object.keys(data.similar_interests.user_2).length > 0
          ) {
            this.setState({
              isData: true,
            });
          }
        })
        .catch((error) => {
          handleServerErrors(error, toast.error);
        });
    });
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
      let appliedClass = "";
      if (relatedKeywords.indexOf(keys[index]) !== -1) {
        appliedClass = "highlight-keywords";
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
      let appliedClass = "";
      if (relatedKeywords.indexOf(keys[index]) !== -1) {
        appliedClass = "highlight-keywords";
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
    return items;
  };

  render() {
    return (
      <>
        {this.state.Loader ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          </div>
        ) : (
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
                {this.props.first_name + " " + this.props.last_name}
              </div>
              <div
                style={{
                  width: "35%",
                  marginLeft: "15%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {getItem("name") + " " + getItem("lastname")}
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
                {this.state.isData ? (
                  <div className="flex">
                    <div
                      style={{ width: "50%", cursor: "pointer" }}
                      className="user1"
                    >
                      {/* <h3>
                        {" "}
                        {this.props.first_name + " " + this.props.last_name}
                      </h3> */}
                      {this.getUser1Keywords()}
                    </div>
                    <div style={{ width: "50%", cursor: "pointer" }} id="user2">
                      {/* <h3>{getItem("name") + " " + getItem("lastname")}</h3> */}
                      {this.getUser2Keywords()}
                    </div>
                  </div>
                ) : (
                  <p style={{ textAlign: "center" }}>No Keywords</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </>
    );
  }
}
export default VennDiagram;
