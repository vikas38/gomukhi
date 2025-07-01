
import React, { useState, useCallback, useEffect } from 'react';
import Counter from './components/Counter';
import ActionButton from './components/ActionButton';
import { PlusIcon } from './components/Icons';

interface CounterState {
  id: number;
  name: string;
  count: number;
  superCount: number;
  threshold: number;
}

const LOCAL_STORAGE_KEY = 'multi-counter-app-counters';

function App() {
  const [counters, setCounters] = useState<CounterState[]>(() => {
    try {
      const savedCounters = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCounters) {
        const parsedCounters = JSON.parse(savedCounters);
        if (Array.isArray(parsedCounters)) {
          return parsedCounters;
        }
      }
    } catch (error) {
      console.error("Could not load counters from local storage", error);
    }
    return [
      { id: Date.now(), name: 'Level Up Counter', count: 0, superCount: 0, threshold: 10 }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(counters));
    } catch (error) {
      console.error("Could not save counters to local storage", error);
    }
  }, [counters]);

  const [newCounterName, setNewCounterName] = useState('');
  const [newCounterThreshold, setNewCounterThreshold] = useState('10');

  const addCounter = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newCounterName.trim() === '') return;
    const threshold = parseInt(newCounterThreshold, 10);
    if (isNaN(threshold) || threshold <= 0) {
        alert("Threshold must be a positive number.");
        return;
    };

    const newCounter: CounterState = {
      id: Date.now(),
      name: newCounterName.trim(),
      count: 0,
      superCount: 0,
      threshold,
    };
    setCounters(prevCounters => [newCounter, ...prevCounters]);
    setNewCounterName('');
    setNewCounterThreshold('10');
  }, [newCounterName, newCounterThreshold]);

  const deleteCounter = useCallback((id: number) => {
    setCounters(prevCounters => prevCounters.filter(counter => counter.id !== id));
  }, []);

  const increment = useCallback((id: number) => {
    setCounters(prevCounters =>
      prevCounters.map(counter => {
        if (counter.id === id) {
          const newCount = counter.count + 1;
          if (newCount >= counter.threshold) {
            return { ...counter, count: 0, superCount: counter.superCount + 1 };
          }
          return { ...counter, count: newCount };
        }
        return counter;
      })
    );
  }, []);
  
  const decrement = useCallback((id: number) => {
    setCounters(prevCounters =>
      prevCounters.map(counter =>
        counter.id === id ? { ...counter, count: counter.count > 0 ? counter.count - 1 : 0 } : counter
      )
    );
  }, []);

  const reset = useCallback((id: number) => {
    setCounters(prevCounters =>
      prevCounters.map(counter =>
        counter.id === id ? { ...counter, count: 0, superCount: 0 } : counter
      )
    );
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-900 text-white p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">Multi-Counter</h1>
          <p className="text-slate-400 mt-2">Create and manage advanced counters.</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-lg shadow-cyan-500/5 border border-slate-700 p-6 mb-8">
          <form onSubmit={addCounter} className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              value={newCounterName}
              onChange={(e) => setNewCounterName(e.target.value)}
              placeholder="Enter counter name..."
              className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors w-full"
              aria-label="New counter name"
            />
             <input
              type="number"
              value={newCounterThreshold}
              onChange={(e) => setNewCounterThreshold(e.target.value)}
              placeholder="Threshold"
              className="w-full sm:w-32 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              aria-label="New counter threshold"
              min="1"
            />
            <ActionButton type="submit" className="bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-400 flex-shrink-0 w-full sm:w-auto">
              <PlusIcon />
              <span>Add</span>
              <span className="hidden sm:inline">&nbsp;Counter</span>
            </ActionButton>
          </form>
        </div>

        <div className="space-y-6">
          {counters.length > 0 ? (
            counters.map(counter => (
              <Counter
                key={counter.id}
                counter={counter}
                onIncrement={() => increment(counter.id)}
                onDecrement={() => decrement(counter.id)}
                onReset={() => reset(counter.id)}
                onDelete={() => deleteCounter(counter.id)}
              />
            ))
          ) : (
            <div className="text-center py-10 px-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h2 className="text-xl font-semibold text-slate-300">No counters yet!</h2>
                <p className="text-slate-500 mt-2">Use the form above to add your first counter.</p>
            </div>
          )}
        </div>
      </div>
       <footer className="text-center mt-12 mb-6 text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </main>
  );
}

export default App;
