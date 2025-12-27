import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', hash: '' },
    { path: '/', label: 'Collections', hash: '#collections' },
    { path: '/about', label: 'About', hash: '' },
    { path: '/', label: 'Products', hash: '#products' },
    { path: '/', label: 'Contact', hash: '#contact' },
  ]

  const handleNavClick = (e, hash) => {
    if (hash && location.pathname === '/') {
      e.preventDefault()
      const element = document.querySelector(hash)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-lg'
          : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="/rebelwear.jpg"
              alt="REBELWEAR Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-3xl font-semibold font-black tracking-wider text-primary">
              REBELWEAR
            </span>
          </Link>

          <ul className="hidden md:flex list-none gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path + link.hash}
                  onClick={(e) => handleNavClick(e, link.hash)}
                  className="text-text-dark font-medium text-xl text-orange-700 font-semibold text-red-600  transition-all duration-300 relative hover:text-secondary after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-2xl bg-transparent border-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-white p-4 rounded-lg shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path + link.hash}
                onClick={(e) => {
                  handleNavClick(e, link.hash)
                  setIsMenuOpen(false)
                }}
                className="text-text-dark font-medium py-2 hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


