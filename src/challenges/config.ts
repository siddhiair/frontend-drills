import React from "react";
import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Create a Counter Component",
    description:
      "Build a counter component with two buttons to increment and decrement the count. Display the updated value as the user clicks.",
    slug: "create-a-counter-component",
    component: React.lazy(() => import("./CounterComponent")),
    loadCode: () => import("./CounterComponent?raw"),
  },
  {
    id: 2,
    title: "Implement a Toggle Switch",
    description:
      "Create a toggle switch component that lets users switch between light and dark themes for a content box. Reflect the theme change visually.",
    slug: "implement-a-toggle-switch",
    component: React.lazy(() => import("./ToggleSwitch")),
    loadCode: () => import("./ToggleSwitch?raw"),
  },
  {
    id: 3,
    title: "Build a To-Do List",
    description:
      "Create a to-do list where users can add tasks, mark them as complete, and remove them. Display the updated list dynamically.",
    slug: "build-a-todo-list",
    component: React.lazy(() => import("./ToDoList")),
    loadCode: () => import("./ToDoList?raw"),
  },
  {
    id: 4,
    title: "Fetch Data from an API (Load More on Button Click)",
    description:
      "Build a component that fetches data from a remote API and displays it in a list. Handle loading, errors, and pagination using a 'Load More' button.",
    slug: "fetch-data-from-api",
    component: React.lazy(() => import("./FetchAPIData")),
    loadCode: () => import("./FetchAPIData?raw"),
  },
  {
    id: 5,
    title: "Real-Time Search Bar with Filtering",
    description:
      "Create a React component with a search bar and a list. As the user types, filter the list in real-time to show items matching the query (case-insensitive, by name).",
    slug: "real-time-searchbar-with-filtering",
    component: React.lazy(() => import("./SearchBarFilter")),
    loadCode: () => import("./SearchBarFilter?raw"),
  },
  {
    id: 6,
    title: "Build a Dropdown Menu",
    description:
      "Build a React component with a button that toggles a dropdown menu. When open, display a list of options. Let the user select an option to update the button label. Close the menu on outside click or Escape key.",
    slug: "build-a-dropdown-menu",
    component: React.lazy(() => import("./DropdownMenu")),
    loadCode: () => import("./DropdownMenu?raw"),
  },
  {
    id: 7,
    title: "Implement a Tabs component",
    description:
      "Build a React Tabs component that displays a set of tab labels. Clicking a tab should activate it and display its corresponding content. Only one tab's content should be visible at a time.",
    slug: "implement-tabs-component",
    component: React.lazy(() => import("./Tab")),
    loadCode: () => import("./Tab?raw"),
  },
  {
    id: 8,
    title: "Fetch Data from an API (Load More on Scroll)",
    description:
      "Build a component that fetches data from a remote API and displays it in a list. Implement infinite scroll so that more data is automatically loaded as the user scrolls near the bottom of the list.",
    slug: "fetch-data-infinite-scroll",
    component: React.lazy(() => import("./FetchAPIInfiniteScroll")),
    loadCode: () => import("./FetchAPIInfiniteScroll?raw"),
  },
];
