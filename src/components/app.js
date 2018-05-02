import React, { Component } from "react";
import MapView from "./MapView";
import tripsData from "../data/trips/2016-07-02--13-09-31.json";
// import requireDir from "require-dir";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const startTime = tripsData.start_time;
    const endTime = tripsData.end_time;
    const coords = tripsData.coords.map((coord, index) => {
      return (
        <div key={index}>
          <p>{coord.lat}</p>
          <p>{coord.lng}</p>
          <p>{coord.speed}</p>
          <hr />
        </div>
      );
    });

    console.log(tripsData);

    const tripFiles = require.context("../data/trips", false, /\.json$/);
    console.log("type", tripFiles);

    let file;

    const arr = [];

    for (let tripFile of tripFiles.keys()) {
      file = tripFile;
      arr.push(tripFiles(file));
      // break;
    }

    const data = tripFiles(file);

    // debugger;
    console.log("Data", data);
    console.log("arr", arr);

    // file = `../data/tmp/${file.split("/")[1]}`;

    // const trip = require(file);
    // const trip = require("../data/tmp/2016-07-02--11-56-24.json");

    // console.log(trip);

    // tripFiles.keys().forEach(file => {
    //   console.log(file);
    // });

    return (
      <div>
        <h1>Hello World</h1>
        <h2>{startTime}</h2>
        <h2>{endTime}</h2>
        <MapView trip={arr} />

        {/* {coords} */}
        {/* <p>{tripsData}</p> */}
      </div>
    );
  }
}
