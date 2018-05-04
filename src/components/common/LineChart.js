import React, { Component } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { isEmpty } from "lodash";

class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trip = this.props.trip;

    if (trip.length !== 1) {
      return <div />;
    }

    trip = trip[0];

    const labels = [];
    const data = [];

    for (let coord of trip.coords) {
      labels.push(coord.index);
      data.push(coord.speed);
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Speed",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]
    };

    return (
      <div>
        <Line
          data={chartData}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
          onElementsClick={elems => {
            this.props.onLineClick(elems);
          }}
        />
      </div>
    );
  }
}

export default LineChart;
