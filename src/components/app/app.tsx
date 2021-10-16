import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import MainPage from '../../pages/main/main-page';
import { SignInPage } from '../../pages/sign-in/sign-in';
import { RegistrationPage } from '../../pages/registation/registration';
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
              <Route path="/signin" exact={true} component={SignInPage}/>
            </Switch> 
          </Router>
        </div>
      </DndProvider>
    );
}
export default App;
