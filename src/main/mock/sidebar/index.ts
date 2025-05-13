import { paths } from 'main/config';

interface item {
  icon: string;
  link: string;
  name: string;
  onClick?: () => void;
}

const companyDashboard = (): item => ({
  icon: 'Dashboard',
  link: paths.home,
  name: 'Dashboard'
});

const companyRestaurants = (): item => ({
  icon: 'Store',
  link: paths.home,
  name: 'Loja'
});

const companyEmployees = (): item => ({
  icon: 'People',
  link: paths.home,
  name: 'Dashboard'
});

const companySubscription = (): item => ({
  icon: 'Star',
  link: paths.home,
  name: 'Dashboard'
});

export const sidebarItems = [
  companyDashboard(),
  companyRestaurants(),
  companyEmployees(),
  companySubscription()
];
