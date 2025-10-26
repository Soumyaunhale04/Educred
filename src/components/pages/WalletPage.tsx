import { useState } from 'react';
import { GlowCard } from '../common/GlowCard';
import { GlowButton } from '../common/GlowButton';
import { Wallet, Shield, User, Mail, MapPin, Calendar, Edit, CheckCircle } from 'lucide-react';

export function WalletPage() {
  const [isEditing, setIsEditing] = useState(false);
  const totalCredits = 87;
  const maxCredits = 100;
  const percentage = (totalCredits / maxCredits) * 100;

  const [profileData, setProfileData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@educred.com',
    studentId: 'EDU-2024-5678',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2024'
  });

  const blockchainInfo = [
    { label: 'Wallet Address', value: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' },
    { label: 'Network', value: 'Ethereum Mainnet' },
    { label: 'Total Transactions', value: '24' },
    { label: 'Last Verification', value: 'October 16, 2025' }
  ];

  const recentTransactions = [
    { type: 'Credit Earned', amount: '+5', course: 'Blockchain Fundamentals', date: 'Oct 15, 2025', color: '#2F80ED' },
    { type: 'Certificate Verified', amount: '+1', course: 'Smart Contracts', date: 'Oct 10, 2025', color: '#27AE60' },
    { type: 'Credit Earned', amount: '+3', course: 'Cryptography Basics', date: 'Oct 5, 2025', color: '#9B51E0' },
    { type: 'Credit Earned', amount: '+4', course: 'DeFi Applications', date: 'Sep 28, 2025', color: '#F2994A' }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F9FAFB]">
      <div className="p-8">
        {/* Header - Hero Section */}
        <div 
          className="mb-8 rounded-2xl p-8 text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
          }}
        >
          <h1 className="text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            Wallet & Profile
          </h1>
          <p className="text-white/90">Manage your credits and personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Credits & Blockchain */}
          <div className="space-y-6">
            {/* Credits Widget */}
            <GlowCard>
              <h3 className="text-[#1E1E1E] mb-6 text-center">Total Earned Credits</h3>
              
              {/* Circular Progress */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#F3F4F6"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#creditsGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - percentage / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="creditsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2F80ED" />
                      <stop offset="100%" stopColor="#56CCF2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[#1E1E1E] text-4xl">{totalCredits}</span>
                  <span className="text-[#6B7280] text-sm">of {maxCredits}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[#2F80ED] mb-2">{percentage.toFixed(0)}% Complete</p>
                <p className="text-[#6B7280] text-sm">{maxCredits - totalCredits} credits to goal</p>
              </div>
            </GlowCard>

            {/* Blockchain Verification */}
            <GlowCard>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#E8F8F5] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#27AE60]" />
                </div>
                <h3 className="text-[#1E1E1E]">Blockchain Verification</h3>
              </div>
              
              <div className="space-y-3">
                {blockchainInfo.map((info, index) => (
                  <div key={index} className="border-b border-[#E5E7EB] pb-3 last:border-0">
                    <p className="text-[#6B7280] text-xs mb-1">{info.label}</p>
                    <p className="text-[#1E1E1E] text-sm break-all">{info.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[#27AE60] text-sm bg-[#E8F8F5] rounded-lg py-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verified on Ethereum</span>
              </div>
            </GlowCard>
          </div>

          {/* Right Column - Profile & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <GlowCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#1E1E1E] flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-[#2F80ED]" />
                  </div>
                  Personal Information
                </h3>
                <GlowButton
                  variant="secondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2 inline" />
                  {isEditing ? 'Save' : 'Edit'}
                </GlowButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#6B7280] text-sm mb-2 block">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1E1E1E] focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    />
                  ) : (
                    <p className="text-[#1E1E1E]">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#6B7280] text-sm mb-2 block">Student ID</label>
                  <p className="text-[#1E1E1E]">{profileData.studentId}</p>
                </div>

                <div>
                  <label className="text-[#6B7280] text-sm mb-2 block flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1E1E1E] focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    />
                  ) : (
                    <p className="text-[#1E1E1E]">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#6B7280] text-sm mb-2 block flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 text-[#1E1E1E] focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    />
                  ) : (
                    <p className="text-[#1E1E1E]">{profileData.location}</p>
                  )}
                </div>

                <div>
                  <label className="text-[#6B7280] text-sm mb-2 block flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </label>
                  <p className="text-[#1E1E1E]">{profileData.joinDate}</p>
                </div>
              </div>
            </GlowCard>

            {/* Recent Transactions */}
            <GlowCard>
              <h3 className="text-[#1E1E1E] mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: transaction.color + '20',
                        }}
                      >
                        <Wallet className="w-5 h-5" style={{ color: transaction.color }} />
                      </div>
                      <div>
                        <h4 className="text-[#1E1E1E] text-sm">{transaction.type}</h4>
                        <p className="text-[#6B7280] text-xs">{transaction.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#27AE60]">{transaction.amount}</p>
                      <p className="text-[#6B7280] text-xs">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-[#2F80ED] text-sm hover:underline transition-colors">
                View All Transactions
              </button>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  );
}
