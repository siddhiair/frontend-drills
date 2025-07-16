import type { AlertProps } from "../../types";

const Alert = ({
  content,
  variation = "info",
  showAlert = false,
}: AlertProps) => {
  const alertClass =
    variation === "success"
      ? "bg-green-700"
      : variation === "error"
      ? "bg-red-700"
      : "bg-orange-700";
  return (
    <div
      className={`alert ${alertClass} fixed top-3 right-8 text-white rounded-2xl transition-all duration-500 py-1 px-4 ${
        showAlert
          ? "opacity-100 visible translate-0"
          : "invisible opacity-0 translate-y-4"
      }`}
    >
      {content}
    </div>
  );
};

export default Alert;
