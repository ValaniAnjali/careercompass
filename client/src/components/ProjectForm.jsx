import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

const ProjectForm = ({data,onChange}) => {
      const addProject=()=>{
        const newProject={
            name:"",
            type:"",
            description:"",
        };
        onChange([...data,newProject])
    }

    const removeProject=(index)=>{
        const updated=data.filter((_,i)=>i!=index);
        onChange(updated)
    }

    const updateProject=(index,field,value)=>{
        const updated=[...data];
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }

  return (
    <div>
       <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'>Projects</h3>
                <p className='text-sm text-[#9AA4C7]'>Add your projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors '>
                <Plus className='size-4'/>Add Project
            </button>
        </div>

      
                <div className='space-y-4 mt-6'>
                    {
                        data.map((project,index)=>(
                            <div key={index} className='p-4 border border-[#1B2256]/50 bg-[#010018]/30 rounded-lg space-y-3'>
                                <div className='flex justify-between items-start'>
                                    <h4 className='text-white font-medium'>Project #{index+1}</h4>
                                    <button onClick={()=>removeProject(index)} className='text-red-400 hover:text-red-300 transition-colors'>
                                        <Trash2 className='size-4'/>
                                    </button>
                                </div>

                                <div className='grid gap-3'>
                                    <input value={project.name||""} onChange={(e)=>updateProject(index,"name",e.target.value)} type='text' placeholder='Project Name' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>

                                   <input value={project.type||""} onChange={(e)=>updateProject(index,"type",e.target.value)} type='text' placeholder='Project Type' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>
                                     <textarea rows={4} value={project.description||""} onChange={(e)=>updateProject(index,"description",e.target.value)} type='text' placeholder='Describe Your Project...' className='w-full px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all resize-none'/>

                                   

                                </div>

                             


                                
                                    


                            </div>
                        ))
                    }
                </div>
       

    </div>
  )
}

export default ProjectForm