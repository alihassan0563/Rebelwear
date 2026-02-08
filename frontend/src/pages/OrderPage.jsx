import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const OrderPage = () => {
  const { productSlug, imageIndex } = useParams()
  const navigate = useNavigate()
  
  const [orderData, setOrderData] = useState({
    size: '',
    quantity: 1,
    email: '',
    phone: '',
    address: '',
    name: ''
  })
  
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    // Get product data from localStorage or fetch from API
    const productData = localStorage.getItem('selectedProduct')
    if (productData) {
      const parsedProduct = JSON.parse(productData)
      setProduct(parsedProduct)
      
      // Set selected image based on imageIndex
      const imgIndex = parseInt(imageIndex) || 0
      if (parsedProduct.images && parsedProduct.images[imgIndex]) {
        setSelectedImage(parsedProduct.images[imgIndex])
      }
    } else {
      navigate('/')
    }
  }, [productSlug, imageIndex, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!orderData.size || !orderData.email || !orderData.phone || !orderData.address || !orderData.name) {
      showNotification('Please fill in all required fields.', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(orderData.email)) {
      showNotification('Please enter a valid email address.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const orderPayload = {
        productName: product.title,
        productImage: selectedImage,
        size: orderData.size,
        quantity: orderData.quantity,
        price: product.price,
        customerName: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address
      }

      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api/order'
        : 'https://rebelwear.onrender.com/api/order'

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        showNotification('Order placed successfully! We will contact you soon.', 'success')
        setOrderData({
          size: '',
          quantity: 1,
          email: '',
          phone: '',
          address: '',
          name: ''
        })
      } else {
        showNotification(data.message || 'Failed to place order. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Order submission error:', error)
      showNotification('Network error. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {notification && (
        <div
          className={`fixed top-24 right-5 z-50 px-6 py-4 rounded-lg shadow-lg max-w-md ${
            notification.type === 'success'
              ? 'bg-green-500'
              : notification.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500'
          } text-white font-medium`}
        >
          {notification.message}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-secondary hover:text-secondary/80 font-medium"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 display-inline">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-auto object-cover rounded-xl"
            />
            <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
            <p className="text-secondary text-xl font-semibold mt-2">${product.price}</p>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Place Your Order</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Size *</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setOrderData(prev => ({ ...prev, size }))}
                      className={`py-2 px-4 border rounded-lg font-medium transition-colors ${
                        orderData.size === size
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-secondary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="100"
                  value={orderData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
              </div>

              {/* Customer Information */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={orderData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                <textarea
                  name="address"
                  rows="3"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Enter your complete shipping address"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold text-gray-800">{product.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Size:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      orderData.size 
                        ? 'bg-secondary text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {orderData.size || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold bg-white px-3 py-1 rounded-lg border">{orderData.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="font-semibold text-gray-800">${product.price}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-bold text-2xl text-secondary">
                      ${(parseFloat(product.price) * orderData.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-secondary to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-secondary/90 hover:to-red-600/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>🛒</span>
                    Place Order - ${(parseFloat(product.price) * orderData.quantity).toFixed(2)}
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage