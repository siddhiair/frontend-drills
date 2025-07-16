import type { JSX } from "react";

export type Challenge = {
  id: number;
  title: string;
  description: string;
  slug: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  loadCode: () => Promise<{ default: string }>;
};

export type TabsProps = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export type AlertVariations = "success" | "error" | "info";

export type AlertProps = {
  content: string;
  showAlert: boolean;
  variation: AlertVariations;
};
