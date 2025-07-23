// NOTE: This code is written for a single file challenge.
// It should be refactored for better separation of concerns:
// - Extract ModalHeader, ModalBody, ModalFooter into separate components/files
// - Create custom hooks for focus trap and keyboard event handling
// This format is intentionally kept simple and flat to meet coding round constraints.

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalHeader = ({
  title,
  showClose = true,
  handleClose,
}: {
  title: string;
  showClose: boolean;
  handleClose: () => void;
}) => {
  return (
    <div className="modal-header px-4 py-3 flex gap-x-5 items-center border-b border-gray-300">
      <h4 className="font-bold text-xl grow">{title}</h4>
      {showClose && (
        <button
          type="button"
          className="p-3"
          onClick={handleClose}
          aria-label="Close Modal"
        >
          <AiOutlineClose className="text-2xl" />
        </button>
      )}
    </div>
  );
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="modal-body px-4 py-8 grow overflow-y-auto">{children}</div>
  );
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children && (
        <div className="modal-footer p-4 flex gap-x-4 justify-end border-t border-gray-300">
          {children}
        </div>
      )}
    </>
  );
};

const Modal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!showModal || !modalElement) return;

    //add focusable HTML element to this string
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setShowModal(false);
      setIsVisible(false);
    };

    document.addEventListener("keydown", closeModalOnEscape);
    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  const openModal = () => {
    setShowModal(true);

    // Use requestAnimationFrame to let the browser paint the modal in its hidden state first,
    // then trigger visibility state change on the next frame for smooth transition animation.

    requestAnimationFrame(() => setIsVisible(true));
  };

  const closeModal = () => {
    setShowModal(false);
    setIsVisible(false);
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-600 text-white border-0 rounded-lg px-5 py-3 font-bold"
        onClick={openModal}
      >
        Open Modal
      </button>
      {showModal && (
        <div
          className="modal-dialog fixed inset-0 z-[999] h-svh"
          role="dialog"
          aria-modal="true"
          ref={modalRef}
        >
          <div
            className={`modal-content absolute max-h-[90%] w-[95%] max-w-xl duration-300 left-1/2 -translate-x-1/2 bg-white z-[1000] rounded-lg flex flex-col ${
              isVisible
                ? "top-1/2 opacity-100 -translate-y-1/2"
                : "pointer-events-none top-[55%] -translate-y-[55%] opacity-0"
            }`}
          >
            <ModalHeader
              title="Modal title goes here"
              showClose
              handleClose={closeModal}
            />
            <ModalBody>
              <p className="mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <p>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </ModalBody>
            <ModalFooter>
              <button
                type="button"
                className="bg-blue-600 text-white border-0 rounded-lg px-5 py-3 font-bold"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                Close
              </button>
            </ModalFooter>
          </div>
          <div
            className={`modal-backdrop absolute inset-0 bg-black transition-opacity duration-300 ${
              isVisible ? "opacity-70" : "opacity-0"
            }`}
            onClick={closeModal}
          ></div>
        </div>
      )}
    </>
  );
};

export default Modal;
