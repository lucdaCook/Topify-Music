import { useState } from "react";
import useSignup from '../hooks/useSignup'

export default function Signup () {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password)
  }

  return(
    <div className="sign-up">
        <h3>Create an account</h3>
      <form id="sign-up-form" onSubmit={handleSubmit}>
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
      className="sign-up"
      type="submit"
      form="sign-up-form"
      disabled={isLoading}
      >
        <span className="sign-up">Sign up</span>
      </button>
      { 
        error && <div className="error">{error}</div>
      }
    </div>

  )

}
