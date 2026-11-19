import { useState } from 'react'
import { getApiBaseUrl } from '../utils/apiConfig'
import { trackContactInquiry } from '../utils/analytics'

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
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('File is too large. Maximum file size is 5MB.', 'error')
        e.target.value = ''
        setFormData({ ...formData, designFile: null })
        setPreview(null)
        return
      }

      setFormData({ ...formData, designFile: file })

      if (file.type.startsWith('image/') && !file.type.includes('svg')) {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const removeFile = () => {
    setFormData({ ...formData, designFile: null })
    setPreview(null)
    const fileInput = document.getElementById('design-file')
    if (fileInput) fileInput.value = ''
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
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('inquiry', formData.inquiry)
      formDataToSend.append('message', formData.message)
      if (formData.designFile) {
        formDataToSend.append('designFile', formData.designFile)
      }

      const apiBase = getApiBaseUrl();

      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        trackContactInquiry(formData.inquiry);
        showNotification(
          'Thank you for your inquiry! We will get back to you within 24-48 hours.',
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
        showNotification(result.message || 'Failed to send inquiry. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Email send error:', error)
      showNotification('Failed to send. Please try again or contact us directly.', 'error')
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
              - JPG, PNG, WEBP, PDF, AI, PSD (Max 5MB)
            </span>
          </label>
          <input
            type="file"
            id="design-file"
            name="designFile"
            accept="image/*,.pdf,.ai,.eps,.psd,.zip"
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl"
          />
          {formData.designFile && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Design Preview"
                    className="w-14 h-14 object-cover rounded-lg border border-gray-300 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 border border-gray-300">
                    {formData.designFile.name.split('.').pop() || 'FILE'}
                  </div>
                )}
                <div className="truncate">
                  <p className="text-sm font-semibold text-text truncate">
                    {formData.designFile.name}
                  </p>
                  <p className="text-xs text-text-light">
                    {(formData.designFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="ml-3 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
              >
                Remove
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


