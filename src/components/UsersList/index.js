import React from "react";

function UsersList({ names }) {
  return (
    <div>
      {names?.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
}

export { UsersList };
