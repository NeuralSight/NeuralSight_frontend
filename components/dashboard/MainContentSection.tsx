import { Icon } from '@iconify/react'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useMediaQuery } from '@mui/material'
import DiseaseTypeSelection from '../DiseaseTypeSelection'
import NeuralLabsTextLogo from '../NeuralLabsTextLogo'
import ViewToggleBtn from '../ViewToggleBtn'
import AddImageBtn from '../AddImageBtn'
import GridViewImageCard from './GridViewImageCard'
import {
  ImageDetails,
  PatientInfoData,
  PatientReportResult,
} from '../../typings'
import ImageSample from '../../public/images/trial.jpeg'
import ListViewImageCard from './list-view-image-card'
import UploadFile from './upload-file'
import Modal from '../Modal'
import { SCREEN } from '../../helper/responsive'
import BurgerMenu from '../BurgerMenu'
import PatientIdSection from './PatientIdSection'
import MainSectionNavBar from '../MainSectionNavBar'
import { PatientContext } from '../../context/patient-context'
import { ReportContext } from '../../context/report-context'
import { getStorageItem } from '../../helper/localStorageAccess'
import DeletePatientModal from './DeletePatientModal'
import { PATIENT_ID_STORAGE_KEY } from '../../lang/constants'
import LoadingTwo from '../LoadingTwo'

type Data = {
  patient: PatientInfoData
  'patient report': PatientReportResult[]
}

