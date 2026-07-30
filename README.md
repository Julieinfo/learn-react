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

---

## 🗂️ Structure du projet

```
learn-react/
├── src/
│   ├── App.jsx           # Composant racine : state global + logique métier du panier
│   ├── CarteProduit.jsx  # Composant réutilisable : affichage d'un produit
│   ├── Conteneur.jsx     # Composant wrapper : structure via la prop `children`
│   ├── main.jsx          # Point d'entrée de l'application
│   └── index.css         # Styles globaux
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

---

## 🗺️ Roadmap / Progression des cours

- [x] **Jour 1** : Fondamentaux (Props, State, Composition, `children`)
- [x] **Jour 2** : State Local & indépendance des composants (Favoris ❤️/🤍, `useState` local dans `CarteProduit.jsx`)
- [x] **Jour 3** : Listes filtrées & rendu conditionnel (`.filter()`, ternaire, `&&`)
- [ ] **Jour 4** : *À venir*
- [ ] **Jour 5** : *À venir*

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

L'application sera alors accessible sur `http://localhost:5173` 🎉

---

## 📌 Note

Ce projet n'a pas vocation à être un produit final, mais un **support d'apprentissage** progressif. N'hésitez pas à suivre son évolution au fil des commits ! 🙌
