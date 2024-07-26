import TicketService from "./ticket";
import UserService from "./user";

const ticketService = new TicketService();
const userService = new UserService();

export {
  ticketService,
  userService
}