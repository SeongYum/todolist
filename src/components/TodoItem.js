import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate } from 'react-icons/md';
import { useState } from "react";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const Edit = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
`
const EditInput = styled.div`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  outline: none;
  font-size: 18px;
  display: none;
`
const EditBotton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  overflow: scroll;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;

`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${EditInput} {
      display: initial;
    }
    ${EditBotton} {
      display: initial;
    }
    ${Remove} {
      display: initial;
    }
  }

`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({todo}) {
    const {id, text, done} = todo;
    const [edit,setEdit] = useState(false);
    const [value, setValue] = useState(text)

    const del = ()=>{
        if(window.confirm('삭제 하시겠습니까?'))
        fetch(`http://localhost:3001/Todos/${id}`,{
            method: "DELETE",
        })
        .then(()=>{
            window.location.href = 'http://localhost:3000/Todos';
        })
        .catch((error) => {
            console.log('Error', error)
        })
    }
    const isChecked = () => {
        fetch(`http://localhost:3001/Todos/${id}`,{
            method: "PATCH",
            headers: {"Content-Type" : "Application/json"},
            body: JSON.stringify({
                done : !done
            })
        })
        .then(()=>{
            window.location.href = 'http://localhost:3000/Todos';
        })
        .catch((error)=>{
            console.error('Error', error)
        })
    }

    const editHandle = () => {
        setEdit(!edit)
    }

    const editInput = (e) => {
        setValue(e.target.value)
    }

    const enter = (e) => {
        if(e.key === 'Enter'){
            fetch(`http://localhost:3001/Todos/${id}`,{
                method: "PATCH",
                headers: {"Content-Type" : "Application/json"},
                body: JSON.stringify({
                    text : value
                })
            })
            .then(()=>{
                window.location.href = 'http://localhost:3000/Todos';
            })
            .catch((error)=>{
                console.error('Error', error)
            })
        }
    }
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={isChecked}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Edit> {
        edit ? <EditInput as = 'input' value={value} onChange={editInput} onKeyDown={enter}/>
        : <EditBotton> <MdCreate className = "edit" onClick={editHandle}/> </EditBotton>}
      </Edit>
      <Remove onClick={del}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;