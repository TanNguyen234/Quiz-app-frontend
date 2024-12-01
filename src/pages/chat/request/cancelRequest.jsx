import { Button } from "antd";
import { useState } from "react";
import swal from "sweetalert";
import { cancelRequest } from "../../../helpers/socketHelpers";

function CancelRequest(props) {
  const { id } = props;
  const [state, setState] = useState(false);

  const handleClick = () => {
    swal({
      title: "Bạn có chắc muốn hủy yêu cầu?",
      icon: "warning",
      buttons: ["Không", "Đồng ý"],
      closeOnConfirm: false,
      closeOnClickOutside: false,
      allowOutsideClick: false,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setState(true);
        swal("Bạn đã hủy yêu cầu!", {
          icon: "success",
        });
        cancelRequest(id);
      }
    });
  };

  return (
    <>
      {state ? (
        <Button color="danger">Đã hủy yêu cầu</Button>
      ) : (
        <Button onClick={handleClick} color="danger" variant="solid">
          Hủy yêu cầu
        </Button>
      )}
    </>
  );
}

export default CancelRequest;