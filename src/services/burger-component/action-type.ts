import {
    ADD_COMPONENT,
    DEL_COMPONENT,
    UPDATE_COMPONENT,
    CLEAR_COMPONENTS,
  } from './constants';

  export interface IAddComponent {
    readonly type: typeof ADD_COMPONENT;
  }

  export interface IDelComponent {
    readonly type: typeof DEL_COMPONENT;
  }

  export interface IUpdateComponent {
    readonly type: typeof UPDATE_COMPONENT;
  }

  export interface IClearComponents {
    readonly type: typeof CLEAR_COMPONENTS;
  }

  export type TComponent = IAddComponent
  | IDelComponent
  | IUpdateComponent
  | IClearComponents

  export const addComponentAction = (): IAddComponent => ({
    type: ADD_COMPONENT,
  });

  export const delComponentAction = (): IDelComponent => ({
    type: DEL_COMPONENT,
  });

  export const updateComponentAction = (): IUpdateComponent => ({
    type: UPDATE_COMPONENT,
  });

  export const clearComponentsAction = (): IClearComponents => ({
    type: CLEAR_COMPONENTS,
  });