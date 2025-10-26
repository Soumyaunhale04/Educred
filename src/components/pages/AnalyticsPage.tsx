import { GlowCard } from '../common/GlowCard';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function AnalyticsPage() {
  const creditGrowthData = [
    { month: 'Jan', credits: 12 },
    { month: 'Feb', credits: 19 },
    { month: 'Mar', credits: 25 },
    { month: 'Apr', credits: 32 },
    { month: 'May', credits: 45 },
    { month: 'Jun', credits: 58 },
    { month: 'Jul', credits: 67 },
    { month: 'Aug', credits: 75 },
    { month: 'Sep', credits: 82 },
    { month: 'Oct', credits: 87 }
  ];

  const courseProgressData = [
    { course: 'Blockchain', progress: 75 },
    { course: 'Smart Contracts', progress: 60 },
    { course: 'Cryptography', progress: 90 },
    { course: 'DeFi', progress: 45 },
    { course: 'Web3', progress: 55 }
  ];

  const performanceStats = [
    { label: 'Average Score', value: '85%', icon: Target, color: '#2F80ED', bgColor: '#EFF6FF' },
    { label: 'Completion Rate', value: '92%', icon: TrendingUp, color: '#27AE60', bgColor: '#E8F8F5' },
    { label: 'Monthly Growth', value: '+12%', icon: BarChart3, color: '#F2994A', bgColor: '#FEF3E7' },
    { label: 'Certificates Earned', value: '10', icon: Award, color: '#9B51E0', bgColor: '#F4ECF7' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-lg">
          <p className="text-[#1E1E1E] text-sm">{`${payload[0].payload.month || payload[0].payload.course}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Analytics & Insights
          </h1>
          <p className="text-white/90">Track your learning performance and progress</p>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlowCard key={index}>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-sm">{stat.label}</p>
                    <h3 className="text-[#1E1E1E]">{stat.value}</h3>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credit Growth Chart */}
          <GlowCard>
            <h3 className="text-[#1E1E1E] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#2F80ED]" />
              </div>
              Credit Growth Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={creditGrowthData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2F80ED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="credits" 
                  stroke="#2F80ED" 
                  strokeWidth={2}
                  fill="url(#colorCredits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

          {/* Course Progress Chart */}
          <GlowCard>
            <h3 className="text-[#1E1E1E] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E8F8F5] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#27AE60]" />
              </div>
              Course Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="course" 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="progress" 
                  fill="#27AE60"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </GlowCard>
        </div>

        {/* Learning Insights */}
        <div className="mt-6">
          <GlowCard>
            <h3 className="text-[#1E1E1E] mb-6">Learning Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-[#2F80ED] pl-4">
                <h4 className="text-[#1E1E1E] mb-2">Top Performance</h4>
                <p className="text-[#6B7280] text-sm mb-2">Cryptography Basics</p>
                <p className="text-[#2F80ED]">90% Completion</p>
              </div>
              <div className="border-l-4 border-[#27AE60] pl-4">
                <h4 className="text-[#1E1E1E] mb-2">Study Streak</h4>
                <p className="text-[#6B7280] text-sm mb-2">Current Streak</p>
                <p className="text-[#27AE60]">15 Days</p>
              </div>
              <div className="border-l-4 border-[#F2994A] pl-4">
                <h4 className="text-[#1E1E1E] mb-2">Next Milestone</h4>
                <p className="text-[#6B7280] text-sm mb-2">Credits to 100</p>
                <p className="text-[#F2994A]">13 Credits Away</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
