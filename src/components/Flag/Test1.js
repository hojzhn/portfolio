import React, { useMemo, useState } from "react";

import u1 from "../../images/c1.jpg";
import u2 from "../../images/c2.jpg";
import u3 from "../../images/c3.jpg";
import u4 from "../../images/c4.jpg";
import u5 from "../../images/c5.jpg";
import Demo from "./Demo";

import { Button } from "./Button";
import Modal from "./Modal";
const userImgById = { u1, u2, u3, u4, u5 };
export default function Test1() {
  const [users, setUsers] = useState([
    { id: "u1", name: "Alex", checked: false, img: u1 },
    { id: "u2", name: "Jamie", checked: false, img: u2 },
    { id: "u3", name: "Taylor", checked: false, img: u3 },
    { id: "u4", name: "Sam", checked: false, img: u4 },
    { id: "u5", name: "Jordan", checked: false, img: u5 },
  ]);

  const [modal, setModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const sortCheckedFirst = (list) =>
    [...list].sort((a, b) => Number(b.checked) - Number(a.checked));

  const handleCheck = (id) => {
    setUsers((prev) => {
      const next = prev.map((u) =>
        u.id === id ? { ...u, checked: !u.checked } : u,
      );
      return sortCheckedFirst(next);
    });
  };

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedId) || null,
    [users, selectedId],
  );

  return (
    <Demo>
      <div className="flex flex-col items-center w-full h-full justify-center">
        <div className="border-b border-[var(--txt2)] px-3 pb-3 pt-12 mb-1 text-xs  w-full ">
          <i class="fa-solid fa-user text-xs mr-2"></i> Players
        </div>
        <div className="flex-1  w-full ">
          {users.map((user) => (
            <div
              key={user.id}
              className={`flex flex-row gap-4 p-2 mb-1 items-center ${user.checked ? "bg-[var(--bg2)] opacity-60" : ""}`}
            >
              <div className="w-6 h-6 rounded-full  overflow-hidden">
                <img src={userImgById[user.id]} />
              </div>
              <div className="flex-1">
                {user.name}{" "}
                {user.checked && <i class="fa-solid fa-check ml-2"></i>}
              </div>

              {!user.checked && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(user.id);
                    setModal(true);
                  }}
                >
                  <i className="fa-sharp fa-regular fa-eye" />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--txt2)] px-3 pt-3 pb-12 text-xs w-full text-center">
          Phase 1
        </div>
        {modal && (
          <Modal
            closeModal={() => setModal(false)}
            yesOnClick={() => {
              if (selectedId) handleCheck(selectedId);
              setModal(false);
            }}
          >
            Check {selectedUser?.name ?? "this player"}?
          </Modal>
        )}
      </div>
    </Demo>
  );
}
