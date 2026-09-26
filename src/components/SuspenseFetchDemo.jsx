/* Responsabilité : coordonner Suspense, query asynchrone et Error Boundary. */
import React, { Suspense, useState } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary';

const fetchDetails = async (shouldFail) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (shouldFail) {
    throw new Error('Échec du chargement des détails du serveur !');
  }

  return { id: 1, name: 'Produit React Query', price: '49.99€' };
};

function ProductDetails({ shouldFail }) {
  const { data } = useSuspenseQuery({
    queryKey: ['product', shouldFail],
    queryFn: () => fetchDetails(shouldFail)
  });

  return (
    <div>
      <h4>{data.name}</h4>
      <p>Prix : {data.price}</p>
    </div>
  );
}

export default function SuspenseFetchDemo() {
  const [shouldFail, setShouldFail] = useState(false);
  const queryClient = useQueryClient();
  const queryKey = ['product', shouldFail];

  const handleReset = () => {
    queryClient.resetQueries({ queryKey });
  };

  return (
    <section>
      <h3>🌀 Entrelacement : Suspense + Error Boundary</h3>
      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(event) => setShouldFail(event.target.checked)}
        />{' '}
        Simuler une erreur de chargement
      </label>

      <ErrorBoundary onReset={handleReset}>
        <Suspense fallback={<p>⏳ Chargement des détails...</p>}>
          <ProductDetails shouldFail={shouldFail} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}