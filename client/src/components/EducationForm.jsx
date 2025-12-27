import { GraduationCap, Plus, Trash2 } from 'lucide-react';

import React from 'react'

const EducationForm = ({data,onChange}) => {
     const addEducation=()=>{
        const newEducation={
            institution:"",
            degree:"",
            field:"",
            graduation_date:"",
            gpa:"",
        
        };
        onChange([...data,newEducation])
    }

    const removeEducation=(index)=>{
        const updated=data.filter((_,i)=>i!=index);
        onChange(updated)
    }

    const updateEducation=(index,field,value)=>{
        const updated=[...data];
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }


  return (
    <div className='space-y-6'>
       <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'>Education</h3>
                <p className='text-sm text-[#9AA4C7]'>Add your education details</p>
            </div>
            <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-linear-to-r from-[#FF7700]/20 to-[#FFA600]/20 text-[#FF7700] border border-[#FF7700]/30 rounded hover:from-[#FF7700]/30 hover:to-[#FFA600]/30 transition-all duration-300'>
                <Plus className='size-4'/>Add Education
            </button>
        </div>

        {
            data.length===0?(
                <div className='text-center py-8 text-[#9AA4C7]'>
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-[#1B2256]/50'/>
                    <p>No education added yet</p>
                    <p className='text-sm'> Click "Add Education" to get started.</p>

                </div>
            ):(
                <div className='space-y-4'>
                    {
                        data.map((education,index)=>(
                            <div key={index} className='p-4 border border-[#1B2256]/50 bg-[#010018]/30 rounded-lg space-y-3'>
                                <div className='flex justify-between items-start'>
                                    <h4 className='text-white font-medium'>Education #{index+1}</h4>
                                    <button onClick={()=>removeEducation(index)} className='text-red-400 hover:text-red-300 transition-colors'>
                                        <Trash2 className='size-4'/>
                                    </button>
                                </div>

                                <div className='grid md:grid-cols-2 gap-3'>
                                    <input value={education.institution||""} onChange={(e)=>updateEducation(index,"institution",e.target.value)} type='text' placeholder='Institute Name' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>

                                    <input value={education.degree||""} onChange={(e)=>updateEducation(index,"degree",e.target.value)} type='text' placeholder="Degree (e.g., Bachelor's, Master's)" className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>

                                    <input value={education.field||""} onChange={(e)=>updateEducation(index,"field",e.target.value)} type='text'className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all' placeholder='Field of Study'/>
                                
                                    <input value={education.graduation_date||""} onChange={(e)=>updateEducation(index,"graduation_date",e.target.value)} type='month' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>


                                </div>

                                <input value={education.gpa||""} onChange={(e)=>updateEducation(index,"gpa",e.target.value)} type='text' className='px-3 py-2 text-sm rounded-lg ' placeholder='GPA (optional)'/>



                                
                                    


                            </div>
                        ))
                    }
                </div>
            )
        }

    </div>
  )
}

export default EducationForm