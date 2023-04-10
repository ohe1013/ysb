import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import Map from "ol/Map";
import { useEffect, useState } from "react";
import proj4 from "proj4";
import React from "react";
import { MapSection } from "../styles/map";
import { bbox } from "ol/loadingstrategy";
import XYZ from "ol/source/XYZ";
import MapBoard from "../components/map/MapBoard";
import MapInteraction, { Location } from "../components/map/MapInteraction";
import { GeoJSON } from "ol/format";
import { Vector as VectrorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { urlBuilder } from "../common/util";
import { basicStyle } from "../common/style";

export const googleRoadLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-road" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});
export const sejongPosition = [127.28923267492068, 36.48024986578043];
export const seoulPosition = [126.97836930289438, 37.56664507000858];

export default function WFS(): JSX.Element {
    const [mapState, setMapState] = useState(new Map({}));

    useEffect(() => {
        document.querySelector("#map > .ol-viewport")?.remove();
        const wfs = new VectrorSource({
            format: new GeoJSON(),
            strategy: bbox,
            url: (extent) =>
                urlBuilder("https://api.itcode.dev/geoserver/wfs", {
                    bbox: `${extent.join(",")},EPSG:3857`,
                    exceptions: "application/json",
                    outputFormat: "application/json",
                    request: "GetFeature",
                    service: "WFS",
                    srsName: "EPSG:3857",
                    typename: "TEST:buld_sejong",
                    version: "2.0.0",
                }),
        });

        const wfsLayer = new VectorLayer({
            minZoom: 15,
            properties: { name: "wfs" },
            source: wfs,
            style: (feature) => basicStyle(feature, "buld_nm"),
            zIndex: 5,
        });
        const map = new Map({
            layers: [googleRoadLayer, wfsLayer],
            target: "map",
            view: new View({
                center: proj4("EPSG:4326", "EPSG:3857", sejongPosition),
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
