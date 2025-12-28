
import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {

    const { token }= useSelector(state=>state.auth)
    const [isGenerating,setIsGenerating]=useState(false)

    const generateSummary= async()=>{
        try{
            setIsGenerating(true)
            const prompt=`enhance my professional summary "${data}"`;
            const response=await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:token}})
            console.log("AI response:", response.data);
            setResumeData(prev=>({...prev,professional_summary:response.data.enhancedContent}))
        }catch(error){
            toast.error(error?.response?.data?.message || error.message)
        }
        finally{
            setIsGenerating(false)
        }
    }

  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-white'>Professional Summary</h3>
                <p className='text-sm text-[#9AA4C7]'>Add summary for your resume here</p>
            </div>
            <button disabled={isGenerating} onClick={generateSummary} className='flex items-center gap-2 px-3 py-1 text-sm bg-linear-to-r from-[#FF7700]/20 to-[#FFA600]/20 text-[#FF7700] border border-[#FF7700]/30 rounded hover:from-[#FF7700]/30 hover:to-[#FFA600]/30 transition-all duration-300 disabled:opacity-50'>
                {isGenerating?(
                    <Loader2 className='size-4 animate-spin'/>
                ):(
                    <Sparkles className='size-4'/>
                )}
                {isGenerating?"Enhancing...":"AI Enhance"}
            </button>
        </div>

        <div className='mt-6'>
            <textarea value={data||""} onChange={(e)=>onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border border-[#1B2256]/50 bg-[#010018]/50 text-white placeholder-[#9AA4C7] text-sm rounded-lg focus:ring-2 focus:ring-[#8DB2D4]/50 focus:border-[#8DB2D4]/50 outline-none transition-all resize-none' placeholder='write a summary that highlights your key strenghts and career objectives... '/>

            <p className='text-xs text-[#6B7280] max-w-4/5 mx-auto text-center'>
                Tip:Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
            </p>               
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm