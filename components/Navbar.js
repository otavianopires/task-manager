export default function Navbar({ children }) {
  return (
    <nav>
      <ul className="flex items-center gap-1 font-bold">
        { children }
      </ul>
    </nav>
  )
}