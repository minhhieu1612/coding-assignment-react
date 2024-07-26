import { RouteObject } from 'react-router-dom';
import Tickets from '../components/tickets';
import TicketDetail from '../components/ticketDetail';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Tickets />,
  },
  {
    path: '/:id',
    element: <TicketDetail />,
  },
];

export default routes;
