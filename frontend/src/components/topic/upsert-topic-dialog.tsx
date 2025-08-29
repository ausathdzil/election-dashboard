// biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: Reusable upsert component
// biome-ignore-all lint/style/noNestedTernary: Reusable upsert component

'use client';

import { type Tag, TagInput } from 'emblor';
import { EditIcon, LoaderIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { useActionState, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createTopic, updateTopic } from '@/lib/actions/topic';
import type { Topic } from '@/lib/types/topic';

type UpsertTopicDialogProps = {
  token: string;
  topic?: Topic;
  mode: 'create' | 'update';
};

export function UpsertTopicDialog(props: UpsertTopicDialogProps) {
  const { topic, token, mode } = props;

  const [tags, setTags] = useState<Tag[]>(
    (topic?.tags ?? []).map((tag, idx) => ({
      id: `${idx}`,
      text: tag,
    }))
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [visibility, setVisibility] = useState<string>(
    (topic?.is_public ?? false) ? 'public' : 'private'
  );

  const actionFn = (mode === 'create' ? createTopic : updateTopic).bind(
    null,
    token
  );
  const [state, action, pending] = useActionState(actionFn, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={mode === 'create' ? 'default' : 'icon'}
          variant={mode === 'create' ? 'secondary' : 'ghost'}
        >
          {mode === 'create' ? (
            <>
              <PlusIcon className="stroke-muted-foreground" />
              Add Topic
            </>
          ) : (
            <EditIcon className="stroke-muted-foreground" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action} className="flex w-full flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Topic' : 'Update Topic'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create'
                ? 'Create a topic with title, visibility, and tags'
                : 'Edit title and add new tags'}
            </DialogDescription>
          </DialogHeader>
          {mode === 'update' && topic ? (
            <input name="topic_id" type="hidden" value={topic.id} />
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input defaultValue={topic?.title ?? ''} id="title" name="title" />
            {state?.errors?.title && (
              <p className="text-destructive text-xs">
                {state.errors.title[0]}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <TagInput
                activeTagIndex={activeTagIndex}
                id="tags"
                setActiveTagIndex={setActiveTagIndex}
                setTags={(newTags) => setTags(newTags)}
                styleClasses={{
                  inlineTagsContainer:
                    'border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[1px] focus-within:ring-ring p-1 gap-1',
                  input: 'w-full min-w-[80px] shadow-none px-2 h-7 rounded',
                  tag: {
                    body: 'h-7 relative bg-background border border-input hover:bg-background rounded font-medium text-sm ps-2 pe-7',
                    closeButton:
                      'absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] text-muted-foreground/80 hover:text-foreground',
                  },
                }}
                tags={tags}
              />
              <input
                name="tags"
                type="hidden"
                value={JSON.stringify(tags.map((tag) => tag.text))}
              />
              <span
                aria-live="polite"
                className="text-muted-foreground text-xs"
              >
                Enter any tags you have, leave blank if none
              </span>
            </div>
            {state?.errors?.tags && (
              <p className="text-destructive text-xs">{state.errors.tags[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="is_public">Visibility</Label>
            <Select onValueChange={setVisibility} value={visibility}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <input
              name="is_public"
              type="hidden"
              value={visibility === 'public' ? 'true' : 'false'}
            />
            {state?.errors?.is_public && (
              <p className="text-destructive text-xs">
                {state.errors.is_public[0]}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button disabled={pending} type="submit">
              {pending ? (
                <LoaderIcon className="animate-spin" />
              ) : mode === 'create' ? (
                <PlusIcon />
              ) : (
                <SaveIcon />
              )}
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
