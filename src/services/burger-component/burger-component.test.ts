import { componentReducer } from './reducers';
import {
  ADD_COMPONENT,
  DEL_COMPONENT,
  UPDATE_COMPONENT,
  CLEAR_COMPONENTS,
} from './constants';
import { TDataItem, TInitialState } from '../../types/data';

const bun = {
  _id: '0',
  name: 'bun',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 10,
  image: 'url',
  image_mobile: 'url',
  image_large: 'url',
  __v: 0,
  key: '0',
};

const ingredient = {
  _id: '0',
  name: 'ingredient',
  type: 'test',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 10,
  image: 'url',
  image_mobile: 'url',
  image_large: 'url',
  __v: 0,
  key: '0',
};
//#region addComponent
describe('component reducer', () => {
  it('should handle addComponent', () => {
    expect(
      componentReducer({ totalSum: 0 } as TInitialState, {
        type: ADD_COMPONENT,
        item: bun,
      })
    ).toEqual({ bun, totalSum: 20 });
    expect(
      //булка должна перезаписываться, а не добавляться
      componentReducer(
        { totalSum: 60, bun: { ...bun, price: 30 } } as TInitialState,
        {
          type: ADD_COMPONENT,
          item: bun,
        }
      )
    ).toEqual({ bun, totalSum: 20 });
    expect(
      componentReducer(
        { components: [] as TDataItem[], totalSum: 0 } as TInitialState,
        {
          type: ADD_COMPONENT,
          item: ingredient,
        }
      )
    ).toEqual({
      components: [{ ...ingredient, key: expect.any(String) }],
      totalSum: 10,
    });
  });
  expect(
    componentReducer(
      {
        components: [{ ...ingredient, key: expect.any(String) }] as TDataItem[],
        totalSum: 10,
      } as TInitialState,
      {
        type: ADD_COMPONENT,
        item: ingredient,
      }
    )
  ).toEqual({
    components: [
      { ...ingredient, key: expect.any(String) },
      { ...ingredient, key: expect.any(String) },
    ],
    totalSum: 20,
  });
  expect(
    componentReducer(
      {
        components: [] as TDataItem[],
        totalSum: 20,
        bun: bun,
      } as TInitialState,
      {
        type: ADD_COMPONENT,
        item: ingredient,
      }
    )
  ).toEqual({
    components: [{ ...ingredient, key: expect.any(String) }],
    totalSum: 30,
    bun: bun,
  });
});
//#endregion
//#region delComponent
describe('component reducer', () => {
  it('should handle delComponent', () => {
    expect(
      componentReducer(
        { totalSum: 20, components: [ingredient, ingredient] } as TInitialState,
        {
          type: DEL_COMPONENT,
          item: { index: 0, price: 10 },
        }
      )
    ).toEqual({ components: [ingredient], totalSum: 10 });
  });
});
//#endregion
//#region updateComponents
const one = ingredient;
const two = ingredient;
describe('component reducer', () => {
  it('should handle updateComponent', () => {
    expect(
      componentReducer({ components: [one, two] } as TInitialState, {
        type: UPDATE_COMPONENT,
        value: { dragIndex: 0, hoverIndex: 1 },
      })
    ).toEqual({ components: [two, one] });
  });
});
//#endregion
//#region  delComponent
describe('component reducer', () => {
  it('should handle updateComponent', () => {
    expect(
      componentReducer(
        {
          components: [ingredient, ingredient],
          bun: bun,
          totalSum: 30,
        } as TInitialState,
        {
          type: CLEAR_COMPONENTS,
        }
      )
    ).toEqual({ components: [], bun: null, totalSum: 0 });
  });
});
//#endregion
