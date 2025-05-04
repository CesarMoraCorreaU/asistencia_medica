import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

// This is a mock database for development
// In a real app, you would use a real database like MongoDB, PostgreSQL, etc.
const users = [];

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = {
      id: (users.length + 1).toString(),
      ...createUserDto,
    };
    users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return users.find(user => user.email === email);
  }

  async findById(id: string): Promise<any> {
    return users.find(user => user.id === id);
  }

  async findAll(): Promise<any[]> {
    return users.map(user => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    });
  }
}