import { useState } from 'react';

const RESOLUTION_STEPS = [
  { id: 'LOCK', label: 'PHASE I: Containment Verified?', description: 'Has the client named the impulse and separated it from identity?' },
  { id: 'PRIDE', label: 'PHASE II: Pride Directive Active?', description: 'Are small, value-aligned actions replacing the survival energy?' },
  { id: 'SHIELD', label: 'PHASE III: Boundary Mapping?', description: 'Is the client identifying external "Vampire Nodes" independently?' }
];

export const TherapistConsultant = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="bg-void border-2 border-blood-red p-6 font-mono brutal-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-blood-red font-bold text-xl uppercase tracking-tighter">Overseer // Resolution Engine</h2>
        <span className="text-[8px] bg-zinc-900 p-1 border border-zinc-800">CLIENT: SUBJECT-001-ALPHA</span>
      </div>

      <div className="space-y-6">
        {RESOLUTION_STEPS.map((step, index) => (
          <div key={step.id} className={`p-4 border-l-4 transition-colors ${index <= currentStep ? 'border-gargoyle-teal bg-gargoyle-teal/5' : 'border-zinc-800 bg-zinc-900/20'}`}>
            <h3 className={index <= currentStep ? "text-gargoyle-teal font-bold" : "text-zinc-500 font-bold"}>{step.label}</h3>
            <p className="text-[10px] text-zinc-500 mb-2">{step.description}</p>
            
            {index === currentStep && currentStep < RESOLUTION_STEPS.length && (
              <button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="mt-2 text-[8px] border border-white px-2 py-1 hover:bg-white hover:text-black uppercase font-bold"
              >
                COMMIT RESOLUTION POINT
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-zinc-800 pt-4">
        <label className="text-blood-red text-[10px] font-bold block mb-2 uppercase tracking-widest">CLINICAL DIRECTIVE</label>
        <div className="bg-zinc-900 p-4 text-xs italic text-zinc-400 border-l-2 border-blood-red">
          "Do not manage the symptom. Fix the identity breach. If the client is stable but not Sovereign, the work is incomplete."
        </div>
      </div>
    </div>
  );
};
