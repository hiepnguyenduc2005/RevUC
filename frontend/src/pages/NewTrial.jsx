import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const NewTrial = () => {
    const navigate = useNavigate()
    const selectRef = useRef(null)
    const [formData, setFormData] = useState({
        contactName: '',
        contactPhone: '',
        description: '',
        eligibilityCriteria: []
    })
    const [selectedCriteria, setSelectedCriteria] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handlePhoneChange = (e) => {
        const value = e.target.value
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setFormData({
                ...formData,
                contactPhone: value
            })
        }
    }

    const handleCriteriaChange = (e) => {
        const value = e.target.value
        if (value && !selectedCriteria.includes(value)) {
            const newCriteria = [...selectedCriteria, value]
            setSelectedCriteria(newCriteria)
            setFormData({
                ...formData,
                eligibilityCriteria: newCriteria
            })
            // Reset the dropdown to default option
            if (selectRef.current) {
                selectRef.current.value = ""
            }
        }
    }

    const handleReset = () => {
        setFormData({
            contactName: '',
            contactPhone: '',
            description: '',
            eligibilityCriteria: []
        });
        setSelectedCriteria([]);
        // Reset the dropdown to default option
        if (selectRef.current) {
            selectRef.current.value = ""
        }
    }

    const handleSubmit = () => {
        // Add your submit logic here
        console.log('Form submitted:', formData);
    }

    const handleReturn = () => {
        navigate(-1) // Go back to the previous page
    }

    return (
        <div className="h-screen flex flex-col" style={{ overflow: 'hidden' }}>
            <div className="flex-grow bg-base-200 pt-2 pb-16" style={{ overflow: 'hidden' }}>
                <div className="container mx-auto px-4 h-full" style={{ overflow: 'hidden' }}>
                    <div className="grid grid-cols-4 gap-8 max-w-8xl w-full h-full" style={{ overflow: 'hidden' }}>
                        <div className="col-span-2 flex flex-col gap-8 h-full" style={{ overflow: 'hidden' }}>
                            <div className="card bg-base-100 shadow-xl" style={{ height: "calc(40% - 1rem)", overflow: 'hidden' }}>
                                <div className="card-body p-6" style={{ overflow: 'hidden' }}>
                                    <h2 className="card-title justify-center text-2xl font-bold mb-2">Contact Information</h2>
                                    <div className="flex gap-4" style={{ overflow: 'hidden' }}>
                                        <div className="flex-1" style={{ overflow: 'hidden' }}>
                                            <fieldset className="border rounded-lg p-3" style={{ overflow: 'hidden' }}>
                                                <legend className="text-lg font-semibold px-2">Contact Person</legend>
                                                <input 
                                                    type="text" 
                                                    name="contactName"
                                                    className="input input-bordered input-md w-full text-md py-1" 
                                                    placeholder="Contact Name"
                                                    value={formData.contactName}
                                                    onChange={handleInputChange}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="flex-1" style={{ overflow: 'hidden' }}>
                                            <fieldset className="border rounded-lg p-3" style={{ overflow: 'hidden' }}>
                                                <legend className="text-lg font-semibold px-2">Contact Person's Phone</legend>
                                                <input 
                                                    type="tel"
                                                    name="contactPhone"
                                                    pattern="[0-9]*"
                                                    inputMode="numeric"
                                                    className="input input-bordered input-md w-full text-md py-1" 
                                                    placeholder="Contact Number"
                                                    value={formData.contactPhone}
                                                    onChange={handlePhoneChange}
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-xl" style={{ height: "calc(60% - 1rem)", overflow: 'hidden' }}>
                                <div className="card-body p-6" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                    <h2 className="card-title justify-center text-2xl font-bold mb-2">Eligibility</h2>
                                    <div className="flex gap-4 flex-grow" style={{ overflow: 'hidden' }}>
                                        <div className="flex-1" style={{ overflow: 'hidden', maxWidth: '40%' }}>
                                            <fieldset className="border rounded-lg p-3" style={{ overflow: 'hidden' }}>
                                                <legend className="text-lg font-semibold px-2">Including</legend>
                                                <select 
                                                    ref={selectRef}
                                                    className="select select-bordered w-full text-md py-1"
                                                    onChange={handleCriteriaChange}
                                                    defaultValue=""
                                                >
                                                    <option value="">Select an option</option>
                                                    <option value="Over 18">Over 18</option>
                                                    <option value="Under 75">Under 75</option>
                                                    <option value="Not Pregnant or Breastfeeding">Not Pregnant or Breastfeeding </option>
                                                    <option value="Non Smoker">Non Smoker</option>
                                                    <option value="Not on Medication">Not on Medication</option>
                                                    <option value="BMI Over 18.5">BMI Over 18.5</option>
                                                    <option value="BMI Under 30">BMI Under 30</option>
                                                    <option value="No Chronic Illnesses">No Chronic Illnesses</option>
                                                    <option value="No Substance Abuse History">No Substance Abuse History</option>

                                                </select>
                                            </fieldset>
                                        </div>
                                        <div className="flex-1" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
                                            <fieldset className="border rounded-lg p-3 flex-grow" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                                <legend className="text-lg font-semibold px-2">Selected Criteria</legend>
                                                <div className="flex-grow" style={{ overflowY: 'auto' }}>
                                                    <ul className="list-disc pl-5">
                                                        {selectedCriteria.map((criteria, index) => (
                                                            <li key={index} className="text-md">{criteria}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 h-full" style={{ overflow: 'hidden' }}>
                            <div className="card bg-base-100 shadow-xl h-full" style={{ overflow: 'hidden' }}>
                                <div className="card-body p-6 flex flex-col" style={{ overflow: 'hidden' }}>
                                    <h2 className="card-title justify-center text-2xl font-bold mb-2">Description</h2>
                                    <div className="flex gap-4 flex-grow" style={{ overflow: 'hidden' }}>
                                        <div className="flex-1 flex flex-col" style={{ overflow: 'hidden' }}>
                                            <fieldset className="border rounded-lg p-3 flex-grow flex flex-col" style={{ overflow: 'hidden' }}>
                                                <legend className="text-lg font-semibold px-2">Description</legend>
                                                <textarea 
                                                    name="description"
                                                    className="textarea textarea-bordered w-full text-md py-1 flex-grow"
                                                    placeholder="Enter description here..."
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    style={{ resize: 'none', overflow: 'hidden' }}
                                                />
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Stationary buttons without a bar */}
            <div className="fixed bottom-4 right-4 flex gap-4">
                <button 
                    onClick={handleReset}
                    className="btn btn-error"
                >
                    Reset
                </button>
                <button 
                    onClick={handleSubmit}
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default NewTrial
