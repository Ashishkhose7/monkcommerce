/* eslint-disable */
import React, { useEffect, useState } from 'react'
import GeneratedComponent from './GeneratedCompo';

const AddProduct = () => {
    const [components, setComponents] = useState([]);
    const [nextId, setNextId] = useState(1);

    useEffect(()=>{
        setComponents([]);
        setNextId();
        handleAddComponent()
    },[])

    const handleAddComponent = () => {
        setComponents([...components, { id: nextId }]);
        setNextId(nextId + 1);
    };

  return (
    <div className='main mt-20'>
        <div className="section mx-auto text-left w-[36%]">
            <div className="heading fw-bolder text-left">Add Products</div>
            <div className="sunheading-section mt-10 flex justify-around">
                <p className='subheading'>Product</p>
                <p className='subheading'>Discount</p>
            </div>

            <div className="productlist flex flex-col justify-between">
                {components.map(component => (
                    <GeneratedComponent key={component.id} id={component.id}/>
                ))}
            </div>
            <button className='addproduct mt-6 float-end hover:bg-green-700 hover:text-white' onClick={handleAddComponent}>Add Product</button>
        </div>
        
    </div>
  )
}

export default AddProduct
