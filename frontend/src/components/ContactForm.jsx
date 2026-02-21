import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: '',
    designFile: null,
  })
  const [preview, setPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'designFile' && files && files[0]) {
      const file = files[0]
      if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error')
        e.target.value = ''
        return
      }
      setFormData({ ...formData, designFile: file })
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.onerror = () => showNotification('Failed to read file', 'error')
      reader.readAsDataURL(file)
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const removeFile = () => {
    setFormData({ ...formData, designFile: null })
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.inquiry || !formData.message) {
      showNotification('Please fill in all required fields.', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const API_URL = window.location.hostname === 'localhost' 
        ? '/api/contact'
        : 'https://rebelwear.onrender.com/api/contact'

      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || '')
      formDataToSend.append('inquiry', formData.inquiry)
      formDataToSend.append('message', formData.message)
      
      if (formData.designFile) {
        formDataToSend.append('designFile', formData.designFile)
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok && response.status >= 500) {
        throw new Error('Server error')
      }

      const data = await response.json()

      if (response.ok && data.success) {
        showNotification(
          data.message || 'Thank you for your inquiry! We will get back to you within 24-48 hours.',
          'success'
        )
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiry: '',
          message: '',
          designFile: null,
        })
        setPreview(null)
      } else {
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((err) => err.msg).join(', ')
          showNotification(errorMessages, 'error')
        } else {
          showNotification(data.message || 'An error occurred. Please try again.', 'error')
        }
      }
    } catch (error) {
      showNotification('Network error. Please check your connection and try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {notification && (
        <div
          className={`fixed top-24 right-5 z-50 px-6 py-4 rounded-lg shadow-lg max-w-md animate-slide-in ${
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

      <form onSubmit={handleSubmit} className="bg-bg-light p-10 rounded-3xl">
        <div className="mb-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="mb-6">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="mb-6">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="mb-6">
          <select
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none focus:border-secondary"
          >
            <option value="">Select Inquiry Type</option>
            <option value="custom">Custom Design</option>
            <option value="bulk">Bulk Order</option>
            <option value="quote">Request Quote</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <textarea
            name="message"
            rows="5"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl font-sans text-base transition-all duration-300 focus:outline-none focus:border-secondary resize-y"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">
            Upload Your Design (Optional)
            <span className="text-text-light font-normal text-sm ml-2">
              - JPG, PNG, PDF (Max 5MB)
            </span>
          </label>
          <input
            type="file"
            id="design-file"
            name="designFile"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl"
          />
          {preview && (
            <div className="mt-4 relative">
              <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
              <button
                type="button"
                onClick={removeFile}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove File
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </>
  )
}

export default ContactForm


