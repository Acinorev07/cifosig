type Props={
  label:string;
  children:React.ReactNode;
}

export default function FormField({label,children}:Props){

  return(

    <div className="flex flex-col gap-1">

      <label className="font-medium text-[--violet-800]">
        {label}
      </label>

      {children}

    </div>

  )

}