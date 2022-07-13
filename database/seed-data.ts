interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En-Progreso: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Terminada: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita dolor totam sed, quae quis facilis quas officia facere voluptatibus, corrupti debitis. Optio itaque distinctio esse quo ea sunt officia rerum!",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
