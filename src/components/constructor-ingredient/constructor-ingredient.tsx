import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {moveIngredientConstructor, removeIngredientConstructor} from "../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";
import {decreaseIngredient} from "../../services/actions/burger-ingredients";
import {TConstructorIngredient} from "../../utils/types";
import {AppDispatch} from "../../services/types/store";

type TConstructorIngredientProps = {
	ingredient: TConstructorIngredient;
	index: number;
};

const ConstructorIngredient = ({ingredient, index}: TConstructorIngredientProps): JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const ref = useRef<HTMLLIElement>(null);
	
	const [{isDragging}, dragRef] = useDrag({
		type: "constructor",
		item: () => {
			return {id: ingredient._id, index};
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	
	const [, dropRef] = useDrop({
		accept: 'constructor',
		hover: (ingredient: { index: number }, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = ingredient.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) {
				return;
			}
			
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverActualY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			
			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
			
			dispatch(moveIngredientConstructor(dragIndex, hoverIndex));
			ingredient.index = hoverIndex
		},
	});
	dragRef(dropRef(ref));
	
	const handleDeleteIngredients = () => {
		dispatch(removeIngredientConstructor(ingredient.key));
		dispatch(decreaseIngredient(ingredient._id));
	}
	
	const opacity = isDragging ? 0 : 1
	return (
		<li className={styles.listingItem} ref={ref} style={{opacity}}>
			<DragIcon type="primary"/>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleDeleteIngredients}
			/>
		</li>
	)
}


export default ConstructorIngredient;