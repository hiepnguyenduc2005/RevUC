import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { axiosInstance } from '../lib/axios'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, User, FileText, Check, X, AlertCircle } from 'lucide-react'

const DashBoard = () => {
  const { authOrg } = useAuthStore()
  const [trials, setTrials] = useState([])
  const [expandedTrials, setExpandedTrials] = useState({})
  const [expandedMatches, setExpandedMatches] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch trials for the organization
  useEffect(() => {
    const fetchTrials = async () => {
      if (!authOrg?.id) return
      
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/orgs/${authOrg.id}`)
        
        // Enhance trials with matches data
        const trialsWithMatches = await Promise.all(response.data.trials.map(async (trial) => {
          try {
            // Get matches for each trial
            const matchesResponse = await axiosInstance.get(`/trials/${trial._id}`)
            const matches = matchesResponse.data.matches || []
            
            // Enhance matches with user data
            const enhancedMatches = await Promise.all(matches.map(async (match) => {
              try {
                const userResponse = await axiosInstance.get(`/users/${match.user_id}`)
                return {
                  ...match,
                  user: userResponse.data.user
                }
              } catch (userError) {
                console.error(`Error fetching user for match ${match.match_id}:`, userError)
                return {
                  ...match,
                  user: { error: "Failed to load user data" }
                }
              }
            }))
            
            return {
              ...trial,
              matches: enhancedMatches
            }
          } catch (matchError) {
            console.error(`Error fetching matches for trial ${trial._id}:`, matchError)
            return {
              ...trial,
              matches: []
            }
          }
        }))
        
        setTrials(trialsWithMatches)
      } catch (err) {
        console.error("Error fetching trials:", err)
        setError("Failed to load trials. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrials()
  }, [authOrg])
  
  const toggleTrialExpanded = (trialId) => {
    setExpandedTrials({
      ...expandedTrials,
      [trialId]: !expandedTrials[trialId]
    })
  }
  
  const toggleMatchExpanded = (matchId) => {
    setExpandedMatches({
      ...expandedMatches,
      [matchId]: !expandedMatches[matchId]
    })
  }
  
  const handleApproveMatch = async (matchId) => {
    try {
      await axiosInstance.post(`/approve/${matchId}`)
      // Refresh data after approval
      const updatedTrials = [...trials]
      setTrials(updatedTrials)
    } catch (err) {
      console.error("Error approving match:", err)
    }
  }
  
  const handleRejectMatch = async (matchId) => {
    try {
      await axiosInstance.post(`/reject/${matchId}`)
      // Refresh data after rejection
      const updatedTrials = [...trials]
      setTrials(updatedTrials)
    } catch (err) {
      console.error("Error rejecting match:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg">Loading your trials and matches...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 p-8">
        <div className="alert alert-error max-w-4xl mx-auto">
          <AlertCircle className="h-6 w-6" />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Organization Dashboard</h1>
          <Link to="/create-trial" className="btn btn-primary">Create New Trial</Link>
        </div>
        
        {trials.length === 0 ? (
          <div className="card bg-base-100 shadow-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No Clinical Trials Found</h2>
            <p className="mb-6">You haven't created any clinical trials yet.</p>
            <Link to="/create-trial" className="btn btn-primary mx-auto">Create Your First Trial</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {trials.map((trial) => (
              <div key={trial._id} className="card bg-base-100 shadow-xl overflow-visible">
                <div 
                  className="card-body p-6 cursor-pointer" 
                  onClick={() => toggleTrialExpanded(trial._id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="card-title text-2xl">{trial.title}</h2>
                      <p className="text-gray-500">
                        {new Date(trial.startDate).toLocaleDateString()} - {new Date(trial.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="badge badge-primary mr-2">
                        {trial.matches?.length || 0} Matches
                      </span>
                      {expandedTrials[trial._id] ? 
                        <ChevronDown className="h-6 w-6" /> : 
                        <ChevronRight className="h-6 w-6" />
                      }
                    </div>
                  </div>
                </div>
                
                {expandedTrials[trial._id] && (
                  <div className="px-6 pb-6">
                    <div className="divider my-0"></div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Description:</h3>
                      <p>{trial.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p><span className="font-semibold">Location:</span> {trial.location}</p>
                        <p><span className="font-semibold">Compensation:</span> {trial.compensation}</p>
                      </div>
                      <div>
                        <p><span className="font-semibold">Contact:</span> {trial.contactName}</p>
                        <p><span className="font-semibold">Phone:</span> {trial.contactPhone}</p>
                      </div>
                    </div>
                    
                    <div className="divider">Matches</div>
                    
                    {trial.matches && trial.matches.length > 0 ? (
                      <div className="space-y-3">
                        {trial.matches.map((match) => (
                          <div 
                            key={match.match_id} 
                            className="bg-base-200 rounded-lg p-4"
                          >
                            <div 
                              className="flex justify-between items-center cursor-pointer" 
                              onClick={() => toggleMatchExpanded(match.match_id)}
                            >
                              <div className="flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                <span className="font-medium">
                                  {match.user?.name || 'Unknown Volunteer'}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="flex space-x-2 mr-4">
                                  <button 
                                    className="btn btn-sm btn-success" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApproveMatch(match.match_id);
                                    }}
                                  >
                                    <Check className="h-4 w-4" />
                                    Approve
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-error" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRejectMatch(match.match_id);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                    Reject
                                  </button>
                                </div>
                                {expandedMatches[match.match_id] ? 
                                  <ChevronDown className="h-5 w-5" /> : 
                                  <ChevronRight className="h-5 w-5" />
                                }
                              </div>
                            </div>
                            
                            {expandedMatches[match.match_id] && match.user && (
                              <div className="mt-4 pl-7">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p><span className="font-medium">Email:</span> {match.user.email}</p>
                                  </div>
                                </div>
                                
                                {match.user.report && (
                                  <div className="mt-4">
                                    <div className="flex items-center mb-2">
                                      <FileText className="h-4 w-4 mr-1" />
                                      <span className="font-medium">Medical Report:</span>
                                    </div>
                                    <div className="bg-base-100 p-3 rounded-lg text-sm">
                                      {match.user.report}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No matches found for this trial.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashBoard

