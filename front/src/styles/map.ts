import styled from "styled-components";

export const MapSection = styled.section`
    padding-top: 52px;

    .map-wrapper {
        position: relative;

        width: 100%;
        height: calc(100vh - 116px);

        #map {
            width: 100%;
            height: 100%;
        }
    }
`;

export const MapBoardDiv = styled.div`
    position: absolute;
    bottom: 75px;
    right: 25px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    background-color: white;
    border: 1px solid gainsboro;
    border-radius: 10px;

    box-shadow: 3px 3px 10px grey;
    box-sizing: border-box;

    width: 220px;
    height: 390px;

    overflow: hidden;

    transition: width 0.3s, height 0.3s;

    .item {
        display: flex;
        flex-direction: column;
        gap: 5px;

        & > div {
            display: flex;
            align-items: center;

            background-color: #eeeeee;

            border: 1px solid gainsboro;
            border-radius: 5px;

            font-size: 14px;

            small {
                display: inline-block;
                width: 40px;

                text-align: center;
            }

            input:not([type="checkbox"]),
            select {
                width: 130px;
                height: 100%;

                padding: 5px;

                border: transparent;
                box-sizing: border-box;

                font-size: 12px;

                &:focus {
                    outline-color: dodgerblue;
                    outline-width: 0.1px;
                    outline-style: inset;
                }
            }

            input[type="checkbox"] {
                margin: 5px;
            }

            button {
                background: transparent;
                border: transparent;

                padding: 5px;

                font-size: 12px;

                cursor: pointer;

                &:active {
                    opacity: 0.5;
                }
            }
        }

        &[data-name="header"] {
            display: block;

            button {
                padding: 5px;
                box-sizing: border-box;

                border: transparent;
                background-color: transparent;

                cursor: pointer;
            }
        }
    }

    &[data-show="false"] {
        width: 30px;
        height: 30px;

        padding: 2px;

        border-radius: 4px;

        transition: width 0.3s, height 0.3s;
    }
`;

export const MapInteractionDiv = styled.div`
    position: absolute;
    bottom: 25px;
    left: 25px;

    padding: 10px;

    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
        width: 40px;
        height: 40px;

        border: transparent;
        border-radius: 50%;
        box-shadow: 0px 0px 5px grey;

        cursor: pointer;

        &:active {
            opacity: 0.5;
        }

        &:disabled {
            opacity: 0.5;
            cursor: initial;
        }

        &.location {
            background-color: limegreen;
        }

        &.sejong {
            background-color: dodgerblue;
        }

        &.add {
            background-color: crimson;
        }
    }
`;
