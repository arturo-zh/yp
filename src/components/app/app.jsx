import React from 'react';
import AppHeader from './../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-irngredients/burger-irngredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredients} from '../../utils/burger-api';
import PreLoader from "../preloader/preloader";
import {IngredientsContext} from "../../utils/appContext";
import {ingredientsArrayType} from "../../utils/types";
import PropTypes from "prop-types";

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredientsLoader, seIngredientsLoader] = React.useState(true);

  React.useEffect(() => {
    getIngredients()
    .then(data => setIngredients(data.data))
    .catch(() => alert("Во время загрузки ингредиента произошла ошибка"))
    .finally(() => seIngredientsLoader(false));
  }, []);

  return (
      <div className={styles.app}>
        <AppHeader/>
        {ingredientsLoader ? (
            <PreLoader/>
        ) : (
            <IngredientsContext.Provider value={{ingredients}}>
              <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            </IngredientsContext.Provider>
        )}
      </div>
  );
};

IngredientsContext.Provider.propTypes = {
  value: PropTypes.shape({
    ...ingredientsArrayType
  })
}

export default App;
