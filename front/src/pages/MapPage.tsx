import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import { useEffect, useState } from "react";
import proj4 from "proj4";
import React from "react";
import { MapSection } from "../styles/map";

import XYZ from "ol/source/XYZ";
import MapBoard from "../components/map/MapBoard";
import MapInteraction, { Location } from "../components/map/MapInteraction";

export const googleRoadLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-road" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});
export const seoulPosition = [126.97836930289438, 37.56664507000858];
export default function MapPage(): JSX.Element {
    const [mapState, setMapState] = useState(new Map({}));

    useEffect(() => {
        document.querySelector("#map > .ol-viewport")?.remove();

        const map = new Map({
            layers: [googleRoadLayer],
            target: "map",
            view: new View({
                center: proj4("EPSG:4326", "EPSG:3857", seoulPosition),
                projection: "EPSG:3857",
                zoom: 17,
            }),
        });
        setMapState(map);
    }, []);

    return (
        <MapSection className="page" id="osm">
            <article className="map-wrapper">
                <div id="map" />
                <MapBoard map={mapState} />
                <MapInteraction>
                    <Location map={mapState} />
                </MapInteraction>
            </article>
        </MapSection>
    );
}
