import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import {CalendarScreen} from '../calendar/CalendarScreen'
import {LoginScreen} from '../auth/LoginScreen'
import { startChecking } from '../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { State } from '../../ts/interfaces-type';

export const AppRouter = () => {
  const dispatch = useDispatch()
  const {checking, uid} = useSelector((state: State) => state.auth)
  
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  
  if (checking) return (<h5> Espere.....</h5>);

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute 
            exact 
            path="/login" 
            component={LoginScreen}
            isLoggedIn = {!! uid}
          />
          <PrivateRoute 
            exact
            path="/"
            component = {CalendarScreen}
            isLoggedIn = {!! uid}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}