import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {Location, History } from 'history';
import { ProtectedRoute } from '../routes/protected-route';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import { FeedOrderDetails } from '../orders-feed/feed-orders-detalis/feed-order-details';
import { ModalIngredient } from '../burger-ingredients/modal-ingredient';
import { ModalOrderFeed } from '../orders-feed/modal-feed-order';
import {RedirectAuthRoute} from '../routes/redirect-auth-route';
import {
  MainPage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  PageNotFound,
  FeedPage
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
  console.log(isModal)
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.app}>
        <AppHeader />
        <Switch location={isModal ? location.state.prevPath : location}>
          <Route path="/" component={MainPage} exact={true} />
          <Route path="/register" exact={true} component={RegistrationPage} />
          <Route path="/login" exact={true} component={LoginPage} />
          <Route path="/reset" exact={true} component={ResetPasswordPage} />
          <Route path="/feed" exact={true} component={FeedPage} />
          <Route
            path="/ingredient/:id"
            exact={true}
            component={IngredientDetails}
          />
          <Route
            path="/feed/:id"
            exact={true}
            component={FeedOrderDetails}
          />
          <Route  path="/feed/:id">
            <FeedOrderDetails isModal={isModal}/>
          </Route>

          <ProtectedRoute path="/profile/order/:id" exact={true}>
            <FeedOrderDetails />
          </ProtectedRoute>

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
        {isModal && (
          <Route exact path="/feed/:id" component={ModalOrderFeed} />
        )}
        {isModal && (
          <Route exact path="/profile/order/:id" component={ModalOrderFeed} />
        )}
      </div>
    </DndProvider>
  );
}
export default App;
