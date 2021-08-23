import "./Login.css";
import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useInput } from "../../utils/UseInput";
import { Link } from "react-router-dom";
import { SignUp } from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileError } from "../../store/profile/selector";
import { loginWithFB, signUpWithFB } from "../../store/profile/actions";

export const Login = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectProfileError);

  const {
    value: email,
    handleChange: handleChangeEmail,
    reset: resetEmail,
  } = useInput("");

  const {
    value: password,
    handleChange: handleChangePassword,
    reset: resetPassword,
  } = useInput("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    if (isSignUp) {
      dispatch(signUpWithFB(email, password));
    } else {
      dispatch(loginWithFB(email, password));
    }
  };

  if (error) {
    resetEmail();
    resetPassword();
  }

  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="App_openedChat__header">
          {isSignUp ? "SIGN UP" : "LOGIN"}
        </h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <h2>
            {isSignUp
              ? "Fill in the form below to register new account"
              : "Enter your email and password to log in"}
          </h2>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
              fullWidth
            />
          </FormControl>
          {isSignUp && <SignUp />}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            type="submit"
          >
            {isSignUp ? "SIGN UP" : "LOG IN"}
          </Button>
          {error && <span className="login_signup__error">{error}</span>}
        </form>
        <div className="login__link">
          <Link to={`${isSignUp ? "/login" : "/signup"}`}>
            {!isSignUp ? "Create a New Account" : "LOG IN"}
          </Link>
        </div>
      </div>
    </div>
  );
};
