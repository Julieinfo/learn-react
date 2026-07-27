import { useState } from 'react'
import CarteProduit from './CarteProduit'

function App() {
  const produit1 = {
    nom: 'Montre connectée',
    description: 'Mon premier produit',
    prix: 160
  }

  const produit2 = {
    nom: 'Ecouteur bluetooth',
    description: 'Mon deuxième produit',
    prix: 80
  }

  return (
    <div>
      <h1>Mon apprentissage React</h1>
      <CarteProduit nom={produit1.nom} description={produit1.description} prix={produit1.prix} />
      <CarteProduit nom={produit2.nom} description={produit2.description} prix={produit2.prix} />
    </div>
  )
}

export default App