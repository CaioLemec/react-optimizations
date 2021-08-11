import { FormEvent, useState, useCallback } from "react"
import { SearchResults } from "../components/SearchResults";
import styles from './home.module.scss'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
}

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      };
    })

    const totalPrice =  data.reduce((total, product) => {
          return total + product.price;
      }, 0)

    setResults({totalPrice, data: products});
  }

  const addToWishList = useCallback( async (id: number) => {
    console.log(id);
  }, [])

  return (
    <div className={styles.contentContainer}>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResults 
        results={results.data} 
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}
