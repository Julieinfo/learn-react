# learn-react

Projet d'apprentissage React construit progressivement autour d'un panier, d'exercices de gestion d'état et d'une application multi-pages. Le dépôt couvre les fondamentaux React jusqu'à React Query, React Router, le code splitting et le profiling.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black&style=flat-square)

## Objectifs pédagogiques

- Construire des composants déclaratifs et composables.
- Séparer l'interface, la logique métier et la gestion des données.
- Maîtriser l'immutabilité, le flux unidirectionnel et les transitions d'état.
- Utiliser les Hooks natifs, les Hooks personnalisés, Context API et reducers.
- Mesurer les performances avant d'appliquer une mémoïsation ciblée.
- Mettre en œuvre la gestion d'état serveur avec TanStack Query.
- Construire un routage multi-pages avec loaders, erreurs et code splitting.

## Fonctionnalités actuelles

- Panier avec quantités, filtres, promotion et persistance locale.
- Contextes indépendants pour le thème et le panier.
- Formulaire contrôlé avec validation et debounce.
- Todo App avec reducer et historique d'annulation.
- CRUD produits avec `useReducer`.
- Compound Components : `Accordion`, `Tabs` et `FormModal`.
- Sélecteur réutilisable avec `useCompoundSelect`.
- Démonstrations de `useMemo`, `useCallback`, `React.memo` et `Profiler`.
- Requêtes, mutations, cache et invalidation avec TanStack Query.
- Suspense et Error Boundary avec erreurs simulées.
- Routes imbriquées pour les utilisateurs avec `Outlet` et loaders.
- Mini-Shop avec catalogue, détails produits, route d'erreur et navigation.
- PerfApp S8 sur `/perf-shop` avec fetching réel, filtrage et chunks lazy.

## Roadmap / progression des cours

Chaque semaine suit le même format. Les modules conservés sont limités aux quatre journées du programme : lundi, mardi, mercredi et samedi.

### Semaine 1 — Fondamentaux et état local

- [x] **Lundi** — Props, state, composition et prop `children` avec `Conteneur`.
- [x] **Mardi** — État local et indépendance des cartes produit avec `CarteProduit`.
- [x] **Mercredi** — Listes filtrées, rendu conditionnel et filtres du panier dans `Semaine1`.
- [x] **Samedi** — Mise en pratique dans le panier : quantités, promotion et total calculé.

### Semaine 2 — Effets et appels API

- [x] **Lundi** — Cycle de vie, `useEffect` et nettoyage dans `RechercheProduits`.
- [x] **Mardi** — `fetch`, `AbortController` et prévention des courses réseau.
- [x] **Mercredi** — Validation de formulaire et debounce avec `useDebounce`.
- [x] **Samedi** — Recherche de produits avec états initial, chargement, succès et erreur.

### Semaine 3 — Context API

- [x] **Lundi** — Provider, Consumer et hook de contexte avec `ThemeContext`.
- [x] **Mardi** — Thème clair/sombre et persistance avec `localStorage`.
- [x] **Mercredi** — Séparation logique/UI avec `CartContext` et `useCart`.
- [x] **Samedi** — Composition des contextes thème et panier dans `main.jsx`.

### Semaine 4 — Reducers et transitions d'état

- [x] **Lundi** — Reducer pur, actions et dispatch avec `panierReducer`.
- [x] **Mardi** — Panier complet, persistance et séparation des effets dans `CartContext`.
- [x] **Mercredi** — Todo App, historique `past/present` et calculs dérivés.
- [x] **Samedi** — Gestion CRUD avec `GestionProduits` et `todoReducer`.

### Semaine 5 — Performance React

- [x] **Lundi** — Choix raisonné entre `useMemo` et `useCallback`.
- [x] **Mardi** — Mesure du rendu avec `CompteurProfiler` et l'API `Profiler`.
- [x] **Mercredi** — Optimisation du dashboard avec calculs et callbacks mémorisés.
- [x] **Samedi** — Projet pratique dans `ProjetIntegrateurS5`.

### Semaine 6 — Composition avancée

- [x] **Lundi** — Compound Component `Accordion` et contexte interne.
- [x] **Mardi** — Compound Component `Tabs` avec navigation accessible.
- [x] **Mercredi** — Hook `useCompoundSelect` et sélection avec toggle.
- [x] **Samedi** — Projet intégrateur S6 avec `FormModal` et formulaire contrôlé.

### Semaine 7 — Data Fetching

- [x] **Lundi** — `useQuery`, cache, fraîcheur et invalidation avec `ReactQueryDemo`.
- [x] **Mardi** — Liste utilisateurs, états de chargement, erreurs, retry et refetch.
- [x] **Mercredi** — `useSuspenseQuery`, `Suspense` et `ErrorBoundary`.
- [x] **Samedi** — Projet intégrateur posts avec mutations et Query Key Factory.

### Semaine 8 — Routing et code splitting