const MainContentSection = () => {
  const [isOpen, setModalOpen] = useState<boolean>(false)
  const [isDeletionOpen, setDeletionModalOpen] = useState<boolean>(false)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const patientContext = useContext(PatientContext)
  const reportContext = useContext(ReportContext)

  // toggle state between listView and grid
  const [isListView, setIsListView] = useState<boolean>(false)
  // set DiseaseType
  const [diseaseType, setDiseaseType] = useState<string>()
  // query
  const isLargeDevice = useMediaQuery(`( min-width: ${SCREEN.lg} )`)
  const isMediumDevice = useMediaQuery(`( min-width: ${SCREEN.md} )`)

  useEffect(() => {
    patientContext?.setPatientId(getStorageItem(PATIENT_ID_STORAGE_KEY))
    reportContext?.setPatientId(getStorageItem(PATIENT_ID_STORAGE_KEY))
    setIsListView(getStorageItem('ListView'))
  }, [patientContext, reportContext])
  const allReport = reportContext?.getAllReport()
  const sortedReportByDate = reportContext?.sortByDate(allReport || [])
  const isError = reportContext?.isError
  const isLoading = reportContext?.isLoading

  return (
    <div className='w-full h-[94%] flex flex-col gap-6'>
      <MainSectionNavBar>
        <div className=' flex items-center space'>
          {isLargeDevice || (
            <Icon
              icon='ant-design:menu-outlined'
              className='h-7 w-7 text-gray-600 active:text-primary-light'
              onClick={() => setIsOpenMenu(true)}
            />
          )}
          {isLargeDevice || (
            <BurgerMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu}>
              {<PatientIdSection />}
            </BurgerMenu>
          )}
          {isMediumDevice && (
            <ViewToggleBtn
              isListView={isListView}
              setIsListView={setIsListView}
            />
          )}
        </div>
        {isLargeDevice && <NeuralLabsTextLogo />}
        <DiseaseTypeSelection
          selectedDisease={diseaseType}
          setDiseaseType={setDiseaseType}
        />
      </MainSectionNavBar>
      <section className='h-full w-full pt-4 pb-5 bg-gray-50/95 lg:rounded-2xl lg:border-2 border-primary-light'>
        <div className='py-2 w-full h-fit flex gap-x-1 justify-between px-4'>
          <div className='flex w-fit space-x-1 lg:space-x-3'>
            {/* right side */}
            <div className={`chip active`}>
              <Icon
                icon='akar-icons:image'
                className='h-5 w-5 lg:h-6 lg:w-6 mr-1'
              />
              {'X-ray'}
            </div>
            <div className={`chip`}>
              <Icon
                icon='akar-icons:image'
                className='h-5 w-5 lg:h-6 lg:w-6 mr-1'
              />
              {'MRI'}
            </div>
          </div>
          <div className='flex w-fit space-x-1 lg:space-x-3'>
            {isListView || !isLargeDevice ? (
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
            ) : null}

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
              className='p-2 flex items-center justify-center bg-zinc-300/80 rounded-full hover:bg-red-500/30 active:bg-red-500/30'
              arial-label='delete patient details'
              title='delete patient details'
              onClick={() => setDeletionModalOpen(true)}
            >
              {/* delete button will prompt the user if sure he want to delete in a small modal*/}
              <Icon
                icon='fluent:delete-16-regular'
                className='h-6 w-6 fill-current text-zinc-800'
              />
            </button>
            <DeletePatientModal
              open={isDeletionOpen}
              setOpen={setDeletionModalOpen}
              patientId={patientContext?.patientId || ''}
            />
          </div>
        </div>
        {isError && !isLoading ? (
          <div className=' h-full w-full px-4 flex items-center justify-center'>
            <p className='text-lg font-medium text-gray-700'>
              No patient added
            </p>
          </div>
        ) : (
          <div className=' w-full h-full lg:h-[94%] bg-gray-50/5 backdrop-blur lg:rounded-bl-2xl lg:rounded-br-2xl overflow-y-hidden'>
            <div className=' h-full lg:h-[94%] w-full px-4 bg-white lg:overflow-y-scroll lg:scrollbar-thin lg:scrollbar-thumb-primary-light lg:scrollbar-track-primary-light/20  lg:scrollbar-track-rounded-full lg:scroll-smooth'>
              {!isListView ? (
                <div className=' h-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 2xl:gap-6 py-3 '>
                  {/* Here will contain add button and image cards */}
                  {isLargeDevice && <AddImageBtn setOpen={setModalOpen} />}{' '}
                  {/* for grid view only large device for list view it would be place next to filter button and for small devices as floating action bar maybe*/}
                  {sortedReportByDate?.length == 0 && !isLoading ? (
                    <div className='h-full max-h-screen w-full flex justify-center items-center'>
                      <p className='text-lg font-medium text-gray-800'>
                        No Image
                      </p>
                    </div>
                  ) : isLoading ? (
                    <div className='h-full max-h-screen justify-center items-center w-full flex gap-3'>
                      {/* add skeleton for loading */}
                      <LoadingTwo />
                      {/* <span>loading...</span> */}
                    </div>
                  ) : (
                    sortedReportByDate?.map((item, key) => (
                      <GridViewImageCard
                        patientDetailsResult={item}
                        key={item.details.id}
                      />
                    ))
                  )}
                </div>
              ) : (
                isMediumDevice && (
                  <div className='h-full flex flex-col space-y-6 px-5 py-5'>
                    {sortedReportByDate?.length == 0 && !isLoading ? (
                      <div className='h-full max-h-screen w-full flex justify-center items-center'>
                        <p className='text-lg font-medium text-gray-800'>
                          No Image
                        </p>
                      </div>
                    ) : isLoading ? (
                      <div className='h-full max-h-screen justify-center items-center w-full flex gap-3'>
                        {/* add skeleton for loading */}
                        <LoadingTwo />
                        {/* <span></span> */}
                      </div>
                    ) : (
                      sortedReportByDate?.map((item, key) => (
                        <ListViewImageCard
                          patientDetailsResult={item}
                          key={item.details.id}
                        />
                      ))
                    )}
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
                  <UploadFile
                    setOpen={setModalOpen}
                    patientId={patientContext?.patientId || ''}
                  />
                </div>
              </Modal>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default MainContentSection
