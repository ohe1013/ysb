import { useNavigate } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const ss = async () => {
        for (let i = 0; i < 100; i++) {
            await axios.get("https://api.coinpaprika.com/v1/tickers");
        }

        return await axios.get("https://api.coinpaprika.com/v1/tickers");
    };
    const useGetCoins = () => {
        return useQuery({
            queryKey: ["coins"],
            queryFn: ss,
            suspense: true,
        });
    };

    const { data: coin } = useGetCoins();

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            {coin && coin.data.map((item: any) => <li key={item.id}>{item.id}</li>)}
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    );
};

export default Unauthorized;
