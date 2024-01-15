import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { Update } from '../../Hooks/fetchData';
import '../../style/formDemo.css'
import SubmmitedDialog from '../submmitedDialog';
import { iconV } from '../../Constant';
import { validId } from '../utils/utils';

export default function FileDetail(props) {

    const status = props.status;
    const details = props.details ? props.details :
        {
            IDnumberOfApplicant: '',
            name: '',
            ApplicationSubmissionDate: null,
            remarks: ''
        };

    const [visible, setVisible] = useState(false)

    if (details.ApplicationSubmissionDate)
        details.ApplicationSubmissionDate = new Date(details.ApplicationSubmissionDate)

    const formik = useFormik({
        initialValues: {
            IDnumberOfApplicant: details.IDnumberOfApplicant,
            name: details.name,
            ApplicationSubmissionDate: details.ApplicationSubmissionDate,
            remarks: details.remarks,
        },
        enableReinitialize: true,
        validateOnMount: true,
        validate: (data) => {

            let errors = {};

            if (!data.IDnumberOfApplicant) {
                errors.IDnumberOfApplicant = 'ת"ז הינו שדה חובה';
            }
            else
                if (!validId(data.IDnumberOfApplicant)) {
                    errors.IDnumberOfApplicant = 'ת"ז אינה חוקית';
                }
            if (!data.name) {
                errors.name = 'שם הינו שדה חובה';
            }

            if (!data.ApplicationSubmissionDate) {
                errors.ApplicationSubmissionDate = 'תאריך הינו שדה חובה';
            }
            else
                if (data.ApplicationSubmissionDate > new Date()) {
                    errors.ApplicationSubmissionDate = 'תאריך שגוי';
                }

            return errors;
        },

        onSubmit: async (data) => {
            if (details.idfile) {
                await Update(`file/${details.idfile}`, data)
                setVisible(true);
            }
            else
                handleNextClick(data);
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleNextClick = (data) => {
        props.onNext(data);
    };

    return (<>
        <div className=" card-container blue-container overflow-hidden" >
            <div className="flex-grow-3 form-demo flex justify-content-center">
                <div className="card">
                    <form className="p-fluid">
                        <h3 style={{ textAlign: 'center' }}>פרטי התיק</h3>
                        {status > 0 &&
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="idFile" name="idFile" value={details.idfile}
                                        disabled={true} />
                                    <label htmlFor="idFile">מספר תיק</label>
                                </span>
                            </div>}

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="id" name="IDnumberOfApplicant" value={formik.values.IDnumberOfApplicant} disabled={status > 2}
                                    onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('IDnumberOfApplicant') })} />
                                <label htmlFor="id" className={classNames({ 'p-error': isFormFieldValid('IDnumberOfApplicant') })} >תעודת זהות</label>
                            </span>
                            {getFormErrorMessage('IDnumberOfApplicant')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} disabled={status > 2}
                                    className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>שם מגיש הבקשה</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Calendar dir={'ltr'} id="date" name="ApplicationSubmissionDate" value={formik.values.ApplicationSubmissionDate} disabled={status > 2}
                                    onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999"
                                    showIcon className={classNames({ 'p-invalid': isFormFieldValid('ApplicationSubmissionDate') })} />
                                <label htmlFor="date" className={classNames({ 'p-error': isFormFieldValid('ApplicationSubmissionDate') })}>תאריך הגשת הבקשה</label>
                            </span>
                            {getFormErrorMessage('ApplicationSubmissionDate')}
                        </div>

                        {status > 0 &&
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="status" name="status" value={details['status.name']} disabled={true} />
                                    <label htmlFor="status">סטאטוס</label>
                                </span>
                            </div>}


                        <div className="field">
                            <span className="p-float-label">
                                <InputTextarea id="remarks" name="remarks" value={formik.values.remarks} onChange={formik.handleChange} disabled={status > 2} />
                                <label htmlFor="remarks">הערות</label>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="card flex justify-content-center">
            {visible && <SubmmitedDialog header="נשמר בהצלחה" content="פרטי התיק עודכנו בהצלחה" onConfirm={() => { setVisible(false) }} icon={iconV}></SubmmitedDialog>}
            <Button type="submit" label={details.idfile ? "לשמירה" : "לשלב הבא"} className="mt-2"
                onClick={async () => formik.handleSubmit()} disabled={status > 2} />
        </div>
    </>
    );
}