import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'


import { Button } from './button'
import { Picker } from './picker'

import type { EmojiClickData } from 'emoji-picker-react'

const IMG_SIZE = 48

const VARIANTS = [
    '🎂🎉?',
    '👨‍💻☕?',
    '🏃🎧?',
    '🍲🥄?',
    '🛫🌴?',
]

const validEmoji = z.string().emoji().min(0)

export const CreateWizard: React.FC = () => {
    const placeholder = useMemo(() => {
        const idx = Math.floor(Math.random() * VARIANTS.length)
        return VARIANTS[idx]
    }, [])

    const [value, setValue] = useState<string>('')

    const handleEmojiPick = useCallback((data: EmojiClickData) => {
        setValue(prev => prev + data.emoji)
    }, [])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value

        if (!newValue || validEmoji.safeParse(newValue).success) {
            setValue(newValue)
        }
    }, [])

    const { user } = useUser()

    if (!user) {
        return null
    }

    return (
        <div className='bg-white p-4 rounded-2xl drop-shadow flex gap-x-4 items-center'>
            <Image src={user.profileImageUrl} alt='your-avatar' width={IMG_SIZE} height={IMG_SIZE} className='rounded-full'/>
            <input
                value={value}
                className='outline-0 placeholder:opacity-50  focus:placeholder:opacity-0 text-3xl tracking-[0.25em] flex-1 min-w-0'
                placeholder={placeholder}
                onChange={handleInputChange}
            />
            <Picker onPick={handleEmojiPick}/>
            <Button rounded>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.0' viewBox='0 0 512 512' width={16} height={32} fill='currentColor'>
                    <path d='M39.5 36.1C17.3 40.6 0 62.1 0 85.1c0 3.2 5.4 26.2 14.6 62.7 8.1 31.7 16.7 65.7 19.2 75.4l4.4 17.8h91.7c85.2 0 91.8.1 95.1 1.8 10.7 5.3 10.7 21.1 0 26.4-3.3 1.7-9.9 1.8-95.1 1.8H38.2l-4.4 17.7c-2.5 9.8-11.1 43.8-19.2 75.5C5.4 400.7 0 423.7 0 426.9c0 23.8 17.6 44.9 41 49.1 7.7 1.4 16.7.7 24.1-1.9 12.6-4.4 418.9-173.5 423.8-176.4 13.6-8.1 23.1-25.3 23.1-41.7 0-16.4-9.5-33.6-23.1-41.7C484 211.4 77.9 42.4 65 37.8c-6.6-2.3-18.6-3.1-25.5-1.7z'/>
                </svg>
            </Button>
        </div>
    )
}