import { Link } from 'react-router-dom'

export default function Tag({ text, slug }) {
  return (
    <Link
      to={`/berita?kategori=${slug || text}`}
      className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
    >
      {text}
    </Link>
  )
}
