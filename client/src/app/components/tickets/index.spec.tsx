import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Tickets from '.';
import { Provider } from 'react-redux';
import { CompletedFilterEnum } from '../../utils/enum';
import { thunk } from 'redux-thunk';
import { RootStoreType } from '../../../store';
import { BrowserRouter } from 'react-router-dom';

// mannual mocking method for js dom
// found at: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Tickets', () => {
  const mockStore = configureStore([thunk]);

  it('should render successfully', () => {
    const store = mockStore({
      tickets: [],
      users: {},
      filterTicket: { completed: CompletedFilterEnum.All },
    });

    const { baseElement, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tickets />
        </BrowserRouter>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('No data')).toBeVisible();
  });

  it('should render successfully with data', () => {
    const initiateState: RootStoreType = {
      tickets: [
        {
          id: 1,
          description: 'Ticket item number 1',
          assigneeId: null,
          completed: false,
        },
      ],
      users: {},
      filterTicket: { completed: CompletedFilterEnum.All },
    };
    const store = mockStore(initiateState);

    const { baseElement, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tickets />
        </BrowserRouter>
      </Provider>
    );

    expect(baseElement).toBeTruthy();
    expect(
      getByText(
        `${initiateState.tickets[0].id}, ${initiateState.tickets[0].description}`
      )
    ).toBeVisible();
  });
});
