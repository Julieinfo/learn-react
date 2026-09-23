import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async (shouldFail) => {
  if (shouldFail) {
    throw new Error('Impossible de contacter le serveur. (Erreur simulée)');
  }

  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error(`Erreur réseau (${response.status})`);
  }

  return response.json();
};

export default function UserListMiniProject() {
  const [shouldFail, setShouldFail] = useState(false);
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['usersList', shouldFail],
    queryFn: () => fetchUsers(shouldFail),
    retry: 1
  });

  return (
    <section>
      <h3>📋 Mini-projet : Liste d'utilisateurs</h3>

      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
        />{' '}
        Simuler une erreur réseau
      </label>

      <div>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Chargement...' : 'Recharger la liste'}
        </button>
      </div>

      {isLoading && <p>⏳ Chargement des utilisateurs...</p>}

      {isError && <p>⚠️ Erreur : {error.message}</p>}

      {!isLoading && !isError && users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.username})
              <br />
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}