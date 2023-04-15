import classNames from 'classnames'
import React from 'react'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

const CONTAINER_CLASSES = 'w-full max-w-screen-xl px-8 mx-auto'

export const Container: React.FC<ContainerProps> = (props) => {
    const { className: propsClass, ...restProps } = props
    const className = classNames(propsClass, CONTAINER_CLASSES)

    return (
        <div className={className}  {...restProps}/>
    )
}