import { useState } from 'react';

export const TheShield = () => {
  const [target, setTarget] = useState("");
  
  return (
    <div className="bg-void border-2 border-zinc-800 p-6 font-mono brutal-card">
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest">
        Sector Mesh // Boundary Mapping
      </h3>
      
      <div className="space-y-4">
        <input 
          placeholder="IDENTIFY EXTERNAL NODE (e.g. Social Media, Person)..." 
          className="w-full bg-black border-b border-zinc-700 p-2 text-white outline-none focus:border-gargoyle-teal transition-colors"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        
        <div className="bg-zinc-900 p-4 space-y-4">
          <div>
            <label className="text-[10px] text-zinc-500 block mb-1">AUTONOMY DRAIN LEVEL</label>
            <input type="range" className="w-full accent-blood-red" />
          </div>
          
          <div>
            <label className="text-[10px] text-zinc-500 block mb-1">PRIDE AFFIRMATION SCORE</label>
            <input type="range" className="w-full accent-gargoyle-teal" />
          </div>
        </div>

        <button className="w-full bg-white text-black font-bold py-2 hover:bg-gargoyle-teal transition-all uppercase text-xs">
          ENFORCE BOUNDARY
        </button>
      </div>
    </div>
  );
};
