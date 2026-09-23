export const postsKeys = {
  all: ['posts'],
  lists: () => [...postsKeys.all, 'list'],
  list: (limit) => [...postsKeys.lists(), { limit }],
  details: () => [...postsKeys.all, 'detail'],
  detail: (id) => [...postsKeys.details(), id]
};