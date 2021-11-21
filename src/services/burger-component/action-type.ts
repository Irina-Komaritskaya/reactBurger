import { TDataItem } from '../../types/types';
import {
  ADD_COMPONENT,
  DEL_COMPONENT,
  UPDATE_COMPONENT,
  CLEAR_COMPONENTS,
} from './constants';

export interface IAddComponent {
  readonly type: typeof ADD_COMPONENT;
  item: TDataItem;
}

export interface IDelComponent {
  readonly type: typeof DEL_COMPONENT;
  item: { price: number; index: number };
}

export interface IUpdateComponent {
  readonly type: typeof UPDATE_COMPONENT;
  value: { dragIndex: number; hoverIndex: number };
}

export interface IClearComponents {
  readonly type: typeof CLEAR_COMPONENTS;
}

export type TComponent =
  | IAddComponent
  | IDelComponent
  | IUpdateComponent
  | IClearComponents;

export const addComponentAction = (item: TDataItem): IAddComponent => ({
  type: ADD_COMPONENT,
  item,
});

export const delComponentAction = (item: {
  price: number;
  index: number;
}): IDelComponent => ({
  type: DEL_COMPONENT,
  item,
});

export const updateComponentAction = (value: {
  dragIndex: number;
  hoverIndex: number;
}): IUpdateComponent => ({
  type: UPDATE_COMPONENT,
  value,
});

export const clearComponentsAction = (): IClearComponents => ({
  type: CLEAR_COMPONENTS,
});
