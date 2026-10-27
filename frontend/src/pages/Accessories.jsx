import { useEffect } from 'react'
import ProductGallery from '../components/ProductGallery'

const Accessories = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const products = [
    {
      title: 'Glasses',
      price: '29.00',
      category: 'Accessories',
      description: 'Stylish eyewear to complete your look. Premium quality frames.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105211/rebelwear/streetwear-images/glasses1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105212/rebelwear/streetwear-images/glasses2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105213/rebelwear/streetwear-images/glasses3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105214/rebelwear/streetwear-images/glasses4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105215/rebelwear/streetwear-images/glasses5.jpg',
      ],
    },
    {
      title: 'Cap and Hats',
      price: '22.00',
      category: 'Accessories',
      description: 'Headwear that defines your style. Custom embroidery available.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105188/rebelwear/streetwear-images/cap1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105189/rebelwear/streetwear-images/cap2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105190/rebelwear/streetwear-images/cap3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105190/rebelwear/streetwear-images/cap4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105191/rebelwear/streetwear-images/cap5.jpg',
      ],
    },
    {
      title: 'Beanies',
      price: '15.00',
      category: 'Accessories',
      description: 'Warm and stylish headwear for every season. Adjustable fit.',
      images: [
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105179/rebelwear/streetwear-images/benies6.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105175/rebelwear/streetwear-images/benies2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105176/rebelwear/streetwear-images/benies3.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105177/rebelwear/streetwear-images/benies4.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105178/rebelwear/streetwear-images/benies5.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105174/rebelwear/streetwear-images/benies1.jpg',
      ],
    },
    {
      title: 'Other Accessories',
      price: '25.00',
      category: 'Accessories',
      description: 'Everything else: socks, bags, belts, and more. Complete your look with premium accessories.',
      images: [
       
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105171/rebelwear/streetwear-images/belt1.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105172/rebelwear/streetwear-images/belt2.jpg',
        'https://res.cloudinary.com/vevuagbx/image/upload/f_auto,q_auto/v1790105173/rebelwear/streetwear-images/belt3.jpg',
        // Add more socks, bags, belts images here if you get them later.
      ],
    },
  ]

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-900/90"></div>
        <div className="container relative z-10 text-center max-w-4xl px-5">
          <h1 className="text-2xl md:text-7xl  font-bold mb-4 tracking-wider uppercase bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">Accessories</h1>
          <p className="text-xl font-light mb-4 text-gray-300">Complete your look with our accessories.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="section-title mb-12">Accessories Collection</h2>
          <ProductGallery products={products} />
        </div>
      </section>
    </div>
  )
}

export default Accessories


