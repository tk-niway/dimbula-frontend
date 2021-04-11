import React,{ useState } from "react"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Container,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import google_img from '../../img/google-icon-mini.svg'
import { signStyle } from './userStyle'

import firebase from "firebase/app"
import "firebase/auth";

import { ForgetPwLink, SignInLink, ResendMailLink } from '../layouts/link-texts/SignLinks'


const SignUp = () => {
  const classes = useStyles()
  const [info, setInfo] = useState(
    {
      email:"",
      password:"",
    }
  )

  const signUpWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
  }

  const handleInputChange = (event) => {
    setInfo({...info, [event.target.name]:event.target.value})
  }

  const submit = async () => {
    await firebase.auth().createUserWithEmailAndPassword(
      info.email,
      info.password
    ).then(({user})=>{
      user.sendEmailVerification()
      // Todo : display pop-up that notice confirm email
    }).catch(e=>{
      console.warn(e)
      // Todo : display pop-up that notice error
    })
  }


  return(
    <React.Fragment>
      <Box my={4}>
        <h1 className={classes.title} >Dimbula</h1>
      </Box>

      <Container className={classes.signin_container} maxWidth="sm" >

        <Box my={3}>
          <h2 className={classes.sub_title}>Sign Up</h2>
        </Box>

        <Box mb={4}>
          <Button 
            fullWidth
            variant="outlined"
            onClick={()=>{signUpWithGoogle()}}
            className={classes.google_button}
            >
            <img 
              className={classes.google_logo}
              src={google_img}
              alt="Sign in with google"
            />
            Sign Up With Google
          </Button>
        </Box>

        <Box mb={4} display="flex" alignItems="center">
          <div className={classes.border}></div>
          <span>OR</span>
          <div className={classes.border}></div>
        </Box>

        <Box className={classes.signin_form} autoComplete="off">
            <TextField
              required
              fullWidth
              name="email"
              label="Mail Address"
              variant="outlined"
              margin="none"
              defaultValue={info.email}
              onChange={handleInputChange}
              />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              variant="outlined"
              margin="normal"
              value={info.password}
              onChange={handleInputChange}
            />
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
                >
                Sign Up
              </Button>
            </Box>
        </Box>

        <Box my={3}>
          <Divider variant="middle" />
        </Box>
        
        <Box textAlign={"right"} mb={4}>
          <SignInLink component="p" underline="always" />
          <br/>
          <ResendMailLink component="p" underline="always" />
          <br/>
          <ForgetPwLink component="p" underline="always" />
        </Box>

      </Container>
    </React.Fragment>
  )
}
export default SignUp


const useStyles = makeStyles((theme) => ({ ...signStyle }))
// Example it could change style that is scope in this component.
// put syntax google_logo:{...signStyle.google_logo, width:"32px"} in argument
