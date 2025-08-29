import { z } from 'zod/v4';

export type Topic = {
  title: string;
  tags: string[];
  is_public: boolean;
  id: number;
  owner_id: number;
  created_at: string;
};

export type UpsertTopicFormState =
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

export const UpsertFormSchema = z.object({
  topic_id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required.' }).trim(),
  tags: z.array(z.string()).min(1, { message: 'Tags are required.' }),
  is_public: z.boolean(),
});
