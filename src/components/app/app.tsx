import React, {useCallback, useEffect} from 'react';
import AppHeader from './../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
	ForgotPasswordPage,
	LoginPage,
	ProfilePage,
	RegisterPage,
	ResetPasswordPage,
	FeedPage,
	ProfileOrdersPage
} from "../../pages";
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
import {useDispatch} from "react-redux";
import {getUserThunk} from "../../services/actions/auth";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Order from "../order/order";
import Modal from "../modal/modal";
import {HIDE_INGREDIENT_DETAILS} from "../../services/actions/ingredient-details";
import {Location} from 'history';
import {AppDispatch} from "../../services/types/store";
import {getIngredients} from "../../services/actions/burger-ingredients";

const App = () => {
	const dispatch = useDispatch<AppDispatch>();
	
	useEffect(() => {
		dispatch(getUserThunk());
		dispatch(getIngredients());
	}, [dispatch]);
	
	// /* Это нужно для отображения номера заказа в заголовке модального окна,
	// если оно открыто. Реализация этого может отличаться
	//  */
	// const orderNumber = useRouteMatch([
	//   "/profile/orders/:number",
	//   "/feed/:number",
	// ])?.params?.number;
	
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
						<ModalSwitch/>
					</Switch>
				</main>
			</Router>
		</div>
	);
};

const ModalSwitch = () => {
	const dispatch = useDispatch()
	const history = useHistory();
	const location = useLocation<{background: Location}>();
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
				<Route path="/feed" exact={true}>
					<FeedPage/>
				</Route>
				<Route path="/feed/:id" exact={true}>
					<Order isShow={false}/>
				</Route>
				<ProtectedRoute onlyForAuth={true} path="/profile/orders" exact={true}>
					<ProfileOrdersPage/>
				</ProtectedRoute>
				<ProtectedRoute onlyForAuth={true} path="/profile/orders/:id" exact={true}>
					<Order isShow={true}/>
				</ProtectedRoute>
			</Switch>
			
			{background &&
          <Route path="/ingredients/:id">
            <Modal handleClose={closeIngredientModal} title={'Детали ингредиента'}>
              <IngredientDetails/>
            </Modal>
          </Route>
			}
			{background &&
          <Route path="/feed/:id">
            <Modal handleClose={closeIngredientModal} title={''}>
              <Order isShow={false}/>
            </Modal>
          </Route>
			}
			{background &&
          <ProtectedRoute onlyForAuth={true} path="/profile/orders/:id">
            <Modal handleClose={closeIngredientModal} title={''}>
              <Order isShow={true}/>
            </Modal>
          </ProtectedRoute>
			}
		
		</>
	)
}

export default App;
