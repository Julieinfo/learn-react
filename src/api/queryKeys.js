/* Responsabilité : centraliser les Query Keys pour garantir un cache cohérent. */
export const postsKeys = {
  all: ['posts'],
  lists: () => [...postsKeys.all, 'list'],
  list: (limit) => [...postsKeys.lists(), { limit }],
  details: () => [...postsKeys.all, 'detail'],
  detail: (id) => [...postsKeys.details(), id]
};