import Link from "next/link";
import style from "./Button.module.scss"

export default function Button({href, type, size, children, ...props}) {
  const btnClassName = size === 'md' ? style.md :  size === 'lg' ? style.lg :  size === 'rounded' ? style.rounded : style.md;
  if (!href || type === 'button') {
    return (
      <button
        {...props}
        className={btnClassName}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
    {...props}
    className={btnClassName}
    >
      {children}
    </Link>
  )
}