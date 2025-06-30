
import React from 'react';
import CounterDisplay from './CounterDisplay';
import ActionButton from './ActionButton';
import { PlusIcon, MinusIcon, RefreshIcon, TrashIcon } from './Icons';

interface CounterProps {
  counter: {
    id: number;
    name: string;
    count: number;
    superCount: number;
    threshold: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onDelete: () => void;
}

const Counter: React.FC<CounterProps> = ({ counter, onIncrement, onDecrement, onReset, onDelete }) => {
  return (
    <article className="w-full mx-auto bg-gradient-to-br from-slate-800 to-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-cyan-500/10 border border-slate-700 transition-all hover:border-cyan-500/30" aria-labelledby={`counter-name-${counter.id}`}>
      <div className="p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 id={`counter-name-${counter.id}`} className="text-xl font-bold text-cyan-400 tracking-tight truncate pr-4" title={counter.name}>
            {counter.name}
          </h2>
          <button 
            onClick={onDelete} 
            className="text-slate-500 hover:text-rose-500 transition-colors p-2 rounded-full -mr-2 -mt-2 flex-shrink-0"
            aria-label={`Delete counter ${counter.name}`}
          >
            <TrashIcon />
          </button>
        </header>
        
        <CounterDisplay 
            count={counter.count} 
            superCount={counter.superCount} 
            threshold={counter.threshold} 
        />

        <div className="mt-6 flex items-stretch gap-3">
          <ActionButton onClick={onDecrement} className="bg-slate-600/50 hover:bg-slate-700/70 focus:ring-slate-500 px-3">
            <MinusIcon />
          </ActionButton>
          <ActionButton onClick={onIncrement} className="bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-400 flex-grow">
            <PlusIcon />
            <span className="ml-1">Increment</span>
          </ActionButton>
           <ActionButton onClick={onReset} className="bg-slate-600/50 hover:bg-slate-700/70 focus:ring-slate-500 px-3">
            <RefreshIcon />
          </ActionButton>
        </div>
      </div>
    </article>
  );
};

export default Counter;
