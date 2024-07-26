import { User } from '@acme/shared-models';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { getAllUsers } from './index.thunk';
import { AnyAction } from '@reduxjs/toolkit';

describe('store/users', () => {
  const middlewares = [thunk];

  const mockStore = configureStore(middlewares);

  test('get all users dispatches the correct actions', async () => {
    // arrange
    const initialState: { users: { [key: number]: User } } = {
      users: {},
    };
    const store = mockStore(initialState);

    // action
    await store.dispatch(getAllUsers() as unknown as AnyAction);

    const actions = store.getActions();

    // assert
    expect(actions[0].type).toEqual('users/getAll/pending');
    expect(actions[1].type).toMatch(/users\/getAll\/(fulfilled|rejected)/);
  });
});
