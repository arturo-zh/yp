import React, { useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from "../ingredient-category/ingredient-category";
import {useInView} from "react-intersection-observer";
import {useSelector} from "react-redux";
import Preloader from "../preloader/preloader";
import {TIngredient} from "../../utils/types";

const getBurgerIngredients = (store: any) => store.burgerIngredients;


const BurgerIngredients = () => {
	const {
		burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed
	} = useSelector(getBurgerIngredients);
	
	// const dispatch = useDispatch<AppDispatch>();
	
	// useEffect(() => {
	// 	dispatch(getIngredients())
	// }, [dispatch]);
	
	const buns = useMemo(() => burgerIngredients.filter((el: TIngredient) => el.type === "bun"), [burgerIngredients]);
	const sauces = useMemo(() => burgerIngredients.filter((el: TIngredient) => el.type === "sauce"), [burgerIngredients]);
	const main = useMemo(() => burgerIngredients.filter((el: TIngredient) => el.type === "main"), [burgerIngredients]);
	
	const [refBun, inViewBun, entryBun] = useInView({threshold: 1});
	const [refSauce, inViewSauce, entrySauce] = useInView({threshold: 0.5});
	const [refMain, inViewMain, entryMain] = useInView({threshold: 0.15});
	
	const onTabClick = (tab: string) => {
		switch (tab) {
			case 'bun':
				entryBun?.target.scrollIntoView({behavior: "smooth"});
				break;
			case 'sauce':
				entrySauce?.target.scrollIntoView({behavior: "smooth"});
				break;
			case 'main':
				entryMain?.target.scrollIntoView({behavior: "smooth"});
				break;
			default:
				entryBun?.target.scrollIntoView({behavior: "smooth"});
		}
	}
	
	return (<>
		{burgerIngredientsRequest ?
			<Preloader/> : burgerIngredientsFailed ? "Во время загрузки ингредиента произошла ошибка" :
				<section className={styles.section}>
					<h1 className={styles.title}>Соберите бургер</h1>
					<div className={styles.tabs}>
						<Tab value='code' active={inViewBun} onClick={onTabClick}>Булки</Tab>
						<Tab value='sauce' active={!inViewBun && inViewSauce} onClick={onTabClick}>Соусы</Tab>
						<Tab value='main' active={!inViewSauce && inViewMain} onClick={onTabClick}>Начинки</Tab>
					</div>
					<div className={styles.types}>
						<IngredientCategory title="Булки" ingredients={buns}
						                    tabRef={refBun}/>
						<IngredientCategory title="Соусы" ingredients={sauces}
						                    tabRef={refSauce}/>
						<IngredientCategory title="Начинка" ingredients={main}
						                    tabRef={refMain}/>
					</div>
				</section>
		}
	</>);
};


export default BurgerIngredients;