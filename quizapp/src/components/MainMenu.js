import "../App.css";
import { useContext, useState ,useEffect} from "react";
import { GameStateContext } from "../helpers/Contexts";

function Menu() {
  const { gameState, setGameState, userName, setUserName } = useContext(
    GameStateContext
  );
  const initialValues = { username: "", email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    var usernameRegex = /^[a-zA-Z\- ]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    else if (!usernameRegex.test(values.username)) {
      errors.username = "This is not a valid  username!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };
  return (
      
      <div className="Menu">
         {Object.keys(formErrors).length === 0 && isSubmit ? (
        setGameState("playing")
      ) : (
        <pre></pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Login to start Quiz</h1>
            {/* <label>Username</label> */}
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={formValues.username}
              onChange={handleChange}
            />
          <p>{formErrors.username}</p>
            {/* <label>Email</label> */}
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              value={formValues.email}
              onChange={handleChange}
            />
          <p>{formErrors.email}</p>
          <button className="btn btn-light" >start Quiz</button>
      </form>
      </div> 
  );
}

export default Menu;