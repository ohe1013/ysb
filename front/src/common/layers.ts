import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";

export const osmLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-osm" },
    source: new OSM({
        attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>',
        cacheSize: 0,
    }),
    zIndex: 1,
});

export const vworldBaseLayer = new TileLayer({
    maxZoom: 19,
    minZoom: 5,
    preload: Infinity,
    properties: { name: "base-vworld-base" },
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Base/{z}/{y}/{x}.png",
    }),
    zIndex: 2,
});

export const vworldGrayLayer = new TileLayer({
    maxZoom: 18,
    minZoom: 5,
    preload: Infinity,
    properties: { name: "base-vworld-gray" },
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/gray/{z}/{y}/{x}.png",
    }),
    zIndex: 2,
});

export const vworldMidnightLayer = new TileLayer({
    maxZoom: 18,
    minZoom: 5,
    preload: Infinity,
    properties: { name: "base-vworld-midnight" },
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/midnight/{z}/{y}/{x}.png",
    }),
    zIndex: 2,
});

export const vworldHybridLayer = new TileLayer({
    maxZoom: 19,
    minZoom: 5,
    preload: Infinity,
    properties: { name: "ext-vworld-hybrid" },
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Hybrid/{z}/{y}/{x}.png",
    }),
    zIndex: 3,
});

export const vworldSatelliteLayer = new TileLayer({
    maxZoom: 19,
    minZoom: 5,
    preload: Infinity,
    properties: { name: "base-vworld-satellite" },
    source: new XYZ({
        url: "https://api.vworld.kr/req/wmts/1.0.0/4480453F-0EFD-3B0C-A3CC-439519081B63/Satellite/{z}/{y}/{x}.jpeg",
    }),
    zIndex: 2,
});

export const googleRoadLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-road" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});

export const googleTerrainLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-terrain" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});

export const googleAlterLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-alter" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});

export const googleSatelliteLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-satellite" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});

export const googleOnlyTerrainLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-only-terrain" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});

export const googleHybridyLayer = new TileLayer({
    preload: Infinity,
    properties: { name: "base-google-hybrid" },
    source: new XYZ({ url: "http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" }),
    zIndex: 2,
});
