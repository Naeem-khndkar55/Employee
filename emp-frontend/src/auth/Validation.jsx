export default function Validation(values) {
  let errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Name should not be empty";
  } else {
    errors.name = "";
  }

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email should not be empty";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  } else {
    errors.email = "";
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = "Password should not be empty";
  } else {
    errors.password = "";
  }

  return errors;
}
