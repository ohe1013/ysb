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
// 기본지도
const vworldBaseLayer = new TileLayer({
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Base/{z}/{y}/{x}.png",
    }),
    properties: { name: "base-vworld-base" },
    minZoom: 5,
    maxZoom: 19,
    zIndex: 2,
    preload: Infinity,
});
// 백지도
const vworldGrayLayer = new TileLayer({
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/gray/{z}/{y}/{x}.png",
    }),
    properties: { name: "base-vworld-gray" },
    minZoom: 5,
    maxZoom: 18,
    zIndex: 2,
    preload: Infinity,
});
// 야간지도
const vworldMidnightLayer = new TileLayer({
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/midnight/{z}/{y}/{x}.png",
    }),
    properties: { name: "base-vworld-midnight" },
    minZoom: 5,
    maxZoom: 18,
    zIndex: 2,
    preload: Infinity,
});
// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Hybrid/{z}/{y}/{x}.png",
    }),
    properties: { name: "ext-vworld-hybrid" },
    minZoom: 5,
    maxZoom: 19,
    zIndex: 3,
    preload: Infinity,
});
// 위성지도
const vworldSatelliteLayer = new TileLayer({
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Satellite/{z}/{y}/{x}.jpeg",
    }),
    properties: { name: "base-vworld-satellite" },
    minZoom: 5,
    maxZoom: 19,
    zIndex: 2,
    preload: Infinity,
});
export const osmLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-osm" },
    source: new OSM({
        attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>',
        cacheSize: 0,
    }),
    zIndex: 1,
});

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
            </article>
        </MapSection>
    );
}
