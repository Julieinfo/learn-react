/* Responsabilité : démontrer query, cache, staleTime et invalidation manuelle. */
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des articles');
  }

  return response.json();
};

export default function ReactQueryDemo() {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 10000
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  if (isLoading) {
    return <p>Chargement des données...</p>;
  }

  if (isError) {
    return <p>Erreur : {error.message}</p>;
  }

  return (
    <section>
      <h2>🔄 React Query : Queries &amp; Cache</h2>
      <button type="button" onClick={handleRefresh}>
        Forcer le rafraîchissement (Invalidate)
      </button>

      {isFetching && <p>Mise à jour en arrière-plan...</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
}