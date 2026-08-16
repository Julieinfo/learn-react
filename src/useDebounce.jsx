/*
 * Mémo L3 - useDebounce
 *
 * Rôle principal du hook : centraliser une logique de temporisation afin de
 * retarder la mise à jour d'une valeur jusqu'à ce qu'une pause soit constatée.
 * Dans une architecture React, ce type de hook est utile pour éviter des
 * recalculs coûteux ou des requêtes trop fréquentes pendant la frappe d'un
 * utilisateur. Il garde l'état local du composant sans dépendre d'un état
 * global, et il permet de mieux contrôler la réactivité de l'interface.
 *
 * Le concept clé ici est le debounce / temporisation : on ne traite pas chaque
 * changement immédiatement, mais seulement après un délai donné.
 */

import { useState, useEffect } from 'react';

// Note d'apprentissage : useState permet de gérer un état local au hook.
// Ici, debouncedValue est initialisé avec la valeur reçue en paramètre.
// On respecte le principe d'immutabilité du state : on ne modifie pas la valeur
// précédemment stockée, on en crée une nouvelle via setDebouncedValue.
//
// Le hook reçoit deux paramètres :
// - value : la donnée surveillée
// - delay : le délai avant validation (300 ms par défaut)
//
// La proposition de ce hook est simple et réutilisable : il ne dépend pas d'un
// contexte global, il ne fait pas de mutation directe et il retourne une valeur
// dérivée, prête à être consommée par un composant.
function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    // Mémo L3 : useEffect est un parfait exemple de side effect / effet
    // secondaire. L'effet ici ne modifie pas le DOM directement, mais lance un
    // timer setTimeout pour retarder la mise à jour de l'état.
    //
    // Le tableau de dépendances [value, delay] est crucial : il indique à React
    // quelles variables doivent déclencher l'effet. Si value ou delay change,
    // l'effet est relancé. C'est la base de la réactivité dans le cycle de vie
    // des hooks.
    useEffect(() => {
        const handler = setTimeout(() => {
            // On met à jour l'état local après le délai. Cela permet de
            // synchroniser la valeur temporisée avec la dernière entrée saisie.
            setDebouncedValue(value);
        }, delay);

        // Fonction de nettoyage / cleanup : on annule le timer en cours avant de
        // démarrer le prochain. Cela évite les effets de bord et les mises à jour
        // obsolètes, qui peuvent autrement produire des comportements incohérents
        // dans une interface dynamique.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    // Retour du hook : on expose la valeur retardée au composant appelant.
    // Cette donnée peut ensuite être utilisée dans un rendu conditionnel ou dans
    // une logique métier sans devoir réécrire la temporisation.
    return debouncedValue;
}

export default useDebounce;