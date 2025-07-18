import { useEffect, useState } from "react";
import type { AlertProps, AlertVariations } from "../../types";
import { Alert } from "../common";
type CodeProps = {
  loadCode: () => Promise<{ default: string }>;
};

const Code = ({ loadCode }: CodeProps) => {
  const [code, setCode] = useState<string>("");
  const [alert, setAlert] = useState<AlertProps>({
    content: "",
    variation: "info",
    showAlert: false,
  });

  useEffect(() => {
    loadCode().then((mod) => setCode(mod.default));
  }, [loadCode]);

  const copyCode = async () => {
    const showAlert = (
      content: string,
      variation: AlertVariations,
      showAlert: boolean
    ) => {
      setAlert({
        content,
        variation,
        showAlert,
      });
    };

    try {
      await navigator.clipboard.writeText(code);
      showAlert("Copied code successfully", "success", true);
      setTimeout(
        () => showAlert("Copied code successfully", "success", false),
        2000
      );
    } catch {
      showAlert("Failed to copy. Try in some time.", "error", true);
      setTimeout(
        () => showAlert("Failed to copy. Try in some time.", "error", false),
        2000
      );
    }
  };

  return (
    <>
      <Alert
        content={alert.content}
        variation={alert.variation}
        showAlert={alert.showAlert}
      />
      <div
        className="bg-black text-white relative py-7 px-4 code-block overflow-x-auto text-xs md:text-sm lg:p-6"
        id="code"
      >
        <pre>{code}</pre>

        <button
          type="button"
          className="absolute top-0 right-0 z-10 bg-amber-600 text-white text-sm py-2 px-5 rounded-bl-lg cursor-pointer"
          onClick={copyCode}
        >
          Copy
        </button>
      </div>
    </>
  );
};

export default Code;
