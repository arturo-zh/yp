import React, {useEffect} from 'react';
import styles from './ingredient-details.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {SHOW_INGREDIENT_DETAILS} from "../../services/actions/ingredient-details";
import {TIngredient, TParams} from "../../utils/types";
import {AppDispatch, RootState} from "../../services/types/store";

const IngredientDetails = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {id} = useParams<TParams>();
	const ingredient = useSelector((store: RootState) => store.burgerIngredients.burgerIngredients).find((item:TIngredient) => item._id === id);
	
	useEffect(() => {
		dispatch({
			type: SHOW_INGREDIENT_DETAILS,
			item: ingredient
		})
	}, [dispatch, ingredient])
	
	if (!ingredient) {
		return null
	}
	
	return (<div className={styles.content}>
		<div className={styles.image}>
			<img src={ingredient.image_large} alt={ingredient.name}/>
		</div>
		<p className={styles.name}>{ingredient.name}</p>
		<ul className={styles.props}>
			<li className={styles.prop}>
				Калории,ккал
				<span className={styles.count}>{ingredient.calories}</span>
			</li>
			<li className={styles.prop}>Белки, г
				<span className={styles.count}>{ingredient.proteins}</span>
			</li>
			<li className={styles.prop}>Жиры, г
				<span className={styles.count}>{ingredient.fat}</span>
			</li>
			<li className={styles.prop}>Углеводы, г
				<span className={styles.count}>{ingredient.carbohydrates}</span>
			</li>
		</ul>
	</div>);
};

export default IngredientDetails;