import type { JSX } from "react";

export type Challenge = {
  id: number;
  title: string;
  description: string;
  slug: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};
