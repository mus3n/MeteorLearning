import React from 'react';
import {Link} from "react-router";

export default ()=>{
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Not the site you were looking for.</p>
          <Link className="button--link" to="/">GO HOME</Link>
      </div>
    </div>

  );
}
