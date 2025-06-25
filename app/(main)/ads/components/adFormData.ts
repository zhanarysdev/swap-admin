export interface AdFormData {
  influencer_amount: number;
  category_ids: number[];
  genders: string[];
  branch_ids: number[];
  images: string[];
  about: string;
  start_date: string;
  end_date: string;
  session_duration_sec: number;
  visit_at_same_time_count: number;
  work_hours_by_week_day: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  publication_type: string;
  ad_format: string;
  tag_type: string;
  reward_by_rank: {
    rank_id: number;
    amount: number;
  }[];
  is_bad_words_allowed: boolean;
  is_custom_text: boolean;
  custom_text: string;
  prepared_text: boolean;
  clothing_type_id: number;
  content_ids: string[];
}
