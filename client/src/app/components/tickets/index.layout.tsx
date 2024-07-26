import { Button, Flex, Form, FormInstance, Input, List } from 'antd';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ticket } from '@acme/shared-models';
import { useMemo } from 'react';
import { usersSelector } from '../../../store/users';
import { ticketsSelector } from '../../../store/tickets';
import { useSelector } from 'react-redux';
import TicketItem from './ticketItem';
import { FormCreateTicketFieldType, LoadingListType } from './index.types';
import FilterTicket from './filterTicket';
import { filterTicketSelector } from '../../../store/filterTicket';
import { CompletedFilterEnum } from '../../utils/enum';

type TicketLayoutPropsType = {
  createLoading: boolean;
  completedLoading: LoadingListType;
  assigneeLoading: LoadingListType;
  formCreate: FormInstance<FormCreateTicketFieldType>;
  messageContext: JSX.Element;
  handleToggleComplete: (
    item: Ticket
  ) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  handleChangeAssignee: (id: number) => ([userId]: number[]) => Promise<void>;
  handleCreateTicket: (values: FormCreateTicketFieldType) => Promise<void>;
};

export default function TicketLayout({
  createLoading,
  assigneeLoading,
  completedLoading,
  formCreate,
  messageContext,
  handleChangeAssignee,
  handleToggleComplete,
  handleCreateTicket,
}: TicketLayoutPropsType) {
  const filter = useSelector(filterTicketSelector);
  const users = useSelector(usersSelector);
  const usersOptions = useMemo(
    () =>
      Object.values(users).map((user) => ({
        value: user.id,
        label: user.name,
      })),
    [users]
  );
  const tickets = useSelector(ticketsSelector).filter(
    (item) =>
      filter.completed === CompletedFilterEnum.All ||
      (filter.completed === CompletedFilterEnum.Completed && item.completed) ||
      (filter.completed === CompletedFilterEnum.Uncompleted && !item.completed)
  );

  return (
    <div className={styles['tickets']}>
      {messageContext}
      <h2 className="text-2xl font-bold mb-3">Tickets</h2>
      <hr />
      <Flex justify="space-between" className="mt-4">
        <Form form={formCreate} onFinish={handleCreateTicket} className='w-[28rem]'>
          <Flex gap="middle">
            <Button htmlType="submit" loading={createLoading}>
              Create <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Form.Item className="w-3/4" name={'description'}>
              <Input />
            </Form.Item>
          </Flex>
        </Form>
        <FilterTicket />
      </Flex>
      <List
        className='mb-8'
        bordered
        dataSource={tickets}
        renderItem={(item) => (
          <TicketItem
            users={users}
            usersOptions={usersOptions}
            item={item}
            completedLoading={completedLoading}
            assigneeLoading={assigneeLoading}
            handleChangeAssignee={handleChangeAssignee}
            handleToggleComplete={handleToggleComplete}
          />
        )}
      />
    </div>
  );
}
