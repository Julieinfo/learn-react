import { lazy, Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CarteProduit from './components/CarteProduit';
import { Tabs } from './components/Tabs';
import Semaine1 from './components/weeks/Semaine1';
import Semaine2 from './components/weeks/Semaine2';
import Semaine3 from './components/weeks/Semaine3';
import Semaine4 from './components/weeks/Semaine4';
import Semaine5 from './components/weeks/Semaine5';
import Semaine6 from './components/weeks/Semaine6';
import Semaine7 from './components/weeks/Semaine7';
import Semaine8 from './components/weeks/Semaine8';
import BoutonTheme from './components/BoutonTheme';
import Conteneur from './components/Conteneur';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import RootLayout from './layouts/RootLayout';
import AppLayout from './layouts/AppLayout';
import About from './pages/About';
import ErrorView from './pages/ErrorView';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserDetail, { userDetailLoader } from './pages/UserDetail';
import UsersPage, { usersLoader } from './pages/UsersPage';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductView = lazy(() => import('./pages/ProductView'));
const queryClient = new QueryClient();

const PageLoader = () => (
  <p role="status">🌀 Téléchargement du module de la page...</p>
);

const PerfHome = () => (
  <section>
    <h2>Bienvenue sur le Projet Intégrateur S8</h2>
    <p>
      Application de démonstration alliant React Router, Data Loaders,
      Code-Splitting et Profiling.
    </p>
  </section>
);

function LearningHome() {
  const { theme } = useTheme();
  const {
    produitsFiltres,
    filtreActif,
    totalPanier,
    reduction,
    appliquerPromo,
    totalArticles,
    setFiltreActif,
    ajouterQuantite,
    diminuerQuantite,
    viderPanier
  } = useCart();
  const [codePromo, setCodePromo] = useState('');

  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  const handleValidationPromo = (event) => {
    event.preventDefault();
    const valeurSaisie = parseFloat(codePromo.trim());

    if (Number.isFinite(valeurSaisie) && valeurSaisie >= 1 && valeurSaisie <= 100) {
      appliquerPromo(valeurSaisie / 100);
      alert(`Code promo appliqué : ${valeurSaisie}% de réduction !`);
      setCodePromo('');
      return;
    }

    alert('Veuillez entrer un pourcentage valide compris entre 1 et 100 !');
  };

  const weekOneProps = {
    produitsFiltres,
    filtreActif,
    totalPanier,
    reduction,
    totalArticles,
    codePromo,
    setFiltreActif,
    ajouterQuantite,
    diminuerQuantite,
    viderPanier,
    handleValidationPromo,
    setCodePromo
  };

  return (
    <div style={appStyle} data-theme={theme}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <BoutonTheme />
      </header>
      <section className="weeks-navigation" aria-label="Navigation par semaine">
        <h1>📚 learn-react : parcours par semaine</h1>
        <p>Sélectionne une semaine pour retrouver les exercices et composants associés.</p>
        <Tabs defaultTab="week-1">
          <Tabs.List>
            <Tabs.Tab id="week-1">Semaine 1</Tabs.Tab>
            <Tabs.Tab id="week-2">Semaine 2</Tabs.Tab>
            <Tabs.Tab id="week-3">Semaine 3</Tabs.Tab>
            <Tabs.Tab id="week-4">Semaine 4</Tabs.Tab>
            <Tabs.Tab id="week-5">Semaine 5</Tabs.Tab>
            <Tabs.Tab id="week-6">Semaine 6</Tabs.Tab>
            <Tabs.Tab id="week-7">Semaine 7</Tabs.Tab>
            <Tabs.Tab id="week-8">Semaine 8</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel id="week-1"><Semaine1 {...weekOneProps} /></Tabs.Panel>
            <Tabs.Panel id="week-2"><Semaine2 /></Tabs.Panel>
            <Tabs.Panel id="week-3"><Semaine3 /></Tabs.Panel>
            <Tabs.Panel id="week-4"><Semaine4 /></Tabs.Panel>
            <Tabs.Panel id="week-5"><Semaine5 /></Tabs.Panel>
            <Tabs.Panel id="week-6"><Semaine6 /></Tabs.Panel>
            <Tabs.Panel id="week-7"><Semaine7 /></Tabs.Panel>
            <Tabs.Panel id="week-8"><Semaine8 /></Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </section>
      <Conteneur>
        <h2>🛒 Catalogue Produits</h2>
        <div className="catalogue-filters">
          <button onClick={() => setFiltreActif('TOUS')}>Tous les produits</button>
          <button onClick={() => setFiltreActif('PANIER')}>
            Uniquement le panier ({totalArticles})
          </button>
        </div>
        {produitsFiltres.length === 0 ? (
          <p>Aucun produit à afficher dans cette vue.</p>
        ) : (
          <div className="product-grid">
            {produitsFiltres.map((produit) => (
              <CarteProduit
                key={produit.id}
                nom={produit.nom}
                description={produit.description}
                prix={produit.prix}
                quantite={produit.quantite}
                onAjouter={() => ajouterQuantite(produit.id)}
                onDiminuer={() => diminuerQuantite(produit.id)}
              />
            ))}
          </div>
        )}
        <form onSubmit={handleValidationPromo} className="promo-form">
          <input
            type="text"
            placeholder="Entrez le code promo"
            value={codePromo}
            onChange={(event) => setCodePromo(event.target.value)}
          />
          <button type="submit">Appliquer</button>
        </form>
        {reduction > 0 && <p>Réduction appliquée : {reduction * 100}%</p>}
        <h3>Total du panier : {totalPanier.toFixed(2)} €</h3>
      </Conteneur>
    </div>
  );
}

const lazyRoute = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'learning', element: <LearningHome /> },
      { path: 'about', element: <About /> },
      {
        path: 'products',
        element: lazyRoute(Products),
        loader: (args) => import('./pages/Products').then((module) => module.productsLoader(args))
      },
      {
        path: 'products/:id',
        element: lazyRoute(ProductDetail),
        loader: (args) => import('./pages/ProductDetail').then((module) => module.productDetailLoader(args))
      },
      {
        path: 'users',
        element: <UsersPage />,
        loader: usersLoader,
        children: [{ path: ':id', element: <UserDetail />, loader: userDetailLoader }]
      },
      {
        path: 'perf-shop',
        element: <AppLayout />,
        errorElement: <ErrorView />,
        children: [
          { index: true, element: <PerfHome /> },
          {
            path: 'products',
            element: lazyRoute(Catalog),
            loader: (args) => import('./pages/Catalog').then((module) => module.catalogLoader(args))
          },
          {
            path: 'products/:id',
            element: lazyRoute(ProductView),
            loader: (args) => import('./pages/ProductView').then((module) => module.productViewLoader(args))
          },
          { path: '*', element: <ErrorView /> }
        ]
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
