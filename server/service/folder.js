const fs= require("fs");

exports.createFolder=(folderName)=>
{
    if (!fs.existsSync(folderName)) 
    {
        fs.mkdir(folderName, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Folder ${folderName} created successfully.`);
        }
        });
    } 
    else 
    {
        console.log(`Folder ${folderName} already exists.`);
    }
}

exports.deleteFolder=(folderName)=>
{

    try{
    fs.rmSync(folderName, { recursive: true, force: true });
}
catch{
    console.log(`can't delete folder ${folderName}`);
}
    // if (!fs.existsSync(folderName)) 
    // {
    //     fs.mkdir(folderName, (err) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log(`Folder ${folderName} created successfully.`);
    //     }
    //     });
    // } 
    // else 
    // {
    //     console.log(`Folder ${folderName} already exists.`);
    // }
}
