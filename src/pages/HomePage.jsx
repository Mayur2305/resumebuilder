
import React from 'react';
import { FileText, Layout, Download, Zap, Shield, Palette } from 'lucide-react';

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume in
            <span className="text-blue-600"> Minutes</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes with our easy-to-use builder. 
            Choose from 10 beautiful templates and customize every detail.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Get Started Free
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Layout size={32} />}
            title="10+ Templates"
            description="Choose from professionally designed templates that are 100% ATS-compatible"
          />
          <FeatureCard
            icon={<FileText size={32} />}
            title="Rich Text Editor"
            description="Format your content with bullet points, bold, italic, and more"
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Drag & Drop"
            description="Easily reorder sections by dragging them to your preferred position"
          />
          <FeatureCard
            icon={<Download size={32} />}
            title="Multiple Exports"
            description="Download as PDF, Word, or HTML with all formatting preserved"
          />
          <FeatureCard
            icon={<Shield size={32} />}
            title="ATS Optimized"
            description="All templates are optimized to pass Applicant Tracking Systems"
          />
          <FeatureCard
            icon={<Palette size={32} />}
            title="Fully Customizable"
            description="Add custom sections, edit content, and personalize every detail"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of job seekers who landed their dream jobs with our resume builder
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all"
          >
            Create My Resume
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 ATS Resume Builder. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;