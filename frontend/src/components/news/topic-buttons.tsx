'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '@/components/ui/button';
import type { Topic } from '@/lib/types/topic';

const DEBOUNCE_TIME = 0;

export function TopicButtons({ topics }: { topics: Topic[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState<number | null>(
    searchParams.get('topic_id') ? Number(searchParams.get('topic_id')) : null
  );

  const handleTagClick = useDebouncedCallback((tag: Topic | null) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      setSelectedTag(tag.id);
      params.set('topic_id', tag.id.toString());
    } else {
      params.delete('topic_id');
    }
    const newParams =
      `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
    router.replace(newParams, { scroll: false });
  }, DEBOUNCE_TIME);

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((tag) => (
        <Button
          key={tag.id}
          onClick={() => handleTagClick(tag)}
          size="rounded"
          type="button"
          variant={selectedTag === tag.id ? 'default' : 'secondary'}
        >
          {tag.title}
        </Button>
      ))}
    </div>
  );
}
