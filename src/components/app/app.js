import style from './app.module.css';
import AppHeader from '../app-Header/app-Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route,  useHistory, useLocation, useParams } from 'react-router-dom';
import {ProtectedRoute} from '../protected-route'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
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
    let location = useLocation();
    const isModal = (
      location.state &&
      location.state.modal &&
      location.state.prevPath != location
    )
    const history = useHistory();

  const handleClick = () =>{
    history.goBack();
  }

    console.log(isModal)
    return (
      <DndProvider backend={HTML5Backend}>
        <div className={style.app}>
          <AppHeader />
            <Switch location={isModal ? location.state.prevPath : location}>
              <Route path="/" component={MainPage} exact={true}/>
              <Route path="/register" exact={true} component={RegistrationPage}/>
              <Route path="/login" exact={true} component={LoginPage}/>
              <Route path="/forgot-password" exact={true} component={ForgotPasswordPage}/>
              <Route path="/reset" exact={true} component={ResetPasswordPage}/>
              <Route path="/modal/:id" exact={true} component={IngredientDetails}/>
              <ProtectedRoute path="/profile" exact={true}>
                <ProfilePage/>
              </ProtectedRoute>
              <ProtectedRoute path="/profile/test" exact={true}>
                <Test/>
              </ProtectedRoute>
            </Switch> 
            {isModal
              ? <Route exact path="/modal/:id"  children={<Modal
                isOpen={true} 
                onClick={handleClick} 
                title={"Детали ингридиента"}
                onCloseClick={handleClick}
              >
                <IngredientDetails/>
              </Modal>} />
              :
              null
            }
        </div>
      </DndProvider>
    );
}
export default App;
