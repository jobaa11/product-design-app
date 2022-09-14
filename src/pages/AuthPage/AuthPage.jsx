import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section>
      <button className='sign-up' onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Log In' : 'Sign Up'}
      </button>
      {showLogin ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </section>
  );
}
