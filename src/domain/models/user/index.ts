import type { FilterPagination, FilterSort, Pagination } from 'domain/protocol';
import type { Role } from 'domain/enums';

export interface LoginPayload {
  accessToken: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date | null;
  finishedAt: Date | null;
}

export interface FindUserQuery extends Pagination {
  content: User[];
}

export interface UserFilter extends FilterPagination, FilterSort {
  name: string;
  email: string;
  role: Role[];
}

export const userFilterInitialState: UserFilter = {
  email: '',
  name: '',
  orderBy: null,
  orderBySelect: null,
  page: 1,
  role: [],
  sort: null
};
