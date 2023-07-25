
import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../components/todoList";


export interface TodoStateInterface {
  todoSlice: {
    todoList: Task[];
  };
}

const initialState = {
   todoList: [] as Task[]
  };


const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList:(state, action) => {
      state.todoList = action.payload
    },
    addTask: (state, action) => {
    state.todoList.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleTask: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.todoList.findIndex((task) => task.id === taskId);
      const task = state.todoList[taskIndex];
      task.iscompleted= !task.iscompleted;
    },
  },
});

export const {actions} = todoSlice;
export default todoSlice.reducer;
