import React, { useState, useEffect } from 'react'
import '../styles/theme.css'
import './CreateFood.css'
import axios from 'axios'
import { API_BASE_URL } from '../api'
import { useNavigate, Link, useParams } from 'react-router-dom'

function CreateFood() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = !!id
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

  // Fetch existing food item data when editing
  useEffect(() => {
    if (isEditing && id) {
      fetchFoodItem()
    }
  }, [isEditing, id])

  const fetchFoodItem = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/food/${id}`, {
        withCredentials: true
      })
      const item = response.data
      setFormData({
        name: item.name || '',
        description: item.discription || '',
        category: item.category || '',
        tags: item.tags || '',
        price: item.price || '',
        availableQuantity: item.availableQuantity || ''
      })
      // Set video preview if there's an existing video
      if (item.video) {
        setVideoPreview(item.video)
      }
    } catch (error) {
      navigate('/partner/dashboard')
    }
  }

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
      let response
      if (isEditing) {
        // Update existing food item
        response = await axios.put(`${API_BASE_URL}/api/food/${id}`, payload, {
          withCredentials: true
        })
      } else {
        // Create new food item
        response = await axios.post(`${API_BASE_URL}/api/food`, payload, {
          withCredentials: true
        })
      }
      navigate('/partner/dashboard')
    } catch (error) {
    }
  }

  return (
    <div className="create-food-page">
      <nav className="partner-nav">
        <Link to="/createFood" className="nav-link">Create Food</Link>
        <Link to="/partner/orders" className="nav-link">My Orders</Link>
        <button onClick={() => navigate('/partner/dashboard')} className="nav-link">Back to Dashboard</button>
      </nav>
      <div className={`create-food-card ${isEditing ? 'editing' : ''}`}>
        <header className="create-food-header">
          <h1 className={isEditing ? 'editing' : ''}>{isEditing ? 'Edit food item' : 'Create food item'}</h1>
          <p>{isEditing ? 'Update the details of your dish.' : 'Provide details to showcase your dish.'}</p>
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
            <label htmlFor="video">Video file {isEditing ? '(optional)' : ''}</label>
            <input
              id="video"
              name="video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="file-input"
              required={!isEditing}
            />
            <span className="field-hint">
              {isEditing ? 'Upload a new video to replace the current one (optional).' : 'Upload a video from your device.'}
            </span>
            <span className="field-hint">
              Only video files are accepted. This video will be displayed in the reels feed.
            </span>
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
            <button type="submit" className="primary-action">
              {isEditing ? 'Update food item' : 'Save food item'}
            </button>
            <button type="button" className="secondary-action" onClick={() => navigate('/partner/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
