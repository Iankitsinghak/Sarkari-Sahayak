export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Sarkari Sahayak Logo</title>
      <path d="M4 15V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M12 9V5" />
      <path d="M12 15l-4 4" />
      <path d="M12 15l4 4" />
      <path d="M8 21h8" />
      <path d="M6 15h12" />
    </svg>
  );
}
