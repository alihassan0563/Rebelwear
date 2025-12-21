import { useState, useEffect } from 'react'

const ImageSlider = ({ images, autoPlay = false, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, interval)
      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
        <img
          src={images[0]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-t-3xl group">
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-10"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-10"
        aria-label="Next image"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider


