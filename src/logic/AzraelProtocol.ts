export const getSentryResponse = (userInput: string) => {
  const lowerInput = userInput.toLowerCase();
  
  // Logic for "Cold Iron" (Phase I/II integration)
  if (lowerInput.includes("adrenaline") || lowerInput.includes("act now")) {
    return {
      type: "SENTINEL_STRIKE",
      content: "Adrenaline is a chemical liar. Breach detected at the Perimeter. 1. **Cold Iron:** Submerge face in ice water. 2. **Burn the Fuel:** Drop and do pushups until failure. PUNISH the impulse, not the neighbor."
    };
  }

  // Logic for "Static/Phantoms" (Phase I)
  if (lowerInput.includes("voices") || lowerInput.includes("taunting")) {
    return {
      type: "SENTINEL_INFO",
      content: "The voices are static. Phantoms from the Void. They are noise, not commands. Treat them like a barking dog behind a reinforced gate. Do not negotiate with phantoms."
    };
  }

  return {
    type: "SENTINEL_DEFAULT",
    content: "Recognition is irrelevant. Only Sovereignty matters. Hold the line. Lock the vault."
  };
};
