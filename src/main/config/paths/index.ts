/* eslint-disable sort-keys-fix/sort-keys-fix */

export enum routePaths {
  login = '/login',
  home = '/'
}

export const paths = {
  login: '/login',
  home: '/'
};

export const apiPaths = {
  default: '/default',
  login: '/login',
  content: '/contents',
  oneContent: (user: string, slug: string): string => `/contents/${user}/${slug}`,
  user: '/user'
};
