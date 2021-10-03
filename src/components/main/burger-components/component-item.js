import { 
  DragIcon, 
  ConstructorElement 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { DEL_COMPONENT, UPDATE_COMPONENT } from '../../../services/actions';
import { useDispatch } from 'react-redux';
import {useDrop, useDrag} from 'react-dnd'
import {useCallback, useRef, useState} from 'react'


export function ComponentItem({item, index, moveListItem }){
  const dispatch = useDispatch();

  const [{isDragging} , dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

 
  const [ ,dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
  // const [components, setPets] = useState(components)
  // const updateComponents = useCallback(
  //   (dragIndex, hoverIndex) => {
  //     const dragItem = components[dragIndex]
  //     const hoverItem = components[hoverIndex]
  //     // Swap places of dragItem and hoverItem in the pets array
  //     setPets(pets => {
  //         const updatedPets = [...components]
  //         updatedPets[dragIndex] = hoverItem
  //         updatedPets[hoverIndex] = dragItem
  //         return updatedPets
  //     })
  // },
  // [components],
    // (dragIndex, hoverIndex) => {
    //   dispatch({
    //     type: UPDATE_COMPONENT,
    //     dragIndex: dragIndex,
    //     hoverIndex: hoverIndex
    //   })
  //}
  // ) 
  const ref = useRef(null)
  dragRef(dropRef(ref))
  const opacity = isDragging ? 0 : 1;

  const {name, price, image} = item

  return(
    <div ref={ref} style={{ opacity }}>
      {<DragIcon type="primary" />}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch({
            type: DEL_COMPONENT,
            value: {price: price, index: index}
          })
        }}
        />
    </div>
  ) 
}
