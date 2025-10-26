import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ 
  children, 
  className = ''
}: GlowCardProps) {
  return (
    <div 
      className={`bg-white border border-[#E5E7EB] rounded-xl p-6 transition-all duration-200 hover:shadow-md ${className}`}
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      {children}
    </div>
  );
}
