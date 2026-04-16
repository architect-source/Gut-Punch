export interface DSM5Category {
  id: string;
  name: string;
  summary: string;
  commonCoOccurring: string[];
  fmesPrompts: {
    perimeter: string;
    vault: string;
    stoneVsBeast: string;
    resolutionAction: string;
  };
}

export const DSM5_CATEGORIES: DSM5Category[] = [
  {
    id: 'neurodevelopmental',
    name: 'Neurodevelopmental Disorders',
    summary: 'Disorders that typically manifest early in development, often before the child enters grade school, and are characterized by developmental deficits that produce impairments of personal, social, academic, or occupational functioning.',
    commonCoOccurring: ['ADHD', 'Learning Disorders', 'Anxiety'],
    fmesPrompts: {
      perimeter: "How does sensory overload or executive dysfunction breach the client's perimeter?",
      vault: "What 'static' from the environment is leaking into the vault?",
      stoneVsBeast: "Is the client choosing a structured routine (Stone) or reacting to chaos (Beast)?",
      resolutionAction: "Identify one environmental adjustment to reinforce the perimeter."
    }
  },
  {
    id: 'schizophrenia',
    name: 'Schizophrenia Spectrum & Other Psychotic Disorders',
    summary: 'Disorders defined by abnormalities in one or more of the following five domains: delusions, hallucinations, disorganized thinking (speech), grossly disorganized or abnormal motor behavior (including catatonia), and negative symptoms.',
    commonCoOccurring: ['Substance Use', 'Depression', 'Anxiety'],
    fmesPrompts: {
      perimeter: "Are phantoms from the void attempting to breach the physical perimeter?",
      vault: "Is the client identifying as the 'static' or the Sentry?",
      stoneVsBeast: "Cold Iron protocol: Is the client using grounding to stay in the Stone state?",
      resolutionAction: "Perform one grounding exercise to verify the vault is locked."
    }
  },
  {
    id: 'bipolar',
    name: 'Bipolar and Related Disorders',
    summary: 'Disorders characterized by periods of abnormally elevated mood and energy levels (mania or hypomania) and periods of abnormally low mood and energy levels (depression).',
    commonCoOccurring: ['Substance Use', 'Anxiety', 'ADHD'],
    fmesPrompts: {
      perimeter: "Is the 'high' energy leading to a reckless expansion of the perimeter?",
      vault: "What impulses are flooding the vault during manic/depressive shifts?",
      stoneVsBeast: "Is the client riding the adrenaline wave (Beast) or maintaining a baseline (Stone)?",
      resolutionAction: "Commit to a baseline sleep/activity protocol to stabilize the vault."
    }
  },
  {
    id: 'depressive',
    name: 'Depressive Disorders',
    summary: 'Disorders characterized by the presence of sad, empty, or irritable mood, accompanied by somatic and cognitive changes that significantly affect the individual’s capacity to function.',
    commonCoOccurring: ['Anxiety', 'Substance Use', 'Chronic Pain'],
    fmesPrompts: {
      perimeter: "Is the perimeter shrinking due to lack of energy/worth?",
      vault: "What 'Vampire Clusters' of self-sabotage are draining the vault?",
      stoneVsBeast: "Is the client surrendering to the void (Beast) or performing one Pride Action (Stone)?",
      resolutionAction: "Execute one Pride Directive action, no matter how small."
    }
  },
  {
    id: 'anxiety',
    name: 'Anxiety Disorders',
    summary: 'Disorders that share features of excessive fear and anxiety and related behavioral disturbances.',
    commonCoOccurring: ['Depression', 'OCD', 'Panic Disorder'],
    fmesPrompts: {
      perimeter: "Is the client hyper-vigilant about imaginary breaches at the perimeter?",
      vault: "What future-based phantoms are taunting the vault?",
      stoneVsBeast: "Is the client reacting to adrenaline (Beast) or using Box Breathing (Stone)?",
      resolutionAction: "Perform a Kinetic Override to reset the nervous system."
    }
  },
  {
    id: 'ocd',
    name: 'Obsessive-Compulsive and Related Disorders',
    summary: 'Disorders characterized by the presence of obsessions and/or compulsions.',
    commonCoOccurring: ['Anxiety', 'Depression', 'Tic Disorders'],
    fmesPrompts: {
      perimeter: "Are compulsions being used as a fake 'lock' for the perimeter?",
      vault: "What intrusive impulses are demanding negotiation in the vault?",
      stoneVsBeast: "Is the client negotiating with phantoms (Beast) or holding the line (Stone)?",
      resolutionAction: "Delay one compulsion by 5 minutes to prove sovereignty."
    }
  },
  {
    id: 'trauma',
    name: 'Trauma- and Stressor-Related Disorders',
    summary: 'Disorders in which exposure to a traumatic or stressful event is listed explicitly as a diagnostic criterion.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Substance Use'],
    fmesPrompts: {
      perimeter: "Is a past breach still being treated as an active threat at the perimeter?",
      vault: "What traumatic echoes are triggering the mammalian dive reflex?",
      stoneVsBeast: "Is the client stuck in 'survival energy' (Beast) or choosing safety (Stone)?",
      resolutionAction: "Identify one safe anchor in the current physical environment."
    }
  },
  {
    id: 'dissociative',
    name: 'Dissociative Disorders',
    summary: 'Disorders characterized by a disruption of and/or discontinuity in the normal integration of consciousness, memory, identity, emotion, perception, body representation, motor control, and behavior.',
    commonCoOccurring: ['PTSD', 'Depression', 'Borderline Personality'],
    fmesPrompts: {
      perimeter: "Has the client abandoned the perimeter entirely?",
      vault: "Is the identity of the Sentry fragmented or offline?",
      stoneVsBeast: "Use Void Grounding: Reconnect the Sentry to the physical hardware.",
      resolutionAction: "Name 5 physical objects to re-establish the perimeter."
    }
  },
  {
    id: 'somatic',
    name: 'Somatic Symptom and Related Disorders',
    summary: 'Disorders characterized by the prominence of somatic symptoms associated with significant distress and impairment.',
    commonCoOccurring: ['Anxiety', 'Depression', 'Chronic Illness'],
    fmesPrompts: {
      perimeter: "Is the body itself being treated as a breached perimeter?",
      vault: "What physical signals are being misinterpreted as vault failures?",
      stoneVsBeast: "Is the client obsessing over signals (Beast) or maintaining neutral focus (Stone)?",
      resolutionAction: "Acknowledge the physical signal without assigning it 'command' status."
    }
  },
  {
    id: 'feeding',
    name: 'Feeding and Eating Disorders',
    summary: 'Disorders characterized by a persistent disturbance of eating or eating-related behavior that results in the altered consumption or absorption of food and that significantly impairs physical health or psychosocial functioning.',
    commonCoOccurring: ['Depression', 'Anxiety', 'OCD'],
    fmesPrompts: {
      perimeter: "Is the intake of fuel being used to control or punish the perimeter?",
      vault: "What impulses regarding body-worth are leaking into the vault?",
      stoneVsBeast: "Is the client using food as a weapon (Beast) or fuel for the Sentry (Stone)?",
      resolutionAction: "Consume one meal as a deliberate act of Sentry maintenance."
    }
  },
  {
    id: 'elimination',
    name: 'Elimination Disorders',
    summary: 'Disorders involving the inappropriate elimination of urine or feces, usually first diagnosed in childhood or adolescence.',
    commonCoOccurring: ['Anxiety', 'Developmental Delays'],
    fmesPrompts: {
      perimeter: "Is the client struggling with basic biological perimeter control?",
      vault: "What shame-based phantoms are arising from these breaches?",
      stoneVsBeast: "Maintain clinical neutrality. Focus on hardware stabilization.",
      resolutionAction: "Establish a strict schedule for biological maintenance."
    }
  },
  {
    id: 'sleep',
    name: 'Sleep-Wake Disorders',
    summary: 'Disorders involving sleep-wake complaints about the quality, timing, and amount of sleep, resulting in daytime impairment and distress.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Chronic Pain'],
    fmesPrompts: {
      perimeter: "Is the lack of sleep weakening the Sentry's guard at the perimeter?",
      vault: "What phantoms emerge when the vault is exhausted?",
      stoneVsBeast: "Is the client fighting the void (Beast) or using a sleep protocol (Stone)?",
      resolutionAction: "Commit to 'Lights Out' at a fixed time to recharge the Sentry."
    }
  },
  {
    id: 'sexual',
    name: 'Sexual Dysfunctions',
    summary: 'Disorders characterized by a clinically significant disturbance in a person’s ability to respond sexually or to experience sexual pleasure.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Relationship Issues'],
    fmesPrompts: {
      perimeter: "Is performance anxiety creating a breach in the intimate perimeter?",
      vault: "What shame-signals are disrupting the Sentry's focus?",
      stoneVsBeast: "Is the client reacting to fear (Beast) or practicing presence (Stone)?",
      resolutionAction: "Practice one non-goal-oriented touch exercise to ground the Sentry."
    }
  },
  {
    id: 'gender',
    name: 'Gender Dysphoria',
    summary: 'Disorders characterized by a marked incongruence between one’s experienced/expressed gender and assigned gender.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Social Isolation'],
    fmesPrompts: {
      perimeter: "Is the external perimeter in conflict with the internal Sentry identity?",
      vault: "What dysphoric phantoms are taunting the vault's core?",
      stoneVsBeast: "Is the client surrendering to distress (Beast) or affirming identity (Stone)?",
      resolutionAction: "Perform one action that aligns the external perimeter with the internal Sentry."
    }
  },
  {
    id: 'disruptive',
    name: 'Disruptive, Impulse-Control, and Conduct Disorders',
    summary: 'Disorders involving problems in the self-control of emotions and behaviors.',
    commonCoOccurring: ['ADHD', 'Substance Use', 'Mood Disorders'],
    fmesPrompts: {
      perimeter: "Is the client aggressively breaching the perimeters of others?",
      vault: "What explosive impulses are shattering the vault's containment?",
      stoneVsBeast: "Is the client a slave to rage (Beast) or a master of restraint (Stone)?",
      resolutionAction: "Practice the 10-second 'Lock' protocol before reacting to a trigger."
    }
  },
  {
    id: 'substance',
    name: 'Substance-Related and Addictive Disorders',
    summary: 'Disorders encompassing 10 separate classes of drugs and gambling disorder.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Personality Disorders'],
    fmesPrompts: {
      perimeter: "Is the client using external chemicals to bypass the perimeter entirely?",
      vault: "What 'Vampire Nodes' are demanding chemical fuel in the vault?",
      stoneVsBeast: "Is the client surrendering to the craving (Beast) or holding the line (Stone)?",
      resolutionAction: "Identify the 'Vampire Node' and enforce a 1-hour boundary."
    }
  },
  {
    id: 'neurocognitive',
    name: 'Neurocognitive Disorders',
    summary: 'Disorders in which the primary clinical deficit is in cognitive function, and that are acquired rather than developmental.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Delirium'],
    fmesPrompts: {
      perimeter: "Is the hardware itself failing to maintain the perimeter?",
      vault: "What memory-leaks are confusing the Sentry's log?",
      stoneVsBeast: "Focus on external anchors and simplified protocols (Stone).",
      resolutionAction: "Use a physical log to externalize the Sentry's memory."
    }
  },
  {
    id: 'personality',
    name: 'Personality Disorders',
    summary: 'An enduring pattern of inner experience and behavior that deviates markedly from the expectations of the individual’s culture, is pervasive and inflexible, has an onset in adolescence or early adulthood, is stable over time, and leads to distress or impairment.',
    commonCoOccurring: ['Depression', 'Anxiety', 'Substance Use'],
    fmesPrompts: {
      perimeter: "Is the client's perimeter chronically unstable or overly rigid?",
      vault: "What recursive identity phantoms are taunting the Sentry?",
      stoneVsBeast: "Is the client acting out the pattern (Beast) or choosing a new response (Stone)?",
      resolutionAction: "Identify one 'Enduring Pattern' and perform its opposite action."
    }
  },
  {
    id: 'paraphilic',
    name: 'Paraphilic Disorders',
    summary: 'Disorders characterized by any intense and persistent sexual interest other than sexual interest in genital stimulation or preparatory fondling with phenotypically normal, physically mature, consenting human partners.',
    commonCoOccurring: ['Anxiety', 'Depression', 'Impulse Control'],
    fmesPrompts: {
      perimeter: "Are non-consensual or harmful impulses breaching the perimeter?",
      vault: "What 'Vampire Clusters' are demanding deviant fuel?",
      stoneVsBeast: "Lock the vault. Do not negotiate with harmful phantoms (Stone).",
      resolutionAction: "Immediately engage a Kinetic Override when the impulse arises."
    }
  },
  {
    id: 'other',
    name: 'Other Mental Disorders',
    summary: 'Disorders that do not meet the full criteria for any of the disorders in the preceding diagnostic classes.',
    commonCoOccurring: ['Varies'],
    fmesPrompts: {
      perimeter: "Assess the unique perimeter breach presented.",
      vault: "What unclassified phantoms are taunting the vault?",
      stoneVsBeast: "Apply core GutPunch principles: Lock, Pride, Shield.",
      resolutionAction: "Create a custom protocol for this unique breach."
    }
  }
];
