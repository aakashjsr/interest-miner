import React, { Component } from "react";
import { Chart } from "@antv/g2";

class HeatMap extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
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
      values: ["django", "postgre", "docker", "redis", "celery"],
    });
    chart.scale("day", {
      type: "cat",
      values: ["learning", "analytics", "web", "development", "react"],
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
