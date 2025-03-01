import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Brain, ClipboardCheck, Users } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-8">Welcome to ClinSync</h1>
            <p className="text-2xl mb-12">
              Connecting volunteers with clinical trials through intelligent matching
            </p>
            <Link 
              to="/volunteer" 
              className="btn btn-primary btn-lg text-xl px-12 py-8"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FileText className="h-16 w-16 text-primary mb-4 stroke-[1.5]" />
              <h3 className="card-title text-2xl mb-4">Submit Health Data</h3>
              <p className="text-lg">Upload your medical documents or manually input your health information</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Brain className="h-16 w-16 text-primary mb-4 stroke-[1.5]" />
              <h3 className="card-title text-2xl mb-4">AI Processing</h3>
              <p className="text-lg">Our AI analyzes your data and matches you with suitable clinical trials</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <ClipboardCheck className="h-16 w-16 text-primary mb-4 stroke-[1.5]" />
              <h3 className="card-title text-2xl mb-4">Get Matched</h3>
              <p className="text-lg">Receive detailed eligibility reports for matching clinical trials</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Users className="h-16 w-16 text-primary mb-4 stroke-[1.5]" />
              <h3 className="card-title text-2xl mb-4">Connect</h3>
              <p className="text-lg">Register and connect with trial organizations through our AI chatbot</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-base-100 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Find Your Match?</h2>
          <p className="text-xl mb-12">
            Join thousands of volunteers who have found suitable clinical trials through our platform. 
            Your participation could help advance medical research and improve healthcare for everyone.
          </p>
          <Link 
            to="/volunteer" 
            className="btn btn-primary btn-lg text-xl px-12 py-8"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
