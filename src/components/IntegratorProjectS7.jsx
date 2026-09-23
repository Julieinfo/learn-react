import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsKeys } from '../api/queryKeys';

const fetchPosts = async (limit) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Erreur de chargement des articles');
  }

  return response.json();
};

const createPost = async (newPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  });

  if (!response.ok) {
    throw new Error('Échec de la création du post');
  }

  return response.json();
};

const deletePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error('Échec de la suppression du post');
  }
};

export default function IntegratorProjectS7() {
  const [limit, setLimit] = useState(5);
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: postsKeys.list(limit),
    queryFn: () => fetchPosts(limit)
  });

  const invalidatePostLists = () => {
    queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
  };

  const addPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      invalidatePostLists();
      setTitle('');
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: invalidatePostLists
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addPostMutation.mutate({
      title: title.trim(),
      body: 'Contenu généré',
      userId: 1
    });
  };

  const isMutating = addPostMutation.isPending || deletePostMutation.isPending;
  const mutationError = addPostMutation.error || deletePostMutation.error;

  return (
    <section>
      <h2>🚀 Projet Intégrateur S7 : Dashboard avec TanStack Query</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="post-title">Nouveau post</label>
        <div>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Titre du post"
            disabled={isMutating}
          />
          <button type="submit" disabled={isMutating || !title.trim()}>
            {addPostMutation.isPending ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
      </form>

      {mutationError && <p role="alert">⚠️ {mutationError.message}</p>}

      <div>
        <label htmlFor="post-limit">Nombre d'éléments : </label>
        <select
          id="post-limit"
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Actualisation...' : 'Actualiser'}
        </button>
      </div>

      {isFetching && <p>🔄 Mise à jour du cache...</p>}
      {isLoading && <p>⏳ Chargement initial...</p>}
      {isError && <p role="alert">⚠️ {error.message}</p>}

      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}{' '}
              <button
                type="button"
                onClick={() => deletePostMutation.mutate(post.id)}
                disabled={isMutating}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}