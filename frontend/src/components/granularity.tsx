import { useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Granularity({
  handleGranularityChange,
}: {
  handleGranularityChange: (granularity: string) => void;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <Select
      defaultValue={params.get('granularity') ?? 'monthly'}
      onValueChange={handleGranularityChange}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select granularity" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
      </SelectContent>
    </Select>
  );
}
