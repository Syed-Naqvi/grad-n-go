import React, {useState} from "react";
import JobCard from "../JobCard";
import firebase from "../../firebase/firebase";

import "./styles.css";

const JobGrid = () => {
  return <div className="jobs-super-container">
  <div className="jobs-container jobs-container--wishlist">
    <div>
      WishList
    </div>
    <div>
      {<JobCard jobTitle="Sr. Software Engineer" companyTitle="Netflix" link="https://www.github.com"/>}
    </div>
  </div>
  <div className="jobs-container jobs-container--applied">
    <div>
      Applied
    </div>
  </div>
  <div className="jobs-container jobs-container--phone">
    <div>
      Phone
    </div>
  </div>
  <div className="jobs-container jobs-container--onsite">
    <div>
      Onsite
    </div>
  </div>        
</div>
}

export default JobGrid;