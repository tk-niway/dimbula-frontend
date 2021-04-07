import React,{useState, useEffect} from "react"
import { useHistory } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'
import { 
  Box,
  Container,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import { signStyle } from './userStyle'
import google_img from '../../img/google-icon-mini.svg'

import firebase from "firebase/app"
import "firebase/auth";


// Todo reject user if user confirm email to signup 
const SignIn = () => {
  const classes = useStyles()
  const history = useHistory()
  const [info, setInfo] = useState(
    {
      "email":"",
      "password":"",
      "save":false,
    }
  )

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push("/");
      }
    })
  },[history])

  const signInWithGoogle = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleAuthProvider)
  }

  const handleInputChange = (event)=>{
    if("save" === event.target.name){
      setInfo({...info, [event.target.name]:!info.save})
      return
    }
    setInfo({...info, [event.target.name]:event.target.value})
  }

  const submit = ()=>{
    firebase.auth().signInWithEmailAndPassword(
      info.email,
      info.password
    )
  }

  return(
    <React.Fragment>
      <Box my={4}>
        <h1 className={classes.title} >Dimbula</h1>
      </Box>

      <Container className={classes.signin_container} maxWidth="sm" >

        <Box my={3}>
          <h2 className={classes.sub_title}>Sign In</h2>
        </Box>

        <Box mb={4}>
          <Button 
            fullWidth
            variant="outlined"
            onClick={()=>{signInWithGoogle()}}
            className={classes.google_button}
            >
            <img 
              className={classes.google_logo}
              src={google_img}
              alt="Sign in with google"
            />
            Sign In With Google
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
                Sign In
              </Button>
            </Box>
        </Box>

        <Box>
          <FormControlLabel
            control={<Checkbox
                      color="primary"
                      name="save" 
                      onChange={handleInputChange}
                      checked={info.save}
                    />}
            label="Save login information"            
          />
        </Box>

        <Box my={3}>
          <Divider variant="middle" />
        </Box>
        
        <Box textAlign={"right"} mb={4}>
          <p>Forget your password?</p>
          <br/>
          <p>Don't have an account?<span>  Sign Up</span></p>
        </Box>

      </Container>
    </React.Fragment>
  )

}
export default SignIn


const useStyles = makeStyles((theme) => ({ ...signStyle }))