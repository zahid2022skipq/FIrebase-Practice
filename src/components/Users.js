import React, { useState } from "react";
import { db } from "../firebase.js";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const Users = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");

  const userRef = collection(db, "users");

  const saveData = async () => {
    await setDoc(doc(userRef, name), {
      name,
      interests: interests.split(","),
    });

    setName("");
    setInterests("");
    getData();
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    setData(querySnapshot.docs);
  };

  const deleteData = async (name) => {
    await deleteDoc(doc(db, "users", name));
    getData();
  };

  return (
    <div className="flex flex-row justify-center mt-4">
      <div className="">
        {data.map((d, index) => (
          <div
            key={d.data().name + index + "00"}
            className=" bg-slate-300 p-6 mb-3 w-64"
          >
            <div className="border-b-2 p-1">
              <button onClick={() => deleteData(d.data().name)}>X</button>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Name</h2>
            </div>
            <div>
              <h3 className="text-xl text-stone-600">{d.data().name}</h3>
            </div>

            <div className="p-4 border-b-2 border-t-2 mt-2">
              {d.data().interests.map((i, index) => (
                <p key={i + index + "00"}>{i}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-300 ml-3 p-4 h-64">
        <div>
          <button
            className="bg-green-300 p-1 rounded-full mb-8"
            onClick={getData}
          >
            Get Data
          </button>
        </div>

        <div className="mb-2 ">
          <input
            className="p-2 rounded-md"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <input
            className="p-2 rounded-md"
            placeholder="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-sky-600 px-4 py-1 w-full rounded-md mt-3"
            onClick={saveData}
          >
            Save User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
