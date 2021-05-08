import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backend } from "../apis/backend";
import { setSnackBar } from "./snackBarSlice";

import NAMES from "../const/names";
import ACTIONS from "../const/actions";


// export const old_asyncGetTaskFolders = createAsyncThunk(
//   ACTIONS.TASK_FOLDERS_GET,
//   /**
//    *
//    * @returns data taskFolders that the user have
//    */
//   async (name=null, { rejectWithValue }) => {
//     try {
//       const response = await backend.get(NAMES.V1 + "task-folders/");
//       return response.data;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncGetTaskFolder unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// export const asyncCreateTaskFolder = createAsyncThunk(
//   ACTIONS.TASK_FOLDERS_CREATE,
//   /**
//    *
//    * @param {name:any, person:current_user} payload
//    * @returns object
//    */
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await backend.post(
//         NAMES.V1 + "task-folders/create/",
//         payload,
//       );
//       return response.data;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncCreateTaskFolder unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// export const asyncEditTaskFolder = createAsyncThunk(
//   ACTIONS.TASK_FOLDERS_EDIT,
//   /**
//    *
//    * @param {person:current_user.id, id:taskFolder.id, any:any} payload
//    * @returns object
//    */
//   async (payload, {rejectWithValue}) => {
//     try {
//       const response = await backend.patch(
//         NAMES.V1 + `task-folders/edit/${payload.id}/`,
//         payload,
//       );
//       return response.data;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncEditTaskFolder unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// export const asyncDeleteTaskFolder = createAsyncThunk(
//   "taskFolders/delete",
//   /**
//    *
//    * @param {taskFolder.id} id
//    * @returns object
//    */
//   async (id, {rejectWithValue}) => {
//     try {
//       await backend.delete(NAMES.V1 + `task-folders/delete/${id}/`);
//       return id;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncDeleteTaskFolder unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// This Function is not extraReducer
// export const asyncCreateTask = createAsyncThunk(
//   ACTIONS.TASKS_CREATE,
//   /**
//    *
//    * @param {name:any, person:current_user, taskFolder:ID} payload
//    * @returns object
//    */
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await backend.post(
//         NAMES.V1 + "tasks/create/",
//         payload,
//       );
//       return response.data;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncCreateTask unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// This Function is not extraReducer
// export const asyncEditTask = createAsyncThunk(
//   ACTIONS.TASKS_EDIT,
//   /**
//    *
//    * @param {name:any, person:current_user, taskFolder:ID} payload
//    * @returns object
//    */
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await backend.patch(
//         NAMES.V1 + `tasks/edit/${payload.id}/`,
//         payload,
//       );
//       return response.data;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncCreateEdit unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );

// export const asyncDeleteTask = createAsyncThunk(
//   ACTIONS.TASKS_DELETE,
//   /**
//    *
//    * @param {task} object
//    * @returns object
//    */
//   async (task, {rejectWithValue}) => {
//     try {
//       await backend.delete(NAMES.V1 + `tasks/delete/${task.id}/`);
//       return task;
//     } catch (e) {
//       if (!e.response) {
//         console.error("asyncDeleteTask unexpected error", e);
//         throw new Error(e);
//       }
//       const data = {
//         message: e.response.request.response,
//         status: e.response.status,
//       };
//       return rejectWithValue(data);
//     }
//   }
// );


const initialState = {
  taskFolders: [],
  currentTaskFolder: {},

  taskSections: [],
  tasks: [],
  subTasks: [],
  error: [
    {
      message:"",
      status:"",
    }
  ]
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskFolders(state, action){
      state.taskFolders = [...action.payload]
    },
    setCurrentTaskFolder(state, action){
      state.currentTaskFolder = {...action.payload}
    }
  },
  extraReducers: (builder) => {
// ======== START asyncGetTaskFolders ===========  
    // builder.addCase(asyncGetTaskFolders.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     taskFolders: [...action.payload],
    //   };
    // });
    // builder.addCase(asyncGetTaskFolders.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.error = {...action.payload}
    //   } else {
    //     console.error("Unexpected error from asyncGetTaskFolders", action.error.message)
    //   };
    // });
// ======== END asyncGetTaskFolders ===========  

// ======== START asyncCreateTaskFolder ===========  
    // builder.addCase(asyncCreateTaskFolder.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     taskFolders: [action.payload, ...state.taskFolders],
    //   };
    // });
    // builder.addCase(asyncCreateTaskFolder.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.error = {...action.payload}
    //   } else {
    //     console.error("Unexpected error from asyncCreateTaskFolder", action.error.message)
    //   };
    // });
// ======== END asyncCreateTaskFolder ===========  

// ======== START asyncEditTaskFolder ===========  
    // builder.addCase(asyncEditTaskFolder.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     taskFolders: state.taskFolders.map((folder) =>
    //       folder.id === action.payload.id ? action.payload : folder
    //     ),
    //   };
    // });
    // builder.addCase(asyncEditTaskFolder.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.error = {...action.payload}
    //   } else {
    //     console.error("Unexpected error from asyncEditTaskFolder", action.error.message)
    //   };
    // });
// ======== END asyncEditTaskFolder ===========  

// ======== START asyncDeleteTaskFolder ===========  
    // builder.addCase(asyncDeleteTaskFolder.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     taskFolders: state.taskFolders.filter(
    //       (folder) => folder.id !== action.payload
    //     ),
    //   };
    // });
    // builder.addCase(asyncDeleteTaskFolder.rejected, (state, action) => {
    //   if (action.payload) {
    //     state.error = {...action.payload}
    //   } else {
    //     console.error("Unexpected error from asyncDeleteTaskFolder", action.error.message)
    //   };
    // });
// ======== END asyncDeleteTaskFolder ===========  
    // builder.addCase(asyncCreateTask.fulfilled, (state, action) => {
    //   const task_folder = state.taskFolders.find(folder=>{
    //     return action.payload.taskFolder === folder.id;
    //   });
    //   task_folder.task_count++;
    // })
    // builder.addCase(asyncDeleteTask.fulfilled, (state, action) => {
    //   const task_folder = state.taskFolders.find(folder=>{
    //     return action.payload.taskFolder === folder.id;
    //   });
    //   task_folder.task_count--;
    // })
  },
});

export default taskSlice.reducer;
export const selectAll = (state) => state.task;
export const selectTaskFolders = (state) => state.task.taskFolders;
export const selectCurrentTaskFolder = (state) => state.task.currentTaskFolder;
export const selectTaskSections = (state) => state.task.taskSections;
export const selectTasks = (state) => state.task.tasks;
export const selectSubTasks = (state) => state.task.subTasks;
export const selectError = (state) => state.task.error;
export const { setTaskFolders, setCurrentTaskFolder, } = taskSlice.actions;


export const asyncGetTaskFolders = () => async dispatch => {
  try {
    const response = await backend.get(NAMES.V1 + "task-folders/");
    dispatch(setTaskFolders(response.data));
  } catch (e) {
    console.error(e)
    dispatch(
      setSnackBar({
        severity: "error",
        message: "Sorry couldn't get task folders.",
      })
    )
  }
}

export const asyncCreateTaskFolder = (payload, {success=null, failure=null}={}) => async dispatch => {
    try {
        const {data} = await backend.post(
        NAMES.V1 + "task-folders/create/",
        payload,
      );
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Created "${data.name}".` }));
      if(success){
        success();
      }
    } catch (e) {
      console.error(e)
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't create task folders.",
        })
      )
      if(failure){
        failure()
      }
    }
  }

export const asyncEditTaskFolder = (payload, {success=null, failure=null}={}) => async dispatch => {
    try {
      const {data} = await backend.patch(
        NAMES.V1 + `task-folders/edit/${payload.id}/`,
        payload,
      );
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Edited "${data.name}".` }));
      if(success){
        success();
      }
    } catch (e) {
      console.error(e)
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't edit task folders.",
        })
      )
      if(failure){
        failure()
      }
    }
}

