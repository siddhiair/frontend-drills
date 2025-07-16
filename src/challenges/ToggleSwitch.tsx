import { useState } from "react";

const ToggleSwitch = () => {
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  const handleSwitch = () => {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
  };

  const switchClass =
    "block py-2 px-1 w-1/2 text-center text-sm font-semibold rounded-full";

  return (
    <>
      <style>
        {`
        .toggleSwitch-wrapper *{
          transition: color .3s;
        }
        .toggleSwitch-wrapper[data-theme="Dark"]{
          background-color: #000;
          color: #fff;
        }
      `}
      </style>
      <div
        className="toggleSwitch-wrapper transition-colors duration-300 p-4 border border-gray-300"
        data-theme={theme}
      >
        <h3 className="mb-4 text-xl font-bold">Code Splitting</h3>
        <p className="mb-3">
          Bundling is great, but as your app grows, your bundle will grow too.
          Especially if you are including large third-party libraries. You need
          to keep an eye on the code you are including in your bundle so that
          you don’t accidentally make it so large that your app takes a long
          time to load.
        </p>

        <p className="">
          To avoid winding up with a large bundle, it’s good to get ahead of the
          problem and start “splitting” your bundle. Code-Splitting is a feature
          supported by bundlers like Webpack, Rollup and Browserify (via
          factor-bundle) which can create multiple bundles that can be
          dynamically loaded at runtime.
        </p>

        <div className="switch mt-6">
          <input
            id="toggle-switch"
            role="switch"
            type="checkbox"
            aria-labelledby="toggle-switch-label"
            value={theme}
            onChange={handleSwitch}
            className="hidden"
          />
          <label
            id="toggle-switch-label"
            htmlFor="toggle-switch"
            className="inline-flex w-[150px] bg-gray-500 rounded-full border border-gray-500 overflow-hidden cursor-pointer"
          >
            <span
              className={`${switchClass} ${
                theme === "Light" ? "bg-white text-black" : "text-white"
              }`}
            >
              Light
            </span>
            <span
              className={`${switchClass} ${
                theme === "Dark" ? "bg-white text-black" : "text-white"
              }`}
            >
              Dark
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ToggleSwitch;
