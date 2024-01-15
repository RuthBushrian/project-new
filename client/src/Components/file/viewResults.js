import Result from "./result";
import { Update } from "../../Hooks/fetchData";
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { Dialog } from "primereact/dialog";
import Progress from "./progress";

const ViewResults = (props) => {

    const status = props.status;
    const closeFile = async () => {
        setVisible(false);
        await Update(`file/${props.details.idfile}`, { "statusId": 3 })
        props.refetch();
    }
    const sendToManager = () => {
        setVisible2(false);
        Update(`file/${props.details.idfile}`, { "statusId": 4 })
        props.refetch();
    }
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const footerContent = (
        <div>
            <Button label="לא" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="כן" icon="pi pi-check" onClick={() => closeFile()} autoFocus />
        </div>
    );
    const footerContent2 = (
        <div>
            <Button label="לא" icon="pi pi-times" onClick={() => setVisible2(false)} className="p-button-text" />
            <Button label="כן" icon="pi pi-check" onClick={() => sendToManager()} autoFocus />
        </div>
    );
    return (
        <>
            <div class="grid" style={{ margin: "0% 10% 0% 10%" }}>
                <div class="col-12 md:col-12 lg:col-5">
                    <div class="grid">
                        <div class="col-12 ">
                            {props.details && <>
                                <div class="flex align-items-center flex-wrap card-container green-container p-h-icon-right" >
                                    {props.details.result == 1 ?
                                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i> :
                                        <i className='pi false-icon pi-times-circle' style={{ fontSize: '5rem', color: "red" }}></i>
                                    }

                                    &nbsp;&nbsp;&nbsp;

                                    <h2 >תיק מספר: {props.details.idfile}  </h2>

                                </div>
                                <p>ת"ז מגיש הבקשה: {props.details.IDnumberOfApplicant}</p>
                                <p>שם מגיש הבקשה: {props.details.name}</p>

                                <p>סטטוס: {props.details['status.name']}</p>
                            </>}
                            <div className="flex align-items-stretch flex-wrap card-container blue-container">
                                <Dialog visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
                                    ?האם אתה בטוח
                                </Dialog>
                                <Button label="סגור תיק" style={{ margin: "50px 0px 50px 0px" }} onClick={() => setVisible(true)} disabled={status > 2} />
                                <Dialog visible={visible2} onHide={() => setVisible2(false)} footer={footerContent2}>
                                    ?האם אתה בטוח
                                </Dialog>
                                <Button label="שלח למנהל" style={{ margin: "50px" }} onClick={() => setVisible2(true)} disabled={status > 2} />
                            </div>
                            <div style = {{marginTop: '8%'}}>
                            {props && props.details &&props.details.idfile &&<Progress idfile={props.details.idfile}></Progress>}
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-12 md:col-12 lg:col-7 ">
                    <div dir={'rtl'}>
                        <Result details={props.details}></Result>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ViewResults

