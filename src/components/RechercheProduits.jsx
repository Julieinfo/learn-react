import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import Conteneur from './Conteneur';

function RechercheProduits() {
    const [recherche, setRecherche] = useState('');
    const [resultats, setResultats] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState(null);

    // 1. Temporisation de la valeur saisie
    const rechercheDebounced = useDebounce(recherche, 400);

    // 2. Effet secondaire d'appel API
    useEffect(() => {
        // Si la recherche est vide, on réinitialise et on stoppe
        if (!rechercheDebounced.trim()) {
        setResultats([]);
        setErreur(null);
        return;
        }

        const controller = new AbortController();
        setChargement(true);
        setErreur(null);

        fetch(`https://dummyjson.com/products/search?q=${rechercheDebounced}`, {
        signal: controller.signal,
        })
        .then((res) => {
            if (!res.ok) throw new Error('Erreur lors de la récupération');
            return res.json();
        })
        .then((data) => {
            setResultats(data.products);
            setChargement(false);
        })
        .catch((err) => {
            if (err.name !== 'AbortError') {
                setErreur(err.message);
                setChargement(false);
            }
        });

        // Cleanup : Annulation de la requête au démontage / changement de valeur
        return () => controller.abort();
    }, [rechercheDebounced]);

    return (
        <Conteneur titre="🔍 Recherche de Produits en temps réel">
        <input
            type="text"
            placeholder="Chercher un produit (ex: phone, perfume)..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginBottom: '15px',
            boxSizing: 'border-box'
            }}
        />

        {chargement && <p>⏳ Chargement des résultats...</p>}
        {erreur && <p style={{ color: 'red' }}>⚠️ {erreur}</p>}

        {!chargement && !erreur && resultats.length === 0 && rechercheDebounced && (
            <p>Aucun produit trouvé.</p>
        )}

        <ul style={{ listStyle: 'none', padding: 0 }}>
            {resultats.map((produit) => (
            <li
                key={produit.id}
                style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between'
                }}
            >
                <span>{produit.title}</span>
                <strong>{produit.price} $</strong>
            </li>
            ))}
        </ul>
        </Conteneur>
    );
}

export default RechercheProduits;