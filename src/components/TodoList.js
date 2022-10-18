import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin: 15px 0;
    font-weight: bold;
  }
`;

const TodoList = ({todos}) => {
    const todosDone = todos.filter((todo) => todo.done === false);
    return (
        <TodoListBlock>
          <div className="tasks-left">할 일 {todosDone.length}개 남음</div>
          {todos.map(todo => (
         <TodoItem
           todo={todo}
           key={todo.id}
           done={todo.done}
         />
         ))}
        </TodoListBlock>
      );
}

export default TodoList;