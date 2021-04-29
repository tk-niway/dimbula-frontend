import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import history from "../history";
import firebase from "../apis/firebase";
import { backend } from "../apis/backend";

import GuestRoute from "./layouts/GuestRoute";
import AuthRoute from "./layouts/AuthRoute";
import SnackBar from "./layouts/SnackBar";
import AlertDialog from "./layouts/AlertDialog";
import ProgressCircle from "./layouts/ProgressCircle";
import TaskFolderDialog from "./task/modals/TaskFolderDialog";

import Header from "./layouts/Header";
import LeftDrawer from "./layouts/LeftDrawer";
import SignIn from "./sign/SignIn";
import SignUp from "./sign/SignUp";
import SignOut from "./sign/SignOut";
import ResendEmail from "./sign/ResendEmail";
import ForgetPw from "./sign/ForgetPw";
import Task from "./task/Task";
import Settings from "./settings/Settings";
import SettingsHeader from "./settings/layouts/Header";

import PATHS from "../const/paths";
import NAMES from "../const/names";

import { signIn, signOut } from "../slices/userSlice";
import {
  openProgressCircle,
  closeProgressCircle,
} from "../slices/progressCircleSlice";

const App = () => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    dispatch(openProgressCircle());
    let isMounted = true;   // the flag is prevented to leak memory
    const getStatus = async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          if (user.emailVerified) {   // Confirm the account is valid with dimbula backend
            const token = await firebase.auth().currentUser.getIdToken(true);
            localStorage.setItem(NAMES.STORAGE_TOKEN, token);
            localStorage.setItem(NAMES.STORAGE_REFRESH_TOKEN, user.refreshToken);
            await backend(NAMES.V1 + "persons/")
              .then(({ data }) => {
                dispatch(signIn(
                  {
                    id:data.id,
                    name:data.name,
                    email:data.email,
                    photo:data.photo,
                  }
                ));
              })
              .catch(() => {
                dispatch(signOut());
              });
          } else {
            dispatch(signOut());
          }
        } else {
          dispatch(signOut());
        }
        if (isMounted) {
          dispatch(closeProgressCircle());
          setIsChecking(false);
        }
      });
    };
    getStatus();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const MainLayout = () => (
    <React.Fragment>
      <Header />
      <LeftDrawer>
        <Switch>
          <Route exact path={PATHS.HOME} component={Task} />
        </Switch>
      </LeftDrawer>
      <TaskFolderDialog />
    </React.Fragment>
  );

  const SettingsLayout = () => (
    <React.Fragment>
      <SettingsHeader />
      <Switch>
        <Route exact path={PATHS.SETTINGS} component={Settings} />
      </Switch>
    </React.Fragment>
  )

  const render = () => {
    if (isChecking) {
      return false;
    }
    return (
      <Switch>
        <AuthRoute exact path={PATHS.HOME} component={MainLayout} />
        <AuthRoute exact path={PATHS.SETTINGS} component={SettingsLayout} />
        <AuthRoute exact path={PATHS.SIGN_OUT} component={SignOut} />
        <GuestRoute exact path={PATHS.SIGN_IN} component={SignIn} />
        <GuestRoute exact path={PATHS.SIGN_UP} component={SignUp} />
        <GuestRoute exact path={PATHS.RESEND_EMAIL} component={ResendEmail} />
        <GuestRoute exact path={PATHS.FORGET_PASSWORD} component={ForgetPw} />
      </Switch>
    );
  };

  return (
    <Router history={history}>
      {render()}
      <SnackBar />
      <AlertDialog />
      <ProgressCircle />
    </Router>
  );
};
export default App;