export const asyncDeleteTaskFolder = (task_folder, {success=null, failure=null}={}) => async dispatch => {
    try {
      await backend.delete(NAMES.V1 + `task-folders/delete/${task_folder.id}/`);
      dispatch(asyncGetTaskFolders());
      dispatch(setSnackBar({ message: `Deleted "${task_folder.name}".` }));
      if(success){
        success();
      }
    } catch (e) {
      console.error(e)
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't delete task folders.",
        })
      )
      if(failure){
        failure()
      }
    }
}

export const asyncGetCurrentTaskFolder = (
  path,
  { success = null, failure = null }={}
) => async (dispatch) => {
  try {
    const response = await backend.get(NAMES.V1 + path);
    dispatch(setCurrentTaskFolder(response.data));
    if (success) {
      success();
    }
  } catch (e) {
    dispatch(
      setSnackBar({
        severity: "error",
        message: "Not found tasks that you find",
      })
    );
    if (failure) {
      failure();
    }
  }
};

export const asyncCreateTask = (payload, {success=null, failure=null}={}) => async dispatch => {
    try {
      await backend.post(
        NAMES.V1 + "tasks/create/",
        payload,
      );
      dispatch(setSnackBar({ message: `Created "${payload.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      console.error(e)
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't create a task.",
        })
      )
      if(failure){
        failure()
      }
    }
  }

export const asyncEditTask = (payload, {success=null, failure=null}={}) => async dispatch => {
      try {
        const response = await backend.patch(
          NAMES.V1 + `tasks/edit/${payload.id}/`,
          payload,
        );
        dispatch(setSnackBar({ message: `Edited "${payload.name}".` }));
      if (success) {
        success();
      }
      } catch (e) {
        console.error(e)
        dispatch(
          setSnackBar({
            severity: "error",
            message: "Sorry couldn't edit a task.",
          })
        )
        if(failure){
          failure()
        }
      }
    }

export const asyncDeleteTask = (task, {success=null, failure=null}={}) => async dispatch => {
    try {
      await backend.delete(NAMES.V1 + `tasks/delete/${task.id}/`);
      dispatch(setSnackBar({ message: `Deleted "${task.name}".` }));
      if (success) {
        success();
      }
    } catch (e) {
      console.error(e)
      dispatch(
        setSnackBar({
          severity: "error",
          message: "Sorry couldn't delete a task.",
        })
      )
      if(failure){
        failure()
      }
    }
  }