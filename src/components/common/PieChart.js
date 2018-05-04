import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { isEmpty } from "lodash";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speedLabelMap: {
        speed_0_10: "< 10 mph",
        speed_10_20: "10 - 20 mph",
        speed_20_30: "20 - 30 mph",
        speed_30_40: "30 - 40 mph",
        speed_40_50: "40 - 50 mph",
        speed_50_60: "50 - 60 mph",
        speed_60: ">= 60 mph"
      }
    };
  }

  render() {
    const { trip } = this.props;
    const labels = [];
    const percentage = [];

    if (!isEmpty(trip)) {
      let sum = 0;
      for (let speedRange in trip.statistic) {
        sum += trip.statistic[speedRange];
      }

      for (let speedRange in trip.statistic) {
        labels.push(this.state.speedLabelMap[speedRange]);
        percentage.push(
          `${(trip.statistic[speedRange] * 100 / sum).toFixed(2)}`
        );
      }
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: [
            "#eb3b5a",
            "#a55eea",
            "#45aaf2",
            "#f7b731",
            "#20bf6b",
            "#26de81",
            "#b8e994"
          ],
          hoverBackgroundColor: [
            "#eb3b5a",
            "#a55eea",
            "#45aaf2",
            "#f7b731",
            "#20bf6b",
            "#26de81",
            "#b8e994"
          ]
        }
      ]
    };

    return (
      <Pie
        data={data}
        width={300}
        height={300}
        options={{
          maintainAspectRatio: true
        }}
        legend={{
          position: "bottom"
        }}
      />
    );
  }
}

export default PieChart;
