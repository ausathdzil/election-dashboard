export type User = {
  email: string;
  is_superuser: boolean;
  full_name: string | null;
  id: string;
};

export type Users = {
  data: User[];
  count: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};
