import { GlowCard } from '../common/GlowCard';
import { BookOpen, Award, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

interface StudentDashboardProps {
  studentName?: string;
}

export function StudentDashboard({ studentName = 'Soumya' }: StudentDashboardProps) {
  const stats = [
    {
      title: 'Ongoing Courses',
      value: '5',
      icon: Clock,
      color: '#F2994A',
      bgColor: '#FEF3E7'
    },
    {
      title: 'Completed Courses',
      value: '12',
      icon: CheckCircle,
      color: '#27AE60',
      bgColor: '#E8F8F5'
    },
    {
      title: 'Total Credits',
      value: '87',
      icon: TrendingUp,
      color: '#2F80ED',
      bgColor: '#EFF6FF'
    },
    {
      title: 'Certificates Verified',
      value: '10',
      icon: Award,
      color: '#9B51E0',
      bgColor: '#F4ECF7'
    }
  ];

  const recentCourses = [
    { name: 'Blockchain Fundamentals', progress: 75, instructor: 'Prof. Anamika Joshi', color: '#2F80ED' },
    { name: 'Java Programming', progress: 60, instructor: 'Prof. Tarannum Dar', color: '#27AE60' },
    { name: 'Python Basics', progress: 90, instructor: 'Prof. Sushil kumar', color: '#9B51E0' },
    { name: 'Data Structures', progress: 45, instructor: 'Prof. Preeti kushwah', color: '#F2994A' }
  ];

  const connectedFaculty = [
    { name: 'Prof. Imran Ali Khan', role: 'AI/ML Professor', courses: 3 },
    { name: 'Prof. Shivank soni', role: 'TOC Professor', courses: 2 },
    { name: 'Prof. Sushil kumar', role: 'Python Expert', courses: 2 }
  ];

  return (
    <div className="flex-1 overflow-auto bg-[#F9FAFB]">
      <div className="p-8">
        {/* Welcome Banner - Hero Section with Gradient */}
        <div 
          className="mb-8 rounded-2xl p-8 text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-2">Welcome back, {studentName}! 👋</h1>
              <p className="text-white/90">Track your learning progress and blockchain credentials</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md border-2 border-white/30">
              <span className="text-white">AM</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlowCard key={index}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#6B7280] text-sm mb-2">{stat.title}</p>
                    <h2 className="text-[#1E1E1E]">{stat.value}</h2>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <GlowCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#1E1E1E] flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-[#2F80ED]" />
                  </div>
                  Recent Courses
                </h3>
                <button className="text-[#2F80ED] text-sm hover:underline transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div key={index} className="border-b border-[#E5E7EB] pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-[#1E1E1E] text-sm">{course.name}</h4>
                        <p className="text-[#6B7280] text-xs mt-1">{course.instructor}</p>
                      </div>
                      <span className="text-[#2F80ED]">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full transition-all duration-500"
                        style={{ 
                          width: `${course.progress}%`,
                          backgroundColor: course.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>

          {/* Connected Faculty */}
          <div>
            <GlowCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#1E1E1E] flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#E8F8F5] rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#27AE60]" />
                  </div>
                  Connected Faculty
                </h3>
              </div>
              <div className="space-y-4">
                {connectedFaculty.map((faculty, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center border border-[#E5E7EB]">
                      <Users className="w-5 h-5 text-[#6B7280]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#1E1E1E] text-sm">{faculty.name}</h4>
                      <p className="text-[#6B7280] text-xs">{faculty.role}</p>
                    </div>
                    <div className="text-[#2F80ED] text-xs bg-[#EFF6FF] px-2 py-1 rounded">
                      {faculty.courses}
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  );
}
