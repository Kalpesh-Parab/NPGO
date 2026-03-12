import './login.scss';
import { useState, useMemo } from 'react';
import { loginAdmin } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import leaf from '../../../assets/backend/leaf.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [explode, setExplode] = useState(false);

  const navigate = useNavigate();

  // generate random leaves once
  const leaves = useMemo(() => {
    return Array.from({ length: 300 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotate: Math.random() * 360,
      size: 60 + Math.random() * 80,
      moveX: Math.random() * 1200 - 600,
      moveY: Math.random() * 800 - 400,
    }));
  }, []);

  const handleLogin = async () => {
    try {
      const data = await loginAdmin({ email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));

      toast.success(`Welcome ${data.admin.name}`);

      // trigger leaf animation
      setExplode(true);

      // navigate after animation
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className='Login'>
      <div className='leaf-container'>
        {leaves.map((leafData, i) => (
          <img
            key={i}
            src={leaf}
            className={`leaf ${explode ? 'explode' : ''}`}
            style={{
              top: `${leafData.top}%`,
              left: `${leafData.left}%`,
              width: `${leafData.size}px`,
              transform: explode
                ? `translate(${leafData.moveX}px, ${leafData.moveY}px) rotate(${leafData.rotate + 360}deg)`
                : `rotate(${leafData.rotate}deg)`,
            }}
          />
        ))}
      </div>

      <div className='form'>
        <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
