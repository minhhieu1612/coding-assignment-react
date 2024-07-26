import { Descriptions, DescriptionsProps } from 'antd';
import { ticketsSelector } from '../../../store/tickets';
import { usersSelector } from '../../../store/users';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store';
import { Ticket } from '@acme/shared-models';
import { getTicketById } from '../../../store/tickets/index.thunk';
import { UnknownAction } from '@reduxjs/toolkit';

type TicketDetailParamsType = {
  id: string;
};

export default function TicketDetail() {
  const { id } = useParams<TicketDetailParamsType>();
  const users = useSelector(usersSelector);
  const ticket = useSelector(ticketsSelector).find(
    (item) => item.id === Number(id)
  );
  const dispatch = useAppDispatch();

  const formatData = function (ticket: Ticket): DescriptionsProps['items'] {
    return [
      {
        key: '1',
        label: 'Description',
        children: ticket?.description,
      },
      {
        key: '2',
        label: 'Assignee',
        children:
          ticket?.assigneeId !== null
            ? users[ticket?.assigneeId as number].name
            : 'unassigned',
      },
      {
        key: '3',
        label: 'Status',
        children: ticket?.completed ? 'Completed' : 'Uncompleted',
      },
    ];
  };

  useEffect(() => {
    (async () => {
      if (!ticket?.id) {
        await dispatch(getTicketById(Number(id)) as unknown as UnknownAction);
      }
    })();
  }, [ticket, id, dispatch]);

  return (
    <div>
      {ticket ? (
        <Descriptions
          labelStyle={{ width: '140px' }}
          column={1}
          bordered
          title="Ticket Info"
          items={formatData(ticket)}
        />
      ) : (
        <p>The Page you are looking for is not exist!!</p>
      )}
      <br />
      <Link to="/">Back to Home page</Link>
    </div>
  );
}
