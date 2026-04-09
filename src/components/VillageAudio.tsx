interface VillageAudioProps {
  trackId: string;
  creator: string;
  key?: string;
}

export const VillageAudio = ({ trackId, creator }: VillageAudioProps) => {
  return (
    <div className="group relative border-2 border-zinc-800 bg-black p-4 transition-all hover:border-gargoyle-teal brutal-card">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-tighter">SOURCE: {creator} // ID: {trackId}</span>
        <div className="h-2 w-2 rounded-full bg-gargoyle-teal animate-pulse" />
      </div>
      
      {/* Visualizer - Only animates when active */}
      <div className="flex items-end gap-1 h-8 mb-4">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="bg-gargoyle-teal w-1 h-full opacity-20 group-hover:animate-bounce" 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <button className="w-full bg-zinc-900 py-2 text-white font-bold hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest">
        ENGAGE FREQUENCY
      </button>
    </div>
  );
};
