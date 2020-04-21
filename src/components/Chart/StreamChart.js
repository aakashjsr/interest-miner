import React, { Component } from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import user from 'services/api';

import { handleServerErrors } from "utils/errorHandler";
class StreamChart extends React.Component {
    
    //   state= {
    //     chart: {
    //       type: "area",
    //       height: 300,
    //       foreColor: "#999",
    //       stacked: true,
    //       dropShadow: {
    //         enabled: true,
    //         enabledSeries: [0],
    //         top: -2,
    //         left: 2,
    //         blur: 5,
    //         opacity: 0.06
    //       }
    //     },
    //     colors: ['#00E396', '#0090FF'],
    //     stroke: {
    //       curve: "smooth",
    //       width: 3
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     series: [{
    //       name: 'Total Views',
    //       data: generateDayWiseTimeSeries(0, 18)
    //     }, {
    //       name: 'Unique Views',
    //       data: generateDayWiseTimeSeries(1, 18)
    //     }],
    //     markers: {
    //       size: 0,
    //       strokeColor: "#fff",
    //       strokeWidth: 3,
    //       strokeOpacity: 1,
    //       fillOpacity: 1,
    //       hover: {
    //         size: 6
    //       }
    //     },
    //     xaxis: {
    //       type: "datetime",
    //       axisBorder: {
    //         show: false
    //       },
    //       axisTicks: {
    //         show: false
    //       }
    //     },
    //     yaxis: {
    //       labels: {
    //         offsetX: 14,
    //         offsetY: -5
    //       },
    //       tooltip: {
    //         enabled: true
    //       }
    //     },
    //     grid: {
    //       padding: {
    //         left: -5,
    //         right: 5
    //       }
    //     },
    //     tooltip: {
    //       x: {
    //         format: "dd MMM yyyy"
    //       },
    //     },
    //     legend: {
    //       position: 'top',
    //       horizontalAlign: 'left'
    //     },
    //     fill: {
    //       type: "solid",
    //       fillOpacity: 0.7
    //     }
    // }

      state = {
        options: {
          // xaxis: {
          //   categories: ['Month']
          // }
        },
        series: [
        //   {
        //   name: 'computer',
        //   data: [0,3]
        // }, {
        //   name: 'math',
        //   data: [0,2]
        // }
    ],
      }
    
      
      componentDidMount(){
        this.setState({ isLoding: true },()=>{
          user.pieChart().then(response => {
            let mydata = response.data.slice(0,15).map(val => val.keyword);
            let values = response.data.slice(0,15).map(val => val.weight);

            this.setState({ 
              isLoding: false,
              // series: values,
              options:{
                xaxis: {
                  categories: [...mydata]
                }
              },
              series:[{name: 'computer',data: [0,3]}, { name: 'math', data: [0,2]}]

              // options: {
              //   ...this.state.options,
              //   labels:mydata,

              // }
              //options : {...this.state.options.labels,mydata[2].keyword}
              // keyword : response.data.keyword,
              // series: mydata[2].keyword
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
