interface TherapistGuardrailProps {
  lockVerified: boolean;
  prideVerified: boolean;
  onLockChange: (val: boolean) => void;
  onPrideChange: (val: boolean) => void;
  onCommit: () => void;
}

export const TherapistGuardrail = ({ 
  lockVerified, 
  prideVerified, 
  onLockChange, 
  onPrideChange, 
  onCommit 
}: TherapistGuardrailProps) => {
  return (
    <div className="border-4 border-blood-red bg-void p-6 font-mono brutal-card">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <h2 className="text-white font-bold tracking-widest uppercase text-sm">RESOLUTION COMPLIANCE</h2>
        <div className="text-right">
          <p className="text-[8px] text-zinc-500 uppercase">Funding Tier</p>
          <p className="text-gargoyle-teal font-bold text-xs">ALPHA-7 (HIGH-RES)</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="bg-zinc-900 p-4 border-l-2 border-white">
          <p className="text-xs text-white uppercase font-bold">Step 1: The Lock</p>
          <p className="text-[10px] text-zinc-400 italic">Did the client separate identity from impulse today?</p>
          <input 
            type="checkbox" 
            checked={lockVerified}
            onChange={(e) => onLockChange(e.target.checked)}
            className="mt-2 w-4 h-4 accent-gargoyle-teal cursor-pointer" 
          />
        </div>

        <div className="bg-zinc-900 p-4 border-l-2 border-white">
          <p className="text-xs text-white uppercase font-bold">Step 2: The Pride Directive</p>
          <p className="text-[10px] text-zinc-400 italic">Is there a documented action that affirms worth?</p>
          <input 
            type="checkbox" 
            checked={prideVerified}
            onChange={(e) => onPrideChange(e.target.checked)}
            className="mt-2 w-4 h-4 accent-gargoyle-teal cursor-pointer" 
          />
        </div>

        {/* Azrael Audit Button */}
        <button 
          onClick={onCommit}
          className="w-full bg-blood-red text-white py-4 font-bold uppercase hover:bg-white hover:text-black transition-all text-xs"
        >
          COMMIT RESOLUTION DATA & CALCULATE FUNDING
        </button>
      </div>
    </div>
  );
};
