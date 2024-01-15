import React, { useState, useContext } from 'react';
import { Button } from 'primereact/button';
import { Create, Get } from '../../Hooks/fetchData'
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import '../../style/formDemo.css'
import SubmmitedDialog from '../submmitedDialog';
import UserContext from "../user/UserContext";
import { iconV, iconX } from '../../Constant';
import PDF from '../../images/PDF.png'
import Result from './result';

export default function UploadDocuments(props) {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState(props.details);
  const isUpdate = props.status > 0;
  const [visible, setVisible] = useState(false);
  const [visibleErr, setVisibleErr] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onTemplateRemove = (file, callback) => {
    callback();
    const newFiles = [...selectedFiles]
    setSelectedFiles(newFiles.filter((f) => f.objectURL != file.objectURL));
  };

  const onTemplateClear = () => {
    setSelectedFiles([]);
  };

  const itemTemplate = (file, props) => {
    return (

      <div className="flex align-items-center flex-wrap" style={{ width: '60%' }}>
        <div className="flex align-items-center" style={{ width: '60%' }}>
          <img alt={file.name} role="presentation" src={file.type == "application/pdf" ? PDF : file.objectURL} width={'15%'} />
          <span className="flex flex-column text-left ml-3" style={{ margin: '3%' }}>
            {file.name}
            {<br />}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" style={{ margin: '3%', width: '120px' }} />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column" style={{ height: '200px' }}>
        <i className="pi pi-image p-5" style={{ fontSize: '5em', borderRadius: '40%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} >
          גרור מסמכים לכאן
        </span>
      </div>
    );
  };

  const handleFileUpload = async (event) => {
    const toTtpe = { "image/jpeg": "jpeg", "application/pdf": "pdf", "image/png": "png", "image/gif": "gif" }
    const curFiles = [...selectedFiles];
    for (let i = 0; i < event.files.length; i++) {
      const file = event.files[i];
      if (file.objectURL == undefined)
        file.objectURL = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        curFiles.push({
          document: event.target.result,
          type: toTtpe[file.type],
          name: file.name.slice(0, file.name.lastIndexOf('.')),
          objectURL: file.objectURL
        })
      }
      reader.readAsDataURL(file);
    }
    setSelectedFiles(curFiles);
  }
  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
  const createFile = async () => {
    const used = await Get(`officer/num/ofDocuments/${user.idofficer}`)
    if (used.data.num < selectedFiles.length) {
      setVisibleErr(true);
    }
    else {
      const fileToCreate = {
        ...formData,
        "statusId": 1,
        "documents": selectedFiles,
        "officerId": user.idofficer
      };
      const res = await Create(`file`, fileToCreate);
      setFormData(res.body);
      setVisible(true);
    }
  }

  const addDocuments = async () => {
    await Create(`$document/${props.details.idfile}`, { documents: selectedFiles });
    setVisible(true);
  }

  const header = isUpdate ? "😊 התיק עודכן בהצלחה" : "😊 התיק נפתח בהצלחה"
  const content =
    !isUpdate ?
      <><p>
        מספר תיק : {formData.idfile != null ? formData.idfile : ""}
        <br />
        ת"ז : {formData.IDnumberOfApplicant != null ? formData.IDnumberOfApplicant : ""}
        <br />
        שם : {formData.name != null ? formData.name : ""}
        <br />
        תאריך : {formData.ApplicationSubmissionDate != null ? new Date(formData.ApplicationSubmissionDate).toLocaleDateString() : ""}
        <br />
        הערות : {formData.remarks != null ? formData.remarks == '' ? "לא הוכנסו הערות" : formData.remarks : "   "}
      </p>
        <p>התיק והמסמכים המצורפים נשלחים כעת לבדיקה ואימות, בעוד זמן קצר תוכלו לצפות בתוצאות. הבדיקה הינה חדשנית ואמינה ואחוזי ההצלחה שלה גבוהים. אולם עם זאת עלינו לציין שהיא מבוססת על בינה מלאכותית, וכמו רוב הטכנולוגיות הללו היא אינה באמינות של מאת האחוזים</p></> :
      <p>המסמכים הועלו בהצלחה וכעת נשלחים לבדיקה</p>
  return <>{props.status == 0 ? (<>
    {visible &&
      <SubmmitedDialog header={header} content={content} icon={iconV} onConfirm={() => { setVisible(false); isUpdate ? onTemplateClear() : props.onReset(formData.idfile); }}></SubmmitedDialog>}
    {visibleErr &&
      <SubmmitedDialog header={"שגיאה"} content={"אין ברשותך מספיק מסמכים בקש מהמנהל לקנות חבילה נוספת"} icon={iconX} onConfirm={() => { setVisibleErr(false); }}></SubmmitedDialog>}

    <div className="flex card-container blue-container overflow-hidden" style={{ fontFamily: 'fantasy', margin: '2.5% 20% 0.5% 20%' }}>
      <div className="flex-grow-1">
        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
        <FileUpload onSelect={handleFileUpload} multiple
          itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} chooseOptions={chooseOptions}
          uploadOptions={uploadOptions} cancelOptions={cancelOptions} onClear={onTemplateClear} />
      </div>
    </div>

    <div className="card flex justify-content-center">
      <Button type="submit" label={isUpdate ? "הוסף מסמכים" : "צור תיק"} className="mt-2"
        onClick={() => {
          isUpdate ? addDocuments() : createFile()
        }} disabled={props.status > 2} />
    </div>
  </>) : <div style={{ textAlign: 'center', marginTop: '2%' }}><Result details={props.details} isDoc={true}></Result></div>}
  </>
}