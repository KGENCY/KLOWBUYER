"use client";

import { previewExitIntent } from "@/components/conversion/ExitIntentModal";

/** Opens the exit-intent modal on demand, so it can be reviewed without leaving the window. */
export default function ExitPreviewButton() {
  return (
    <button className="btn btn--ghost" onClick={previewExitIntent} data-cta-id="dev_exit_preview">
      Open exit-intent modal
    </button>
  );
}
