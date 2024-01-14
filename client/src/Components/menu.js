import React, { useContext } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from "react-router-dom"
import UserContext from "./user/UserContext";
import { Get } from '../Hooks/fetchData';
import { Avatar } from 'primereact/avatar';
import { Dropdown } from 'primereact/dropdown';


export default function Menu() {


  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const items = [
    {
      label: 'פתיחת תיק', icon: 'pi pi-fw pi-folder-open'
      , command: () => { navigate("/openfile") }
    },
    {
      label: 'תיקים', icon: 'pi pi-fw pi-folder'
      , command: () => { navigate("/AllFiles") }
    },
    {
      label: 'דאשבורד', icon: 'pi pi-fw pi-chart-line',
      command: () => { navigate("/Dashboard") }
    },
    {
      label: '  הגדרות ', icon: 'pi pi-fw pi-cog'
      , command: () => { navigate("/Setting") }
    },
    {
      label: '  צור קשר ', icon: 'pi pi-send'
      , command: async () => {
        const manager = (await Get(`manager/${user.idofficer}`)).data
        window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${manager.mail}`);
      }
    },
    {
      label: ' ', disabled:true, style:{width:"55%"}
    },
//     {
//       label: <div className='grid'><div className='col-6' style={{marginTop:"25px"}}>{user.name}</div><div className='col-6'>
//         <Avatar  image={`http://localhost:4321/officer/image/${user.path}/${user.type}`} size="xlarge" shape="circle" /></div></div>,
//  command: () => { navigate("/Setting") }
//     }
  ];

  return (
    <div style={{ display: 'flex' }}>

      <div className="card" style={{ marginBottom: "25px", flex: 1}}>
        <div className="flex card-container indigo-container text-800" style={{"backgroundColor":"bg-blue-800"}}>
        <div style={{ marginRight: '10px' }}>
            <img src="logo.png" alt="Logo" style={{height: '60px', width: 'auto' }} />
          </div>
          <div className="flex-1 bg-blue-800 text-blue-900">
            <TabMenu  model={items} className="bg-blue-800 "/>
          </div>
        </div>
      </div>
      {/* <div style={{ padding: '10px' }}>
        <h3>{user.name}</h3>
      </div> */}
    </div>

  )

}

// import React from 'react'; 
// import { Menubar } from 'primereact/menubar';
// import '../style/a.css'
// export default function Menu() {
//     const items = [
//         {
//             label: '  תיקים  ',
//             icon: 'pi pi-fw pi-file',
//             command: 
//         },
//         {
//             label: 'Edit',
//             icon: 'pi pi-fw pi-pencil',
            
//         },
//         {
//             label: 'Users',
//             icon: 'pi pi-fw pi-user',
            
//         },
//         {
//             label: 'Events',
//             icon: 'pi pi-fw pi-calendar',
           
//         },
//         {
//             label: 'Quit',
//             icon: 'pi pi-fw pi-power-off'
//         },
//         {
//           label: '                                                                        ',
//         }
//     ];
//     const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
//    const end = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
//     return (
//         // <div className="card">
//         <Menubar model={items} start = {start} onEnded = {end} end = {end} style={{backgroundColor: 'var(--highlight-bg)',  color: 'var(--primary-color-text)'}}/>
//         // </div>
//     )
// }