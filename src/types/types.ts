export interface IBook  {
  _id: string;
  title: string;
  author: string;
  category: string;
  email: string;
  userName?: string;
  description?: string;
  image?: string;
  addedDate?: string;
  totalCopies?: number;
  availableCopies?: number;
};

