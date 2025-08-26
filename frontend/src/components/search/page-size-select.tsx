import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PageSizeSelect({
  handleSizeChange,
  initialSize,
  label,
}: {
  handleSizeChange: (size: string) => void;
  initialSize: string | undefined;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      <Select
        defaultValue={initialSize ?? '5'}
        onValueChange={handleSizeChange}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
