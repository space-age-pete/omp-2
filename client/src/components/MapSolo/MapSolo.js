import React, { Component } from "react";
import "./MapSolo.css";
//import axios from "axios";
//import API from "../../utils/API";
import MDSpinner from "react-md-spinner";
import fighters from "../../utils/fighters.json";
import keys from "../../keys";
import API from "../../utils/API";
//import EventCard from "../EventCard";
//import { Link } from "react-router-dom";

class MapSolo extends Component {
  state = {
    map: null,
    venues: [],
    fighters: fighters,
    refs: [],
    mics: [],
    markerArr: [],
    prevCurrLatLng: {
      lat: null,
      lng: null
    },
    userCurrLatLng: { lat: 41.8781, lng: -87.6298 },
    geolocationErr: false,
    venuesAPIHit: true,
    fightersAPIHit: false,
    refsAPIHit: true,
    micsAPIHit: false,
    areTilesLoaded: false,
    mapLoaded: false
  };

  getLocationOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  };

  handleGetLocationSuccess = pos => {
    let {
      coords: { latitude: lat, longitude: lng }
    } = pos;
    let prevCurrLatLng = this.state.userCurrLatLng;
    let userCurrLatLng = { lat, lng };
    this.setState({
      prevCurrLatLng,
      userCurrLatLng
    });
    this.getMics();
    //this.getVenues(userCurrLatLng.lat, userCurrLatLng.lng);
  };

  handleGetLocationError = err => {
    console.log(err);
    this.setState({
      geolocationErr: true,
      userCurrLatLng: { lat: 41.8781, lng: -87.6298 }
    });
    this.getMics();
    //this.getVenues(41.8781, -87.6298);
  };

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      this.handleGetLocationSuccess,
      this.handleGetLocationError,
      this.getLocationOptions
    );
    window.initMap = this.initMap;

    console.log("Component Did Mount");

    this.getFighters();
    this.getMics();
    //this.getRefs();
  }

  // componentDidUpdate() {
  //   if (this.state.mics != this.props.mics) this.getMics();
  //   console.log(this.map);
  // }

  makeMarker = () => {
    var marker = new window.google.maps.Marker({
      position: { lat: 41.8781, lng: -87.6298 },
      title: "NEW!!!",
      map: this.state.map
    });
  };

  hideAllMarkers = () => {
    this.state.markerArr.forEach(marker => {
      marker.setMap(null);
    });
  };

  showAllMarkers = () => {
    this.state.markerArr.forEach(marker => {
      marker.setMap(this.state.map);
    });
  };

  updateMarkers = () => {
    this.state.markerArr.forEach(marker => {
      let found = false;
      this.props.mics.forEach(mic => {
        if (mic.micName === marker.title) {
          found = true;
          return marker.setMap(this.state.map);
        }
      });
      if (!found) marker.setMap(null);
    });
  };

  // THIS LIFECYCLE METHOD IS DEPRICATED
  // componentWillMount() {
  //   navigator.geolocation.clearWatch(this.watchId);
  // }

  loadScript = url => {
    console.log("loadScript hit");
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.appendChild(script);
    this.setState({ mapLoaded: true });
  };

  getFighters = () => {
    console.log("this.fighters: ", fighters);

    this.setState(
      {
        fighters: fighters,
        fightersAPIHit: true
      },
      this.triggerInitMap
    );

    this.triggerInitMap();
  };

  getMics = () => {
    console.log("get mics hit");
    if (this.props.mics.length) {
      this.setState(
        {
          mics: this.props.mics,
          micsAPIHit: true
        },
        this.triggerInitMap
      );
    } else {
      // API.getMics()
      //   .then(response => {
      //     console.log("getMics response", response);
      //     this.setState(
      //       {
      //         mics: response.data,
      //         micsAPIHit: true
      //       },
      //       this.triggerInitMap
      //     );
      //   })
      //   .catch(error => {
      //     console.log("ERROR!! " + error);
      //   });
    }
    //this.triggerInitMap();
  };

  initMap = () => {
    console.log(this.state.userCurrLatLng);
    if (!this.state.userCurrLatLng.lat || !this.state.userCurrLatLng.lng) {
      return;
    }
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: this.state.userCurrLatLng.lat,
        lng: this.state.userCurrLatLng.lng
      },
      zoom: 14
    });

    //this.setState({ map });

    var geocoder = new window.google.maps.Geocoder();

    //this.geocodeAddress(geocoder, map, "4607 N Sheridan Rd Chicago IL 60640");

    // Add listener for tilesloaded and update our areTilesloaded state to remove spinner
    map.addListener("tilesloaded", () => {
      this.setState({ areTilesLoaded: true });
    });

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // Display Dynamic Markers for Mics
    let markerArr = this.state.mics.map(mic => {
      var contentString = `<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">${
        mic.micName
      }</h2><h6>At: ${mic.locationName}</h6><h6>${
        mic.address
      }</h6><div id="bodyContent"><img src=${
        mic.img
      } class="fighterImg" /></div></div>`;

      // Create A Marker
      var icon = {
        url: "https://66.media.tumblr.com/avatar_87b874867ea4_128.pnj", // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
      };

      if (!mic.lat || !mic.lng) {
        console.log("no lat or no lng");
        geocoder.geocode({ address: mic.address }, function(results, status) {
          if (status === "OK") {
            var markerFight = new window.google.maps.Marker({
              // position: results[0].geometry.location,
              position: {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              },
              map: map,
              title: mic.micName
              // icon: icon
            });

            //console.log("geometry: ", results[0].geometry.location.lat());

            // Click on A Marker!
            markerFight.addListener("click", function() {
              // Change the content
              infowindow.setContent(contentString);

              // Open An InfoWindow
              infowindow.open(map, markerFight);
            });

            API.updateMic(mic._id, {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            });

            return markerFight;
          } else {
            alert(
              `Geocode for ${
                mic.address
              }was not successful for the following reason: ${status}`
            );
          }
        });
      } else {
        var markerFight = new window.google.maps.Marker({
          // position: results[0].geometry.location,
          position: {
            lat: mic.lat,
            lng: mic.lng
          },
          map: map,
          title: mic.micName
          // icon: icon
        });

        // Click on A Marker!
        markerFight.addListener("click", function() {
          // Change the content
          infowindow.setContent(contentString);
          // infowindow.setContent(
          //   <div id="content">
          //     <EventCard key={mic._id} mic={mic} />
          //   </div>
          // );

          // Open An InfoWindow
          infowindow.open(map, markerFight);
        });
        return markerFight;
      }

      // var markerFight = new window.google.maps.Marker({
      //   position: this.geocodeAddress(geocoder, map, mic.address),
      //   map: map,
      //   title: mic.micName,
      //   icon: icon
      // });

      // console.log("Marker: ", markerFight);

      // // Click on A Marker!
      // markerFight.addListener("click", function() {
      //   // Change the content
      //   infowindow.setContent(contentString);

      //   // Open An InfoWindow
      //   infowindow.open(map, markerFight);
      // });
    });

    console.log(markerArr);

    this.setState({ map, markerArr: markerArr });
  };

  triggerInitMap = () => {
    //console.log("triggerInitMap hit", this.state);
    if (
      !this.state.mapLoaded &&
      (this.state.micsAPIHit || this.state.mics.length)
    ) {
      this.loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${
          keys.googleMaps.key
        }&callback=initMap`
      );
    }
  };

  // geocodeAddress = (geocoder, resultsMap) => {
  geocodeAddress = (geocoder, resultsMap, address) => {
    //var address = "4607 N Sheridan Road, Chicago IL 60640";
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === "OK") {
        //resultsMap.setCenter(results[0].geometry.location);

        var icon = {
          url: "https://66.media.tumblr.com/avatar_87b874867ea4_128.pnj", // url
          scaledSize: new window.google.maps.Size(50, 50), // scaled size
          origin: new window.google.maps.Point(0, 0), // origin
          anchor: new window.google.maps.Point(0, 0) // anchor
        };

        var marker = new window.google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          icon: icon
        });

        // console.log(
        //   `geocode results for ${address}: `,
        //   results[0].geometry.location
        // );
        // return results[0].geometry.location;
      } else {
        alert(
          `Geocode for ${address}was not successful for the following reason: ${status}`
        );
      }
    });
  };

  render() {
    if (
      this.state.geolocationErr ||
      this.state.userCurrLatLng === this.state.prevCurrLatLng
    ) {
      //console.log("not sure");
    }
    return (
      <div>
        <main>
          <div id="map" />
        </main>
        {!this.state.areTilesLoaded && !this.state.mics.length && (
          <MDSpinner className="spinner" size={100} />
        )}
        <button
          onClick={() =>
            console.log(
              "this.state: ",
              this.state,
              "this.props: ",
              this.props.mics.length
            )
          }
        >
          click for info MAPSOLO.js
        </button>
        <button onClick={this.makeMarker}>make marker</button>
        <button onClick={this.hideAllMarkers}>hide markers</button>
        <button onClick={this.showAllMarkers}>show markers</button>
        <button onClick={this.updateMarkers}>update markers</button>
      </div>
    );
  }
}

export default MapSolo;
