export interface MenuItem {
  id: string;
  icon: string;
  path: string;
  name: string;
}

export type Menu = Record<string, MenuItem[]>;
