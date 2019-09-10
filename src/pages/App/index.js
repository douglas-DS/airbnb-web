import React, { useState } from "react";
import Dimensions from "react-dimensions";
import { Container } from "./styles";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";

const Map = () => {    

    const [token] = useState(
        'pk.eyJ1IjoiZG91Z2xhcy1kcyIsImEiOiJjazA2dnVxaGQwZXpoM2lxYmIxc2VqZGdtIn0.XQ5faRbBWkYmLjJaNdF-6w'
    );
    const [containerWidth] = useState(PropTypes.number.isRequired);
    const [containerHeight] = useState(PropTypes.number.isRequired);

    const [viewport, setViewport] = useState({
        latitude: -27.2108001,
        longitude: -49.6446024,
        zoom: 12.8,
        bearing: 0,
        pitch: 0   
    });

    return (
        <MapGL
            width={containerWidth}
            height={containerHeight}
            {...viewport}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            mapboxApiAccessToken={token}
            onViewportChange={viewport => setViewport({ viewport })}
        />
    )
}

const DimensionedMap = Dimensions()(Map);
const App = () => (
    <Container>
        <DimensionedMap />
    </Container>
);

export default App;