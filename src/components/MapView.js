import React, { Component } from "react";
import { Map, MarkerGroup, LineGroup } from "react-d3-map";
import { isEmpty } from "lodash";

import "../../style/MapView.scss";

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  buildData(trip) {
    let coords = [];

    for (
      let i = 0;
      i < trip.coords.length;
      i += ~~(trip.coords.length / 1000)
    ) {
      const tmp = trip.coords[i];
      coords.push([tmp.lng, tmp.lat]);
    }
    return coords;
  }

  buildLineGroupElement() {
    const { trips } = this.props;
    let res = [];
    if (isEmpty(trips)) {
      return res;
    }

    for (let i = 0; i < trips.length; i++) {
      const trip = trips[i];
      const data = {
        type: "Feature",
        properties: {
          text: "this is a LineString!!!"
        },
        option: {
          color: "blue"
        },
        geometry: {
          type: "LineString",
          coordinates: this.buildData(trip)
        }
      };
      res.push(<LineGroup key={i} data={data} meshClass={"trip-line"} />);
    }
    return res;
  }

  render() {
    const { trip1 } = this.props;

    const width = 700;
    const height = 700;
    const scale = 1 << 18;
    const scaleExtent = [1, 1 << 20];
    const center = [-122.39242219446099, 37.74977073928103];

    // set your popupContent
    const popupContent = function(d) {
      return d.properties.text;
    };

    var onLineMouseOut = function(dom, d, i) {
      console.log("out");
    };
    var onLineMouseOver = function(dom, d, i) {
      console.log("over");
    };
    var onLineClick = function(dom, d, i) {
      console.log("click");
    };
    var onLineCloseClick = function(id) {
      console.log("close click");
    };

    return (
      <div>
        <Map
          width={width}
          height={height}
          scale={scale}
          scaleExtent={scaleExtent}
          center={center}
        >
          {this.buildLineGroupElement()}
        </Map>
      </div>
    );
  }
}

export default MapView;
