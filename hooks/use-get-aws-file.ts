import { useQuery } from '@tanstack/react-query'

const fetchObject = async (file: string) => {
  try {
    const response = await fetch(`/api/get-aws-file/${file}`)
    return await response.json()
  } catch (error) {
    console.log('Error -', error)
  }
}

export default function useGetAWSfile(path: string, reportId: string) {
  const pathsArr = path.split('/')
  const imagePathQuery = useQuery(
    [reportId, 'image'],
    async () => await fetchObject(pathsArr[pathsArr.length - 1]),
    {
      onSuccess: () => {
        console.log('success')
      },
    }
  )

  return imagePathQuery
}
