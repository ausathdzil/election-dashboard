import { z } from 'zod/v4';

export type Topic = {
  title: string;
  tags: string[];
  is_public: boolean;
  id: number;
  owner_id: number;
  created_at: string;
};

export type UpdateTopicFormState =
  | {
      errors?: {
        title?: string[];
        tags?: string[];
        is_public?: string[];
      };
      fields: {
        title: string;
        tags: string[];
        is_public: boolean;
      };
      message?: string;
    }
  | undefined;

export const UpdateTopicFormSchema = z.object({
  topic_id: z.string().min(1, { message: 'Topic ID is required.' }),
  title: z.string().min(1, { message: 'Title is required.' }).trim(),
  tags: z.array(z.string()).min(1, { message: 'Tags are required.' }),
  is_public: z.boolean(),
});
