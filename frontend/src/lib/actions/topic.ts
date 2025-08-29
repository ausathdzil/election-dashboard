'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';

import { UpsertFormSchema, UpsertTopicFormState } from '../types/topic';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createTopic(
  token: string,
  _state: UpsertTopicFormState,
  formData: FormData
) {
  return upsertTopic(token, _state, formData);
}

export async function updateTopic(
  token: string,
  _state: UpsertTopicFormState,
  formData: FormData
) {
  return upsertTopic(token, _state, formData);
}

export async function upsertTopic(
  token: string,
  _state: UpsertTopicFormState,
  formData: FormData
) {
  const rawFormData = {
    topic_id: (formData.get('topic_id') as string) ?? undefined,
    title: formData.get('title') as string,
    tags: JSON.parse(formData.get('tags') as string) as string[],
    is_public: (formData.get('is_public') as string) === 'true',
  };

  const validatedFields = UpsertFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      fields: { ...rawFormData },
    };
  }

  const { topic_id, title, tags, is_public } = validatedFields.data;

  try {
    const isUpdate = Boolean(topic_id);
    const url = isUpdate
      ? `${API_URL}/topics/${topic_id}`
      : `${API_URL}/topics`;
    const method = isUpdate ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
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
    message: rawFormData.topic_id
      ? 'Topic updated successfully'
      : 'Topic created successfully',
    fields: { ...rawFormData },
  };
}

export async function deleteTopic(
  topicId: number,
  token: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_URL}/topics/${topicId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail[0].msg ? data.detail[0].msg : data.detail);
    }

    revalidatePath('/dashboard/topics');
    return data.message;
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
    return {
      message: 'Something went wrong.',
    };
  }
}
