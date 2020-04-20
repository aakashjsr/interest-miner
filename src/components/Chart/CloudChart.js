import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import user from 'services/api';

import { handleServerErrors } from "utils/errorHandler";

// import logo from './logo.svg';
// import './App.css';
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


class CloudChartPage extends Component {
    state = {
        mydata : []
    }
  componentDidMount() {

    this.setState({ isLoding: true },()=>{
        user.cloudChart().then(response => {
            series.data = response.data
        console.log('CLOUD CHART',response.data)
          this.setState({ 
            isLoding: false,
            // data : response.data
          })
      }).catch(error => {
          this.setState({ isLoding: false })
          handleServerErrors(error, toast.error)
          })
      })
  

//   let container = am4core.create("container", am4core.Container);

let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
chart.fontFamily = "Courier New";
let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
series.randomness = 0.1;
series.rotationThreshold = 0.5;

// series.data = [ {
//     "tag": "javascript",
//     "count": "1765836"
// }, {
//     "tag": "java",
//     "count": "1517355"
// }, {
//     "tag": "c#",
//     "count": "1287629"
// }, {
//     "tag": "php",
//     "count": "1263946"
// }, {
//     "tag": "android",
//     "count": "1174721"
// }, {
//     "tag": "python",
//     "count": "1116769"
// }, {
//     "tag": "jquery",
//     "count": "944983"
// }, {
//     "tag": "html",
//     "count": "805679"
// }, {
//     "tag": "c++",
//     "count": "606051"
// }, {
//     "tag": "ios",
//     "count": "591410"
// }, {
//     "tag": "css",
//     "count": "574684"
// }, {
//     "tag": "mysql",
//     "count": "550916"
// }, {
//     "tag": "sql",
//     "count": "479892"
// }, {
//     "tag": "asp.net",
//     "count": "343092"
// }, {
//     "tag": "ruby-on-rails",
//     "count": "303311"
// }, {
//     "tag": "c",
//     "count": "296963"
// } ];

series.dataFields.word = "keyword";
series.dataFields.value = "weight";

series.heatRules.push({
 "target": series.labels.template,
 "property": "fill",
 "min": am4core.color("#0000CC"),
 "max": am4core.color("#CC00CC"),
 "dataField": "value"
});

// series.labels.template.url = "https://stackoverflow.com/questions/tagged/{word}";
series.labels.template.urlTarget = "_blank";
series.labels.template.tooltipText = "{source}";

let hoverState = series.labels.template.states.create("hover");
hoverState.properties.fill = am4core.color("#FF0000");


  }

//   componentWillUnmount() {
//     if (this.chart) {
//       this.chart.dispose();
//     }
//   }

  render() {
    return (
        <Fragment>
             { this.state.isLoding ? 
                  (  
                    <div className="text-center" style={{padding:'20px'}}>
                        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                   </div>
                   )
                   :
      <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>

                  }
        </Fragment>
    );
  }
}

export default CloudChartPage;