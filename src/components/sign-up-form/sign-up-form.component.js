import { useState } from "react";
import {
  auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // confirm password matches
    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        await createUserDocumentFromAuth(user, {
          displayName,
        });
        resetFormFields();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("email already exist");
        }
        console.log("error:", error);
      }
    } else {
      alert("password do not match");
    }
    // user is authenticated
    // create user document
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div>
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />
        <label>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
