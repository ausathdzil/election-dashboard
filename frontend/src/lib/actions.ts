'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4';

import {
  LoginFormSchema,
  type LoginFormState,
  SignupFormSchema,
  type SignupFormState,
} from './definitions';
import { deleteSession } from './session';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(_state: SignupFormState, formData: FormData) {
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

export async function login(_state: LoginFormState, formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = LoginFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      fields: { ...rawFormData },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const searchParams = new URLSearchParams({
      grant_type: 'password',
      username: email,
      password,
      scope: '',
      client_id: 'string',
      client_secret: '********',
    });

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: searchParams.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail[0].msg ? data.detail[0].msg : data.detail);
    }

    const cookieStore = await cookies();
    cookieStore.set('access_token', data.access_token);
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

  redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
