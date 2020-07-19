import React, { Component } from "react";
import { Chart } from "@antv/g2";

class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const datas = [
      {
        django: {
          learning: 0.3,
          analytics: 0.3,
          web: 0.4,
          development: 0.2,
          react: 0.1,
        },
        postgre: {
          learning: 0.2,
          analytics: 0.5,
          web: 0.6,
          development: 0.2,
          react: 0.6,
        },
        docker: {
          learning: 0.1,
          analytics: 0.1,
          web: 0.2,
          development: 0.1,
          react: 0.3,
        },
        redis: {
          learning: 0.6,
          analytics: 0.7,
          web: 0.1,
          development: 0.4,
          react: 0.4,
        },
        celery: {
          learning: 0.7,
          analytics: 0.4,
          web: 0.3,
          development: 0.2,
          react: 0.5,
        },
      },
    ];
    console.log("datasssssssssssssssss", datas);
    let name = Object.keys(datas[0]);
    const field = [];
    const values =[]
    datas &&
      Object.keys(datas[0]).map((data1, idx) => {
        Object.keys(datas[0][data1]).map((data2, idx) => {
          console.log(
            "dataspushdataspushdataspushdataspushdataspushdataspushdataspushdataspush",
            datas[0][data1][data2]
          );
          field.push(data2);
          values.push(datas[0][data1][data2])
        });
      });
    const fields = [];
    for (let i = 0; i < field.length; i++) {
      if (field[i] === fields[0]) {
        break
      }
      else{
      fields.push(field[i]);
      }
    }
    console.log("vvvvvvvvvvvvvvv",values)
    for(let i=0;i<values.length;i++){
      console.log(fields.length)
        
    }

    const data = [
      [0, 0, 0.3],
      [0, 1, 0.3],
      [0, 2, 0.4],
      [0, 3, 0.2],
      [0, 4, 0.1],
      [1, 0, 0.2],
      [1, 1, 0.5],
      [1, 2, 0.6],
      [1, 3, 0.2],
      [1, 4, 0.5],
      [2, 0, 0.6],
      [2, 1, 0.4],
      [2, 2, 0.3],
      [2, 3, 0.2],
      [2, 4, 0.5],
      [3, 0, 0.6],
      [3, 1, 0.7],
      [3, 2, 0.1],
      [3, 3, 0.4],
      [3, 4, 0.5],
      [4, 0, 0.7],
      [4, 1, 0.4],
      [4, 2, 0.3],
      [4, 3, 0.2],
      [4, 4, 0.1],
    ];
    console.log("data",data)
    const source = data.map((arr) => {
      return {
        name: arr[0],
        day: arr[1],
        sales: arr[2],
      };
    });

    const chart = new Chart({
      container: "heatmap",
      autoFit: true,
      height: 500,
    });

    chart.data(source);

    chart.scale("name", {
      type: "cat",
      values: name,
    });
    chart.scale("day", {
      type: "cat",
      values: fields,
    });
    chart.scale("sales", {
      nice: true,
    });

    chart.axis("name", {
      tickLine: null,
      grid: {
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: "#f0f0f0",
          },
        },
      },
    });

    chart.axis("day", {
      title: null,
      grid: {
        alignTick: false,
        line: {
          style: {
            lineWidth: 1,
            lineDash: null,
            stroke: "#f0f0f0",
          },
        },
      },
    });

    chart.tooltip({
      showMarkers: false,
    });

    chart
      .polygon()
      .position("name*day")
      .color("sales", "#BAE7FF-#1890FF-#0050B3")
      .label("sales", {
        offset: -2,
        style: {
          fill: "#fff",
          shadowBlur: 2,
          shadowColor: "rgba(0, 0, 0, .45)",
        },
      })
      .style({
        lineWidth: 1,
        stroke: "#fff",
      });

    chart.interaction("element-active");

    chart.render();
  }

  render() {
    return <div id="heatmap" />;
  }
}

export default HeatMap;
