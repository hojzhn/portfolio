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

export default function Test3() {
  const initialUsers = [
    { id: "u1", name: "Alex", checked: false, flagged: false },
    { id: "u2", name: "Jamie", checked: true, flagged: false },
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

  // per-phase lock, also used to block flagging the newly checked target
  const [checkedOnceId, setCheckedOnceId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "flag"

  const [phase, setPhase] = useState(3);
  const [phaseAdvanced, setPhaseAdvanced] = useState(false);

  // Only show checked players
  const visibleUsers = useMemo(() => users.filter((u) => u.checked), [users]);

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

  const handleFlag = (id) => {
    setUsers((prev) => {
      const next = prev.map((u) => (u.id === id ? { ...u, flagged: true } : u));
      return sortUsers(next);
    });
  };

  // Random system check once per phase
  const randomCheck = () => {
    if (checkedOnceId) return; // already checked this phase

    const unchecked = users.filter((u) => !u.checked);
    if (unchecked.length === 0) return;

    const pick = unchecked[Math.floor(Math.random() * unchecked.length)];

    setUsers((prev) => {
      const next = prev.map((u) =>
        u.id === pick.id ? { ...u, checked: true } : u,
      );
      return sortUsers(next);
    });

    setCheckedOnceId(pick.id);
  };

  const nextPhase = () => {
    if (phaseAdvanced) return;

    setPhase((p) => p + 1);
    setCheckedOnceId(null); // reset per-phase check lock
    setPhaseAdvanced(true); // lock advancing
    closeModal();
  };

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedId) || null,
    [users, selectedId],
  );

  const canShowFlagButton = (user) =>
    user.checked && !user.flagged && user.id !== checkedOnceId;

  return (
    <Demo>
      <div className="flex flex-col items-center w-full h-full justify-center">
        <div className="border-b border-[var(--txt2)] px-3 pb-3 pt-12 mb-1 text-xs w-full flex items-center justify-between">
          <div>
            <i className="fa-solid fa-user text-xs mr-2"></i> Players
          </div>

          {/* system-authored check */}
          <Button
            text={checkedOnceId ? "Checked this phase" : "Random check"}
            onClick={randomCheck}
            disabled={Boolean(checkedOnceId)}
          />
        </div>

        <div className="flex-1 w-full">
          {visibleUsers.map((user) => (
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
                {!user.flagged && <i className="fa-solid fa-check ml-2"></i>}
                {user.flagged && (
                  <i className="fa-sharp fa-flag-pennant ml-2"></i>
                )}
              </div>

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

          {visibleUsers.length === 0 && (
            <div className="p-4 text-sm text-[var(--txt2)]">
              No checked players yet. Use Random check.
            </div>
          )}
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
          <Modal
            closeModal={closeModal}
            yesOnClick={() => {
              if (selectedId) handleFlag(selectedId);
              closeModal();
            }}
          >
            Flag {selectedUser?.name ?? "this player"}?
          </Modal>
        )}
      </div>
    </Demo>
  );
}
