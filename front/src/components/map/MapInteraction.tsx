import { MapInteractionDiv } from "../../styles/map";
import React, { SyntheticEvent } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { BiCurrentLocation } from "react-icons/bi";
import proj4 from "proj4";

interface Props {
    children: JSX.Element | JSX.Element[];
}
interface SubProps {
    map?: Map;
}
export default function MapInteraction({ children }: Props) {
    return <MapInteractionDiv>{children}</MapInteractionDiv>;
}

export function Location({ map }: SubProps): JSX.Element {
    if (map) {
        const onClick = (e: SyntheticEvent) => {
            if ("geolocation" in navigator) {
                const button = e.currentTarget as HTMLButtonElement;
                button.setAttribute("disabled", "");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { longitude, latitude } = position.coords;
                        const baseEPSG = map.getView().getProjection().getCode();
                        const coord = proj4("EPSG:4326", baseEPSG, [longitude, latitude]);
                        console.log(coord);
                        flyAnimate(map.getView(), coord);
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
