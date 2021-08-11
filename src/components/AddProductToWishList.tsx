import styles from './wishList.module.scss'

export interface AddProductToWishListProps {
    onAddToWishList: () => void;
    onRequestClose: () => void;
}

export function AddProductToWishList( {
    onAddToWishList,
    onRequestClose
}:AddProductToWishListProps) {
    return(
        <span className={styles.contentContainer}>
            Add to favorites?
            <button onClick={onAddToWishList}>Yes</button>
            <button onClick={onRequestClose}>No</button>
        </span>
    )
}