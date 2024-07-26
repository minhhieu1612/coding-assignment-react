import { Select } from 'antd';
import { CompletedFilterEnum } from '../../../utils/enum';
import { useSelector } from 'react-redux';
import {
  filterTicketSelector,
  setFilterTicket,
} from '../../../../store/filterTicket';
import { useAppDispatch } from '../../../../store';

export default function FilterTicket() {
  const filter = useSelector(filterTicketSelector);
  const dispatch = useAppDispatch();

  const handleFilterCompleted = (value: string) => {
    dispatch(setFilterTicket(value));
  };

  return (
    <Select
      className="w-32"
      value={filter.completed}
      onChange={handleFilterCompleted}
      options={[
        {
          label: 'All',
          value: CompletedFilterEnum.All,
        },
        {
          label: 'Completed',
          value: CompletedFilterEnum.Completed,
        },
        {
          label: 'Uncompleted',
          value: CompletedFilterEnum.Uncompleted,
        },
      ]}
    />
  );
}
