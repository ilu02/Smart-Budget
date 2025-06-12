import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate credentials here...
    localStorage.setItem('loggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Login</h2>
      {/* your login form */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

