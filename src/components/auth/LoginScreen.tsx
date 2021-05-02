import React from "react";
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hook/useForm';

import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [LoginValues, handleInputChange] = useForm({
    lEmail: 'jose7@gmail.com',
    lPassword: '123456'
  });
  const { lEmail, lPassword}:any = LoginValues;
  
  const handlelogin = (event:any) => {
    event.preventDefault();  
    dispatch(startLogin(lEmail, lPassword));
  }
  
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handlelogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
