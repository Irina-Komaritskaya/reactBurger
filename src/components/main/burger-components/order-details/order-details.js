import styles from './order-details.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import dataItemProps from '../../../../types/types';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails({data, bunLocked}){
  return (
  <>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${bunLocked.name} (верх)`}
      price={bunLocked.price}
      thumbnail={bunLocked.image}
    />

    <ul className={`pr-8 ${styles.componentList}`} >
    {data.map(x => ( 
      <li key={x._id} className={`mb-4 ${styles.fullWidht}`}>
        {<DragIcon type="primary" />}
        <ConstructorElement
          text={x.name}
          price={x.price}
          thumbnail={x.image}
        />
      </li>))}
    </ul>

    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${bunLocked.name} (низ)`}
      price={bunLocked.price}
      thumbnail={bunLocked.image}
    />
  </>           
)}

OrderDetails.propTypes={
  data: PropTypes.arrayOf(dataItemProps.isRequired).isRequired,
  bunLocked: dataItemProps.isRequired
}
export default OrderDetails;