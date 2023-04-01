import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Loading from "../components/Loading";

function fetchUser(userId: any) {
    let user: any = null;
    const suspender = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                user = data;
            }, 3000);
        });
    return {
        read() {
            if (user === null) {
                throw suspender;
            } else {
                return user;
            }
        },
    };
}

function fetchPosts(userId: any) {
    let posts: any = null;
    const suspender = fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
            setTimeout(() => {
                posts = data;
            }, 3000);
        });
    return {
        read() {
            if (posts === null) {
                throw suspender;
            } else {
                return posts;
            }
        },
    };
}

function fetchData(userId: any) {
    return {
        user: fetchUser(userId),
        posts: fetchPosts(userId),
    };
}

const Test = () => {
    return <Suspense fallback={<p>사용자 정보 로딩중...</p>}></Suspense>;
};

export default Test;
