import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {Location, History } from 'history';
import { ProtectedRoute } from '../routes/protected-route';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import { ModalIngredient } from '../burger-ingredients/modal-ingredient';
import {RedirectAuthRoute} from '../routes/redirect-auth-route';
import {
  MainPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  PageNotFound,
} from '../../pages/index';


interface LocationState {
  modal: boolean,
  prevPath: Location
};

const App: React.FC = () => {
  const history = useHistory<History>();
  const location = useLocation<LocationState>();
  const action = history.action === 'PUSH' || history.action === 'REPLACE';
  const isModal = action && location.state && location.state.modal;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.app}>
        <AppHeader />
        <Switch location={isModal ? location.state.prevPath : location}>
          <Route path="/" component={MainPage} exact={true} />
          <Route path="/register" exact={true} component={RegistrationPage} />
          <Route path="/login" exact={true} component={LoginPage} />
          <Route path="/reset" exact={true} component={ResetPasswordPage} />
          <Route
            path="/ingredient/:id"
            exact={true}
            component={IngredientDetails}
          />
          <RedirectAuthRoute
            path="/forgot-password"
            exact={true}
            component={ForgotPasswordPage}
            redirect="/profile"
          />
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route component={PageNotFound} />
        </Switch>
        {isModal && (
          <Route exact path="/ingredient/:id" component={ModalIngredient} />
        )}
      </div>
    </DndProvider>
  );
}
export default App;
