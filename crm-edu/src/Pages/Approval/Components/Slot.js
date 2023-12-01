import React from "react";

export default function Slot() {
  return (
    <div className="grid grid-cols-3">
      {timeSlots.map((timeSlot, index) => (
        <div key={index} className="grid grid-cols-3">
          <label>
            Day:
            <select
              name={`timeSlots[${index}].day`}
              value={timeSlot.day}
              onChange={(e) => handleTimeSlotChange(index, e)}
            >
              <option value=""> Select an option </option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
          <label>
            Hours:
            <input
              type="number"
              name={`timeSlots[${index}].hours`}
              value={timeSlot.hours}
              onChange={(e) => handleTimeSlotChange(index, e)}
            />
          </label>
          <button
            className="bg-red-500 px-3 py-1 text-sm"
            onClick={() => handleRemoveSlot(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
