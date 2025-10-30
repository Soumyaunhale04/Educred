import { ButtonHTMLAttributes } from 'react';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

export function GlowButton({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: GlowButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "text-white hover:opacity-90",
    secondary: "bg-white text-[#1E1E1E] border border-[#E5E7EB] hover:bg-[#F3F4F6]",
    success: "bg-[#27AE60] text-white hover:bg-[#229954]",
    warning: "bg-[#F2994A] text-white hover:bg-[#E67E22]"
  };

  const isPrimary = variant === 'primary';

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={isPrimary ? {
        background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)'
      } : {}}
      {...props}
    >
      {children}
    </button>
  );
}
