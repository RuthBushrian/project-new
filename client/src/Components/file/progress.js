import React, { useState } from 'react';
import { Timeline } from 'primereact/timeline';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Get } from "../../Hooks/fetchWithHook"

export default function Progress(props) {
    const [visibleRight, setVisibleRight] = useState(false);
    const { data, loading } = Get(`stage/${props.idfile}`);
    if (loading) return <p>loading</p>

    const findDate = (element) => {
        const find = data.filter(e => e.statusName == element);
        if (find.length == 0) return "---";
        return find[0].date;
    }
    const arr = ['בבדיקה', 'נבדק', 'הועבר למנהל', 'נסגר'];
    let events = []
    arr.forEach(element => {
        events.push({ status: element, date: findDate(element) })
    });

    return (
        <div className="card">
            <Button icon="pi pi-arrow-right" onClick={() => setVisibleRight(true)} />
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <br/><br/>
                <h3>:שלבי התקדמות התיק</h3>
                <br/><br/>
                <Timeline value={events} opposite={(item) => item.status}
                    content={(item) => <small className="text-color-secondary">{item.date}</small>} />
            </Sidebar>
        </div>
    )
}
