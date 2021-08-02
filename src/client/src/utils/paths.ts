export const paths = {
  top: '/',
  accounts: {
    preRegister: {
      index: '/accounts/pre_register',
      done: '/accounts/pre_register/done',
    },
    register: '/accounts/register',
    login: '/accounts/login',
    mypage: '/accounts/mypage',
    edit: '/accounts/edit',
  },
  articles: {
    default: '/articles',
    detail: (articleId: string) => `/articles/${articleId}`,
    list: '/articles/list',
    add: '/articles/add',
  },
};
