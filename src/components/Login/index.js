import "./Login.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

import { SignUp } from "./SignUp";
import { useInput } from "../../utils/UseInput";
import { selectProfileError } from "../../store/profile/selector";
import { loginWithFB, signUpWithFB } from "../../store/profile/actions";

export const Login = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const error = useSelector(selectProfileError);

  const inputRef = useRef(null);

  const { value: email, handleChange: handleChangeEmail } = useInput("");
  const { value: password, handleChange: handleChangePassword } = useInput("");

  const [errorName, setErrorName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e, name, dateBirth, gender) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    if (isSignUp) {
      if (!name) {
        setErrorName(true);
        return;
      } else {
        setErrorName(false);
      }
      dispatch(signUpWithFB(email, password, name, dateBirth, gender));
    } else {
      dispatch(loginWithFB(email, password));
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isSignUp]);

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
            inputRef={inputRef}
            required
            error={error}
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
              error={error}
            />
          </FormControl>
          {isSignUp ? (
            <SignUp
              onSubmit={handleSubmit}
              txtButton="SIGN UP"
              errorName={errorName}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
            >
              LOG IN
            </Button>
          )}
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
