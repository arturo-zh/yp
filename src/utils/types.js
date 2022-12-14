import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
}).isRequired;

export const ingredientsArrayType = {
	ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export const modalType = {
  handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};
export const ModalOverlayType = {
  children: PropTypes.element.isRequired,
};