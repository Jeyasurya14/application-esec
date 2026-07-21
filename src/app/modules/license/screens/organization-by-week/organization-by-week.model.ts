export interface OrganizationByWeek {
  sw: string;
  server: string;
  location?: string;
  lic: string;
  bundle?: string;
  date?: string;
  li_holi?: string;
  qty_i?: string;
  qty_dp?: string;
  p_dp?: string;
  di?: string;
  used_lic_hours?: string;
  avail_lic_hours?: string;
  p_dw_q?: string;
  __weekDates?: readonly string[];
  [key: string]: unknown;
}
