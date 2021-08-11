import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized';
import styles from './search.module.scss'

interface SearchResultsProps {
    totalPrice: number;
    results: Array<{
        id:number;
        price: number;
        priceFormatted: string;
        title: string;
    }>
    onAddToWishList: (id: number) => void;
}

export function SearchResults({totalPrice, results, onAddToWishList}: SearchResultsProps) {
    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
        <div key={key} style={style}>
        <ProductItem 
            product={results[index]} 
            onAddToWishList={onAddToWishList}
        />
        </div>
        );
    }

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      })

    return (
        <div className={styles.contentContainer}>
            <h2>Amount {formatter.format(totalPrice)}</h2>
            <List 
                height={400}
                rowHeight={40}
                width={650}
                overscanRowCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}