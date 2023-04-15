import classNames from 'classnames'
import React from 'react'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    type?: 'primary' | 'inline'
}

const BASIC_BUTTON_CLASSES = 'px-4 py-2 rounded transition-colors'
const PRIMARY_BUTTON_CLASSES = 'bg-gray-900 text-white hover:bg-indigo-600 active:bg-indigo-700'
const INLINE_BUTTON_CLASSES = 'bg-transparent text-gray-900 hover:text-indigo-600 active:text-indigo-700'

export const Button: React.FC<ButtonProps> = (props) => {
    const { className: propClass, type = 'primary', ...restProps } = props
    const className = classNames(propClass, BASIC_BUTTON_CLASSES, {
        [PRIMARY_BUTTON_CLASSES]: type === 'primary',
        [INLINE_BUTTON_CLASSES]: type === 'inline',
    })

    return <button className={className} {...restProps}/>
}