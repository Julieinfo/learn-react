function CarteProduit({nom, description, prix}) {
    return (
        <div>
            <h2>{nom}</h2>
            <p>{description}</p>
            <p>{prix}</p>
        </div>
    )
}

export default CarteProduit