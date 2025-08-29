'use client';

import { EditIcon, LoaderIcon } from 'lucide-react';

import { Tag, TagInput } from 'emblor';
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
import { updateTopic } from '@/lib/actions/topic';
import { Topic } from '@/lib/types/topic';

type UpdateTopicDialogProps = {
  token: string;
  topic: Topic;
};

export function UpdateTopicDialog(props: UpdateTopicDialogProps) {
  const { topic, token } = props;

  const [tags, setTags] = useState<Tag[]>(
    topic.tags.map((tag, idx) => ({
      id: `${idx}`,
      text: tag,
    }))
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [visibility, setVisibility] = useState<string>(
    topic.is_public ? 'public' : 'private'
  );

  const updateTopicWithToken = updateTopic.bind(null, token);
  const [state, action, pending] = useActionState(
    updateTopicWithToken,
    undefined
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <EditIcon className="stroke-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={action} className="w-full flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Update Topic</DialogTitle>
            <DialogDescription>Edit title and add new tags</DialogDescription>
          </DialogHeader>
          <input type="hidden" name="topic_id" value={topic.id} />
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={topic.title} />
            {state?.errors?.title && (
              <p className="text-xs text-destructive">
                {state.errors.title[0]}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <TagInput
                id="tags"
                tags={tags}
                setTags={(newTags) => setTags(newTags)}
                styleClasses={{
                  inlineTagsContainer:
                    'border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[1px] focus-within:ring-ring p-1 gap-1',
                  input: 'w-full min-w-[80px] shadow-none px-2 h-7',
                  tag: {
                    body: 'h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-sm ps-2 pe-7',
                    closeButton:
                      'absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] text-muted-foreground/80 hover:text-foreground',
                  },
                }}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
              />
              <input
                type="hidden"
                name="tags"
                value={JSON.stringify(tags.map((tag) => tag.text))}
              />
              <span
                className="text-xs text-muted-foreground"
                aria-live="polite"
              >
                Enter any tags you have, leave blank if none
              </span>
            </div>
            {state?.errors?.tags && (
              <p className="text-xs text-destructive">{state.errors.tags[0]}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="is_public">Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="is_public"
              value={visibility === 'public' ? 'true' : 'false'}
            />
            {state?.errors?.is_public && (
              <p className="text-xs text-destructive">
                {state.errors.is_public[0]}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button disabled={pending} type="submit">
              {pending ? <LoaderIcon className="animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
