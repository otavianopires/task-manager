import style from "./FormControl.module.scss"

export default function FormControl({children}) {
  return (

    <div className={style.formControl}>
      {children}
    </div>
  )
}