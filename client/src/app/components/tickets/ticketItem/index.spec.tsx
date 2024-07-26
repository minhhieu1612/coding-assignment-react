import { render } from '@testing-library/react';
import TicketItem from '.';
import { Ticket, User } from '@acme/shared-models';
import { BrowserRouter } from 'react-router-dom';

describe('TicketItem', () => {
  test('should render successfully', () => {
    // arrange
    const mockItem: Ticket = {
      id: 1,
      assigneeId: null,
      description: 'this is a test',
      completed: false,
    };

    const mockUsers: { [key: number]: User } = {
      1: {
        id: 1,
        name: 'Alisa',
      },
      2: {
        id: 2,
        name: 'Ryan',
      },
    };

    const mockUsersOptions = Object.values(mockUsers).map((user) => ({
      value: user.id,
      label: user.name,
    }));

    const mockAssigneeLoading = {};
    const mockcompletedLoading = {};
    const mockClickToggleComplete = jest.fn(
      async (_event: React.MouseEvent<HTMLElement, MouseEvent>) => undefined
    );
    const mockHandleToggleComplete = jest.fn(
      (_item: Ticket) => mockClickToggleComplete
    );
    const mockSelectAssignee = jest.fn(
      async ([_userId]: number[]) => undefined
    );
    const mockHandleChangeAssignee = jest.fn(
      (_id: number) => mockSelectAssignee
    );

    // action
    const { getByText, baseElement } = render(
      <BrowserRouter>
        <TicketItem
          item={mockItem}
          users={mockUsers}
          usersOptions={mockUsersOptions}
          assigneeLoading={mockAssigneeLoading}
          completedLoading={mockcompletedLoading}
          handleToggleComplete={mockHandleToggleComplete}
          handleChangeAssignee={mockHandleChangeAssignee}
        />
      </BrowserRouter>
    );

    // assert
    expect(baseElement).toBeInTheDocument();
    expect(getByText(`${mockItem.id}, ${mockItem.description}`)).toBeVisible();
    expect(mockSelectAssignee).toBeCalledTimes(0);
    expect(mockHandleChangeAssignee).toBeCalled();
    expect(mockClickToggleComplete).toBeCalledTimes(0);
    expect(mockHandleToggleComplete).toBeCalled();
  });
});
