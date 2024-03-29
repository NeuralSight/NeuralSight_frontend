import React from 'react'
import { formatStringDecimalToPercentage } from '../../../helper/AIResponseFormats'

type Props = {
  type: string
  confidence: string
  showPercentage: boolean
}

const ResultCard = (props: Props) => {
  const confidence = parseInt(formatStringDecimalToPercentage(props.confidence))
  const result =
    confidence >= 75
      ? 'YES'
      : confidence >= 50 && confidence <= 74
      ? 'NOT SURE'
      : 'NO'
  return (
    <div className='flex w-full pl-8 pr-2 items-center'>
      <p className='print:font-normal font-medium text-base text-zinc-800 capitalize tracking-wide'>
        {props.type}
      </p>
      <div className='h-0.5 rounded-full w-full bg-zinc-800/90 mx-2'></div>
      <p
        className={`print:font-medium font-bold uppercase tracking-wide ${
          result == 'NO'
            ? 'text-green-500'
            : result == 'NOT SURE'
            ? 'text-orange-500'
            : 'text-red-500'
        }`}
      >
        {props.showPercentage
          ? `${formatStringDecimalToPercentage(props.confidence)}%`
          : result}
      </p>
    </div>
  )
}

export default ResultCard
