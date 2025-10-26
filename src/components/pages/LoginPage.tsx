import { useState } from 'react';
import { GlowButton } from '../common/GlowButton';
import { User, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] relative overflow-hidden flex items-center justify-center">
      {/* Hero Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-[60%] opacity-10"
          style={{
            background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
          }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#2F80ED] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#27AE60] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-lg">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div 
              className="inline-block p-4 rounded-2xl mb-4"
              style={{
                background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
              }}
            >
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-[#1E1E1E] mb-2">Welcome to EduCred+</h1>
            <p className="text-[#6B7280]">Blockchain-Based Education Platform</p>
          </div>

          {/* Role Switcher */}
          <div className="flex gap-2 mb-6 bg-[#F3F4F6] p-1 rounded-lg">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                role === 'student'
                  ? 'text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#1E1E1E]'
              }`}
              style={role === 'student' ? {
                background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
              } : {}}
            >
              <User className="w-4 h-4" />
              Student
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                role === 'admin'
                  ? 'text-white shadow-sm'
                  : 'text-[#6B7280] hover:text-[#1E1E1E]'
              }`}
              style={role === 'admin' ? {
                background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
              } : {}}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#1E1E1E] mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@educred.com"
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1E1E1E] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-[#1E1E1E] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-3 text-[#1E1E1E] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all duration-200"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-[#6B7280] cursor-pointer hover:text-[#1E1E1E] transition-colors">
                <input type="checkbox" className="mr-2 accent-[#2F80ED]" />
                Remember me
              </label>
              <a href="#" className="text-[#2F80ED] hover:underline">
                Forgot password?
              </a>
            </div>

            <GlowButton type="submit" className="w-full mt-6">
              Login to {role === 'student' ? 'Student' : 'Admin'} Portal
            </GlowButton>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#6B7280]">
            Don't have an account?{' '}
            <a href="#" className="text-[#2F80ED] hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
