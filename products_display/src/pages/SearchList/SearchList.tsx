import { Link } from "react-router-dom"
import './searchlist.css'

/*Search list*/

type Product = { id: string; name: string }

type Props = {
  search: string
  products: Product[]
  onSelect: () => void
}

export function SearchList({ search, products, onSelect }: Props) {
  if (!search.trim()) return null

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5)

  if (filtered.length === 0) return null

  return (
    <ul className="search-list">
      {filtered.map(p => (
        <li key={p.id} onClick={onSelect}>
          <Link to={`/product_details/${p.id}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  )
}
