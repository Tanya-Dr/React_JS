import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useInput } from "../../utils/UseInput";

export const SignUp = ({
  defaultName,
  readOnlyValue = false,
  defaultDate,
  defaultGender = "female",
  onSubmit,
  txtButton,
  profilePage,
  errorName = false,
}) => {
  const { value: gender, handleChange: handleChangeGender } =
    useInput(defaultGender);

  const { value: name, handleChange: handleChangeName } = useInput(defaultName);
  const { value: dateBirth, handleChange: handleChangeDateBirth } =
    useInput(defaultDate);

  const handleSubmit = (e) => {
    onSubmit(e, name, dateBirth, gender);
  };

  return (
    <>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleChangeName}
        disabled={readOnlyValue}
        error={errorName}
      />
      <TextField
        id="date"
        label="Birthday"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={dateBirth}
        onChange={handleChangeDateBirth}
        disabled={readOnlyValue}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={gender}
          onChange={handleChangeGender}
          row
        >
          <FormControlLabel
            value="female"
            control={<Radio disabled={readOnlyValue} color="primary" />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio disabled={readOnlyValue} color="primary" />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<Radio disabled={readOnlyValue} color="primary" />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
      {profilePage && readOnlyValue ? (
        <></>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="submit"
          endIcon={profilePage && <SaveIcon />}
        >
          {txtButton}
        </Button>
      )}
      {errorName && (
        <span className="login_signup__error">Enter your name</span>
      )}
    </>
  );
};
