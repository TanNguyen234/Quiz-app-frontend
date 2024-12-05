import "./chat.scss";
import { Col, Row, Upload } from "antd";
import Search from "antd/es/input/Search";
import {
  FileImageOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import ImgCrop from "antd-img-crop";

function Chat() {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [input, setInput] = useState('');

  const onSearch = (value) => {
    setLoading(true); 

    setTimeout(() => {
      setLoading(false);

    }, 3000);
    setState(false)
    console.log(value);
    setInput('')
  };

  const emoji = (emoji) => {
    setInput(input + emoji.native);
  };

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  //Image
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  //End Image

  return (
    <>
      <Row style={{ padding: "10px" }} gutter={10}>
        <Col span={6}>
          <Search
            onSearch={onSearch}
            className="chat__search"
            placeholder="Tìm kiếm"
            enterButton
          />
        </Col>
        <Col span={14}>
          <div className="chat">
            <div className="chat__body">
              <div class="inner-incoming">
                <div class="inner-name">Em yêu</div>
                <div class="inner-content">
                  A ơi sang nhà e nha, nhà e không có ai ở nhà cả
                </div>
              </div>
              <div class="inner-outgoing">
                <div class="inner-content">Thế à ok e iu</div>
              </div>
              <div class="inner-incoming">
                <div class="inner-name">Em yêu</div>
                <div class="inner-content">Nhanh nha a</div>
              </div>
              <div class="inner-outgoing">
                <div class="inner-content">
                  Ck đến r mà thấy ai ở nhà đâu? Cửa khóa mà :(
                </div>
              </div>
              <div class="inner-incoming">
                <div class="inner-name">Em yêu</div>
                <div class="inner-content">Thì e bảo không ai ở nhà mà</div>
              </div>
            </div>
            <div className="chat__send">
              {upload && <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>}
              {state && <Picker data={data} onEmojiSelect={(e) => emoji(e)} />}
              <SmileOutlined
                onClick={() => setState(!state)}
                className="chat__icon"
                style={{ display: "inline-block" }}
              />
              <FileImageOutlined onClick={() => setUpload(!upload)}/>
              <Search
                onSearch={onSearch}
                className="chat__input"
                placeholder="Tìm kiếm"
                value={input}
                onChange={handleChange}
                style={{ display: "inline-block", width: "95%" }}
                loading={loading}
                enterButton={!loading ? <SendOutlined /> : "Đang gửi"}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Chat;
