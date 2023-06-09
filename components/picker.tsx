import EmojiPicker from 'emoji-picker-react'
import React, { useCallback, useState } from 'react'

import type { EmojiClickData } from 'emoji-picker-react'
import 'rc-dropdown/assets/index.css'

type PickerProps = {
    onPick: (data: EmojiClickData) => void
}

export const Picker: React.FC<PickerProps> = ({ onPick }) => {
    const [hidden, setHidden] = useState(true)
    const toggleMenu = useCallback(() => {
        setHidden(prev => !prev)
    }, [])

    return (
        <div className='cursor-pointer w-8 h-8 text-gray-400 relative z-10'>
            <svg xmlns='http://www.w3.org/2000/svg' width={32} height={32} version='1.0' viewBox='0 0 512 512' onClick={toggleMenu}>
                <g fill='currentColor'>
                    <path d='M238 .6c-1.9.2-7.8.9-13 1.4-33 3.6-69.5 16-99 33.6C88.5 58 58 88.5 35.6 126c-17.5 29.2-29.1 63.2-33.8 99-1.6 12.3-1.6 49.7 0 62 8.2 62.3 35.6 115 82 158.1 25.6 23.9 57.5 42.5 92.2 53.9 27.4 9.1 49.1 12.4 80 12.4 22.8 0 32.9-.9 53-5 68.9-14.1 130.4-58.3 167.4-120.4 17.5-29.2 29.1-63.2 33.8-99 1.6-12.3 1.6-49.7 0-62-4.7-35.8-16.3-69.8-33.8-99C454 88.5 423.5 58 386 35.6 357.1 18.3 322.6 6.5 288 2 279.2.8 244.2-.1 238 .6zM276.1 41c33 3.3 69.4 15.6 94.3 32 44.5 29.1 75 68.1 90.5 115.6 11.9 36.4 14.1 71.1 7 108.9-4.5 23.5-16.7 54.4-28.9 72.9-29.1 44.5-68.1 75-115.6 90.5-45.2 14.8-89.6 14.8-134.8 0-64.8-21.2-116.3-72.7-137.5-137.5-14.8-45.2-14.8-89.6 0-134.8 21.2-64.8 72.7-116.3 137.5-137.5 29.3-9.6 58.6-12.9 87.5-10.1z'/>
                    <path d='M160.7 149c-9.4 2.4-17.3 9-21.6 18-5.4 11.5-2.6 26.5 6.6 35.6 6.6 6.6 12.4 8.9 22.3 8.9 7.1 0 9.3-.4 13.5-2.5 19.8-10 24.3-36 8.9-51.4-7.3-7.3-20.1-11-29.7-8.6zM336.7 149c-9.4 2.4-17.3 9-21.6 18-5.4 11.5-2.6 26.5 6.6 35.6 6.6 6.6 12.4 8.9 22.3 8.9 7.1 0 9.3-.4 13.5-2.5 19.8-10 24.3-36 8.9-51.4-7.3-7.3-20.1-11-29.7-8.6zM130 289.6c-6.3 2.5-14.5 5.6-18.2 7l-6.7 2.6L111 311c26.2 52.3 69.9 86 123 95.1 10.8 1.9 39.3 1.6 51.1-.4 50.5-8.7 93.9-44.2 117-95.8 2.7-6 4.9-11.1 4.9-11.4 0-.5-37.2-12.6-37.6-12.2-.1.1-3.1 5.9-6.7 12.9-20.4 39.9-51.4 63.1-90.7 67.9-16.2 2-36.2-.1-51.5-5.3-29.3-10-57-35.8-73.8-68.5-2.3-4.6-4.4-8.2-4.7-8.2-.3.1-5.7 2.1-12 4.5z'/>
                </g>
            </svg>
            <div className='absolute top-11 right-0' hidden={hidden}>
                <EmojiPicker onEmojiClick={onPick}/>
            </div>
        </div>
    )
}