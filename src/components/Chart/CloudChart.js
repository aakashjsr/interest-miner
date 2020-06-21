import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import "d3-transition";

import { handleServerErrors } from "utils/errorHandler";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import { TwitterTweetEmbed } from "react-twitter-embed";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ReactWordcloud from "react-wordcloud";
/* Chart code */
// Themes begin
// Themes end
const options = {
  colors: ["#0000CC", "#CC00CC"],
  enableTooltip: true,
  deterministic: true,
  fontFamily: "impact",
  fontSizes: [14, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 3,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 0,
};

class CloudChartPage extends Component {
  state = {
    mydata: [],
    wordArray: [],
    isModalLoader: false,
    isTweetData: false,
    isPaperData: false,
    tweetIds: [],
    userPageIDs: [],
    isData: true,
    title: "",
    url: "",
    year: "",
    abstract: "",
    papercount: null,
    word: "",
    abstract: "",
  };

  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart()
        .then((response) => {
          let keywordArray = [];
          for (let i = 0; i < response.data.length; i++) {
            keywordArray.push({
              text: response.data[i].keyword,
              value: response.data[i].weight,
              tweet_ids: response.data[i].tweet_ids,
              papers: response.data[i].papers,
              source: response.data[i].source,
            });
          }
          if (response.data.length === 0) {
            this.setState({
              isData: false,
            });
          }
          this.setState({
            isLoding: false,
            wordArray: keywordArray,
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });
  }
  getMarkedAbstract = (text, word) => {
    text = text || "";
    text = text.split(word).join(`<mark>${word}</mark>`);
    word = word[0].toUpperCase() + word.slice(1);
    text = text.split(word).join(`<mark>${word}</mark>`);
    return text;
  };
  getCallback = (callback) => {
    let reactRef = this;
    return function (word, event) {
      reactRef.setState({ modal: true, isModalLoader: true });
      if (word.tweet_ids) {
        reactRef.setState({
          isTweetData: true,
          tweetIds: word.tweet_ids,
        });
        if (word.tweet_ids.length === 0) {
          reactRef.setState({
            isTweetData: false,
          });
        }
      }
      if (word.papers) {
        reactRef.setState({
          isPaperData: true,
          userPageIDs: word.papers,
          papercount: word.papers.length,
          word: word.text,
        });

        if (word.papers.length === 0) {
          reactRef.setState({
            isPaperData: false,
          });
        }
      }
      reactRef.setState({
        isModalLoader: false,
      });
      let str = word.papers.abstract;
      let res = str;
    };
  };

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const callbacks = {
      getWordTooltip: (word) => `${word.source}`,
      onWordClick: this.getCallback("onWordClick"),
    };
    return (
      <Fragment>
        {this.state.isLoding ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : this.state.isData ? (
          <>
            <div style={{ height: 400, width: "100%" }}>
              <ReactWordcloud
                options={options}
                callbacks={callbacks}
                words={this.state.wordArray}
              />
            </div>
          </>
        ) : (
          // <div id="chartdiv" style={{ width: "100%", height: "1000px" }}></div>
          <div style={{ textAlign: "center" }}>No Data Found</div>
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="lg"
          id="modal"
        >
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Papers</Tab>
                <Tab>Tweets</Tab>
              </TabList>
              <TabPanel>
                {this.state.isModalLoader ? (
                  <div className="text-center" style={{ padding: "20px" }}>
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      timeout={1000}
                    />
                  </div>
                ) : (
                  <>
                    {this.state.isPaperData ? (
                      <>
                        <p>{this.state.papercount} Papers Contain Predicting</p>
                        {this.state.userPageIDs.map((data, idx) => (
                          <>
                            <div
                              style={{
                                borderRadius: "20px",
                                padding: "20px",
                                margin: "20px 0",
                                boxShadow: "4px 4px 24px 4px gainsboro",
                              }}
                            >
                              <strong>Title: </strong>{" "}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: this.getMarkedAbstract(
                                    data.title,
                                    this.state.word
                                  ),
                                }}
                              ></p>
                              <strong>Year: </strong> <p>{data.year}</p>
                              <strong>URL: </strong> <p>{data.url}</p>
                              <strong>Abstract: </strong>{" "}
                              <p
                                id="abstract"
                                dangerouslySetInnerHTML={{
                                  __html: this.getMarkedAbstract(
                                    data.abstract,
                                    this.state.word
                                  ),
                                }}
                              ></p>
                            </div>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        <p style={{ textAlign: "center" }}>
                          No matching papers found
                        </p>
                      </>
                    )}
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {this.state.isModalLoader ? (
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
                    {this.state.isTweetData ? (
                      <>
                        {this.state.tweetIds.map((data, idx) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <TwitterTweetEmbed
                              tweetId={data}
                              placeholder={
                                <Loader
                                  type="Puff"
                                  color="#00BFFF"
                                  height={100}
                                  style={{
                                    padding: "200px 0px",
                                  }}
                                  width={100}
                                />
                              }
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <p style={{ textAlign: "center" }}>
                        No matching tweets found{" "}
                      </p>
                    )}
                  </>
                )}
              </TabPanel>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default CloudChartPage;
