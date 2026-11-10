import { useState, useEffect } from 'react'
import { cld } from '../utils/cloudinary'

const ImageSlider = ({
  images,
  autoPlay = false,
  interval = 4000,
  onImageChange,
  width = 600,
  altText = "REBELWEAR Custom Apparel"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          const newIndex = (prev + 1) % images.length
          onImageChange?.(newIndex)
          return newIndex
        })
      }, interval)
      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, images.length, onImageChange])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    onImageChange?.(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % images.length
      onImageChange?.(newIndex)
      return newIndex
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + images.length) % images.length
      onImageChange?.(newIndex)
      return newIndex
    })
  }

  if (images.length === 0) return null
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full overflow-hidden rounded-t-3xl">
        <img
          src={cld(images[0], width)}
          alt={altText}
          loading="lazy"
          decoding="async"
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
            src={cld(img, width)}
            alt={`${altText} - View ${index + 1}`}
            loading="lazy"
            decoding="async"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          prevSlide()
        }}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-20"
        aria-label="Previous image"
      >
        ‹
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          nextSlide()
        }}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 z-20"
        aria-label="Next image"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToSlide(index)
            }}
            className={`w-2.5 h-2.5 rounded-full border-none transition-all duration-300 cursor-pointer ${
              index === currentIndex ? 'bg-secondary w-6' : 'bg-white/60 hover:bg-white'
            }`}
            aria-label={`Jump to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
