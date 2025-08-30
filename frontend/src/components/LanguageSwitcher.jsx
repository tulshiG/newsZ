import React from "react";

function LanguageSwitcher({ onTranslate }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={() => onTranslate("hi")}>Translate to Hindi</button>
      {/* Later you can add: Translate to Gujarati, Marathi, etc. */}
    </div>
  );
}

export default LanguageSwitcher;
