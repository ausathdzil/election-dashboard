import { z } from 'zod/v4';

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .max(255, { message: 'Name must be less than 255 characters long.' })
      .trim(),
    email: z
      .email({ message: 'Please enter a valid email.' })
      .max(255, { message: 'Email must be less than 255 characters long.' })
      .trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .max(40, { message: 'Be less than 40 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    confirmPassword: z.string().min(1, { message: 'Confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      fields: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      };
      message?: string;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Enter your password.' }).trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      fields: {
        email: string;
        password: string;
      };
      message?: string;
    }
  | undefined;
