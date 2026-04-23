// export default function Example() {
//   return (
//     <footer
//       className="w-full bg-black text-white border-t border-slate-700"
//       dir="rtl"
//     >
//       <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
//         {/*  Better visible logo */}
//         <div className="mb-6">
//           <img
//             alt="لۆگۆ"
//             className="h-12 drop-shadow-lg brightness-0 invert"
//             src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiLogoSquareShapeDark.svg"
//           />
//         </div>

//         <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-slate-300">
//           بەهێزکردنی دروستکەران لەسەرانسەری جیهان بە پێشکەوتوترین ئامرازەکانی
//           دروستکردنی ناوەڕۆکی AI. بیرۆکەت بگۆڕە بۆ ڕاستی.
//         </p>
//       </div>

//       <div className="border-t border-slate-700">
//         <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-slate-400">
//           <a
//             href="https://prebuiltui.com"
//             className="text-white hover:text-indigo-400 transition"
//           >
//             دەستی زێڕین
//           </a>{" "}
//           © ٢٠٢٥. هەموو مافەکان پارێزراون.
//         </div>
//       </div>
//     </footer>
//   );
// }

export default function Example() {
  return (
    <footer
      className="w-full bg-black text-white border-t border-slate-700"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Logo PNG */}
        <div className="mb-6">
          <img alt="لۆگۆ" className="h-12 drop-shadow-lg" src="/logo.png" />
        </div>

        <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-slate-300">
          بەهێزکردنی دروستکەران لەسەرانسەری جیهان بە پێشکەوتوترین ئامرازەکانی
          دروستکردنی ناوەڕۆکی AI. بیرۆکەت بگۆڕە بۆ ڕاستی.
        </p>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-slate-400">
          <a
            href="https://prebuiltui.com"
            className="text-white hover:text-indigo-400 transition"
          >
            دەستی زێڕین
          </a>{" "}
          © ٢٠٢٥. هەموو مافەکان پارێزراون.
        </div>
      </div>
    </footer>
  );
}
