import { Button } from "antd";
import { useState } from "react";
import { sendRequest } from "../../../helpers/socketHelpers";

function AddUser(props) {
  const { id } = props;
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(true);
    sendRequest(id);
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
