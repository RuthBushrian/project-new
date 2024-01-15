import Graf from './graph';
import GetLasts from './lastFiles';
import { Active, Fake, Check, Checked } from './numOfFiles';
import React, { useContext } from 'react';
import UserContext from "../user/UserContext";

const Dashboard = () => {

    const { user } = useContext(UserContext);
    return (
        <div className="grid" style={{ fontFamily: 'Segoe UI' }}>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים תקולים</span>
                            <div className="text-900 font-medium text-xl"><Fake id={user.idofficer}></Fake></div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi false-icon pi-times-circle text-blue-500 text-xl"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים פעילים</span>
                            <div className="text-900 font-medium text-xl"><Active id={user.idofficer}></Active></div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-folder-open text-orange-500 text-xl"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים בבדיקה</span>
                            <div className="text-900 font-medium text-xl"><Check id={user.idofficer}></Check></div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-question-circle text-cyan-500 text-xl"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים שנבדקו</span>
                            <div className="text-900 font-medium text-xl"><Checked id={user.idofficer}></Checked></div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi true-icon pi-check-circle text-purple-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <h3>תיקים שנבדקו לאחרונה</h3>

                    <GetLasts id={user.idofficer}></GetLasts>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <h3>תיקים בשנים האחרונות</h3>
                    <Graf></Graf>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

