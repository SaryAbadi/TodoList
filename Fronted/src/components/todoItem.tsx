import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { actions } from "../features/todoSlice";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK, TOGGLE_TASK } from "../services/apiService";
import { TaskProps } from "./todoList";

function TodoItem(props: TaskProps) {
  const dispatch = useDispatch();
  const [deleteTask] = useMutation(DELETE_TASK);
  const [toggleTask] = useMutation(TOGGLE_TASK);
  const { task } = props;


  const handleToggle = () => {
    toggleTask({ variables: { id: task.id } });
    dispatch(actions.toggleTask(task.id));
  };

  const deleteTodo = () => {
    if( window.confirm("Are you sure?")){
    deleteTask({ variables: { id: task.id } });
    dispatch(actions.deleteTask(task.id));
 } };

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={deleteTodo} edge="end">
          <DeleteIcon style={{ color: "red" }} />
        </IconButton>
      }
    >
      <Checkbox onClick={handleToggle} edge="start" checked={task.iscompleted} />
      <ListItemText
        primary={task.name}
        style={{
          fontStyle: task.iscompleted ? "italic" : "normal",
          textDecorationLine: task.iscompleted ? "line-through" : "none",
          color: task.iscompleted ? "gray" : "black",
        }}
      />
    </ListItem>
  );
}

export default TodoItem;
