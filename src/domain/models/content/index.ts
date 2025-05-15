export interface Content {
  id: string;
  owner_id: string;
  parent_id: null;
  slug: string;
  title: string;
  status: string;
  source_url: string | null;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  deleted_at: Date | null;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  owner_username: string;
  children_deep_count: number;
  type: string;
}
