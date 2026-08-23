type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput(props: Props){

  return(

    <input
      {...props}
      className={`w-full rounded-xl border px-3 py-2
      focus:ring-2 focus:ring-violet-400
      ${props.className ?? ""}`}
    />

  )

}