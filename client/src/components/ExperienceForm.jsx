import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'


const ExperienceForm = ({data,onChange}) => {

    const {token}=useSelector(state=>state.auth)
    const [generatingIndex,setGeneratingIndex]=useState(-1)


    const addExperience=()=>{
        const newExperience={
            company:"",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false
        };
        onChange([...data,newExperience])
    }

    const removeExperience=(index)=>{
        const updated=data.filter((_,i)=>i!=index);
        onChange(updated)
    }

    const updateExperience=(index,field,value)=>{
        const updated=[...data];
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }

    const generateDescription=async(index)=>{
        setGeneratingIndex(index)
        const experience=data[index]
        const prompt=`enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company} .`

        try{
            const {data}=await api.post('/api/ai/enhance-job-desc',{userContent:prompt},{headers:{Authorization:token}})
            updateExperience(index,"description",data.enhancedContent)
        }catch(error){
            toast.error(error.message)
        }finally{
            setGeneratingIndex(-1)
        }
    }


  return (
    <div className='space-y-6'>
       <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'>Professional Experience</h3>
                <p className='text-sm text-[#9AA4C7]'>Add your job experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-linear-to-r from-[#FF7700]/20 to-[#FFA600]/20 text-[#FF7700] border border-[#FF7700]/30 rounded hover:from-[#FF7700]/30 hover:to-[#FFA600]/30 transition-all duration-300'>
                <Plus className='size-4'/>Add Experience
            </button>
        </div>

        {
            data.length===0?(
                <div className='text-center py-8 text-[#9AA4C7]'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-[#1B2256]/50'/>
                    <p>No Work experience added yet</p>
                    <p className='text-sm'> Click "Add Experience" to get started.</p>

                </div>
            ):(
                <div className='space-y-4'>
                    {
                        data.map((experience,index)=>(
                            <div key={index} className='p-4 border border-[#1B2256]/50 bg-[#010018]/30 rounded-lg space-y-3'>
                                <div className='flex justify-between items-start'>
                                    <h4 className='text-white font-medium'>Experience #{index+1}</h4>
                                    <button onClick={()=>removeExperience(index)} className='text-red-400 hover:text-red-300 transition-colors'>
                                        <Trash2 className='size-4'/>
                                    </button>
                                </div>

                                <div className='grid md:grid-cols-2 gap-3'>
                                    <input value={experience.company||""} onChange={(e)=>updateExperience(index,"company",e.target.value)} type='text' placeholder='Company Name' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>

                                    <input value={experience.position||""} onChange={(e)=>updateExperience(index,"position",e.target.value)} type='text' placeholder='Job Title' className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>

                                    <input value={experience.start_date||""} onChange={(e)=>updateExperience(index,"start_date",e.target.value)} type='month'className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all'/>
                                
                                    <input value={experience.end_date||""} onChange={(e)=>updateExperience(index,"end_date",e.target.value)} type='month' disabled={experience.is_current} className='px-3 py-2 text-sm border border-[#1B2256]/50 bg-[#010018]/50 text-white rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all disabled:bg-[#1B2256]/30 disabled:opacity-50'/>


                                </div>

                                <label className='flex items-center gap-2'>
                                    <input type='checkbox' checked={experience.is_current||false} onChange={(e)=>{
                                        updateExperience(index,"is_current",e.target.checked?true:false);
                                    }} className='rounded border-[#1B2256]/50 bg-[#010018]/50 text-[#8DB2D4] focus:ring-[#8DB2D4]/50'/>
                                    <span className='text-sm text-[#9AA4C7]'>Currently Working here</span>
                                </label>

                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <label className='text-sm font-medium text-[#9AA4C7]'>Job Description</label>
                                        <button onClick={()=>generateDescription(index)} disabled={generatingIndex===index || !experience.position||!experience.company} className='flex items-center gap-1 px-2 py-1 text-xs bg-linear-to-r from-[#FF7700]/20 to-[#FFA600]/20 text-[#FF7700] border border-[#FF7700]/30 rounded hover:from-[#FF7700]/30 hover:to-[#FFA600]/30 transition-all duration-300 disabled:opacity-50'>
                                            {generatingIndex===index ? (
                                            <Loader2 className='w-3 h-3 animate-spin'/>):(
                                                <Sparkles className='w-3 h-3'/>
                                            )}   
                                       

                                            
                                            Enhance with AI
                                        </button>
                                    </div>
                                    <textarea value={experience.description||""} onChange={(e)=>updateExperience(index,"description",e.target.value)} className='w-full text-sm px-3 py-2 border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all resize-none' placeholder='Describe your key responsibilities and acheivements...'/>
                                </div>

                            </div>
                        ))
                    }
                </div>
            )
        }

    </div>
  )
}

export default ExperienceForm