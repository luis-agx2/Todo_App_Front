import { Menu, MenuItem } from '../interfaces/menu-item.interface';

const MENU_USER: MenuItem[] = [
  { id: 'home', icon: 'home', path: '/', name: 'Home' },
  { id: 'profile', icon: 'person', path: '/profile', name: 'Profile' }
];

export const MENU: Menu = {
  USER: MENU_USER
};
