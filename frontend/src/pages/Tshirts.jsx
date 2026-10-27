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
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105216/rebelwear/streetwear-images/graphictee1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105217/rebelwear/streetwear-images/graphictee2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105218/rebelwear/streetwear-images/graphictee3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105218/rebelwear/streetwear-images/graphictee4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105220/rebelwear/streetwear-images/graphictee5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105221/rebelwear/streetwear-images/graphictee6.jpg',
      ],
      badge: 'Hot',
    },
    {
      title: 'Plain T-Shirt',
      price: '19.00',
      category: 'Streetwear',
      description: 'Classic comfort in premium cotton. Clean branding, everyday wear.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105244/rebelwear/streetwear-images/plaintshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105245/rebelwear/streetwear-images/plaintshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105246/rebelwear/streetwear-images/plaintshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105247/rebelwear/streetwear-images/plaintshirt4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105247/rebelwear/streetwear-images/plaintshirt5.jpg',
      ],
    },
    {
      title: 'Polo Shirt',
      price: '23.00',
      category: 'Streetwear',
      description: 'Elevated casual style. Clean branding, everyday wear.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105248/rebelwear/streetwear-images/poloshirt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105249/rebelwear/streetwear-images/poloshirt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105250/rebelwear/streetwear-images/poloshirt3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105251/rebelwear/streetwear-images/poloshirt4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105252/rebelwear/streetwear-images/poloshirt5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105252/rebelwear/streetwear-images/poloshirt6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105253/rebelwear/streetwear-images/poloshirt7.jpg',
      ],
    },
    {
      title: 'Vintage Tee',
      price: '25.00',
      category: 'Streetwear',
      description: 'Retro vibes with modern comfort. Washed look with soft hand-feel.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105361/rebelwear/streetwear-images/vintagetee1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105362/rebelwear/streetwear-images/vintagetee2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105363/rebelwear/streetwear-images/vintagetee3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105364/rebelwear/streetwear-images/vintagetee4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105365/rebelwear/streetwear-images/vintagetee5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105366/rebelwear/streetwear-images/vintagetee6.jpg',
      ],
    },
    {
      title: 'Street Tee Collection',
      price: '23.00',
      category: 'Streetwear',
      description: 'Bold graphics, premium fabric. Make a statement wherever you go.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105265/rebelwear/streetwear-images/sh2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105266/rebelwear/streetwear-images/sh3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105342/rebelwear/streetwear-images/th1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105343/rebelwear/streetwear-images/th2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105344/rebelwear/streetwear-images/th8.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105345/rebelwear/streetwear-images/th9.jpg',
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


