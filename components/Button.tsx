import React from 'react'

type Props = {
  children: React.ReactNode
  outlined?: boolean | undefined
  type?: 'submit' | 'button' | 'reset' | undefined
  disable?: boolean
  size?: string | number | undefined
  textSize?: 'text-sm' | 'text-md' | 'text-lg' | string | undefined
  textBold?: 'font-bold' | 'font-semibold' | 'font-medium' | 'font-normal'
  onClick?: () => void
}

const Button = ({
  children,
  type,
  disable,
  outlined,
  size,
  onClick,
  textBold = 'font-bold',
  textSize = 'text-sm',
}: Props) => {
  return (
    <button
      type={type}
      disabled={disable}
      className={`w-full max-h-[24px] flex items-center justify-center cursor-pointer rounded-xl fill-current border-2 ${
        disable
          ? 'bg-primary-light/50 border-primary-light/30 text-gray-100 shadow-none'
          : `   border-primary-light hover:border-primary-dark ${
              outlined
                ? 'bg-transparent text-primary-light'
                : 'shadow-md  shadow-primary-light/25 hover:shadow-primary-dark/25 bg-primary-light text-white'
            } hover:bg-primary-dark hover:text-white  hover:shadow transition-all duration-200 ease-in-out`
      }  py-6 ${textBold} ${textSize} lg:text-base capitalize`}
      onClick={type == 'submit' ? undefined : onClick}
    >
      {children}
    </button>
  )
}

export default Button
