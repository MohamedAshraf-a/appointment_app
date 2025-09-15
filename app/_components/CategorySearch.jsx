"use client"

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Api from '../_utils/DataCategory'
import Image from 'next/image'
import Link from 'next/link'

function CategorySearch() {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = () => {
        Api.getCategory().then(resp => {
            setCategoryList(resp.data)
            // console.log(resp.data)
        })
    }

    return (
        <div className='mb-10 items-center flex flex-col'>
            <h2 className='font-bold text-4xl mb-7'>
                <span className='text-lime-600'>Search</span> Categories
            </h2>

            <div className='flex w-full max-w-sm items-center'>
                <Input type="text" placeholder="Search category..." />
                <Button type="submit" className="ml-2">Search</Button>
            </div>

           <div className='grid md:grid-cols-6 sm:grid-cols-2 gap-4 mt-8'>
    {categoryList.map((cat, index) => (
        <Link 
            href={`/search/${cat.name}`} 
            key={index} 
            className='flex flex-col text-center items-center justify-center p-3 border border-lime-600 rounded-xl hover:scale-105 transition-all  ease-in-out cursor-pointer hover:bg-lime-50 hover:text-shadow-lime-50 shadow-sm'
        >
            <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                    src={cat.icon} 
                    width={64} 
                    height={64} 
                    alt={cat.name} 
                    className='object-contain w-full h-full'
                />
            </div>
            <label className='mt-2 text-sm font-medium'>{cat.name}</label>
        </Link>
    ))}
</div>

        </div>
    )
}

export default CategorySearch
