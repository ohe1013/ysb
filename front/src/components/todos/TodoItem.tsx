import React from "react";
import { FC, memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDeleteTodo from "../../hooks/todo/useDeleteTodo";
import { TodoResType } from "../../types/todo";

interface TodoItemProps {
    todo: TodoResType;
    index: number;
    getInitialDataForEdit: (todo: TodoResType) => void;
}

const TodoItem: FC<TodoItemProps> = memo(({ todo, index, getInitialDataForEdit }) => {
    const { mutate: deleteTodoMutate } = useDeleteTodo();

    return (
        <Li>
            <Link to={todo.id} state={todo}>
                <Index>{index}</Index>
                <Title>{todo.title}</Title>
            </Link>
            <div>
                <button onClick={() => getInitialDataForEdit(todo)}>수정</button>
                <button onClick={() => deleteTodoMutate(todo.id)}></button>
            </div>
        </Li>
    );
});
export default TodoItem;

const Li = styled.li`
    font-size: 1.4rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        background-color: #eeeeee;
    }
    a {
        display: flex;
        align-items: center;
    }
`;

const Index = styled.div`
    width: 5rem;
    text-align: center;
`;

const Title = styled.h3`
    font-weight: 400;
`;
