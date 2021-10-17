import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import MainPage from '../../pages/main/main-page';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registation/registration';
import {ForgotPasswordPage} from '../../pages/forgot-password/forgot-password';
import { ProfilePage } from '../../pages/profile/profile';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
              <Route path="/profile" exact={true} component={ProfilePage}/>
            </Switch> 
          </Router>
        </div>
      </DndProvider>
    );
}
export default App;
