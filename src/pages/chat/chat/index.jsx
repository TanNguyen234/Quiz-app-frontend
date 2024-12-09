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
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";

import { useSelector } from "react-redux";
import { sendMessage } from "../../../helpers/socketHelpers";
import { getChatAll } from "../../../services/getChat";

function Chat() {
  const id = useSelector(state => state.userReducer.id);

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [input, setInput] = useState('');
  const [dataChat, setDataChat] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getChatAll()
      setDataChat(data);
    }
    fetchApi();
  }, [])

  const onSearch = (value) => {
    if(value) {
      setLoading(true); 
      sendMessage(value);

      setTimeout(() => {
        setLoading(false);

      }, 3000);
      setState(false)
      console.log(value);
      setInput('')
    }
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
    setState(false)
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
        <Col span={6} className="chat__group">
          <Search
            onSearch={onSearch}
            className="chat__search"
            placeholder="Tìm kiếm"
            enterButtonX
          />
        </Col>
        <Col span={14}>
          <div className="chat" my-id={id}>
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
              <FileImageOutlined onClick={() => setUpload(!upload)} className="chat__icon"/>
              <Search
                onSearch={onSearch}
                className="chat__input"
                placeholder="Tìm kiếm"
                value={input}
                onChange={handleChange}
                style={{ display: "inline-block", width: "95%" }}
                loading={loading}
                enterButton={!loading ? <SendOutlined /> : ""}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Chat;
