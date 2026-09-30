export type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected";

/*
 * Ровно то же, что лежит в таблице reviews в Supabase
 * (см. supabase/schema.sql).
 */
export interface Review {
  id: string;
  created_at: string;
  name: string;
  rating: number;
  text: string;
  project_id: string | null;
  status: ReviewStatus;
}
