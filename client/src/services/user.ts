import { User } from '@acme/shared-models';
import Repository, { DEFAULT_BASE_URL } from './repository';

class UserService {
  private _respository: InstanceType<typeof Repository>;

  constructor() {
    this._respository = new Repository({ baseUrl: `${DEFAULT_BASE_URL}/users` });
  }

  async getAll() {
    return await this._respository.get<User[]>('');
  }

  async getById(id: number) {
    return await this._respository.get<User>(`${id}`);
  }
}

export default UserService;
