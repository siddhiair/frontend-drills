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
      "Create a reusable toggle switch component in React that allows users to switch between light and dark themes for a div with content.",
    slug: "implement-a-toggle-switch",
    component: React.lazy(() => import("./ToggleSwitch")),
    loadCode: () => import("./ToggleSwitch?raw"),
  },
  {
    id: 3,
    title: "Build a To-Do List",
    description:
      "Create a to-do list component where users can add, remove, and mark items as complete.",
    slug: "build-a-todo-list",
    component: React.lazy(() => import("./ToDoList")),
    loadCode: () => import("./ToDoList?raw"),
  },
  {
    id: 4,
    title: "Fetch Data from an API",
    description:
      "Create a component fetching data from an API and displaying it in a list.",
    slug: "fetch-data-from-api",
    component: React.lazy(() => import("./FetchAPIData")),
    loadCode: () => import("./FetchAPIData?raw"),
  },
];
