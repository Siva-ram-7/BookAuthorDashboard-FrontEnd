import React, { useState } from "react";
import "./login.css";
import { loginReq } from "../../Api";
import { replace, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [load ,setLoad] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function reqHandler(params) {
    setErr("");
    if (form.email == "") {
      return setErr("Please enter email");
    } else if (form.password == "") {
      return setErr("Please enter password");
    }

    try {
        setLoad(true)
      const response = await loginReq(form);


if (response?.message === "login successfully") {
      return navigate("/", { replace: true });
    
}
      setErr(response)

        setLoad(false)


    } catch (error) {
      console.log(error);
      console.log(error.message);
      setErr(error.message)

        setLoad(false)

    }
  }

  console.log(err);
  
  return (
    <div className="loginContainer">
      <div className="login-hold">
        <section>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            placeholder="Enter a Email"
            onChange={(e) => handleChange(e)}
          />
        </section>
        <section>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={form.password}
            placeholder="Enter a Password"
            onChange={(e) => handleChange(e)}
          />
        </section>
        <div className="errMsg">{err}</div>
        <section>
          <button onClick={reqHandler}>Login</button>
          <button>Cancel</button>
        </section>
      </div>

{    load&& <div className="loader-hold">
         <div className="loader"></div>
         <div className="load-msg">
            Please wait ..
         </div>
     </div>}

    </div>
  );
};

export default Login;
