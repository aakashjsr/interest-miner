import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import RestAPI from "services/api";

import { handleServerErrors } from "utils/errorHandler";
import * as am4core from "@amcharts/amcharts4/core";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import {
  TwitterTweetEmbed,
} from "react-twitter-embed";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class CloudChartPage extends Component {
  state = {
    mydata: [],
    modal: false,
    isModalLoader:false,
    isPaperData: false,
    tweetId: null,
    userPageID:'',
    title:'',
    url:'',
    year:'',
    abstract:'',
  };
  componentDidMount() {
    this.setState({ isLoding: true }, () => {
      RestAPI.cloudChart()
        .then((response) => {
          series.data = response.data;
          this.setState({
            isLoding: false,
            // data : response.data
          });
        })
        .catch((error) => {
          this.setState({ isLoding: false });
          handleServerErrors(error, toast.error);
        });
    });

    let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
    chart.fontFamily = "Courier New";
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;

    series.dataFields.word = "keyword";
    series.dataFields.value = "weight";

    series.heatRules.push({
      target: series.labels.template,
      property: "fill",
      min: am4core.color("#0000CC"),
      max: am4core.color("#CC00CC"),
      dataField: "value",
    });
    series.labels.template.events.on("hit", (ev) => {
      if (ev.target.dataItem.dataContext.tweet_id) {
        this.setState({
          modal:true,
          isPaperData: false,
          tweetId: ev.target.dataItem.dataContext.tweet_id,
        });
      }
      if (ev.target.dataItem.dataContext.paper_db_id) {
        this.setState({
          isPaperData: true,
          userPageID:ev.target.dataItem.dataContext.paper_db_id,
          modal:true,
        },()=>this.getPaper(ev.target.dataItem.dataContext.paper_db_id)
        );
      }
    
    });

    series.labels.template.urlTarget = "_blank";
    series.labels.template.tooltipText = "{source}";

    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#FF0000");
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getPaper = (userPageID) => {
    this.setState({isModalLoader:true}, ()=> {
    RestAPI.getPaper(userPageID).then(response => {
      this.setState({
        title: response.data.title,
        url: response.data.url,
        year: response.data.year,
        abstract: response.data.abstract,
        isModalLoader:false
      })
    }).catch(error => {
      handleServerErrors(error, toast.error)
    })
   }
  )}

  render() {
    return (
      <Fragment>
        {this.state.isLoding ? (
          <div className="text-center" style={{ padding: "20px" }}>
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          </div>
        ) : (
          <div id="chartdiv" style={{ width: "100%", height: "600px" }}>
           
          </div>
           )}

           <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
           {this.state.isPaperData ? (
             <>
               <ModalHeader toggle={this.toggle}>Paper Detail</ModalHeader>
               <ModalBody>
               {this.state.isModalLoader ? (
                 <div className="text-center" style={{ padding: "20px" }}>
                   <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                 </div>
               ) : (
                 <>
                 <strong>Title: </strong> {" "}
                 <p>
                   {this.state.title}
                 </p>
                 <strong>Year: </strong>{" "}
                 <p>
                 {this.state.year}
                 </p>
                 <strong>URL: </strong>{" "}
                 <p>
                   {this.state.url}
                 </p>
                 <strong>Abstract: </strong>{" "}
                 <p>
                 {this.state.abstract}
                 </p>
                 </>
               )}
               </ModalBody>
             </>
           ) : (
             <>
               <ModalHeader toggle={this.toggle}>Twitter Detail</ModalHeader>
               
               <ModalBody>
               {this.state.isModalLoader ? (
                 <div className="text-center" style={{ padding: "20px" }}>
                   <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                 </div>
               ) : (
               <div style={{display:'flex',justifyContent:'center'}}>
                 <TwitterTweetEmbed tweetId={this.state.tweetId} />
               </div>
               )}
               </ModalBody>
             </>
           )}
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
