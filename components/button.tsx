import classNames from 'classnames'
import React from 'react'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    type?: 'primary' | 'inline'
    rounded?: boolean
}

const BASIC_BUTTON_CLASSES = 'px-4 py-2 rounded transition-colors box-border'
const PRIMARY_BUTTON_CLASSES = 'bg-gray-900 text-white hover:bg-indigo-600 active:bg-indigo-700'
const INLINE_BUTTON_CLASSES = 'bg-transparent border border-gray-300 text-gray-900 hover:border-indigo-600 hover:text-indigo-600 active:border-indigo-700 active:text-indigo-700'
const ROUNDED_BUTTON_CLASSES = 'rounded-full'

export const Button: React.FC<ButtonProps> = (props) => {
    const { className: propClass, rounded, type = 'primary', ...restProps } = props
    const className = classNames(propClass, BASIC_BUTTON_CLASSES, {
        [PRIMARY_BUTTON_CLASSES]: type === 'primary',
        [INLINE_BUTTON_CLASSES]: type === 'inline',
        [ROUNDED_BUTTON_CLASSES]: rounded,
    })

    return <button className={className} {...restProps}/>
}