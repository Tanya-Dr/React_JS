import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useInput } from "../../utils/UseInput";

export const SignUp = () => {
  const { value: gender, handleChange: handleChangeGender } =
    useInput("female");

  const { value: name, handleChange: handleChangeName } = useInput("");

  return (
    <>
      <TextField
        // id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleChangeName}
        required
      />
      <TextField
        id="date"
        label="Birthday"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
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
            control={<Radio color="primary" />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
