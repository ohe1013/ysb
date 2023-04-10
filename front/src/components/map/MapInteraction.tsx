import { MapInteractionDiv } from "../../styles/map";
import React, { SyntheticEvent } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { BiCurrentLocation } from "react-icons/bi";
import proj4 from "proj4";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import Feature from "ol/Feature";

interface Props {
    children: JSX.Element | JSX.Element[];
}
interface SubProps {
    map?: Map;
}
export default function MapInteraction({ children }: Props) {
    return <MapInteractionDiv>{children}</MapInteractionDiv>;
}
const vectorSource = new VectorSource();
export function Location({ map }: SubProps): JSX.Element {
    if (map) {
        map.on("pointerdrag", () => {
            vectorSource.clear();
        });
        if (map.getAllLayers().filter((layer) => layer.get("name") === "location").length === 0) {
            map.addLayer(
                new VectorLayer({
                    minZoom: 15,
                    properties: { name: "location" },
                    source: vectorSource,
                    style: new Style({
                        image: new Circle({
                            fill: new Fill({ color: "dodgerblue" }),
                            radius: 10,
                            stroke: new Stroke({
                                color: "white",
                                width: 3,
                            }),
                        }),
                    }),
                    zIndex: 9999,
                })
            );
        }
        const onClick = (e: SyntheticEvent) => {
            if ("geolocation" in navigator) {
                const button = e.currentTarget as HTMLButtonElement;
                button.setAttribute("disabled", "");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { longitude, latitude } = position.coords;
                        const baseEPSG = map.getView().getProjection().getCode();
                        const coord = proj4("EPSG:4326", baseEPSG, [longitude, latitude]);
                        vectorSource.clear();
                        flyAnimate(map.getView(), coord);
                        vectorSource.addFeature(new Feature({ geometry: new Point(coord) }));

                        button.removeAttribute("disabled");
                    },
                    () => alert("실패"),
                    { enableHighAccuracy: true }
                );
            } else {
                alert("사용자 위치 알 수 없음");
            }
        };
        return (
            <button className="location" onClick={onClick}>
                <BiCurrentLocation color="white" size={25} />
            </button>
        );
    } else {
        return null;
    }
}

function flyAnimate(view: View, location: number[]): void {
    const duration = 2000;
    const zoom = view.getZoom() || 15;
    let parts = 2;
    let called = false;

    const callback = (complete: boolean) => {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
        }
    };
    view.animate(
        {
            center: location,
            duration,
        },
        callback
    );

    view.animate({ duration: duration / 2, zoom: zoom - 3 }, { duration: duration / 2, zoom: zoom }, callback);
}
