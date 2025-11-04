import { Check, Palette } from 'lucide-react';
import React, { useState } from 'react'

const ColorPicker = ({selectedColor,onChange}) => {
    const colors=[
        { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Gray", value: "#6B7280" },
  { name: "Black", value: "#1F2937" },

  // 🌟 Additional elegant & modern resume colors
  { name: "Navy Blue", value: "#1E3A8A" },
  { name: "Sky Blue", value: "#38BDF8" },
  { name: "Emerald", value: "#059669" },
  { name: "Lime", value: "#84CC16" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Slate", value: "#475569" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Violet", value: "#7C3AED" },
  { name: "Maroon", value: "#881337" },
  { name: "Olive", value: "#6B8E23" },
  { name: "Gold", value: "#D4AF37" },
  { name: "Silver", value: "#A1A1AA" },
  { name: "Charcoal", value: "#36454F" },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Lavender", value: "#C084FC" }

    ]

    const [isOpen,setIsOpen]=useState(false);

  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen) }className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={16}/><span className='max-sm:hidden'>Accent</span>
        </button>

        {
            isOpen &&(
               <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'>

                    {colors.map((color)=>(
                        <div key={color.value} className='relative cursor-pointer group flex flex-col'  onClick={
                            ()=>{onChange(color.value);setIsOpen(false) } 
                        }>
                            <div className='w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors' style={{backgroundColor:color.value}}>
                            </div>
                            {selectedColor===color.value && (
                                <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                                    <Check className='size-5 text-white'/>
                                </div>
                            )}
                            <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
                            
                        </div>
                    ))}

                </div>
            )
        }
    </div>
  )
}

export default ColorPicker