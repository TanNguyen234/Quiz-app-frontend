import { Button, message } from "antd";
import { useState } from "react";
import { sendRequest } from "../../../helpers/socketHelpers";

function AddUser(props) {
  const { id } = props;
  const [state, setState] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Đã gửi yêu cầu kết bạn',
    });
  };
  const handleClick = () => {
    setState(true);
    success();
    sendRequest(id);
  };

  return (
    <>
       {contextHolder}
      {state ? (
        <Button className="user__btn--add" type="default">
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
