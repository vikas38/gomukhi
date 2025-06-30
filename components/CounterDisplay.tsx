
import React from 'react';
import { StarIcon } from './Icons';

interface CounterDisplayProps {
  count: number;
  superCount: number;
  threshold: number;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, superCount, threshold }) => {
  const progress = threshold > 0 ? (count / threshold) * 100 : 0;

  return (
    <div className="relative bg-slate-900/70 rounded-2xl p-6 border border-slate-700 overflow-hidden">
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-amber-400/10 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold border border-amber-400/20" title={`Super Count: ${superCount}`}>
        <StarIcon />
        <span>{superCount}</span>
      </div>
      
      <div className="text-center pt-8 pb-4">
        <div 
          key={count} 
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-slate-100 animate-count-up"
          style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}
          >
          {count}
        </div>
        <div className="text-xl sm:text-2xl font-medium text-slate-500 tracking-tight">
          / {threshold}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-800/50">
        <div 
          className="h-full bg-cyan-500 transition-all duration-300 ease-in-out" 
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
          }}
        ></div>
      </div>

      <style>{`
        @keyframes count-up {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-count-up {
          animation: count-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CounterDisplay;
