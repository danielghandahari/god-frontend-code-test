export type BodyType = "suv" | "estate" | "sedan";

export type Car = {
  id: string;
  modelName: string;
  bodyType: BodyType;
  modelType: string;
  imageUrl: string;
};

export type FilterOptions = "all" | BodyType;
