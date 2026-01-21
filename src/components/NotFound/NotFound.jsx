import React from "react";
import style from "./NotFound.module.css";

export default function NotFound() {
  return (
    <>
      <div>
        <p className="text-red-600 justify-center items-center text-3xl p-20 rounded-2xl shadow-2xl">
          Unexpected Application Error! 404 Not Found 💿 Hey developer 👋 You
          can provide a way better UX than this when your app throws errors by
          providing your own ErrorBoundary or errorElement prop on your route.
        </p>
      </div>
    </>
  );
}