- [x] **Lundi** — `createBrowserRouter`, `Outlet`, loaders et `useLoaderData`.
- [x] **Mardi** — Mini-Shop multi-pages : accueil, catalogue, détails, à propos et erreur.
- [x] **Mercredi** — `lazy()`, `Suspense` et loaders importés dynamiquement.
- [x] **Samedi** — PerfApp S8 : fetching réel, filtrage par `useMemo` et profiling.

## Concepts d'ingénierie React

### Architecture et flux de données

- **Immutabilité** : les reducers produisent un nouvel état sans modifier l'état précédent.
- **Flux unidirectionnel** : les données descendent via les props et les événements remontent via des callbacks ou `dispatch`.
- **Découplage UI/logique** : `useCart`, `useDebounce` et `useCompoundSelect` isolent la logique réutilisable.
- **Context ciblé** : chaque contexte expose uniquement les données transversales de son domaine.
- **Séparation des responsabilités** : loaders, pages, layouts, composants UI et reducers ont des rôles distincts.

### Performance et fiabilité

- **Mémoïsation ciblée** : `useMemo`, `useCallback` et `React.memo` sont utilisés lorsque la stabilité des références ou le coût d'un calcul le justifie.
- **Mesure avant optimisation** : `Profiler` fournit la durée réelle des phases de rendu.
- **Gestion des états asynchrones** : les interfaces distinguent chargement, succès, erreur et rechargement.
- **Code splitting** : `React.lazy()` et `Suspense` chargent les pages secondaires à la demande.
- **Gestion des erreurs** : les loaders et les Error Boundaries fournissent des interfaces de repli explicites.

## Routes principales

| Route | Rôle |
|---|---|
| `/` | Accueil du Mini-Shop. |
| `/learning` | Parcours pédagogique des semaines 1 à 8. |
| `/about` | Présentation du projet. |
| `/products` | Catalogue chargé par loader et code split. |
| `/products/:id` | Détail d'un produit chargé par loader. |
| `/users` | Liste de quatre utilisateurs avec route imbriquée. |
| `/users/:id` | Détail d'un utilisateur chargé par loader. |
| `/perf-shop` | Accueil du projet intégrateur S8. |
| `/perf-shop/products` | Catalogue filtrable de la PerfApp. |
| `/perf-shop/products/:id` | Détail produit de la PerfApp. |

## Arborescence utile

Les répertoires générés comme `node_modules/` et `dist/` ne sont pas inclus dans ce schéma.

```text
learn-react/
├── docs/
│   └── fiche-analyse-avertissements-react-vite.md
├── public/
├── src/
│   ├── api/
│   │   └── queryKeys.js
│   ├── components/
│   │   ├── weeks/
│   │   │   ├── Semaine1.jsx
│   │   │   ├── Semaine2.jsx
│   │   │   ├── Semaine3.jsx
│   │   │   ├── Semaine4.jsx
│   │   │   ├── Semaine5.jsx
│   │   │   ├── Semaine6.jsx
│   │   │   ├── Semaine7.jsx
│   │   │   └── Semaine8.jsx
│   │   ├── Accordion.jsx
│   │   ├── BoutonTheme.jsx
│   │   ├── CarteProduit.jsx
│   │   ├── CompoundSelectDemo.jsx
│   │   ├── CompteurProfiler.jsx
│   │   ├── Conteneur.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FormModal.jsx
│   │   ├── FormulaireInscription.jsx
│   │   ├── GestionProduits.jsx
│   │   ├── IntegratorProjectS7.jsx
│   │   ├── ProjetIntegrateurS5.jsx
│   │   ├── ProjetIntegrateurS6.jsx
│   │   ├── ReactQueryDemo.jsx
│   │   ├── RechercheProduits.jsx
│   │   ├── SuspenseFetchDemo.jsx
│   │   ├── Tabs.jsx
│   │   ├── TodoApp.jsx
│   │   └── UserListMiniProject.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useCompoundSelect.js
│   │   └── useDebounce.jsx
│   ├── layouts/
│   │   ├── AppLayout.jsx
│   │   └── RootLayout.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Catalog.jsx
│   │   ├── ErrorView.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductView.jsx
│   │   ├── Products.jsx
│   │   ├── UserDetail.jsx
│   │   └── UsersPage.jsx
│   ├── reducers/
│   │   ├── panierReducer.js
│   │   └── todoReducer.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Installation et commandes

```bash
npm install
npm run dev
```

Contrôles qualité :

```bash
npm run lint
npm run build
```

- `npm run lint` vérifie les erreurs et avertissements de qualité statique.
- `npm run build` valide la compilation de production et les chunks générés par le code splitting.

## Documentation technique

La fiche [Avertissements CSS et erreurs de Source Maps](docs/fiche-analyse-avertissements-react-vite.md) décrit le diagnostic des préfixes CSS propriétaires, des fichiers `.map` et des différences entre développement et production.
