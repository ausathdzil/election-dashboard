import { redirect } from 'next/navigation';
import { z } from 'zod/v4';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function signup(state: SignupFormState, formData: FormData) {
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirm-password') as string,
  };

  const validatedFields = SignupFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      fields: { ...rawFormData },
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        full_name: name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail[0].msg ? data.detail[0].msg : data.detail);
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        fields: { ...rawFormData },
      };
    }
    return {
      message: 'Something went wrong.',
      fields: { ...rawFormData },
    };
  }

  redirect('/login');
}
