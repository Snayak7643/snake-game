import React from "react";

const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dots, i) => {
        const style = {
          top: `${dots[0]}%`,
          left: `${dots[1]}%`,
        };
        return <div className="snake-dots" style={style} key={i}></div>;
      })}
    </div>
  );
};
export default Snake;
