import logo from "../assets/logo.svg";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img src={logo} alt="logo" className="w-24 h-24" />
    </div>
  );
}
