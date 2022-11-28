import React from "react";
import { useState } from "react";
import { UploadModal } from "./components/modal.component";

export function BlankPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="upload-button" onClick={() => setShowModal(true)}>
        Upload
      </button>
      {showModal && <UploadModal closeModal={setShowModal} />}
    </>
  );
}
