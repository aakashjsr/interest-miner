import React, { Component } from "react";
import { Chart } from "@antv/g2";
class BarChart extends Component {
  state = {};
  componentDidMount() {
    const data = [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ];

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: "c1",
      width: 600,
      height: 300,
    });

    // Step 2: 载入数据源
    chart.data(data);

    // Step 3: 创建图形语法，绘制柱状图
    chart.interval().position("genre*sold");

    // Step 4: 渲染图表
    chart.render();
  }
  render() {

    return <div id="c1"></div>;
  }
}
export default BarChart;
