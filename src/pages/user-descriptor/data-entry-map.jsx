/* eslint-disable no-unused-vars */
import React from "react";
import mapboxgl from "mapbox-gl";
import { gql } from "apollo-boost";
import "./user-descriptor.css";
import { ApolloContext } from "../../apollo-context-provider";

export class DataEntryMap extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      loading: false,
      data: []
    };
    this.renderLineSegmenets = this.renderLineSegmenets.bind(this);
  }

  renderLineSegmenets(event) {
    event.target.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: this.state.data
          }
        }
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#ee9ca7",
        "line-width": 3
      }
    });
  }

  renderMap() {
    // eslint-disable-next-line no-undef
    if (!process.env.REACT_APP_MAPBOX_API_KEY) {
      console.error(
        "Please place your Mapbox API key in the environment variable: REACT_APP_MAPBOX_API_KEY"
      );
      console.log(
        "Create a new key at https://account.mapbox.com/access-tokens/"
      );
      return;
    }
    // eslint-disable-next-line no-undef
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    this.map = new mapboxgl.Map({
      container: this.containerRef.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: { lat: 40.506982, lng: -74.452378 },
      zoom: 14.0
    });
    this.map.on("load", this.renderLineSegmenets);
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.context.client.query({ query: locationQuery }).then(({ data }) => {
      this.setState({
        ...this.state,
        loading: false,
        data: data.getPaginatedDescriptors.map(val => {
          return { latitude: val.latitude, longitude: val.longitude };
        })
      });
      const locations = data.getPaginatedDescriptors;
      this.renderMap();
      locations.forEach(marker => {
        new mapboxgl.Marker()
          .setLngLat({ lat: marker.latitude, lng: marker.longitude })
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              "<h3>Recorded Weight</h3><p>" + marker.value + "</p>"
            )
          )
          .addTo(this.map);
        this.map.setCenter({
          lat: locations[0].latitude,
          lng: locations[0].longitude
        });
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h3>Loading...</h3>
          <div className="loader"></div>
        </div>
      );
    }
    return <div ref={this.containerRef} style={stylesheet.mapContainer}></div>;
  }
}

DataEntryMap.contextType = ApolloContext;

const stylesheet = {
  mapContainer: {
    width: 570,
    height: 350
  },
  marker: {
    backgroundImage: "url('../../resources/location-marker-circle.png')",
    backgroundSize: "cover",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer"
  }
};

const locationQuery = gql`
  {
    getPaginatedDescriptors(unit: "lb", start: 0, count: 10) {
      value
      longitude
      latitude
    }
  }
`;
