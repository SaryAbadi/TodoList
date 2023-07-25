import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../features/todoSlice";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TODO } from "../services/apiService";

function AddTodo() {
  const dispatch = useDispatch();
  const [addTask, { data }] = useMutation(ADD_TODO);
  const [newTask, setnewTask] = useState("");

  const add = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newTask);

    if (newTask) {
      addTask({ variables: { name: newTask } });
      setnewTask("");
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(actions.addTask(data.addTask));
    }
  }, [data, dispatch]);

  return (
    <form onSubmit={add}>
      <Grid container sx={{justifyItem: "space-between"}}>
        <Grid>
          <TextField
            required
            value={newTask}
            onChange={(e) => setnewTask(e.target.value)}
            placeholder="Add task..."
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained">
            ADD TODO
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddTodo;
