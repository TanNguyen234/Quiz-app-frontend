import { Button } from "antd";
import { useState } from "react";
import swal from "sweetalert";
import { deleteFriend } from "../../../helpers/socketHelpers";

function CancelFriend(props) {
  const { id } = props;
  const [state, setState] = useState(false);

  const handleClick = (e) => {
    swal({
      title: "Bạn có chắc muốn hủy kết bạn?",
      icon: "warning",
      buttons: ["Không", "Đồng ý"],
      closeOnConfirm: false,
      closeOnClickOutside: false,
      allowOutsideClick: false,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setState(true);
        swal("Bạn đã hủy kết bạn!", {
          icon: "success",
        });
        deleteFriend(id);
      }
    });
  };

  return (
    <>
      {state ? (
        <Button color="danger" variant="outline">Đã hủy kết bạn</Button>
      ) : (
        <Button onClick={handleClick} color="danger" variant="solid">
          Hủy kết bạn
        </Button>
      )}
    </>
  );
}

export default CancelFriend;