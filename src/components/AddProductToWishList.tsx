export interface AddProductToWishListProps {
    onAddToWishList: () => void;
    onRequestClose: () => void;
}

export function AddProductToWishList( {
    onAddToWishList,
    onRequestClose
}:AddProductToWishListProps) {
    return(
        <span>
            Add to favorites?
            <button onClick={onAddToWishList}>Yes</button>
            <button onClick={onRequestClose}>No</button>
        </span>
    )
}