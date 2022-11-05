import { Icon } from '@iconify/react'
import React from 'react'
import { useMediaQuery } from '@mui/material'
import DiseaseTypeSelection from '../DiseaseTypeSelection'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ViewToggleBtn from '../ViewToggleBtn'
import AddImageBtn from '../AddImageBtn'
import GridViewImageCard from './GridViewImageCard'
import { ImageDetails } from '../../typings'
import ImageSample from '../../public/images/trial.jpeg'
import ListViewImageCard from './ListViewImageCard'
import UploadFile from './upload-file'
import Modal from '../Modal'
import { SCREEN } from '../../helper/responsive'

type Props = {}

const SampleImagesArr: ImageDetails[] = [
  {
    patientID: '600d475fa96e305as2e48c9cfbb851qs',
    disease: 'TB',
    totalPathogens: 12,
    inference: 0.7,
    src: 'https://images.unsplash.com/photo-1516069677018-378515003435?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1829&q=80',
    pathogens: [
      {
        confidence: '0.8',
        type: 'some pathogen',
      },
    ],
    modality: 'CT',
  },
  {
    patientID: '600d475fa96e305as2e48c9cqw2b851qs',
    disease: 'TB',
    totalPathogens: 12,
    inference: 0.4,
    src: ImageSample,
    pathogens: [
      {
        confidence: '0.56',
        type: 'pleural thikening ',
      },
      {
        confidence: '0.90',
        type: 'plumonary fiborisis',
      },
    ],
    modality: 'MRI',
  },
  {
    patientID: '600d475fa96e305as2eas8c9cqw2b851qs',
    disease: 'TB',
    totalPathogens: 12,
    inference: 0.4,
    src: ImageSample,
    pathogens: [
      {
        confidence: '0.3',
        type: 'some pathogen',
      },
      {
        confidence: '0.90',
        type: 'plumonary fiborisis',
      },
      {
        confidence: '0.20',
        type: 'plumonary s',
      },
    ],
    modality: 'CT scan',
  },
]

const MainContentSection = (props: Props) => {
  const [isOpen, setModalOpen] = React.useState<boolean>(false)
  // toggle state between listView and grid
  const [isListView, setIsListView] = React.useState<boolean>(false)
  // set DiseaseType
  const [diseaseType, setDiseaseType] = React.useState<string>()
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)

  return (
    <div className='w-full h-full flex flex-col gap-8'>
      <nav className='px-4 py-2 w-full h-fit bg-gray-50/95 lg:rounded-2xl flex justify-between lg:border-2 border-primary-light items-center'>
        {isLargeDevice || (
          <Icon
            icon='ant-design:menu-outlined'
            className='h-7 w-7 text-gray-600 active:text-primary-light'
          />
        )}
        {isLargeDevice && (
          <ViewToggleBtn
            isListView={isListView}
            setIsListView={setIsListView}
          />
        )}
        {isLargeDevice && <NeuralLabsTextLogo />}
        <DiseaseTypeSelection
          selectedDisease={diseaseType}
          setDiseaseType={setDiseaseType}
        />
      </nav>
      <section className='h-full w-full py-3 bg-gray-50/95 lg:rounded-2xl lg:border-2 border-primary-light'>
        <div className='h-full w-full flex flex-col space-y-2'>
          <div className=' py-2 w-full h-fit flex gap-x-1 justify-between px-4'>
            <div className='flex w-fit space-x-1 lg:space-x-3'>
              {/* right side */}
              <div className={`chip active`}>
                <Icon
                  icon='akar-icons:image'
                  className='h-5 w-5 lg:h-6 lg:w-6 mr-1'
                />
                {'  X-ray'}
              </div>
              <div className={`chip`}>
                <Icon
                  icon='akar-icons:image'
                  className='h-5 w-5 lg:h-6 lg:w-6 mr-1'
                />
                {'  MRI'}
              </div>
            </div>
            <div className='flex w-fit space-x-1 lg:space-x-3'>
              {isListView && (
                <button
                  type='button'
                  className='flex justify-center items-center w-fit rounded-2xl border-2 border-dashed border-primary-light bg-transparent text-gray-900 font-medium py-2 px-2 hover:bg-primary-lightest'
                  title='add image'
                  onClick={() => setModalOpen(true)}
                >
                  <Icon
                    icon={'fluent:add-24-filled'}
                    className='h-5 w-5 lg:h-6 lg:w-6 fill-current text-primary-light stroke-[3px]'
                  />
                </button>
              )}

              {/* left side */}
              <button
                type='button'
                className='flex justify-center items-center w-fit rounded-2xl border-2 border-dashed border-primary-light bg-transparent text-gray-900 font-medium py-2 px-4 hover:bg-primary-lightest'
              >
                <Icon
                  icon={'material-symbols:sort-rounded'}
                  className='h-6 w-6 fill-current text-primary-light mr-1 stroke-[3px]'
                />
                {'filters'}
                {/* filter btn */}
              </button>
              <button
                type='button'
                className='b p-2 flex items-center justify-center bg-zinc-300/80 rounded-full hover:bg-red-500/30 active:bg-red-500/30'
                arial-label='delete patient image button '
              >
                {/* delete button will prompt the user if sure he want to delete in a small modal*/}
                <Icon
                  icon='fluent:delete-16-regular'
                  className='h-6 w-6 fill-current text-zinc-800'
                />
              </button>
            </div>
          </div>

          <div className='px-4 h-full w-full lg:h-[520px] max-h-fit overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-light scrollbar-track-primary-light/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scroll-smooth'>
            {!isListView ? (
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 2xl:gap-6 '>
                {/* Here will contain add button and image cards */}
                {isLargeDevice && <AddImageBtn setOpen={setModalOpen} />}{' '}
                {/* for grid view only large device for list view it would be place next to filter button and for small devices as floating action bar maybe*/}
                {SampleImagesArr.map((item) => (
                  <GridViewImageCard imageDetails={item} key={item.patientID} />
                ))}
              </div>
            ) : (
              isLargeDevice && (
                <div className='flex flex-col space-y-6 px-5 py-5'>
                  {SampleImagesArr.map((item) => (
                    <ListViewImageCard
                      imageDetails={item}
                      key={item.patientID}
                    />
                  ))}
                </div>
              )
            )}
            <Modal
              open={isOpen}
              setOpen={setModalOpen}
              style={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'fit-content',
                maxWidth: 800,
                bgcolor: 'background.paper',
                border: '2px solid #16C2D5',
                boxShadow: 24,
                borderRadius: '8px',
                p: 4,
              }}
              title='Upload  Files'
              description='JPEG, JPG, PNG and DICOM are allowed'
            >
              {/* <AddImageModalContent/> */}
              <div className='my-5'>
                <UploadFile setOpen={setModalOpen} />
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MainContentSection
