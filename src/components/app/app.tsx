import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ProtectedRoute} from '../protected-route'
import { 
  MainPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  Test
} from '../../pages/index';

  function App() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={style.app}>
          <Router>
          <AppHeader />
            <Switch>
              <Route path="/" component={MainPage} exact={true}/>
              <Route path="/register" exact={true} component={RegistrationPage}/>
              <Route path="/login" exact={true} component={LoginPage}/>
              <Route path="/forgot-password" exact={true} component={ForgotPasswordPage}/>
              <Route path="/reset" exact={true} component={ResetPasswordPage}/>
              <ProtectedRoute path="/profile" exact={true}>
                <ProfilePage/>
              </ProtectedRoute>
              <ProtectedRoute path="/profile/test" exact={true}>
                <Test/>
              </ProtectedRoute>
            </Switch> 
          </Router>
        </div>
      </DndProvider>
    );
}
export default App;
