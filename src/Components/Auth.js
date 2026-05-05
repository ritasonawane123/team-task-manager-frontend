import React from "react";

function Auth({ setName, setEmail, setPassword, signup, login }) {
  return (
    <div>
      <h3>Authentication</h3>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={signup}>Signup</button>

      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Auth;