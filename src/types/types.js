import PropTypes from 'prop-types';

export const dataItemProps = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const orderItemProps = PropTypes.shape({
  totalSum: PropTypes.number.isRequired,
  numberOrder: PropTypes.number,
  bun: dataItemProps.isRequired,
  ingredients: PropTypes.arrayOf(dataItemProps.isRequired).isRequired,
  setConfirmOrder: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
});
