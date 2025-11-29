import Link from 'next/link';

export default function NavLink({ href, children, isActive }) {
  return (
    <Link
      href={href}
      className="relative inline-block group"
    >
      <span className={`text-lg font-medium transition-colors duration-300 ${
        isActive
          ? 'text-[var(--color-primary)]'
          : 'text-[var(--color-secondary-light)] group-hover:text-[var(--color-primary)]'
      }`}>
        {children}
      </span>
      {/* Smooth underline animation - same as footer */}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></span>
    </Link>
  );
}