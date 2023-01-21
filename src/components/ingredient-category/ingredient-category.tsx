import React from "react";
import styles from './ingredient-category.module.css';
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {TIngredient} from "../../utils/types";
import {Link, useLocation} from "react-router-dom";

type TIngredientCategoryProps = {
	title: string;
	ingredients: TIngredient[];
	tabRef: () => void;
};

const IngredientCategory = ({title, ingredients, tabRef}: TIngredientCategoryProps): JSX.Element => {
	const location = useLocation()
	return (
		<div className={styles.type} ref={tabRef}>
			<div className={styles.header}>
				<p className={styles.title}>{title}</p>
			</div>
			<div className={styles.content}>
				<div className={styles.list}>
					{
						ingredients.map((ingredient) => {
							return (
								<Link to={{pathname: `ingredients/${ingredient._id}`, state: {background: location}}}
								      className={styles.link} key={ingredient._id}>
									<BurgerIngredient ingredientData={ingredient}/>
								</Link>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default React.memo(IngredientCategory)