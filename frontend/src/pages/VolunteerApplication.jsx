import React, { useState } from 'react'
import { Upload, Check, X } from 'lucide-react'

const VolunteerApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    medicalConditions: '',
    medications: '',
    allergies: '',
    pastSurgeries: '',
    files: []
  })

  const [files, setFiles] = useState([])
  const [uploadStatus, setUploadStatus] = useState({
    isUploading: false,
    success: false,
    error: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUploadStatus({ isUploading: true, success: false, error: null })
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Data:', formData)
      console.log('Files:', files)
      setUploadStatus({ 
        isUploading: false, 
        success: true, 
        error: null 
      })
    }, 2000)
  }

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return '📄'
    } else if (fileType.includes('image')) {
      return '🖼️'
    } else {
      return '📁'
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <h1 className="card-title text-4xl font-bold mb-8 justify-center">Volunteer Health Information</h1>
            
            {uploadStatus.success && (
              <div className="alert alert-success mb-6">
                <Check className="stroke-current shrink-0 h-6 w-6" />
                <span>Your information has been submitted successfully!</span>
              </div>
            )}
            
            {uploadStatus.error && (
              <div className="alert alert-error mb-6">
                <X className="stroke-current shrink-0 h-6 w-6" />
                <span>{uploadStatus.error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="divider divider-primary text-xl font-medium">Personal Information</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Full Name</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    className="input input-bordered w-full" 
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Email</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email" 
                    className="input input-bordered w-full" 
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Phone</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number" 
                    className="input input-bordered w-full" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Date of Birth</span>
                  </label>
                  <input 
                    type="date" 
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="input input-bordered w-full" 
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Gender</span>
                  </label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="divider divider-primary text-xl font-medium">Physical Information</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Height (cm)</span>
                  </label>
                  <input 
                    type="number" 
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Enter your height in cm" 
                    className="input input-bordered w-full" 
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">Weight (kg)</span>
                  </label>
                  <input 
                    type="number" 
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter your weight in kg" 
                    className="input input-bordered w-full" 
                  />
                </div>
              </div>
              
              <div className="divider divider-primary text-xl font-medium">Medical Information</div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Medical Conditions</span>
                </label>
                <textarea 
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  placeholder="List any medical conditions you have" 
                  className="textarea textarea-bordered h-24 w-full" 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Current Medications</span>
                </label>
                <textarea 
                  name="medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  placeholder="List any medications you're currently taking" 
                  className="textarea textarea-bordered h-24 w-full" 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Allergies</span>
                </label>
                <textarea 
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="List any allergies you have" 
                  className="textarea textarea-bordered h-24 w-full" 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Past Surgeries or Procedures</span>
                </label>
                <textarea 
                  name="pastSurgeries"
                  value={formData.pastSurgeries}
                  onChange={handleInputChange}
                  placeholder="List any past surgeries or medical procedures" 
                  className="textarea textarea-bordered h-24 w-full" 
                />
              </div>
              
              <div className="divider divider-primary text-xl font-medium">Upload Medical Documents</div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Upload Medical Records (PDF, Images)</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-base-200 border-base-300 hover:border-primary hover:bg-base-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB per file)</p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Uploaded Files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-base-100 p-2 rounded">
                        <div className="flex items-center">
                          <span className="mr-2 text-xl">{getFileIcon(file.type)}</span>
                          <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn btn-sm btn-circle btn-ghost"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-center mt-8">
                <button 
                  type="submit"
                  className={`btn btn-primary btn-lg px-12 ${uploadStatus.isUploading ? 'loading' : ''}`}
                  disabled={uploadStatus.isUploading}
                >
                  {uploadStatus.isUploading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerApplication
