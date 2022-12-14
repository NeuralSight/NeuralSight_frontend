import React, { ReactNode } from 'react'

type Props = {
  target: string
  children: ReactNode // tooltip content
}
/**
 *
 * @param {string} props.target string value of the parent component of the tooltip
 * @param {string} props.children jsx or string of it's the tooltip content
 * @returns Jsx
 */
const ToolTip = ({ target, children }: Props) => {
  return (
    // <button
    //   data-tooltip-target='tooltip-default'
    //   type='button'
    //   className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    // >
    //   Default tooltip
    <div
      id={target}
      role='tooltip'
      className='inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700'
    >
      {children}
      <div className='tooltip-arrow' data-popper-arrow></div>
    </div>
    // </button>
  )
}

export default ToolTip
