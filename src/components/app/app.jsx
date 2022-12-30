import React, {useCallback, useEffect} from 'react';
import AppHeader from './../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {IngredientsContext} from "../../utils/appContext";
import {ingredientsArrayType} from "../../utils/types";
import PropTypes from "prop-types";

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ForgotPasswordPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage} from "../../pages";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
import {useDispatch} from "react-redux";
import {getUserThunk} from "../../services/actions/auth";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {HIDE_INGREDIENT_DETAILS} from "../../services/actions/ingredient-details";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk())
  }, [dispatch]);

  return (
      <div className={styles.app}>
        <Router>
          <AppHeader/>
          <main className={styles.main}>
            <Switch>
              <ProtectedRoute onlyForAuth={false} path="/login" exact={true}>
                <LoginPage/>
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} path="/register" exact={true}>
                <RegisterPage/>
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} path="/forgot-password" exact={true}>
                <ForgotPasswordPage/>
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} path="/reset-password" exact={true}>
                <ResetPasswordPage/>
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={true} path="/profile" exact={true}>
                <ProfilePage/>
              </ProtectedRoute>
              <ProtectedRoute path="/profile/orders" exact={true}>
                <ProfilePage/>
              </ProtectedRoute>
              <ModalSwitch />
            </Switch>
          </main>
        </Router>
      </div>
  );
};

const ModalSwitch = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const closeIngredientModal = useCallback(() => {
    dispatch({
      type: HIDE_INGREDIENT_DETAILS
    });
    history.goBack();
  }, [history, dispatch]);

  return (
      <>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </Route>
          <Route path="/ingredients/:id">
            <IngredientDetails/>
          </Route>
        </Switch>
        {background &&
            <Route path="/ingredients/:id">
              <Modal handleClose={closeIngredientModal} title={'Детали ингредиента'}>
                <IngredientDetails/>
              </Modal>
            </Route>
        }
      </>
  )
}


IngredientsContext.Provider.propTypes = {
  value: PropTypes.shape({
    ...ingredientsArrayType
  })
}

export default App;
