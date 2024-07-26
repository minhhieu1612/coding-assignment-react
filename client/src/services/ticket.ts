import { Ticket } from '@acme/shared-models';
import Repository, { DEFAULT_BASE_URL } from './repository';

class TicketService {
  private _repository: InstanceType<typeof Repository>;

  constructor() {
    this._repository = new Repository({
      baseUrl: `${DEFAULT_BASE_URL}/tickets`,
    });
  }

  async getAll() {
    return await this._repository.get<Ticket[]>('');
  }

  async getById(id: number) {
    return await this._repository.get<Ticket>(`${id}`);
  }

  async create(description: string) {
    return await this._repository.post<Ticket>(
      '',
      JSON.stringify({ description }),
    );
  }

  async assignUser(id: number, userId: number) {
    return await this._repository.put(`${id}/assign/${userId}`);
  }

  async unassign(id: number) {
    return await this._repository.put(`${id}/unassign`);
  }

  async complete(id: number) {
    return await this._repository.put(`${id}/complete`);
  }

  async incomplete(id: number) {
    return await this._repository.delete(`${id}/complete`);
  }
}

export default TicketService;
