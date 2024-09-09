/* eslint-disable */
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CheckboxList from './CheckboxList';

const GeneratedComponent = ({ id }) => {
    
    const [showDiscount, setShowDiscount] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showVariants, setshowVariants] = useState(false);
    const [products, setProducts] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
        let prod = JSON.parse(sessionStorage.getItem("selecteditem"));
        setProducts(prod);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <div className=''>
        <div className='flex justify-between mt-10'>
            <div className='flex items-center'>
                <span className='mr-2'>{id}.</span>
                <div className="title flex items-center justify-between p-2 ">
                    <span className='text-sm flex items-center justify-between'>{products[0]?.title || <span className='text-slate-400'>Selected products</span>}
                    </span>
                    <i className="material-icons text-slate-300 cursor-pointer" onClick={showModal}>edit</i>
                </div>
            </div>
            {
                showDiscount==false &&
                    <button className='discountbtn float-right' onClick={()=>setShowDiscount(true)}>Add Discount</button>
            }
            
            {
                showDiscount && (
                    <div>
                        <input type="text" name="" id="" style={{width: "40px", height: "32px"}} defaultValue={0}/>
                        <select name="slect" id="slect" className='ml-10' style={{height: "32px"}}>
                            <option value="option1">% off</option>
                            <option value="option2">Flat off</option>
                        </select>
                    </div>
                )
            }
        
            <Modal
                open={isModalOpen}
                title="Select Products"
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                className="modalStyle"
                footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" className='bg-green-700 text-white outline-none' onClick={handleOk}>
                    Add
                </Button>,
                ]}
            >
            <CheckboxList/>

            </Modal>
        </div>
        <div className='float-right'>
          {
            showVariants ?  <span  className='text-blue-700 underline text-sm mt-2 block cursor-pointer' onClick={()=>setshowVariants(false)}>Hide variants</span> :   <span  className='text-blue-700 underline text-sm mt-2 block cursor-pointer' onClick={()=>setshowVariants(true)}>Show variants</span>
          }
        </div>
        {
          showVariants && products[0]?.variants.map((variant)=>{
            return(
                <div key={variant.id} className='flex justify-between mt-5 w-[90%] float-right'>
                    <div className="title2 flex justify-between p-2 rounded-full"><span className=' text-sm flex items-center justify-between'>{variant?.title}
                    </span></div>
                    <div>
                        <input type="text" name="" id="" style={{width: "40px", height: "32px"}} className='mr-4 rounded-full' defaultValue={0}/>
                        <select name="" id="" style={{height: "32px", width: "80px"}}className="shadowbg rounded-full">
                            <option value="option1">% off</option>
                            <option value="option2">Flat off</option>
                        </select>
                    </div>
                </div>
            )

            })
        }
    </div>
    
  );
};

export default GeneratedComponent;
