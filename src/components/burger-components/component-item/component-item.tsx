import { useDispatch } from '../../../types/hooks';
import { useDrop, useDrag } from 'react-dnd';
import React, { useRef } from 'react';
import { DEL_COMPONENT } from '../../../services/burger-component/constants';
import PropTypes, { number } from 'prop-types';
import { TDataItem } from '../../../types/data';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface IComponentItemProps {
  item: TDataItem;
  index: number;
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
}
export const ComponentItem: React.FC<IComponentItemProps> = ({
  item,
  index,
  moveListItem,
}) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<IComponentItemProps, HTMLDivElement, null>({
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
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  const { name, price, image } = item;

  return (
    <div ref={ref} style={{ opacity }}>
      {<DragIcon type="primary" />}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch({
            type: DEL_COMPONENT,
            item: { price: price, index: index },
          });
        }}
      />
    </div>
  );
};

