/* eslint-disable */
import React from "react";
import Checkbox from "./Checkbox";
import { status } from "./constants";
export default function List(props) {
  const { variants, compute } = props;
  return (
    <ul className="border-b">
      {variants.map((item) => {
        let childList = null;
        if (Array.isArray(item.variants)) {
          childList = <List variants={item.variants} compute={compute} />;
        }
        return (
          <li key={item.id} className="list text-balck">
            <div className="section font-medium">
                <Checkbox
                id={item.id}
                name={item.title}
                checked={item.status === status.checked}
                indeterminate={item.status === status.indeterminate}
                compute={compute}
                />
                <label htmlFor={item.title} className="">{item.title}</label>
                {childList} <span className="float-right">{`${item?.price !== undefined ?  `$${item.price}` : ''}`}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
