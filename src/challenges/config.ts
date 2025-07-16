import React from "react";
import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Create a Counter Component",
    description:
      "Create a simple counter component that increases or decreases the count when clicking buttons.",
    slug: "create-a-counter-component",
    component: React.lazy(() => import("./CounterComponent")),
    loadCode: () => import("./CounterComponent?raw"),
  },
  {
    id: 2,
    title: "Implement a Toggle Switch",
    description:
      "Create a reusable toggle switch component in React that allows users to switch between light and dark themes.",
    slug: "implement-a-toggle-switch",
    component: React.lazy(() => import("./CounterComponent")),
    loadCode: () => import("./CounterComponent?raw"),
  },
];
