import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, ClipboardCheck, Users, Heart, Building2, ArrowRight } from 'lucide-react'

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
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                to="/volunteer" 
                className="btn btn-primary btn-lg text-xl px-8 py-4"
              >
                I'm a Volunteer
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-secondary btn-lg text-xl px-8 py-4"
              >
                I'm an Organization
              </Link>
            </div>
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
              <Heart className="h-16 w-16 text-primary mb-4 stroke-[1.5]" />
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

      {/* Dual CTA Section */}
      <div className="bg-base-100 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Join Our Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Volunteer Card */}
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-3xl mb-4">For Volunteers</h3>
                <p className="text-xl mb-8">
                  Join thousands of volunteers who have found suitable clinical trials. Your participation could advance medical research.
                </p>
                <div className="card-actions">
                  <Link to="/volunteer" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
                    Get Started <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Organization Card */}
            <div className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title text-3xl mb-4">For Organizations</h3>
                <p className="text-xl mb-8">
                  Find eligible participants for your clinical trials. Our AI matching system connects you with suitable candidates.
                </p>
                <div className="card-actions">
                  <Link to="/signup" className="btn btn-lg bg-white text-secondary hover:bg-gray-100">
                    Sign Up <ArrowRight className="ml-2" />
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-ghost">
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats and Trust Indicators */}
      <div className="py-16 px-8 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="stats shadow mx-auto">
            <div className="stat">
              <div className="stat-title">Registered Trials</div>
              <div className="stat-value">2,500+</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Volunteers Matched</div>
              <div className="stat-value">50,000+</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Organizations</div>
              <div className="stat-value">300+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
