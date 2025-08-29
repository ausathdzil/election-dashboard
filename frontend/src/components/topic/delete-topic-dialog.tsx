'use client';

import { LoaderIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteTopic } from '@/lib/actions/topic';

type DeleteTopicDialogProps = {
  topicId: number;
  token: string;
};

export function DeleteTopicDialog(props: DeleteTopicDialogProps) {
  const [loading, setLoading] = useState(false);
  const { topicId, token } = props;

  const handleDeleteTopic = async () => {
    setLoading(true);
    await deleteTopic(topicId, token);
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Delete topic"
          size="icon"
          type="button"
          variant="ghost"
        >
          <Trash2Icon className="stroke-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Topic</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            topic.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} type="button">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            aria-busy={loading}
            className="bg-destructive text-primary-foreground hover:bg-destructive/90"
            disabled={loading}
            onClick={handleDeleteTopic}
            type="button"
          >
            {loading ? <LoaderIcon className="animate-spin" /> : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
