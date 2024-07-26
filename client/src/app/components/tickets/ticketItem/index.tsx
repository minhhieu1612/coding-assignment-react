import { Ticket, User } from '@acme/shared-models';
import { Button, List, Select, Spin } from 'antd';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { DefaultOptionType } from 'antd/es/select';
import { LoadingListType } from '../index.types';

type TicketItemPropsType = {
  item: Ticket;
  users: { [key: number]: User };
  usersOptions: DefaultOptionType[];
  completedLoading: LoadingListType;
  assigneeLoading: LoadingListType;
  handleToggleComplete: (
    item: Ticket
  ) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  handleChangeAssignee: (id: number) => ([userId]: number[]) => Promise<void>;
};

export default function TicketItem({
  item,
  users,
  usersOptions,
  completedLoading,
  assigneeLoading,
  handleChangeAssignee,
  handleToggleComplete,
}: TicketItemPropsType) {
  return (
    <List.Item
      key={item.id}
      className={styles['ticket-item']}
      actions={[
        <Button
          loading={completedLoading[item.id] || false}
          className={styles['btn-check']}
          onClick={handleToggleComplete(item)}
        >
          <FontAwesomeIcon
            size="lg"
            className={item.completed ? styles['completed'] : ''}
            icon={faCheckCircle}
          />
        </Button>,
        <>
          <Select
            placeholder="Assignee"
            mode="multiple"
            maxCount={1}
            value={(item.assigneeId !== null && [item.assigneeId]) || []}
            className={styles['select-assignee']}
            onChange={handleChangeAssignee(item.id)}
            suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
            options={usersOptions}
          />
          {assigneeLoading[item.id] ? (
            <Spin className="ml-2" size="small" />
          ) : (
            ''
          )}
        </>,
      ]}
    >
      <List.Item.Meta
        title={
          <Link
            className={item.completed ? 'line-through' : ''}
            to={`/${item.id}`}
          >
            {item.id}, {item.description}
          </Link>
        }
        description={`asign to: ${
          item.assigneeId !== null ? users[item.assigneeId]?.name : 'unassigned'
        }`}
      />
    </List.Item>
  );
}
