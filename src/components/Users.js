import React, { useState } from "react";
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

const Users = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot.docs);
    setData(querySnapshot.docs);
    console.log("DATA->");
    data.map((d) => console.log(d.data().name));
  };

  return (
    <div className="flex justify-center mt-4">
      {data.map((d) => (
        <div className="flex flex-col bg-slate-300 p-3 mb-3">
          <div className="pl-5 font-bold">
            <button className="border-2">X</button>
          </div>
          <div>
            <h2>Name</h2>
          </div>
          <div>
            <h3>{d.data().name}</h3>
          </div>
        </div>
      ))}
      <div className="bg-slate-300 ml-3 p-4">
        <div>
          <button
            className="bg-green-300 p-1 rounded-full mb-8"
            onClick={getData}
          >
            Get Data
          </button>
        </div>

        <div className="mb-2">
          <input className="p-2 rounded-md" placeholder="name" />
        </div>

        <div className="mb-2">
          <input className="p-2 rounded-md" placeholder="interests" />
        </div>

        <div>
          <button className="bg-sky-600 p-4 rounded-md" onClick={getData}>
            Save User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
