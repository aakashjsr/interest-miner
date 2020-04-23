import React, { Component } from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import user from 'services/api';

import { handleServerErrors } from "utils/errorHandler";
class StreamChart extends React.Component {
    
  // state = {
          
  //   series: [
  //     {
  //       name: 'South',
  //       data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //         min: 10,
  //         max: 60
  //       })
  //     },
  //     {
  //       name: 'North',
  //       data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //         min: 10,
  //         max: 20
  //       })
  //     },
  //     {
  //       name: 'Central',
  //       data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //         min: 10,
  //         max: 15
  //       })
  //     }
  //   ],
  //   options: {
  //     chart: {
  //       type: 'area',
  //       height: 350,
  //       stacked: true,
  //       events: {
  //         selection: function (chart, e) {
  //           console.log(new Date(e.xaxis.min))
  //         }
  //       },
  //     },
  //     colors: ['#008FFB', '#00E396', '#CED4DC'],
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       curve: 'smooth'
  //     },
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         opacityFrom: 0.6,
  //         opacityTo: 0.8,
  //       }
  //     },
  //     legend: {
  //       position: 'top',
  //       horizontalAlign: 'left'
  //     },
  //     xaxis: {
  //       type: 'datetime'
  //     },
  //   },
  
  
  // };

      // state = {
      //   options: {
      //     xaxis: {}
      //   },
      //   series: [],
      // }
    
      
      componentDidMount(){
        this.setState({ isLoding: true },()=>{
          user.streamChart().then(response => {

            let categoriesList = Object.keys(response.data);

            this.setState({ 
              isLoding: false,
              // series: values,
              // options:{
              //   xaxis: {
              //     categories: [...categoriesList]
              //   }
              // },
              // series:[{name: 'computer',data: [0,3]}, { name: 'math', data: [0,2]}]
               // }
              
            })
        }).catch(error => {
            this.setState({ isLoding: false })
            handleServerErrors(error, toast.error)
            })
        })
}


    //   this.state = {
      
    //     series: [
    //       {
    //         name: 'South',
    //         data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
    //           min: 10,
    //           max: 60
    //         })
    //       },
    //       {
    //         name: 'North',
    //         data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
    //           min: 10,
    //           max: 20
    //         })
    //       },
    //       {
    //         name: 'Central',
    //         data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
    //           min: 10,
    //           max: 15
    //         })
    //       }
    //     ],
    //     options: {
    //       chart: {
    //         type: 'area',
    //         height: 350,
    //         stacked: true,
    //         events: {
    //           selection: function (chart, e) {
    //             console.log(new Date(e.xaxis.min))
    //           }
    //         },
    //       },
    //       colors: ['#008FFB', '#00E396', '#CED4DC'],
    //       dataLabels: {
    //         enabled: false
    //       },
    //       stroke: {
    //         curve: 'smooth'
    //       },
    //       fill: {
    //         type: 'gradient',
    //         gradient: {
    //           opacityFrom: 0.6,
    //           opacityTo: 0.8,
    //         }
    //       },
    //       legend: {
    //         position: 'top',
    //         horizontalAlign: 'left'
    //       },
    //       xaxis: {
    //         type: 'datetime'
    //       },
    //     },
      
      
    //   };
    // }

    //  generateDayWiseTimeSeries=(baseval, count, yrange)=> {
    //     var i = 0;
    //     var series = [];
    //     while (i < count) {
    //       var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
    //       series.push([baseval, y]);
    //       baseval += 86400000;
    //       i++;
    //     }
    //     return series;
    //   }

    render() {
      return (
        

  <div id="chart">
<Chart 
    options={this.state.options} 
    series={this.state.series} 
    type="area" height={500} 
/>


</div>


      );
    }
}

  export default StreamChart;
