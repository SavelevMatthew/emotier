import Image from 'next/image'
import React from 'react'

import { FilteredUser } from '@/server/helpers/userFilter'

type ProfileOverviewProps = {
    user: FilteredUser
}

const IMG_SIZE = 128

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({ user }) => {
    return (
        <div className='bg-white drop-shadow rounded-2xl overflow-hidden'>
            <div className='bg-gray-200 w-full h-48'/>
            <div className='relative w-full px-6 pt-20 pb-6'>
                <Image
                    src={user.profileImageUrl}
                    alt='users avatar'
                    width={IMG_SIZE}
                    height={IMG_SIZE}
                    className='absolute -top-16 left-4 border-8 border-white rounded-full'
                />
                <h1 className='font-semibold text-2xl'>{user.name}</h1>
            </div>
        </div>
    )
}