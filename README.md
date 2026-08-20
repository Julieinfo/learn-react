# 🛒 learn-react

> 📚 **Projet fil rouge évolutif** — Ce dépôt retrace mon apprentissage de React au fil de mes cours. Chaque module ajoute de nouvelles fonctionnalités et de nouveaux concepts à une application de panier d'achat, développée pas à pas.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
![Status](https://img.shields.io/badge/Statut-En%20cours%20d'apprentissage-16A3B0?style=flat-square)

---

## 🎯 À propos

`learn-react` est mon bac à sable d'apprentissage : une **application de panier d'achat** qui grandit au fur et à mesure de mes cours React. Chaque nouveau module vient enrichir le code existant avec de nouvelles notions (state, hooks, routing, appels API...), sans repartir de zéro.

👉 Ce README est lui-même **évolutif** : il sera mis à jour à chaque nouveau module pour refléter l'état réel du projet.

---

## ✨ Aperçu des fonctionnalités actuelles

- 🛍️ Affichage dynamique d'une liste de produits sous forme de cartes (`CarteProduit.jsx`)
- 🔢 Gestion de l'état local avec `useState` pour ajouter ➕ ou diminuer ➖ la quantité d'un produit
- ⬆️ Remontée d'état (*Lifting State Up*) centralisée dans `App.jsx` pour gérer le panier global
- 💰 Calcul dynamique du prix total du panier via `.reduce()`
- 🛡️ Sécurisation du calcul contre les valeurs indéfinies ou manquantes (protection anti-`NaN`)
- 🗑️ Bouton de réinitialisation pour vider le panier en un clic
- 📦 Composant conteneur réutilisable (`Conteneur.jsx`) basé sur la prop `children`
- 🧯 Valeurs par défaut des props (*Default Props*) pour sécuriser l'affichage même en cas de données manquantes
- ❤️ Système de favoris ("Coup de cœur") par produit, avec state 100 % local (`useState`)
- 🔍 Filtres dynamiques ("Tous les produits" / "Uniquement le panier") via `.filter()`
- 👁️ Rendu conditionnel : message "panier vide" et bloc total masqué/affiché selon l'état
- 🔒 Formulaire d'inscription avec validation dynamique du mot de passe (`useEffect`)
- ⏱️ Debounce sur la validation (email/mot de passe) via un Custom Hook `useDebounce`
- 🔎 Recherche de produits en temps réel connectée à l'API DummyJSON (`RechercheProduits.jsx`)
- 🎨 Thème clair/sombre persistant (localStorage) via la Context API (`ThemeContext.jsx`, `BoutonTheme.jsx`)
- 🧠 Logique du panier extraite dans un Custom Hook dédié (`usePanier`), séparée du rendu de `App.jsx`

---

## 🗂️ Structure du projet

```
learn-react/
├── src/
│   ├── components/              # Composants UI réutilisables
│   │   ├── CarteProduit.jsx     # Composant : affichage d'un produit
│   │   ├── Conteneur.jsx        # Composant wrapper : adapte son style au thème via useTheme
│   │   ├── FormulaireInscription.jsx  # Composant : formulaire d'inscription avec validation
│   │   ├── BoutonTheme.jsx      # Composant : bascule le thème via useTheme
│   │   └── RechercheProduits.jsx # Composant : recherche produits (API DummyJSON)
│   ├── context/                 # Contextes React (état global transversal)
│   │   └── ThemeContext.jsx     # Contexte : ThemeProvider + hook useTheme
│   ├── hooks/                   # Hooks React personnalisés (Custom Hooks)
│   │   └── useDebounce.jsx      # Hook : temporisation des valeurs saisies
        └── usePanier.js         # State + handlers + données dérivées du panier
│   ├── App.jsx                  # Composant racine : dédié au rendu, consomme usePanier()
│   ├── App.css                  # Styles du composant App
│   ├── index.css                # Styles globaux
│   └── main.jsx                 # Point d'entrée de l'application
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Concepts React maîtrisés

| Concept | Ce que j'ai appris |
|---|---|
| 🎁 **Props vs 🔄 State** | Les props sont immuables et descendent du parent vers l'enfant ; le state est mutable via son setter et vit dans le composant qui le déclare |
| ⬆️ **Lifting State Up** | Remonter le state dans le composant parent commun (`App.jsx`) pour le partager entre plusieurs `CarteProduit` |
| 📦 **Prop `children`** | Créer des composants génériques et réutilisables (`Conteneur.jsx`) qui structurent du contenu sans le connaître à l'avance |
| 🔁 **`.map()`** | Générer dynamiquement une liste de composants à partir d'un tableau, avec une prop `key` unique et stable |
| ➕ **`.reduce()`** | Calculer une valeur agrégée (le total du panier) à partir d'un tableau, en sécurisant le calcul contre les données manquantes |
| 🧯 **Default Props** | Définir des valeurs par défaut via la déstructuration pour éviter les bugs d'affichage |
| 🏠 **State Local** | Isoler un état interne à un composant (`estFavori`) sans le remonter au parent si personne d'autre n'en a besoin |
| 🔎 **`.filter()`** | Créer un sous-tableau dérivé selon une condition, avant de le boucler avec `.map()` |
| 👁️ **Rendu conditionnel (`? :` et `&&`)** | Choisir entre deux affichages (ternaire) ou masquer un bloc entier selon une condition (`&&`) |
| 🚪 **Guard Clause** | Sortie précoce d'une fonction/composant pour simplifier la lecture |
| ⚡ **`useEffect`** | Gérer les effets secondaires, le tableau de dépendances et le cleanup |
| 🛑 **`AbortController`** | Annuler une requête `fetch` pour éviter fuites mémoire et race conditions |
| ⏱️ **Debounce** | Temporiser une action coûteuse via `setTimeout`/`clearTimeout` en cleanup |
| 🧩 **Custom Hooks** | Extraire une logique réutilisable (`useDebounce`) hors des composants |
| 🌐 **API réelle (DummyJSON)** | Chaîne `.then().catch()`, vérification `!res.ok`, filtrage strict de `AbortError` |
| 🚦 **4 états UI** | Initial / Chargement / Succès / Erreur |
| 🕳️ **Prop Drilling** | Problème résolu par la Context API pour les données globales et transversales |
| 🏗️ **Context API** | `createContext`, `Provider`, `useContext` — partage d'état sans passage de props explicite |
| 🧩 **Custom Hook de contexte** | `useTheme` : encapsule `useContext` avec garde-fou |
| 💾 **Lazy initial state + persistance** | `useState(() => ...)` + `useEffect` pour synchroniser avec `localStorage` |
| 🔌 **Consommation découplée** | `BoutonTheme`/`Conteneur` accèdent au thème sans props ni lien direct |
| 🧱 **Separation of Concerns** | `usePanier` isole logique métier (state, handlers, calculs) du rendu JSX de `App.jsx` |
| ⚖️ **Custom Hook vs Context** | Un Hook crée une instance de state par appel ; seul un Context partage réellement une même instance |
| 🏗️ **Motif Provider/Hook** | Encapsuler `createContext` sans l'exporter ; exposer uniquement Provider + Hook(s) publics |
| ⚡ **Découpage State/Dispatch** | Séparer un Context d'état (change souvent) d'un Context de dispatchers (référence stable) pour limiter les re-renders |
| 🚨 **Fail Fast** | `createContext(undefined)` + `throw new Error(...)` dans le Hook pour détecter immédiatement un usage hors Provider |

---

## 🗺️ Roadmap / Progression des cours

- [x] **Semaine 1 - Lundi** : Fondamentaux (Props, State, Composition, `children`)
- [x] **Semaine 1 - Mardi** : State Local & indépendance des composants (Favoris ❤️/🤍, `useState` local dans `CarteProduit.jsx`)
- [x] **Semaine 1 - Mercredi** : Listes filtrées & rendu conditionnel (`.filter()`, ternaire, `&&`)
- [x] **Semaine 1 - Jeudi** : Analyse de code réel (Guard Clause, handler unifié `[name]: value`)
- [x] **Semaine 1 - Vendredi** : Auto-évaluation (Feynman + Quiz) + Projet intégrateur (Gestionnaire de tâches)
- [x] **Semaine 2 - Lundi** : `useEffect`, cycle de vie, fonction de nettoyage
- [x] **Semaine 2 - Mardi** : `fetch` + `AbortController` (memory leaks, race conditions)
- [x] **Semaine 2 - Mercredi** : Validation dynamique + debounce
- [x] **Semaine 2 - Jeudi** : Custom Hooks (`useDebounce`)
- [x] **Semaine 2 - Vendredi** : Projet `RechercheProduits.jsx` (API DummyJSON, AbortController, 4 états UI)
- [x] **Semaine 3 - Lundi** : Context API (Provider/Consumer, `ThemeContext`, Custom Hook de contexte)
- [x] **Semaine 3 - Mardi** : Mini-projet Thème Dynamique (persistance localStorage, consommation découplée)
- [x] **Semaine 3 - Mercredi** : Refactoring `usePanier` (Separation of Concerns, Custom Hook vs Context)
- [x] **Semaine 3 - Jeudi** : Context API dans les librairies open-source (motif Provider/Hook, découpage state/dispatch, fail fast)
- [ ] **Semaine 3 - Vendredi** : *À venir*

> 🔄 Cette liste sera mise à jour à chaque nouveau module de cours.

---

## 🚀 Installation et lancement local

### 1. Cloner le projet

```bash
git clone https://github.com/Julieinfo/learn-react.git
cd learn-react
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera alors accessible sur `http://localhost:5173`

---

## 📌 Note

Ce projet n'a pas vocation à être un produit final, mais un **support d'apprentissage** progressif. N'hésitez pas à suivre son évolution au fil des commits !
