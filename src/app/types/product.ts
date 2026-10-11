
// Product Type
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };

  markets?: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
};

// Category Type
export type Category = {
  id: number | string;
  slug: string;
  nameBn: string;
  icon?: string;
};
