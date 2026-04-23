import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      dir="rtl"
    >
      <h1 className="text-6xl font-bold text-indigo-500">404</h1>

      <p className="text-gray-600 mt-2 text-lg">پەیج نەدۆزرایەوە</p>

      <p className="text-gray-400 text-sm mt-1">
        ئەو پەیجەی تۆ دەتەوێت بەدوایدا بگەڕێیت بوونی نییە.
      </p>

      <Link
        to="/"
        className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded"
      >
        گەڕانەوە بۆ پەیجی سەرەکی
      </Link>
    </div>
  );
}
