// ============================================================================
// 📘 App.jsx
// ----------------------------------------------------------------------------
// 🧠 Note d'apprentissage : ce composant est le "chef d'orchestre" de l'application.
// La logique métier du panier est entièrement déléguée au Custom Hook `usePanier`.
// Le thème dynamique est consommé via `useTheme` (ThemeContext).
// ============================================================================

import CarteProduit from './components/CarteProduit';
import FormulaireInscription from './components/FormulaireInscription';
import Conteneur from './components/Conteneur';
import { useTheme } from './context/ThemeContext';
import BoutonTheme from './components/BoutonTheme';
import { useCart } from './context/CartContext';
import { lazy, Suspense, useState } from 'react';
import TodoApp from './components/TodoApp';
import GestionProduits from './components/GestionProduits';
import CompteurProfiler from './components/CompteurProfiler';
import DashboardS5 from './components/ProjetIntegrateurS5';
import { Accordion } from './components/Accordion';
import { Tabs } from './components/Tabs';
import Semaine1 from './components/weeks/Semaine1';
import Semaine2 from './components/weeks/Semaine2';
import Semaine3 from './components/weeks/Semaine3';
import Semaine4 from './components/weeks/Semaine4';
import Semaine5 from './components/weeks/Semaine5';
import Semaine6 from './components/weeks/Semaine6';
import Semaine7 from './components/weeks/Semaine7';
import Semaine8 from './components/weeks/Semaine8';
import CompoundSelectDemo from './components/CompoundSelectDemo';
import ProjetIntegrateurS6 from './components/ProjetIntegrateurS6';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import UsersPage, { usersLoader } from './pages/UsersPage';
import UserDetail, { userDetailLoader } from './pages/UserDetail';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const PageLoader = () => <p role="status">🌀 Téléchargement du module de la page...</p>;

const queryClient = new QueryClient();

const PRODUITS_INITIAUX = [
  { id: 1, nom: 'Casque Audio', description: 'Casque réducteur de bruit', prix: 150, quantite: 0 },
  { id: 2, nom: 'Souris Gamer', description: 'Souris optique sans fil', prix: 50, quantite: 0 },
  { id: 3, nom: 'Clavier Mécanique', description: 'Clavier RGB switch red', prix: 100, quantite: 0 }
];

