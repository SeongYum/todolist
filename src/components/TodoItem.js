import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdCreate, MdClose } from 'react-icons/md';
import { useState } from "react";


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
      <Contents>
      <CheckCircle done={done} onClick={isChecked}>{done && <MdDone />}</CheckCircle>
      {edit === false ? ( <Text done={done}>{text}</Text> ): (<EditInput as = 'input' value={value} onChange={editInput} onKeyDown={enter}/>
      )}
      </Contents>
      <EditDeleteButton>
        <div className='edit'> {
          edit ? <div className="cencel" onClick={() => setEdit(false)}>
         <MdClose />
        </div>
          : <div className = "edit" onClick={editHandle}> <MdCreate /> </div>}
        </div>
        <Remove onClick={del}>
          <MdDelete />
        </Remove>
      </EditDeleteButton>
    </TodoItemBlock>
  );
}

export default TodoItem;
const Contents =styled.div`
display: flex;
`
const Remove = styled.div`
  display: flex;
  color: #D3D3D3;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;

const EditDeleteButton = styled.div`
  display: flex;
  .cencel{
  border: none;
  color: #D3D3D3;
  background-color: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  }
  .edit {
  border: none;
  color: #D3D3D3;
  background-color: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  }


`
const EditInput = styled.div`
  border-bottom: 1px solid #dee2e6;
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  font-size: 21px;
  button{
    
  }
`


const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  

`;

const CheckCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ced4da;
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