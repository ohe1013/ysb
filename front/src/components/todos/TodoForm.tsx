import React, { FC, memo } from "react";
import { FormContainer } from "../../styles/form";
import { TodoFormProp } from "../../types/todo";
import styled from "styled-components";

const TodoForm: FC<TodoFormProp> = memo(({ titleRef, contentRef, onCancelUpdate, onSubmitTodo }) => {
    return (
        <FormContainer onSubmit={onSubmitTodo}>
            <InputContainer>
                <Label />
            </InputContainer>
        </FormContainer>
    );
});
const Label = styled.label`
    display: inline-block;
`;
const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    * {
        align-items: center;
    }
`;

export default TodoForm;
