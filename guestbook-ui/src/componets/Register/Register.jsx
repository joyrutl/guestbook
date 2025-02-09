import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  console.log("Full Name:", fullName);
  console.log("Email:", email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email }),
    });

    if (response.ok) {
      console.log("User registered successfully");
      setMessage("success :)");
    } else {
      console.error("Error registering user");
      setMessage("failed to register :(");
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Welcome! 🤗</h1>

        <h2>Please Register.</h2>

        <form onSubmit={handleSubmit}>
        
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
     
          <br />
         
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    

          <br />

          <button type="submit" className="btn">
            SUBMIT
          </button>
        </form>

        {message && (
          <p className="msg"
            style={{
              color: message === "failed to register :(" ? "red" : "green",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
