import React, { useState, useEffect } from 'react'
import '../styles/theme.css'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function CreateFood() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    price: '',
    availableQuantity: ''
  })
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)


  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview)
      }
    }
  }, [videoPreview])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVideoChange = (event) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null
    setVideoFile(file)
    setVideoPreview((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev)
      }
      return file ? URL.createObjectURL(file) : null
    })
  }





  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('discription', formData.description)
    payload.append('category', formData.category)
    payload.append('tags', formData.tags)
    payload.append('price', formData.price)
    payload.append('availableQuantity', formData.availableQuantity)
    if (videoFile) {
      payload.append('video', videoFile)
    }

    try {
      const response = await axios.post('http://localhost:8080/api/food', payload, {
        withCredentials: true
      })
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error(error?.response?.data || error.message)
    }
  }

  return (
    <div className="create-food-page">
      <nav className="partner-nav">
        <Link to="/createFood">Create Food</Link>
        <Link to="/partner/orders">My Orders</Link>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </nav>
      <div className="create-food-card">
        <header className="create-food-header">
          <h1>Create food item</h1>
          <p>Provide details to showcase your dish.</p>
        </header>
        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name">Food name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Eg. Spicy ramen bowl"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the flavors, ingredients, or story behind this dish."
            />
          </div>
          <div className="field-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Eg. spicy, vegetarian, italian (comma separated)"
            />
          </div>
          <div className="field-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Eg. 10.99"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="availableQuantity">Available Quantity</label>
            <input
              id="availableQuantity"
              name="availableQuantity"
              type="number"
              value={formData.availableQuantity}
              onChange={handleChange}
              placeholder="Eg. 50"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="video">Video file</label>
            <input
              id="video"
              name="video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="file-input"
            />
            <span className="field-hint">Upload a video from your device.</span>
            {(videoFile || videoPreview) && (
              <div className="file-meta">
                {videoFile && <span className="field-selected">{videoFile.name}</span>}
                {videoPreview && (
                  <video
                    className="video-preview"
                    src={videoPreview}
                    controls
                    playsInline
                  />
                )}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-action">Save food item</button>
            <button type="button" className="secondary-action">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
