import React from 'react';
import AppHeader from './../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {IngredientsContext} from "../../utils/appContext";
import {ingredientsArrayType} from "../../utils/types";
import PropTypes from "prop-types";

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const App = () => {

  return (
      <div className={styles.app}>
        <AppHeader/>
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </DndProvider>
        </main>
      </div>
  );
};

IngredientsContext.Provider.propTypes = {
  value: PropTypes.shape({
    ...ingredientsArrayType
  })
}

export default App;
