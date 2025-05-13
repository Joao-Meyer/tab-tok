import { Role } from 'domain/enums';
import { mixed, object, string } from 'yup';
import type { InferType } from 'yup';

export const userSchema = object().shape({
  email: string().email().required(),
  name: string().required(),
  role: mixed<Role>().oneOf(Object.values(Role)).required()
});

export type UserRequest = InferType<typeof userSchema>;
