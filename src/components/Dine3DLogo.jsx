import logo from "../assets/logo.webp";

export default function Dine3DLogo({ className = "h-8 w-auto", iconOnly = false }) {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 115 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M 24 82 C 24 57, 8 42, 18 25 C 28 8, 55 5, 67 18 C 79 6, 105 12, 101 32 C 97 46, 85 46, 79 38 C 76 28, 88 18, 103 22"
          stroke="#FA5400"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 24 82 C 24 57, 32 50, 38 50"
          stroke="#FA5400"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <img src={logo} alt="Dine3D" className={className} draggable={false} />;
}
