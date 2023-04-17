import Link from "next/link";
import style from "./Button.module.scss"

export default function Button({href, type, onClick, target, size, ariaLabel, children}) {
  const btnClassName = size === 'md' ? style.md :  size === 'lg' ? style.lg :  size === 'rounded' ? style.rounded : style.md;
  if (!href || type === 'button') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={btnClassName}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      target={target}
      className={btnClassName}
    >
      {children}
    </Link>
  )
}