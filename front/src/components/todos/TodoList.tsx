import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { createTodos, getTodos } from "../../service/todoServics";

const TodoList = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { data, isLoading, error } = useQuery(["todos"], getTodos);

    const create = () => createTodos({ title, content });
    if (isLoading) {
        return <h2>isLoading</h2>;
    }

    return (
        <>
            <h2>TodoList</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={create}>a</button>
            {data?.data.data.length > 0 ? (
                data?.data.data.map((items: any) => <h3 key={items.id}>{items.title}</h3>)
            ) : (
                <h3>no item</h3>
            )}
        </>
    );
};
export default TodoList;
