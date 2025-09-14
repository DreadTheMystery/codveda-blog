import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        &copy; {new Date().getFullYear()} Codveda Blog. All rights reserved.
      </div>
    </footer>
  );
}
