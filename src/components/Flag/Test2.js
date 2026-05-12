import React, { useMemo, useState } from "react";

import u1 from "../../images/c1.jpg";
import u2 from "../../images/c2.jpg";
import u3 from "../../images/c3.jpg";
import u4 from "../../images/c4.jpg";
import u5 from "../../images/c5.jpg";
import Demo from "./Demo";
import Modal from "./Modal";
import { Button } from "./Button";

const userImgById = { u1, u2, u3, u4, u5 };

export default function Test2() {
  const initialUsers = [
    { id: "u1", name: "Alex", checked: false, flagged: false },
    { id: "u2", name: "Jamie", checked: true, flagged: true },
    { id: "u3", name: "Taylor", checked: false, flagged: false },
    { id: "u4", name: "Sam", checked: true, flagged: false },
    { id: "u5", name: "Jordan", checked: false, flagged: false },
  ];

  const sortUsers = (list) =>
    [...list].sort((a, b) => {
      if (a.flagged !== b.flagged) return Number(b.flagged) - Number(a.flagged);
      if (a.checked !== b.checked) return Number(b.checked) - Number(a.checked);
      return a.name.localeCompare(b.name);
    });

  const [users, setUsers] = useState(() => sortUsers(initialUsers));

  // checkedOnceId is your "checked this phase" id
  const [checkedOnceId, setCheckedOnceId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "check" | "flag"

  // NEW: phase + only allow advancing once
  const [phase, setPhase] = useState(3);
  const [phaseAdvanced, setPhaseAdvanced] = useState(false);

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedId) || null,
    [users, selectedId],
  );

  const openModal = (mode, id) => {
    setModalMode(mode);
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
    setModalMode(null);
  };

  const handleCheck = (id) => {
    if (checkedOnceId) return;

    setUsers((prev) => {
      const next = prev.map((u) => (u.id === id ? { ...u, checked: true } : u));
      return sortUsers(next);
    });

    setCheckedOnceId(id);
  };

  const handleFlag = (id) => {
    setUsers((prev) => {
      const next = prev.map((u) => (u.id === id ? { ...u, flagged: true } : u));
      return sortUsers(next);
    });
  };

  const confirm = () => {
    if (!selectedId || !modalMode) return;

    if (modalMode === "check") handleCheck(selectedId);
    if (modalMode === "flag") handleFlag(selectedId);

    closeModal();
  };

  // NEW: advance phase once, reset per-phase check lockout
  const nextPhase = () => {
    if (phaseAdvanced) return;

    setPhase((p) => p + 1);
    setCheckedOnceId(null); // allows one new check in the new phase
    setPhaseAdvanced(true); // only once
    closeModal();
  };

  const canShowCheckButton = (user) => !user.checked && !checkedOnceId;

  // cannot flag the person you checked this phase
  const canShowFlagButton = (user) =>
    user.checked && !user.flagged && user.id !== checkedOnceId;

  return (
    <Demo>
      <div className="flex flex-col items-center w-full h-full justify-center">
        <div className="border-b border-[var(--txt2)] px-3 pb-3 pt-12 mb-1 text-xs w-full">
          <i className="fa-solid fa-user text-xs mr-2"></i> Players
        </div>

        <div className="flex-1 w-full">
          {users.map((user) => (
            <div
              key={user.id}
              className={[
                "flex flex-row gap-4 p-2 mb-1 items-center",
                user.checked && !user.flagged ? "bg-[var(--bg2)]" : "",
                user.flagged ? "bg-[var(--point)]" : "",
              ].join(" ")}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={userImgById[user.id]} alt={user.name} />
              </div>

              <div className="flex-1">
                {user.name}{" "}
                {user.checked && !user.flagged && (
                  <i className="fa-solid fa-check ml-2"></i>
                )}
                {user.flagged && (
                  <i className="fa-sharp fa-flag-pennant ml-2"></i>
                )}
              </div>

              {canShowCheckButton(user) && (
                <button
                  type="button"
                  onClick={() => openModal("check", user.id)}
                  title="Check"
                >
                  <i className="fa-sharp fa-regular fa-eye" />
                </button>
              )}

              {canShowFlagButton(user) && (
                <button
                  type="button"
                  onClick={() => openModal("flag", user.id)}
                  title="Flag"
                >
                  <i className="fa-sharp fa-regular fa-flag-pennant" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--txt2)] px-3 pt-3 pb-12 text-xs w-full text-center flex items-center justify-between">
          <span>Phase {phase}</span>

          <Button
            text="Next phase"
            onClick={nextPhase}
            disabled={phaseAdvanced}
          />
        </div>

        {modalOpen && (
          <Modal closeModal={closeModal} yesOnClick={confirm}>
            {modalMode === "flag"
              ? `Flag ${selectedUser?.name ?? "this player"}?`
              : `Check ${selectedUser?.name ?? "this player"} in this phase?`}
          </Modal>
        )}
      </div>
    </Demo>
  );
}
