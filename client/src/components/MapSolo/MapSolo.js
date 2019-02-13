import React, { Component } from "react";
import "./MapSolo.css";
//import axios from "axios";
//import API from "../../utils/API";
import MDSpinner from "react-md-spinner";
import fighters from "../../utils/fighters.json";
import keys from "../../keys";
//import EventCard from "../EventCard";
//import { Link } from "react-router-dom";

class MapSolo extends Component {
  state = {
    venues: [],
    fighters: fighters,
    refs: [],
    mics: [],
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

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

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
    this.triggerInitMap();
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

    var geocoder = new window.google.maps.Geocoder();

    //this.geocodeAddress(geocoder, map, "4607 N Sheridan Rd Chicago IL 60640");

    // Add listener for tilesloaded and update our areTilesloaded state to remove spinner
    map.addListener("tilesloaded", () => {
      this.setState({ areTilesLoaded: true });
    });

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // // Display Dynamic Markers for Fighters
    // this.state.fighters.map(function(fighters) {
    //   var contentString = `<div id="content"><div id="siteNotice"></div><img src="http://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52746-boxing-glove-icon.png" class="fighterIcon" /><h2 id="firstHeading" class="firstHeading">${
    //     fighters.name
    //   }</h2><h6>Matches Won: ${fighters.matchesWon}</h6><h6>Matches Lost: ${
    //     fighters.matchesLost
    //   }</h6><div id="bodyContent"><img src=${
    //     fighters.img
    //   } class="fighterImg" /></br><p>${
    //     fighters.bio
    //   }</p></p>Need a ref to watch your fight? <b>Reach out now at :</b>${
    //     fighters.phone
    //   }</p></div></div>`;

    //   // Create A Marker
    //   var icon = {
    //     url: "https://66.media.tumblr.com/avatar_87b874867ea4_128.pnj", // url
    //     scaledSize: new window.google.maps.Size(50, 50), // scaled size
    //     origin: new window.google.maps.Point(0, 0), // origin
    //     anchor: new window.google.maps.Point(0, 0) // anchor
    //   };

    //   var markerFight = new window.google.maps.Marker({
    //     position: { lat: fighters.lat, lng: fighters.lng },
    //     map: map,
    //     title: fighters.name,
    //     icon: icon
    //   });

    //   // Click on A Marker!
    //   markerFight.addListener("click", function() {
    //     // Change the content
    //     infowindow.setContent(contentString);

    //     // Open An InfoWindow
    //     infowindow.open(map, markerFight);
    //   });
    // });

    // Display Dynamic Markers for Fighters
    let testMICS = this.props.mics;
    //this.state.mics.map(mic => {
    testMICS.map(mic => {
      var contentString = `<div id="content"><div id="siteNotice"></div><h2 id="firstHeading" class="firstHeading">${
        mic.micName
      }</h2><h6>At: ${mic.locationName}</h6><h6>${
        mic.address
      }</h6><div id="bodyContent"><img src=${
        mic.img
      } class="fighterImg" /></div></div>`;

      console.log("testMICS", testMICS);

      // Create A Marker
      var icon = {
        url: "https://66.media.tumblr.com/avatar_87b874867ea4_128.pnj", // url
        scaledSize: new window.google.maps.Size(50, 50), // scaled size
        origin: new window.google.maps.Point(0, 0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
      };

      geocoder.geocode({ address: mic.address }, function(results, status) {
        if (status === "OK") {
          var markerFight = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: mic.micName,
            icon: icon
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
        } else {
          alert(
            `Geocode for ${
              mic.address
            }was not successful for the following reason: ${status}`
          );
        }
      });

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
      console.log("not sure");
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
            console.log("this.state: ", this.state, "this.props: ", this.props)
          }
        >
          click for info MAPSOLO.js
        </button>
      </div>
    );
  }
}

export default MapSolo;
