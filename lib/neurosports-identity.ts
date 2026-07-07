export const neurosportsIdentity = {
  brandMission:
    "Build a neuroscience platform that organizes evaluation, intervention and functional transfer through one integrated scientific model.",
  corePhilosophy:
    "NeuroSports USA is not a conventional clinic and not a standalone sports performance company. It is a neuroscience platform organized around one scientific architecture.",
  oneScience: "One Science",
  oneModel: "One Model",
  twoWorlds: "Two Worlds",
  clinicalNeuroscience: "Clinical Neuroscience",
  neuroPerformance: "NeuroPerformance",
  mnsi: "MNSI",
  mnsiExpanded: "Multimodal NeuroSequential Integration",
  platformStatement:
    "A neuroscience platform where clinical reasoning, functional systems and performance transfer belong to the same institutional model.",
} as const;

export const neurosportsDualPath = [
  {
    label: neurosportsIdentity.mnsi,
    title: neurosportsIdentity.mnsiExpanded,
    description:
      "One structured scientific model guiding evaluation, regulation, activation, integration and transfer.",
  },
  {
    label: neurosportsIdentity.clinicalNeuroscience,
    title: "Clinical application",
    description:
      "Neuropsychology, rehabilitation and functional recovery pathways aligned with MNSI.",
  },
  {
    label: neurosportsIdentity.neuroPerformance,
    title: "Performance application",
    description:
      "Athlete-centered neurocognitive performance systems built on the same scientific structure.",
  },
] as const;

export const neurosportsPrinciples = [
  neurosportsIdentity.oneScience,
  neurosportsIdentity.oneModel,
  neurosportsIdentity.twoWorlds,
] as const;