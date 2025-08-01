import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Editor() {
  return(

    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 h-50px '>
    <SimpleEditor />
    </div>

  ) 
}