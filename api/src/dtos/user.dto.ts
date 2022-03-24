import { User, UserDto } from '../interfaces/user.interface';

export const toUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
