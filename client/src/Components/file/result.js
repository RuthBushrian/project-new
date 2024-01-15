import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Get } from '../../Hooks/fetchWithHook';
import { FetchFileData } from '../../Hooks/fetchData';
import ImageComponent from './imageRes';

function Result(props) {

    const { data, loading, error } = props.details ? Get(`document/file/${props.details.idfile}`) : {};
    console.log(data);
      
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) { return <p>Error!</p>; }
    const ProductTemplate = (data) => {
        const getDocuments = async () => {
            const x = await FetchFileData(`${props.details.idfile}/${data.name}`);
            setFile(x);
        }

        const [file, setFile] = useState('');
        useEffect(() => {
            getDocuments();
        }, [])

        return (
            <>
                <div class="grid">
                    <div className="flex flex-row flex-column border-1 surface-border border-round m-2 text-center py-1 px-2 ">
                        <div className="mb-3 flex align-items-start flex-wrap card-container yellow-container justify-content-center flex-wrap card-container yellow-container">
                            <div className="col-12 ">
                                    <ImageComponent src={`http://localhost:4321/document/${props.details.idfile}/${data.name}/${data.docType}`}></ImageComponent>
                                <p></p></div>
                                {console.log(data)}
                            {!props.isDoc ? <div>מספר מסמך: {data.iddocument} תוצאת מסמך: {data.result}</div>: 
                            <div>{data.name}.{data.docType}</div>} 
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (<>
        {data && <div dir={'ltr'}>
            <Carousel value={data} numVisible={props.isDoc == true?3:1} numScroll={1} orientation="horizontal" verticalViewPortHeight="360px"
                itemTemplate={ProductTemplate} />
        </div>}
    </>
    )
}
export default Result;
