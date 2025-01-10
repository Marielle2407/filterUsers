import fs from "fs/promises";

type User = {
  name: string;
  age: number;
};

type Filter = {
  field: keyof User;
  value: string | number;
};


async function filterUsers(
  filters: Filter[],
  dataSourceType: "RAM" | "JSON",
  dataSource: User[] | string
): Promise<User[]> {
  let data: User[];

  
  if (dataSourceType === "RAM") {
    if (!Array.isArray(dataSource)) {
      throw new Error("Pour une source RAM, la donnée doit être un tableau.");
    }
    data = dataSource;
  } else if (dataSourceType === "JSON") {
    if (typeof dataSource !== "string") {
      throw new Error("Pour une source JSON, la donnée doit être un chemin de fichier.");
    }
    const fileContent = await fs.readFile(dataSource, "utf-8");
    data = JSON.parse(fileContent) as User[];
  } else {
    throw new Error("Type de source non supporté.");
  }

  
  const logQuery = filters
    .map((filter) => `"${filter.field}" = "${filter.value}"`)
    .join(" AND ");
  console.log(`Filter: WHERE ${logQuery}`);

  
  return data.filter((item) =>
    filters.every((filter) => item[filter.field] === filter.value)
  );
}


(async () => {
  const filters: Filter[] = [
    { field: "name", value: "marielle" },
    { field: "age", value: 24 },
  ];

  
  const ramData = [
    { name: "marielle", age: 24 },
    { name: "Jane", age: 30 },
    { name: "John", age: 40 },
  ];
  const filteredFromRAM = await filterUsers(filters, "RAM", ramData);
  console.log("Résultat RAM :", filteredFromRAM);

  
  const jsonFilePath = "./data.jSON";
  const filteredFromJSON = await filterUsers(filters, "JSON", jsonFilePath);
  console.log("Résultat JSON :", filteredFromJSON);
})();
