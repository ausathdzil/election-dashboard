'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';

import {
  UpdateTopicFormSchema,
  type UpdateTopicFormState,
} from '../types/topic';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateTopic(
  token: string,
  _state: UpdateTopicFormState,
  formData: FormData
) {
  const rawFormData = {
    topic_id: formData.get('topic_id') as string,
    title: formData.get('title') as string,
    tags: JSON.parse(formData.get('tags') as string) as string[],
    is_public: (formData.get('is_public') as string) === 'true',
  };

  const validatedFields = UpdateTopicFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      fields: { ...rawFormData },
    };
  }

  const { topic_id, title, tags, is_public } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/topics/${topic_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, tags, is_public }),
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

  revalidatePath('/dashboard/topics');

  return {
    message: 'Topic updated successfully',
    fields: { ...rawFormData },
  };
}
