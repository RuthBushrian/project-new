import React from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button";



export default function SubmmitedDialog(props)
{

    const footerContent = (
        <div style={{textAlign:"center"}}>
            <Button label="אישור"onClick={() => {props.onConfirm();}} className="p-button-text" />
        </div>
    );

    return (
    <Dialog visible={true} style={{ width: '50%', textAlign:"center"}} footer={footerContent}  onHide = {()=>props.onConfirm()} >
        {props.icon}
        <h3>{props.header}</h3>
        <div className="flex align-items-center flex-column ">
            <p>
                {props.content}
            </p>
        </div>
    </Dialog>
    )
}