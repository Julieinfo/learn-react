import { useState } from 'react'

function CarteProduit({nom, description, prix}) {
    const [quantite, setQuantite] = useState(0)

    return (
        <div>
            <h2>{nom}</h2>
            <p>{description}</p>
            <p>{prix}</p>
            <button onClick={() => setQuantite(quantite + 1)}>Ajouter au panier</button>
            <p>Dans le panier : {quantite}</p>
        </div>
    )
}

export default CarteProduit