import React, { useEffect, useState } from 'react';
import { Steps } from 'primereact/steps';
import FileDetail from './fileDetails';
import UploadDocuments from './uploadDocuments';
import { useLocation } from "react-router-dom"
import ViewResults from './viewResults';
import { Get } from '../../Hooks/fetchWithHook'
import { useNavigate } from "react-router-dom"

export default function OpenFileWithSteps() {
  const props = useLocation().state;
  const [activeIndex, setActiveIndex] = useState(props && props.file.result != 2 ? 2 : 0);
  const [enabledIndex, setEnabledIndex] = useState(props ? props.file.result != 2 ? 2 : 1 : 0);
  const [details, setDetails] = useState({});
  const [files, setFiles] = useState([]);
  const { data, refetch } = props ? Get(`file/${props.file.idfile}`) : {};
  useEffect(() => {
    setDetails(data);
  }, [data])
  const setIndex = (newIndx) => {
    if (enabledIndex < newIndx)
      setEnabledIndex(newIndx);
    setActiveIndex(newIndx);
  }
  const handleDetailsNext = (details) => {
    setDetails(details);
    setIndex(1);
  };

  const handleDocumentsNext = (files) => {
    setFiles(files);
    setIndex(2);
  };

  const navigate = useNavigate();

  const handleReset = (fileId) => {
    navigate(`/File`, { state: { file: {idfile:  fileId}} });
  };

  const status = details && details.statusId ? details.statusId : 0;

  const steps = [
    {
      label: 'פרטים',
      component: <FileDetail onNext={handleDetailsNext} details={details} status={status} />
    },
    {
      label: 'מסמכים',
      disabled: enabledIndex < 1,
      component: <UploadDocuments onNext={handleDocumentsNext} details={details} onReset={handleReset} status={status} />,
    },
    {
      label: 'תוצאות',
      disabled: enabledIndex < 2,
      component: <ViewResults details={details} files={files} refetch={refetch} status={status} />,
    },
  ];

  const renderStepContent = () => {
    const currentStep = steps[activeIndex];
    return currentStep.component;
  };

  const handleStepSelect = (index) => {
    setActiveIndex(index.index);
  };

  return (
    <>
      <Steps model={steps} activeIndex={activeIndex} onSelect={handleStepSelect} readOnly={false} />
        {renderStepContent()}
    </>
  );
}