import React, { useState, useEffect } from 'react'
import { Upload, Check, X, FileText, Loader } from 'lucide-react'
import { createWorker } from 'tesseract.js'

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
  const [processingFiles, setProcessingFiles] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  
  // State for Pyodide instance
  const [pyodide, setPyodide] = useState(null)

  // Load Pyodide
  useEffect(() => {
    if (!window.pyodide) {
      const script = document.createElement('script')
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js"
      script.onload = async () => {
        try {
          const loadedPyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
          })
          setPyodide(loadedPyodide)
          console.log("Pyodide loaded successfully")
        } catch (error) {
          console.error('Failed to load Pyodide:', error)
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  // Write file to Pyodide's virtual file system
  const writeFileToPyodideFS = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result)
        try {
          pyodide.FS.writeFile(file.name, data)
          resolve()
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })
  }

  // Use Pyodide and PyPDF2 to extract text from a PDF file
  const extractTextFromPDF = async (file) => {
    if (!pyodide) {
      console.error("Pyodide is not loaded yet")
      return "Pyodide is not loaded yet. Please try again in a moment."
    }
    try {
      // Write the PDF file into Pyodide's file system
      await writeFileToPyodideFS(file)

      // Load micropip and install PyPDF2 if necessary
      await pyodide.loadPackage(['micropip'])
      await pyodide.runPythonAsync(`
        import micropip
        await micropip.install('PyPDF2')
      `)

      // Run Python code to extract text from the PDF
      const result = await pyodide.runPythonAsync(`
        import PyPDF2

        def extract_text_from_pdf(pdf_path):
            with open(pdf_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                text = ""
                for page in reader.pages:
                    page_text = page.extract_text() or ""
                    text += page_text
            return text

        extract_text_from_pdf("${file.name}")
      `)
      
      return result
    } catch (error) {
      console.error("Error extracting text from PDF using Pyodide:", error)
      return `[Error extracting text from ${file.name}: ${error.message}]`
    }
  }

  // Use tesseract.js to extract text from image files
  const extractTextFromImage = async (file) => {
    try {
      const worker = await createWorker('eng')
      const imageUrl = URL.createObjectURL(file)
      const { data } = await worker.recognize(imageUrl)
      await worker.terminate()
      URL.revokeObjectURL(imageUrl)
      return data.text.trim()
    } catch (error) {
      console.error('Error extracting text from image:', error)
      return `[Error extracting text from ${file.name}: ${error.message}]`
    }
  }

  // Process the uploaded files
  const processFiles = async (selectedFiles) => {
    setProcessingFiles(true)
    setProcessingProgress(0)
    
    const newFiles = []
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      let extractedText = ''
      
      setProcessingProgress((i / selectedFiles.length) * 100)
      
      if (file.type === 'application/pdf') {
        extractedText = await extractTextFromPDF(file)
      } else if (file.type.startsWith('image/')) {
        extractedText = await extractTextFromImage(file)
      }
      
      newFiles.push({
        file: file,
        name: file.name,
        type: file.type,
        text: extractedText
      })
    }
    
    setFiles([...files, ...newFiles])
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles.map(f => ({
        name: f.name,
        type: f.type,
        text: f.text
      }))]
    }))
    
    setProcessingFiles(false)
    setProcessingProgress(100)
  }

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 0) {
      await processFiles(selectedFiles)
    }
  }

  const removeFile = (index) => {
    const updatedFiles = [...files]
    const removedFile = updatedFiles.splice(index, 1)[0]
    setFiles(updatedFiles)
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.name !== removedFile.name)
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //modify the handleSubmit function to include the new formData object
  const handleSubmit = (e) => {
    e.preventDefault()
    setUploadStatus({ isUploading: true, success: false, error: null })
    console.log('Form Data:', formData)   
    setUploadStatus({ 
      isUploading: false, 
      success: true, 
      error: null 
    })
  
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
                      {processingFiles ? (
                        <>
                          <Loader className="w-10 h-10 mb-3 text-gray-500 animate-spin" />
                          <p className="mb-2 text-sm text-gray-500">
                            Processing files ({Math.round(processingProgress)}%)
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB per file)</p>
                        </>
                      )}
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple 
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={processingFiles}
                    />
                  </label>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Uploaded Files:</h3>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="bg-base-100 p-2 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="mr-2 text-xl">{getFileIcon(file.type)}</span>
                            <span className="truncate max-w-xs">{file.name}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => removeFile(index)}
                            className="btn btn-sm btn-circle btn-ghost"
                            disabled={processingFiles}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {file.text && (
                          <div className="mt-1">
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <FileText className="h-4 w-4 mr-1" />
                              <span>Extracted Text:</span>
                            </div>
                            <div className="bg-base-200 p-2 rounded text-sm max-h-32 overflow-y-auto">
                              {file.text.substring(0, 300)}
                              {file.text.length > 300 && '...'}
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-center mt-8">
                <button 
                  type="submit"
                  className={`btn btn-primary btn-lg px-12 ${uploadStatus.isUploading || processingFiles ? 'loading' : ''}`}
                  disabled={uploadStatus.isUploading || processingFiles}
                >
                  {uploadStatus.isUploading ? 'Submitting...' : processingFiles ? 'Processing Files...' : 'Submit Application'}
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
