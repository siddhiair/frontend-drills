// NOTE: This code is structured for a single-file coding assessment.
// the implementation should be modularized for better maintainability:
// - Move `DropdownMenu` and `DropdownMenuItem` into separate component files
// - Move type definitions into a dedicated `types.ts` file
// - Use keyboard navigation for full accessibility

import { useEffect, useRef, useState } from "react";

type DropdownMenu = {
  label: string;
  submenu: string[];
};

const dropdownMenu: DropdownMenu = {
  label: "Action",
  submenu: ["View", "Edit", "Delete"],
};

const DropdownMenuItem = ({
  label,
  handleSubmenu,
}: {
  label: string;
  handleSubmenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <li>
      <a
        href="#"
        className="block px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors"
        onClick={handleSubmenu}
        data-label={label}
      >
        {label}
      </a>
    </li>
  );
};

const DropdownMenu = () => {
  const [buttonText, setButtonText] = useState<string>(dropdownMenu.label);
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);

  const dropdownRef = useRef(null);

  const closeOnClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      (dropdownRef.current as HTMLElement).contains(e.target as Node)
    ) {
      return;
    }
    setShowSubmenu(false);
  };

  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    setShowSubmenu(false);
  };

  const toggleDropdown = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleSubmenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const label = (e.currentTarget as HTMLAnchorElement).dataset.label!;
    setButtonText(label);
    setShowSubmenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeOnClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("click", closeOnClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="bg-gray-100 border border-gray-200 rounded-md px-6 py-3 font-bold min-w-[120px] text-center focus-visible:outline-1 focus-visible:outline-gray-400"
        onClick={toggleDropdown}
        aria-expanded={showSubmenu}
      >
        {" "}
        {buttonText}
      </button>

      {showSubmenu && dropdownMenu.submenu.length && (
        <ul className="absolute left-0 top-full bg-white z-10 border border-gray-100 shadow-lg min-w-[150px]">
          {dropdownMenu.submenu.map((menu) => (
            <DropdownMenuItem
              key={menu}
              handleSubmenu={handleSubmenu}
              label={menu}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
