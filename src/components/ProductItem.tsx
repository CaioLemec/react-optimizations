import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic';
import styles from './item.module.scss'

const AddProductToWishList = dynamic<AddProductToWishListProps>(()=> {
    return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
    loading: () => <span>carregando...</span>
})

interface ProductItemsProps {
    product: {
        id:number;
        price: number;
        priceFormatted: string;
        title: string;
    }
    onAddToWishList: (id: number) => void;
}

function ProductItemComponent ({product, onAddToWishList}: ProductItemsProps) {
    const [isAddingToWishList, setIsAddingToWishList] = useState(false);

    return (
        <div className={styles.contentContainer}>
            {product.title} <strong>{product.priceFormatted}</strong>
            <button onClick={()=> setIsAddingToWishList(true)}>Add at yout favotires?</button>
            { isAddingToWishList && (
            <AddProductToWishList
                onAddToWishList={()=> onAddToWishList(product.id)}
                onRequestClose={() => setIsAddingToWishList(false)}
            />
            )}
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
});