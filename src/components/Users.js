import React, { useState } from "react";
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

const Users = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.docs[0].data());
  };

  return (
    <div>
      {data.map((d) => (
        <div className="bg-slate-300 p-3 mb-3">
          <div>
            <h2>Name</h2>
          </div>
          <div>
            <h3>{d.name}</h3>
          </div>
        </div>
      ))}

      <button onClick={getData}>Get Data</button>
    </div>
  );
};

export default Users;
