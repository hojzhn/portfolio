import React from "react";

export default function Interviewee({
  image,
  name = "J",
  bio = "Male, American, Late 30s",
  location = "New York City",
  description = "Technology-oriented works",
}) {
  return (
    <div className="flex flex-row gap-6 flex-1 min-w-[250px]">
      <div className="rounded-full bg-white aspect-square w-[4em] h-[4em] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className=" text-[1.2em] mb-2">{name}</p>
        <p>{bio}</p>
        <p>{description}</p>
        <p className="text-[0.8em] text-[var(--txt2)] mt-2">
          <i class="fa-solid fa-location-dot mr-2"></i> {location}
        </p>
      </div>
    </div>
  );
}
