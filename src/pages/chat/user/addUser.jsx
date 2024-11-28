import { Button } from "antd";
import { useState } from "react";

function AddUser(props) {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(true);
    console.log(props);
  };

  return (
    <>
      {state ? (
        <Button onClick={handleClick} className="user__btn--add" type="default">
          Đã gửi yêu cầu
        </Button>
      ) : (
        <Button onClick={handleClick} className="user__btn--add" type="primary">
          + Kết bạn
        </Button>
      )}
    </>
  );
}

export default AddUser;
