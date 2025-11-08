import React, { useState, useEffect } from 'react'
import '../styles/theme.css'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateFood() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tagInput: ''
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
    payload.append('description', formData.description)
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
