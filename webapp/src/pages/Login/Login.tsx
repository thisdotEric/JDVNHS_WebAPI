import React, { FC } from 'react';
import './Login.scss';
import { wave, user, SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const Login: FC<LoginProps> = ({}: LoginProps) => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <img className="wave" src={wave} />

      <div className="container">
        <div className="img">
          <img src={SchoolLogo} />
        </div>
        <div className="login-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              navigate('/students');
            }}
          >
            <img src={user} />
            <h2 className="title"> Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input type="text" className="input" name="user_id" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input type="password" className="input" name="password" />
              </div>
            </div>
            <input type="submit" className="btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
