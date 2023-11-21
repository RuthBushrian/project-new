import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Update } from '../Hooks/fetchData.js';
import { Get } from '../Hooks/fetchData'
import { Get as Get1 } from '../Hooks/fetchWithHook.js';
import UserContext from "./user/UserContext";
import { ProgressBar } from 'primereact/progressbar';
import '../style/formDemo.css';

export default function Setting() {

    const { user, refetch } = useContext(UserContext);
    const [txtvi, setTxtvi] = useState(false);
    const [value, setValue] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [txt, setTxt] = useState('');
    const [aPass, setAPass] = useState(false)
    const {data, loading, error , refetch:r}= Get1(`officer/num/ofDocuments/${user.idofficer}`);
    const check = async () => {
        setTxtvi(true);
        setShowMessage(false)
        const data1 = (await Get(`officer/${user.idofficer}`)).data;
        if (data1.password.localeCompare(value) == 0) {
            if (formData.mail == '')
                formData.mail = data1.mail;
            if (formData.name == '')
                formData.name = data1.name;
            if (formData.password == '')
                formData.password = data1.password;

            await Update(`officer/${user.idofficer}`, formData);
            setTxt("הפרטים שונו");
            refetch()
        }
        else
            setTxt("הסיסמא שגויה נסה שנית")

    }



    const formik = useFormik({

        initialValues: {
            name: '',
            mail: '',
            password: '',
            aPass: ''
        },

        validateOnMount: true,
        validate: (data) => {
            let errors = {};

            if (!data.mail) {

            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.mail)) {
                errors.mail = 'כתובת המייל לא תקינה';
            }

            if ((data.password != ''))
                if (data.password.localeCompare(data.aPass) != 0)
                    errors.aPass = 'הסיסמאות לא תואמות אנא נסה שנית'
                



            return errors;
        },
        onSubmit: (data) => {
            if (data.mail == '' && data.name == '' && data.password == '') {
                setTxt("לא שונו פרטים");
                setTxtvi(true);
                return;
            }
            setFormData(data);

            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center">
        <Button label="אישור" className="p-button-text" autoFocus
            onClick={() => check(value)} /></div>;
    const dialogFooter1 = <div className="flex justify-content-center"><Button label="אישור" className="p-button-text" autoFocus onClick={() => setTxtvi(false)} /></div>;
    const passwordHeader = <h6>הכנס סיסמא</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">הצעות</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>לפחות אות אחת קטנה</li>
                <li>לפחות אות אחת גדולה</li>
                <li>לפחות מספר אחד</li>
                <li>לפחות שמונה תווים</li>
            </ul>
        </React.Fragment>
    );

    

    const valueTemplate = (value1, value2) => {
        return (
            <React.Fragment>
                {value2}/<b>{value1}</b>
            </React.Fragment>
        );
    };


    return (
        <div className="form-demo" style={{ fontFamily: "Segoe UI" }}>
            <Dialog visible={showMessage} footer={dialogFooter} showHeader={true} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <h5>הכנס סיסמא ישנה</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <div className="card flex justify-content-center">
                            <Password value={value} onChange={(e) => setValue(e.target.value)} feedback={false} toggleMask />

                        </div>
                    </p>
                </div>
            </Dialog>
            <Dialog visible={txtvi} footer={dialogFooter1} showHeader={true} style={{ width: '30vw' }}>
                <div style={{ textAlign: "center" }}>
                    {txt}
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center"> פרטים אישיים</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>שם</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="mail" name="mail" value={formik.values.mail} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('mail') })} />
                                <label htmlFor="mail" className={classNames({ 'p-error': isFormFieldValid('mail') })}>מייל</label>
                            </span>
                            {getFormErrorMessage('mail')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onBlur={() => { formik.values.password != '' ? setAPass(true) : setAPass(false) }} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>סיסמא</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        {aPass == false ? <><div >
                        </div></> : <><div className="field">
                            <span className="p-float-label">
                                
                                <Password id="aPass" name="aPass" value={formik.values.aPass} feedback={false} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('aPass') })} />
                                <label htmlFor="aPass" className={classNames({ 'p-error': isFormFieldValid('aPass') })}>הכנס סיסמא שנית</label>
                            </span>
                            {getFormErrorMessage('aPass')}
                        </div></>}
                        {console.log(data)}
                        {data&& 
                        <>
                        <div>כמות המסמכים שנותרו</div>
                        <br/>
                        <div className="card">
                            <ProgressBar value={parseInt((data["num"]/user.numOfDocuments)*100)} displayValueTemplate={()=>valueTemplate(data["num"],user.numOfDocuments) }></ProgressBar>
                        </div><br/><br/></>}


                        <Button type="submit" label="אישור" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
