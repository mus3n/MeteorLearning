import React from 'react';

import LinksList from "./LinksList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinksListFilter from "./LinksListFilters";

export default ()=>{
  return (
    <div>
        <PrivateHeader title="Short Link Application"/>
        <div className="page-content">
          <LinksListFilter/>

          <AddLink/>

          <LinksList/>
        </div>

    </div>
  );
}
