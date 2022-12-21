import React from "react";
import styled from "styled-components";
import { MdAdd } from 'react-icons/md';
import { useState } from "react";


function TodoCreate() {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onSubmit = () => {
      console.log(value)
      fetch('http://localhost:3001/Todos',{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        text: value,
        done : false
      })
    })
    .catch((error)=>{
      console.error('Error',error)
    })
  }
  
   return (
     <InsertFormPositioner>
       <InsertForm onSubmit={onSubmit}>
         <TextInput
           type="text"
           name="text"
           placeholder="입력하세요"
           value={value}
           onChange={onChange}
           />
         <AddButton type="submit">
          <MdAdd />
         </AddButton>
       </InsertForm>
     </InsertFormPositioner>
   );
}

export default TodoCreate;

const AddButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 1;
  cursor: pointer;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20%;
  right: 5px;
  margin: auto 0;
  `
const InsertFormPositioner = styled.div`
  padding-top: 20px
`

const InsertForm = styled.form`
 position: relative;
`;

const TextInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 95%;
  outline: none;
  font-size: 18px;
`;