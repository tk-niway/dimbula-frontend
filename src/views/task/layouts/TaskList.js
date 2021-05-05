import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography, List, Container } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import history from "../../../history";
import TaskCard from "./TaskCard";
import DeleteDialog from "../modals/DeleteDialog";
import TaskDialog from "../modals/TaskDialog";
import {
  selectTaskFolders,
  asyncDeleteTaskFolder,
  asyncCreateTask,
} from "../../../slices/taskSlice";
import { openTaskFolderDialog } from "../../../slices/taskFolderDialogSlice";
import { setSnackBar } from "../../../slices/snackBarSlice";

import PATHS from "../../../const/paths";
import NAMES from "../../../const/names";
import ACTIONS from "../../../const/actions";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TaskList = ({ taskFolder }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const task_folders = useSelector(selectTaskFolders);
  const [_tasks, set_Tasks] = useState([]);
  const [currentFolder, setCurrentFolder] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (task_folders.length > 0) {
      const folder = task_folders.filter((folder) => {
        return folder.id === taskFolder.id;
      })["0"];

      if (folder) {
        setCurrentFolder({ ...folder });
        set_Tasks([...taskFolder.tasks]);
      }
      if (!folder) {
        history.push(PATHS.HOME);
      }
    }
  }, [task_folders, taskFolder, dispatch]);

  const dispatchEdit = () => {
    dispatch(
      openTaskFolderDialog({
        action_type: ACTIONS.TASK_FOLDERS_EDIT,
        taskFolder_id: currentFolder.id,
        taskFolder_name: currentFolder.name,
      })
    );
  };

  /**
   *
   * @param {*name, memo, due_date, start_date, is_done, is_star, *person, *taskFolder} data
   * @param {CallBack Function for reset values of form} reset
   * @returns nothing
   */
  const dispatchCreate = async (data, reset) => {
    const response = await dispatch(asyncCreateTask(data));
    if (response.type === ACTIONS.TASKS_CREATE + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }
    if (response.type === ACTIONS.TASKS_CREATE + "/fulfilled") {
      dispatch(setSnackBar({ message: `Created "${response.payload.name}".` }));
      set_Tasks([{ ...response.payload }, ..._tasks]);
      setIsCreating(false);
      reset();
      return;
    }
  };

  const dispatchDelete = async () => {
    const response = await dispatch(asyncDeleteTaskFolder(currentFolder.id));
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/rejected") {
      dispatch(
        setSnackBar({
          severity: "error",
          message: response.payload.message,
        })
      );
      return;
    }
    if (response.type === ACTIONS.TASK_FOLDERS_DELETE + "/fulfilled") {
      dispatch(setSnackBar({ message: `Deleted "${currentFolder.name}".` }));
      history.push(PATHS.HOME);
      return;
    }
  };

  const editTaskList = (edited_task, action_type) => {
    let after_tasks;
    if(action_type === ACTIONS.TASKS_DELETE){
      after_tasks = _tasks.filter((task) => {
        return task.id !== edited_task.id;
      });
    };
    set_Tasks([...after_tasks]);
  };

  const renderTaskCard = () => {
    return _tasks.map((task) => {
      return (
        <TaskCard
          key={task.id}
          task={task}
          onEditTaskList={(edited_data, action_type) => {
            editTaskList(edited_data, action_type);
          }}
        />
      );
    });
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" alignItems="center">
        <Typography variant="h6" className={classes.title}>
          {currentFolder.name}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            dispatchEdit();
          }}
        >
          Rename
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setIsDeleting(true);
          }}
        >
          Delete
        </Button>
      </Box>

      <Box>
        <Button
          onClick={() => {
            setIsCreating(true);
          }}
          color="primary"
          startIcon={<AddIcon />}
        >
          Create A Task
        </Button>
      </Box>

      <Box>
        <List>{renderTaskCard()}</List>
      </Box>

      <DeleteDialog
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
        }}
        onDelete={() => {
          dispatchDelete();
        }}
        subtitle={`You are going to delete "${currentFolder.name}".`}
      />

      <TaskDialog
        isOpen={isCreating}
        title={"Create a new task."}
        action_type={ACTIONS.TASKS_CREATE}
        onClose={() => {
          setIsCreating(false);
        }}
        onCallback={(data, reset) => {
          dispatchCreate(data, reset);
        }}
        editTask={{
          taskFolder: currentFolder.id,
          person: localStorage.getItem(NAMES.STORAGE_UID),
        }}
      />
    </Container>
  );
};
export default TaskList;
