export interface ICreateCategory {
  name: string;
  image: File | undefined;
  description: string;
}

export interface IUpdateCategory {
  id: number;
  name: string;
  image: string | undefined;
  newImage: File | undefined;
  description: string | undefined;
}
