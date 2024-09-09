import React, { useEffect, useLayoutEffect, useState } from 'react'
import List from "./List";
import { status } from "./constants";
export default function CheckboxList() {

  const [variants, setvariants] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    setLoading(true);
    const url = "https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=30"
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': "72njgfa948d9aS7gs5",
      }}
      const fetchData = async () => {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setvariants(data);
          setLoading(false);
          
        } catch (error) {
          console.log(error);
        }
      }
          fetchData();
  },[])

  const setStatus = (root, status) => {
    root.status = status;
    if (Array.isArray(root.variants)) {
      return root.variants.forEach((item) => {
        setStatus(item, status);
      });
    }
  };

  const computeStatus = (variants) => {
    let checked = 0;
    let indeterminate = 0;

    variants.forEach((item) => {
      if (item.status && item.status === status.checked) checked++;
      if (item.status && item.status === status.indeterminate) indeterminate++;
    });

    if (checked === variants.length) {
      return status.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return status.indeterminate;
    }
  };

  // Depth-first traversal
  const traverse = (root, needle, status) => {
    let id;
    let variants;

    if (Array.isArray(root)) {
      variants = root;
    } else {
      id = root.id;
      variants = root.variants;
    }

    if (id === needle) {
      return setStatus(root, status);
    }

    if (!variants) {
      return root;
    } else {
      variants.forEach((item) => traverse(item, needle, status));
      root.status = computeStatus(variants);
    }
  };

  const compute = (checkboxId, status) => {
    let arr =  [];
    traverse(variants, checkboxId, status);
    setvariants(variants.slice());
    arr = variants.filter((item)=>{
      return(
          item.status === 1 || item.status === -1
      )
     })
    sessionStorage.setItem('selecteditem', JSON.stringify(arr))
  };

  return (
    <div className="">
      {
        loading ? "Loading..." : <List variants={variants} compute={compute} />
      }
    </div>
  );
}
