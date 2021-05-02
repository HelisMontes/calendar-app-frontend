import React from "react";
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hook/useForm';

import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginValues, handleInputChange] = useForm({
    lEmail: 'jose7@gmail.com',
    lPassword: '123456'
  });
  const { lEmail, lPassword}:any = loginValues;
  
  const handlelogin = (event:any) => {
    event.preventDefault();  
    dispatch(startLogin(lEmail, lPassword));
  }
  
  const [registerValues, handleRegisterInputChange] = useForm({
    rName: 'Helis',
    rEmail: 'helismontes@gmail.com',
    rPassword: '123456',
    rPassword2: '123456'
  });
  const {rName, rEmail, rPassword, rPassword2}:any = registerValues;
  
  const handleRegister = (event:any) => {
    event.preventDefault();  
    if(rPassword !== rPassword2) return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
    dispatch(startRegister(rName, rEmail, rPassword));
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
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
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
