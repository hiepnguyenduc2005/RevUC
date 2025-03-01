import React, { useState } from 'react'

const NewTrial = () => {
    const [formData, setFormData] = useState({
        contactName: '',
        contactPhone: ''
    })

    const handlePhoneChange = (e) => {
        const value = e.target.value
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setFormData({
                ...formData,
                contactPhone: value
            })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-8">
            <div className="card w-full max-w-4xl bg-base-100 shadow-2xl">
                <div className="card-body p-12">
                    <h2 className="card-title justify-center text-5xl font-bold mb-12">Contact Information</h2>
                    <div className="flex gap-8">
                        <div className="flex-1">
                            <fieldset className="border rounded-lg p-6">
                                <legend className="text-2xl font-semibold px-2">Contact Person</legend>
                                <input 
                                    type="text" 
                                    className="input input-bordered input-lg w-full text-xl py-8" 
                                    placeholder="Contact Name"
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                                />
                            </fieldset>
                        </div>
                        <div className="flex-1">
                            <fieldset className="border rounded-lg p-6">
                                <legend className="text-2xl font-semibold px-2">Contact Person's Phone</legend>
                                <input 
                                    type="tel"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    className="input input-bordered input-lg w-full text-xl py-8" 
                                    placeholder="Contact Number"
                                    value={formData.contactPhone}
                                    onChange={handlePhoneChange}
                                />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTrial
