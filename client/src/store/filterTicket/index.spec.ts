import { CompletedFilterEnum } from "../../app/utils/enum"
import filterTicketReducer, { setFilterTicket } from '.'

describe('store/filterTicket', () => {
  test('setFilterTicket create a correct action', () => {
    const action = setFilterTicket(CompletedFilterEnum.Completed);
    const newState = filterTicketReducer({ completed: CompletedFilterEnum.All}, action);

    expect(action.type).toEqual('filterTicket/setFilterTicket');
    expect(newState.completed).toEqual(CompletedFilterEnum.Completed)
  })
})