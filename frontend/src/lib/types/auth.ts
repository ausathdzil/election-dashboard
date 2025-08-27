import { z } from 'zod/v4';

const MAX_NAME_LENGTH = 255;
const MAX_EMAIL_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 40;

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .max(MAX_NAME_LENGTH, {
        message: `Name must be less than ${MAX_NAME_LENGTH} characters long.`,
      })
      .trim(),
    email: z
      .email({ message: 'Please enter a valid email.' })
      .max(MAX_EMAIL_LENGTH, {
        message: `Email must be less than ${MAX_EMAIL_LENGTH} characters long.`,
      })
      .trim(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, {
        message: `Be at least ${MIN_PASSWORD_LENGTH} characters long`,
      })
      .max(MAX_PASSWORD_LENGTH, {
        message: `Be less than ${MAX_PASSWORD_LENGTH} characters long`,
      })
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
