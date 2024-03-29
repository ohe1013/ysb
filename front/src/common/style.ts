import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";
import RenderFeature from "ol/render/Feature";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Text from "ol/style/Text";

/**
 * 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function basicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
    return new Style({
        fill: new Fill({ color: "rgba(100, 149, 237, 0.6)" }),
        stroke: new Stroke({
            color: "rgba(100, 149, 237, 1)",
            width: 2,
        }),
        text: new Text({
            fill: new Fill({ color: "white" }),
            font: "0.8rem sans-serif",
            stroke: new Stroke({
                color: "rgba(0, 0, 0, 1)",
                width: 4,
            }),
            text: feature.get(labelColumn),
        }),
    });
}
