import React, { useEffect, useState } from "react";
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/Todos')
    .then(res => {
      if(!res.ok){
        throw Error('찾을 수 없음')
      }
      return res.json();
    })
    .then(data => {
      setTodos(data);
    })
    .catch(err => {
      throw Error('error')
    })
  },[])
  
  return (
       <TodoTemplate>
         <GlobalStyle />
         <TodoHead />
         <TodoList todos={todos}/>
       </TodoTemplate>
  
  );
}

export default App;