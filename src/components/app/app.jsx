import React from 'react';
import AppHeader from './../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-irngredients/burger-irngredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {URL} from '../../utils/parameters';

const App = () => {
	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		fetch(URL)
		.then((response) => response.json())
		.then((data) => setData(data.data))
		.catch((error) => {
				console.error('Error:', error) ;
			});
	}, []);

	return (
			<div className={styles.app}>
				<AppHeader/>
				<main className={styles.main}>
					<BurgerIngredients ingredients={data}/>
					<BurgerConstructor ingredients={data}/>
				</main>
			</div>
	);
};

export default App;
