"use client";

interface StatsCardProps {
  label: string;
  value: string | number;
  color?: "blue" | "red" | "green" | "orange";
}

export function StatsCard({ label, value, color = "blue" }: StatsCardProps) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-center h-full relative overflow-hidden">
      {/* Subtle background indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${
        color === 'blue' ? 'bg-brand-blue' : 
        color === 'red' ? 'bg-brand-red' : 
        color === 'green' ? 'bg-emerald-500' : 
        'bg-amber-500'
      } opacity-20`} />
      
      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
        {label}
      </h4>
      <p className="text-4xl font-extrabold font-cherith text-brand-blue group-hover:text-brand-red transition-colors">
        {value}
      </p>
    </div>
  );
}
