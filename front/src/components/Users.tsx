import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

type User = {
    firstname: string;
};
const Users = () => {
    const [users, setUsers] = useState<string[]>();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/employees", {
                    signal: controller.signal,
                });
                const firstNames = response.data.map((user: any) => user.firstname);
                isMounted && setUsers(firstNames);
            } catch (err) {
                console.error(err);
                navigate("/login", { state: { from: location }, replace: true });
            }
        };

        getUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;
