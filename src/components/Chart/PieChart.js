import React from "react";
import Chart from "react-apexcharts";
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import user from 'services/api';

import { handleServerErrors } from "utils/errorHandler";

class PieChart extends React.Component {
        

          state = {
           data:[],
            series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ["compuetr","english","math","chemis"],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
            };
            // keyword, weight  options.labels

            componentDidMount(){
              this.setState({ isLoding: true },()=>{
                user.pieChart().then(response => {
                  let mydata = response.data.slice(0,20);
                  console.log('k data++>',mydata[2].keyword)

                  this.setState({ 
                    isLoding: false,
                    data:response.data.slice(0,20)
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
  
 

      

        render() {
          return (
            <div id="chart">
               { this.state.isLoding ? 
                  (  
                    <div className="text-center" style={{padding:'20px'}}>
                        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                   </div>
                   )
                   :
                     this.state.data.length && 
                     <div style={{paddingLeft: '30%'}}>
                     <Chart 
                            options={this.state.options}    
                            series={this.state.series} 
                            type="pie" 
                            width={600} 
                      />
                      </div>
                      }
            </div>
            )
        }
 }
          
          
    export default PieChart;


    
// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           id: "basic-bar"
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//         }
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91]
//         }
//       ]
//     };
//   }

//   render() {
//     return (
//       <div className="app">
//         <div className="row">
//           <div className="mixed-chart">
//             <Chart
//               options={this.state.options}
//               series={this.state.series}
//               type="bar"
//               width="500"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
    