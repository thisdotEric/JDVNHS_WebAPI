import React, { FC, useContext, useEffect, useReducer } from 'react';
import './Login.scss';
import { wave, user as userImage, SchoolLogo } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../utils';
import { UserContext, User } from '../../context';

interface LoginProps {}

interface LoginAction {
  type: 'user_id' | 'password';
  payload: string;
}

function loginReducer(state: UserCredentials, action: LoginAction) {
  switch (action.type) {
    case 'user_id':
      return { ...state, user_id: action.payload };

    case 'password':
      return { ...state, password: action.payload };

    default:
      return state;
  }
}

interface UserCredentials {
  user_id: string;
  password: string;
}

const Login: FC<LoginProps> = ({}: LoginProps) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [userCredentials, dispatch] = useReducer(loginReducer, {
    user_id: '',
    password: '',
  });

  useEffect(() => {
    axios.get<User>('/api/auth/me').then(({ data }) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="login">
      <img className="wave" src={wave} />

      <div className="container">
        <div className="img">
          <img src={SchoolLogo} />
        </div>
        <div className="login-content">
          <form
            onSubmit={async e => {
              e.preventDefault();

              const result = await axios.post(
                '/api/auth/login',
                userCredentials,
              );
              if (result.status === 200) navigate('/t/students');
            }}
          >
            <img src={userImage} />
            <h2 className="title"> Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  name="user_id"
                  value={userCredentials.user_id}
                  onChange={e => {
                    dispatch({
                      type: 'user_id',
                      payload: e.currentTarget.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={userCredentials.password}
                  onChange={e => {
                    dispatch({
                      type: 'password',
                      payload: e.currentTarget.value,
                    });
                  }}
                />
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
