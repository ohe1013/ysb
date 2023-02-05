import React from "react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoForm from "../components/todos/TodoForm";
import TodoItem from "../components/todos/TodoItem";
import useGetTodos from "../hooks/todo/useGetTodos";
import { PageContainer, PageTitle } from "../styles/page";
import { TodoResType } from "../types/todo";

const Home = () => {
    const { data: todos } = useGetTodos();

    const [updatingTodoId, setUpdatingTodoId] = useState("");

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const getInitialDataForEdit = (todo: TodoResType) => {
        if (titleRef.current && contentRef.current) {
            titleRef.current.value = todo.title;
            contentRef.current.value = todo.content;
        }
        setUpdatingTodoId(todo.id);
    };

    const onCancelUpdate = () => {
        if (titleRef.current && contentRef.current) {
            titleRef.current.value = "";
            contentRef.current.value = "";
        }
        setUpdatingTodoId("");
    };
    const onSubmitTodo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (titleRef.current && contentRef.current) {
            const todo = {
                title: titleRef.current.value,
                content: contentRef.current.value,
            };
        }
    };
    return (
        <>
            <PageContainer>
                <PageTitle>Todo</PageTitle>
                <TodoForm
                    titleRef={titleRef}
                    contentRef={contentRef}
                    isUpdating={updatingTodoId ? true : false}
                    onCancelUpdate={onCancelUpdate}
                    onSubmitTodo={onSubmitTodo}
                />
                <List>
                    {todos && todos?.length < 1 && <Message> 일정을 추가하세요</Message>}
                    {todos &&
                        todos.map((todo: TodoResType, index: number) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                index={index + 1}
                                getInitialDataForEdit={getInitialDataForEdit}
                            ></TodoItem>
                        ))}
                </List>
            </PageContainer>
        </>
    );
};
export default Home;

const List = styled.ul`
    margin: 4rem 0;
    width: 100%;
    border: 1px solid lightgray;
    height: 45rem;
    border-radius: 10px;
    overflow-y: auto;
`;

const Message = styled.p`
    text-align: center;
    font-size: 1.7rem;
    line-height: 40rem;
`;
