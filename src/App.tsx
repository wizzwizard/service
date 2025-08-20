import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  User, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Wrench, 
  Truck, 
  Calendar,
  Star,
  ArrowRight,
  Shield
} from 'lucide-react';

interface ServiceStage {
  id: number;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'pending';
  estimatedTime?: string;
  assignedPerson?: {
    name: string;
    role: string;
    avatar: string;
    rating: number;
  };
  checklistItems: string[];
  customerExpectation: string;
  celebrationMessage?: string;
  completionImages?: {
    before: string;
    after: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

function App() {
  const [currentStage, setCurrentStage] = useState(2);
  const [showCelebration, setShowCelebration] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const serviceStages: ServiceStage[] = [
    {
      id: 1,
      title: "Service Request Received",
      subtitle: "We've got your request!",
      status: currentStage > 1 ? 'completed' : 'current',
      checklistItems: [
        "Service details received",
        "Location confirmed", 
        "Priority level assigned",
        "Initial assessment complete"
      ],
      customerExpectation: "Your service request has been logged and our team is reviewing the details. You'll receive confirmation within 15 minutes.",
      icon: Shield
    },
    {
      id: 2,
      title: "Technician Assigned",
      subtitle: "Meet your service professional",
      status: currentStage > 2 ? 'completed' : currentStage === 2 ? 'current' : 'pending',
      estimatedTime: "12:00-12:30 PM",
      assignedPerson: {
        name: "Mike Johnson",
        role: "Senior Technician",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        rating: 4.9
      },
      checklistItems: [
        "Best technician selected",
        "Tools and equipment prepared",
        "Route optimized",
        "Customer notification sent"
      ],
      customerExpectation: "Your assigned technician is preparing for the visit. They'll call you 15 minutes before arrival to confirm timing.",
      icon: User
    },
    {
      id: 3,
      title: "On The Way",
      subtitle: "Technician heading to your location",
      status: currentStage > 3 ? 'completed' : currentStage === 3 ? 'current' : 'pending',
      estimatedTime: "Arriving in 15-20 min",
      assignedPerson: {
        name: "Mike Johnson",
        role: "Senior Technician", 
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        rating: 4.9
      },
      checklistItems: [
        "Departed from previous location",
        "GPS tracking active",
        "All tools loaded",
        "Customer contact confirmed"
      ],
      customerExpectation: "Your technician is en route and will arrive within the estimated time window. You can track their progress in real-time.",
      icon: Truck
    },
    {
      id: 4,
      title: "Service In Progress",
      subtitle: "Work is being performed",
      status: currentStage > 4 ? 'completed' : currentStage === 4 ? 'current' : 'pending',
      estimatedTime: "45-60 min duration",
      celebrationMessage: "🎉 Hurray! Today is the day your service gets completed!",
      assignedPerson: {
        name: "Mike Johnson",
        role: "Senior Technician",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        rating: 4.9
      },
      checklistItems: [
        "Technician arrived on-site",
        "Initial inspection completed",
        "Work in progress",
        "Quality checks ongoing"
      ],
      customerExpectation: "Your technician is now working on your service. They'll keep you informed of progress and any findings during the work.",
      icon: Wrench
    },
    {
      id: 5,
      title: "Service Complete",
      subtitle: "All done! Service completed successfully",
      status: currentStage >= 5 ? 'completed' : 'pending',
      celebrationMessage: "🎉 Congratulations! Your service has been completed successfully!",
      assignedPerson: {
        name: "Mike Johnson", 
        role: "Senior Technician",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
        rating: 4.9
      },
      checklistItems: [
        "Service work completed",
        "Quality inspection passed",
        "Area cleaned up",
        "Customer walkthrough done"
      ],
      customerExpectation: "Your service is complete! You'll receive a summary report and can provide feedback about your experience.",
      completionImages: {
        before: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
        after: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
      },
      icon: CheckCircle
    }
  ];

  const currentStageData = serviceStages.find(stage => stage.status === 'current');

  useEffect(() => {
    if (currentStageData?.celebrationMessage) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 4000);
      return () => clearTimeout(timer);
    }
    
    // Show review form when service is complete
    if (currentStage === 5) {
      const timer = setTimeout(() => setShowReviewForm(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStageData]);

  const nextStage = () => {
    if (currentStage < serviceStages.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleReviewSubmit = () => {
    // Handle review submission
    alert(`Thank you for your ${rating}-star review! Your feedback: "${feedback}"`);
    setShowReviewForm(false);
  };

  const renderStars = (currentRating: number, onStarClick: (rating: number) => void) => {
    return (
      <div className="flex justify-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onStarClick(star)}
            className="focus:outline-none transition-colors"
          >
            <Star 
              className={`w-8 h-8 ${
                star <= currentRating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Celebration Banner */}
      {showCelebration && currentStageData?.celebrationMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 text-center font-semibold text-lg shadow-lg animate-pulse">
          {currentStageData.celebrationMessage}
        </div>
      )}

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Service Progress</h1>
            <div className="text-sm opacity-90">Order #12345</div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-90">Progress</span>
              <span className="text-sm font-semibold">{Math.round((currentStage / serviceStages.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                style={{ width: `${(currentStage / serviceStages.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Stage Header */}
          {currentStageData && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{currentStageData.title}</h2>
              <p className="text-blue-100 text-sm">{currentStageData.subtitle}</p>
              {currentStageData.estimatedTime && (
                <div className="flex items-center justify-center mt-3 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{currentStageData.estimatedTime}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Assigned Person */}
          {currentStageData?.assignedPerson && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Your Service Professional</h3>
              <div className="flex items-center">
                <img 
                  src={currentStageData.assignedPerson.avatar}
                  alt={currentStageData.assignedPerson.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{currentStageData.assignedPerson.name}</h4>
                  <p className="text-gray-600 text-sm">{currentStageData.assignedPerson.role}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {currentStageData.assignedPerson.rating}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Current Progress</h3>
            <div className="space-y-3">
              {currentStageData?.checklistItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Completion Images - Only show when service is complete */}
          {currentStage === 5 && currentStageData?.completionImages && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Job Completion Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <img 
                    src={currentStageData.completionImages.before}
                    alt="Before service"
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-medium">Before</p>
                </div>
                <div className="text-center">
                  <img 
                    src={currentStageData.completionImages.after}
                    alt="After service"
                    className="w-full h-32 object-cover rounded-lg border-2 border-green-200"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-medium">After</p>
                </div>
              </div>
            </div>
          )}

          {/* Customer Expectation */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              What to Expect
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              {currentStageData?.customerExpectation}
            </p>
          </div>

          {/* Stage Timeline */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Service Timeline</h3>
            <div className="space-y-4">
              {serviceStages.map((stage, index) => {
                const StageIcon = stage.icon;
                return (
                  <div key={stage.id} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      stage.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : stage.status === 'current'
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <StageIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        stage.status === 'current' ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {stage.title}
                      </h4>
                      <p className="text-xs text-gray-500">{stage.subtitle}</p>
                    </div>
                    {stage.status === 'completed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review Modal - Only show when service is complete */}
        {showReviewForm && currentStage === 5 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Service Complete!</h3>
                <p className="text-gray-600 text-sm">How was your experience with {currentStageData?.assignedPerson?.name}?</p>
              </div>

              {/* Star Rating */}
              <div className="mb-6">
                <p className="text-center text-sm font-medium text-gray-700 mb-3">Rate your experience</p>
                {renderStars(rating, setRating)}
              </div>

              {/* Feedback Text Area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your feedback (optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={rating === 0}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm text-gray-600 mr-2">Need help?</span>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </button>
          </div>
          
          {/* Demo Navigation */}
          <div className="flex justify-between">
            <button 
              onClick={prevStage}
              disabled={currentStage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Previous Stage
            </button>
            <button 
              onClick={nextStage}
              disabled={currentStage === serviceStages.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center"
            >
              Next Stage
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;