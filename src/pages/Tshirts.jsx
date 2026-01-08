import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const Tshirts = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const products = [
    {
      title: 'Graphic Tee',
      price: '23.00',
      category: 'Streetwear',
      description: 'Sharp prints on soft cotton. Bold graphics on premium cotton.',
      images: [
        '/streetwear images/graphictee1.jpg',
        '/streetwear images/graphictee2.jpg',
        '/streetwear images/graphictee3.jpg',
        '/streetwear images/graphictee4.jpg',
        '/streetwear images/graphictee5.jpg',
        '/streetwear images/graphictee6.jpg',
      ],
      badge: 'Hot',
    },
    {
      title: 'Plain T-Shirt',
      price: '19.00',
      category: 'Streetwear',
      description: 'Classic comfort in premium cotton. Clean branding, everyday wear.',
      images: [
        '/streetwear images/plaintshirt1.jpg',
        '/streetwear images/plaintshirt2.jpg',
        '/streetwear images/plaintshirt3.jpg',
        '/streetwear images/plaintshirt4.jpg',
        '/streetwear images/plaintshirt5.jpg',
      ],
    },
    {
      title: 'Polo Shirt',
      price: '23.00',
      category: 'Streetwear',
      description: 'Elevated casual style. Clean branding, everyday wear.',
      images: [
        '/streetwear images/poloshirt1.jpg',
        '/streetwear images/poloshirt2.jpg',
        '/streetwear images/poloshirt3.jpg',
        '/streetwear images/poloshirt4.jpg',
        '/streetwear images/poloshirt5.jpg',
        '/streetwear images/poloshirt6.jpg',
        '/streetwear images/poloshirt7.jpg',
      ],
    },
    {
      title: 'Vintage Tee',
      price: '25.00',
      category: 'Streetwear',
      description: 'Retro vibes with modern comfort. Washed look with soft hand-feel.',
      images: [
        '/streetwear images/vintagetee1.jpg',
        '/streetwear images/vintagetee2.jpg',
        '/streetwear images/vintagetee3.jpg',
        '/streetwear images/vintagetee4.jpg',
        '/streetwear images/vintagetee5.jpg',
        '/streetwear images/vintagetee6.jpg',
      ],
    },
    {
      title: 'Street Tee Collection',
      price: '23.00',
      category: 'Streetwear',
      description: 'Bold graphics, premium fabric. Make a statement wherever you go.',
      images: [
        '/streetwear images/sh1.jpeg',
        '/streetwear images/sh2.jpeg',
        '/streetwear images/sh3.jpeg',
        '/streetwear images/Th1.jpg',
        '/streetwear images/Th2.jpg',
        '/streetwear images/Th8.jpg',
        '/streetwear images/Th9.jpg',
      ],
      badge: 'New',
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl   font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">T-Shirts</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Premium cotton tees with bold graphics.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">T-Shirts Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Tshirts


