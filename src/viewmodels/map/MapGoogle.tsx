import { Fragment } from "react"
import React from "react";
import GoogleMapReact from 'google-map-react';

const MapGoogle = () => {

    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };

    return(
        <>
        <img src="https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=43.2686751,-2.9340005&zoom=16&size=400x400&markers=&markers=icon:http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=cafe|43.2686751,-2.934000" />
        </>
    )
}
export default MapGoogle