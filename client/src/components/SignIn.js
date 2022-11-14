import { useState } from "react";
import useSignIn from "../hooks/useSignIn";

export default function SignIn () {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { signIn, isLoading, error } = useSignIn()

  async function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password)
  }

  return(
    <div className="sign-up">
        <h3 className="log-in">Log in</h3>
      <form id="sign-in-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="sign-up">
          Email
          <input 
          className="sign-up" 
          autoComplete="off"
          name="email"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="sign-up">
          Password
          <input 
          className="sign-up"
          autoComplete="off"
          name="password"
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>

      <button 
      disabled={isLoading}
      className="sign-up"
      type="submit"
      form="sign-in-form"
      >
        <span className="sign-in">Log In</span>
      </button>
      {
        error && <div className="error">{error}</div>
      }
    </div>

  )

}
