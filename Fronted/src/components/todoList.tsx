import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./todoItem";
import { Grid, Paper, styled } from "@mui/material";
import AddTodo from "./addTodo";
import { TodoStateInterface, actions } from "../features/todoSlice";
import { useQuery } from "@apollo/react-hooks";
import { GET_TASKS } from "../services/apiService";

export interface Task {
  name: string;
  id: number;
  iscompleted: boolean;
}

export interface TaskProps {
  task: Task;
}

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector(
    (state: TodoStateInterface) => state.todoSlice.todoList
  );

  const { data } = useQuery(GET_TASKS);

  useEffect(() => {
    if (data && todoList.length === 0){
      dispatch(actions.setTodoList(data.tasks));
  }}, [data, dispatch, todoList.length]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Grid container sx={{ justifyItem: "space-between" }}>
      {todoList && (
        <Grid item style={{ margin: "0 auto" }}>
          <h1>Todo List</h1>
          <Item>
            {todoList.map((t) => {
              return <TodoItem task={t} key={t.id} />;
            })}
            <AddTodo />
          </Item>
        </Grid>
      )}
    </Grid>
  );
}

export default TodoList;
