import type{ User } from '@clerk/nextjs/api'

export type FilteredUser = {
    id: string
    name: string
    profileImageUrl: string
}

export const filterUser = (user: User): FilteredUser => {
    const authorName = user.firstName ? `${user.firstName} ${user.lastName ?? ''}` : (user.username || '')
    return {
        id: user.id,
        name: authorName,
        profileImageUrl: user.profileImageUrl,
    }
}