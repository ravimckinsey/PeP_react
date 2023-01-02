import React from "react";
import "./userList.css";
function UsersList({ names }) {
  return (
    <div className="list-class">
      {names?.map((item, index) => {
        return (
          <div key={index} className="list-class">
            {item}
          </div>
        );
      })}
    </div>
  );
}

export { UsersList };
