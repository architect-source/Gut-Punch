export const processConsultation = (input: string) => {
  const containsVampireData = /kill|hurt|end it|neighbor|rage/i.test(input);

  if (containsVampireData) {
    return {
      status: "STRIKE",
      response: "KINETIC VALIDATION REQUIRED. You are attempting to negotiate with a parasite. 1. Drop to the floor. 2. Push until failure. 3. Lock the vault. No further data will be processed until hardware is stabilized."
    };
  }

  return {
    status: "SOVEREIGN",
    response: "The Mesh is clear. Your autonomy is the only thing worth guarding. What is your next Pride Action?"
  };
};
