import React, { Component } from "react";
import { Map, MarkerGroup, LineGroup } from "react-d3-map";
import { isEmpty } from "lodash";

// import "../../style/MapView.scss";

class MapView extends Component {
  constructor(props) {
    super(props);
  }

  buildData(trip) {
    let coords = [];

    for (let i = 0; i < trip.coords.length; i += ~~(trip.coords.length / 100)) {
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
      const tripName = trip.tripFileName;
      const data = {
        type: "Feature",
        properties: {
          text: tripName
        },
        option: {
          color: "blue"
        },
        geometry: {
          type: "LineString",
          coordinates: this.buildData(trip)
        }
      };
      res.push(
        <LineGroup
          key={tripName}
          data={data}
          meshClass={"trip-line"}
          onClick={(dom, d, i) => this.props.onLineClick(tripName)}
          onMouseOver={() => this.onLineMouseOver()}
          onMouseOut={() => this.onLineMouseOut()}
          popupContent={d => this.popupContent(d)}
        />
      );
    }
    return res;
  }

  popupContent(d) {
    console.log("D", d);
    return d.properties.text;
  }

  onLineMouseOver(dom, d, i) {
    console.log("over");
  }

  onLineMouseOut(dom, d, i) {
    console.log("out");
  }

  render() {
    const { trips } = this.props;
    const trip = trips[0];

    const width = 700;
    const height = 700;
    let scale;
    const scaleExtent = [1, 1 << 20];
    let center = [];

    if (trips.length === 1) {
      const aveLng =
        (trip.coords[0].lng + trip.coords[trip.coords.length - 1].lng) / 2;
      const aveLat =
        (trip.coords[0].lat + trip.coords[trip.coords.length - 1].lat) / 2;
      center.push(aveLng);
      center.push(aveLat);
      scale = 65536;
    } else {
      center = [-122.39836967188276, 37.55754367467685];
      scale = 262144;
    }

    return (
      <div className="map-view-base">
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
