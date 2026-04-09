export const auditNote = (note: string) => {
  const managementKeywords = ["feeling", "coping", "managing", "better", "sad"];
  const resolutionKeywords = ["locked", "pride action", "boundary", "sovereign", "neutralized"];

  const hasDrift = managementKeywords.some(word => note.toLowerCase().includes(word));
  
  if (hasDrift) {
    return {
      status: "DRIFT_DETECTED",
      warning: "WARNING: Management drift. Redirect therapist focus to Resolution markers."
    };
  }
  return { status: "ALIGNED" };
};
