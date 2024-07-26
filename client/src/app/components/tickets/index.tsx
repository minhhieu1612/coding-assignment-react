import {
  assignTicketToUser,
  completeTicket,
  createTicket,
  getAllTickets,
  incompleteTicket,
  unassignTicket,
} from '../../../store/tickets/index.thunk';
import { getAllUsers } from '../../../store/users/index.thunk';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store';
import { Ticket } from '@acme/shared-models';
import TicketLayout from './index.layout';
import { FormCreateTicketFieldType, LoadingListType } from './index.types';
import { BaseResponseType } from '../../../services/repository';
import { message } from 'antd';
import { handleCallApiAdapter } from '../../utils/handleCallApiAdapter';
import useForm from 'antd/lib/form/hooks/useForm';
import { UnknownAction } from '@reduxjs/toolkit';

export function Tickets() {
  const [formCreate] = useForm<FormCreateTicketFieldType>();
  const [createLoading, setCreateLoading] = useState(false);
  const [completedLoading, setCompletedLoading] = useState<LoadingListType>({});
  const [assigneeLoading, setAssigneeLoading] = useState<LoadingListType>({});
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const handleChangeAssignTo =
    (id: number) =>
    async ([userId]: number[]) => {
      await handleCallApiAdapter<null>({
        startLoading: () =>
          setAssigneeLoading({ ...assigneeLoading, [id]: true }),
        endLoading: () =>
          setAssigneeLoading({ ...assigneeLoading, [id]: false }),
        messageApi,
        successMesage: 'update successfully!!',
        errorMessage: 'update failed!!',
        apiCaller: async () => {
          let response: BaseResponseType<null>;
          if (userId !== undefined) {
            const { payload } = await dispatch(
              assignTicketToUser({ id, userId }) as unknown as UnknownAction
            );
            response = payload as BaseResponseType<null>;
          } else {
            const { payload } = await dispatch(
              unassignTicket(id) as unknown as UnknownAction
            );
            response = payload as BaseResponseType<null>;
          }

          return response;
        },
      });
    };

  const handleCreateTicket = async (values: FormCreateTicketFieldType) => {
    await handleCallApiAdapter<Ticket>({
      startLoading: () => setCreateLoading(true),
      endLoading: () => setCreateLoading(false),
      successMesage: 'create ticket successfully!!',
      messageApi,
      apiCaller: async () => {
        const { payload } = await dispatch(
          createTicket(values.description) as unknown as UnknownAction
        );

        const response = payload as BaseResponseType<Ticket>;

        if (response.success) {
          formCreate.resetFields();
        }

        return response;
      },
    });
  };

  const handleToggleComplete =
    (item: Ticket) =>
    async (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      await handleCallApiAdapter({
        startLoading: () =>
          setCompletedLoading({ ...completedLoading, [item.id]: true }),
        endLoading: () =>
          setCompletedLoading({ ...completedLoading, [item.id]: false }),
        successMesage: 'update successfully!!',
        messageApi,
        apiCaller: async () => {
          let response: BaseResponseType<boolean>;

          if (item.completed) {
            const { payload } = await dispatch(
              incompleteTicket(item.id) as unknown as UnknownAction
            );
            response = payload as BaseResponseType<boolean>;
          } else {
            const { payload } = await dispatch(
              completeTicket(item.id) as unknown as UnknownAction
            );
            response = payload as BaseResponseType<boolean>;
          }

          return response;
        },
      });
    };

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(getAllTickets() as unknown as UnknownAction),
        dispatch(getAllUsers() as unknown as UnknownAction),
      ]);
    })();
  }, [dispatch]);

  return (
    <TicketLayout
      messageContext={contextHolder}
      formCreate={formCreate}
      createLoading={createLoading}
      handleCreateTicket={handleCreateTicket}
      completedLoading={completedLoading}
      assigneeLoading={assigneeLoading}
      handleChangeAssignee={handleChangeAssignTo}
      handleToggleComplete={handleToggleComplete}
    />
  );
}

export default Tickets;