function LearningHome() {
  const { theme } = useTheme();

  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s ease'
  };

  // 🟢 Extraction complète de la logique métier via le Custom Hook `useCart`
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

  const handleValidationPromo = (e) => {
    e.preventDefault();
    
    // On extrait la valeur numérique saisie dans l'input
    const valeurSaisie = parseFloat(codePromo.trim());

    // Verification : est-ce un nombre valide compris entre 1 et 100 ?
    if (!isNaN(valeurSaisie) && valeurSaisie >= 1 && valeurSaisie <= 100) {
      const taux = valeurSaisie / 100; // Conversion en décimal (ex: 20 => 0.20)
      appliquerPromo(taux);
      alert(`Code promo appliqué : ${valeurSaisie}% de réduction !`);
      setCodePromo(''); // Optionnel : réinitialise le champ après validation
    } else {
      alert('Veuillez entrer un pourcentage valide compris entre 1 et 100 !');
    }
  };

  // --------------------------------------------------------------------------
  // 🎨 RENDU JSX
  // --------------------------------------------------------------------------
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
      </div>
  );

  // Rendu historique conservé ci-dessous conformément à la structure initiale.
  return (
    <div style={appStyle} data-theme={theme}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <BoutonTheme />
      </header>

      {/* Section 1 : Formulaire d'inscription */}
        <div style={{
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#2b2b2b',
          border: theme === 'light' ? '1px solid #e9ecef' : '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>
            🔒 Inscription & Validation du Mot de Passe
          </h2>
          <FormulaireInscription />
        </div>
      
      {/* Section 2 : TodoApp */}
      <TodoApp />

      {/* Section 3 : Compteur avec Profiler */}
      <CompteurProfiler />

      {/* Section 4 : Dashboard intégrateur S5 */}
      <DashboardS5 />

      {/* Section 5 : Démonstration du pattern Compound Components */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Composition avancée : Accordion</h2>
        <p>
          Les compound components permettent de partager un état entre un
          composant parent et ses enfants sans prop-drilling explicite.
        </p>
        <Accordion defaultOpenId="patterns">
          <Accordion.Item id="patterns">
            <Accordion.Header>Section 1 : Design Patterns</Accordion.Header>
            <Accordion.Content>
              Les compound components permettent de créer des composants
              déclaratifs et flexibles.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item id="advantages">
            <Accordion.Header>Section 2 : Avantages</Accordion.Header>
            <Accordion.Content>
              L'état est partagé de façon transparente sans prop-drilling
              explicite depuis l'extérieur.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* Section 6 : Gestion des Produits */}
      <GestionProduits />

      {/* Section 7 : Tabs Compound Component */}
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h2>🧩 Semaine 6 : Composition Avancée</h2>

        <h3>1. Accordion</h3>
        <Accordion defaultOpenId="1">
          <Accordion.Item id="1">
            <Accordion.Header>Section 1 : Design Patterns</Accordion.Header>
            <Accordion.Content>
              Les compound components permettent de créer des composants déclaratifs et très flexibles.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="2">
            <Accordion.Header>Section 2 : Avantages</Accordion.Header>
            <Accordion.Content>
              L'état est partagé de façon transparente sans prop-drilling explicite depuis l'extérieur.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>

        <hr style={{ margin: '30px 0' }} />

        <h3>2. Tabs Compound Component</h3>
        <Tabs defaultTab="react">
          <Tabs.List>
            <Tabs.Tab id="react">React</Tabs.Tab>
            <Tabs.Tab id="vite">Vite</Tabs.Tab>
            <Tabs.Tab id="js">JavaScript</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panels>
            <Tabs.Panel id="react">
              <h4>React.js</h4>
              <p>Une bibliothèque pour créer des interfaces utilisateur composables et performantes.</p>
            </Tabs.Panel>
            <Tabs.Panel id="vite">
              <h4>Vite</h4>
              <p>Un outil de build ultra-rapide pour les projets frontend modernes.</p>
            </Tabs.Panel>
            <Tabs.Panel id="js">
              <h4>JavaScript</h4>
              <p>Le langage du Web, à la base de tout l'écosystème moderne.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>

        <hr style={{ margin: '30px 0' }} />

        <h3>3. Custom Hook extrait</h3>
        <CompoundSelectDemo />

        <hr style={{ margin: '30px 0' }} />

        <h3>5. Projet Intégrateur S6</h3>
        <ProjetIntegrateurS6 />

      </div>

      {/* Section 7 : Boutique & Panier */}
      <Conteneur>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🛒 Application Demo React
        </h1>

        <div style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#2b2b2b',
          border: theme === 'light' ? '1px solid #dee2e6' : '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '1.2rem' }}>
            🛍️ Catalogue Produits
          </h2>

          {/* Boutons de Filtre */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setFiltreActif('TOUS')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: filtreActif === 'TOUS' ? '#007bff' : '#e9ecef',
                color: filtreActif === 'TOUS' ? '#fff' : '#333',
                cursor: 'pointer'
              }}
            >
              Tous les produits
            </button>
            
            <button 
              onClick={() => setFiltreActif('PANIER')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: filtreActif === 'PANIER' ? '#007bff' : '#e9ecef',
                color: filtreActif === 'PANIER' ? '#fff' : '#333',
                cursor: 'pointer'
              }}
            >
              Uniquement le panier ({totalArticles})
            </button>
          </div>

          {/* Rendu Conditionnel de la Liste */}
          {produitsFiltres.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#6c757d', textAlign: 'center', margin: '30px 0' }}>
              🛒 Aucun produit à afficher dans cette vue.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
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

          {/* Total du Panier */}
          {totalPanier > 0 && (
            <div style={{ 
              marginTop: '25px', 
              borderTop: '2px solid #e9ecef', 
              paddingTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, color: '#28a745' }}>
                Total du panier : {totalPanier} €
              </h3>
              <button 
                onClick={viderPanier} 
                style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Vider le panier
              </button>
            </div>
          )}

          {/* Bloc Code Promo */}
          <form onSubmit={handleValidationPromo} style={{ marginTop: '1rem'}}>
            <input
              type="text"
              placeholder="Entrez le code promo"
              value={codePromo}
              onChange={(e) => setCodePromo(e.target.value)}
            />
            <button type="submit">Appliquer</button>
          </form>

          {/* Affichage du total et de la réduction */}
          {reduction > 0 && <p style={{ color: 'green' }}>Réduction appliquée : {reduction * 100}%</p>}
          <h3>Total du panier : {totalPanier.toFixed(2)} €</h3>
        </div>
      </Conteneur>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'learning',
        element: <LearningHome />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
        loader: (args) =>
          import('./pages/Products').then((module) => module.productsLoader(args))
      },
      {
        path: 'products/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        ),
        loader: (args) =>
          import('./pages/ProductDetail').then((module) => module.productDetailLoader(args))
      },
      {
        path: 'users',
        element: <UsersPage />,
        loader: usersLoader,
        children: [
          {
            path: ':id',
            element: <UserDetail />,
            loader: userDetailLoader
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;