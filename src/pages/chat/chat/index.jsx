import "./chat.scss";

import { Avatar, Col, Image, Row, Upload } from "antd";
import Search from "antd/es/input/Search";
import {
  FileImageOutlined,
  PlusOutlined,
  SendOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { sendMessage, sendTyping } from "../../../helpers/socketHelpers";
import { getChatAll, getRoom } from "../../../services/getChat";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import About from "./about";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Chat() {
  const id = useSelector((state) => state.userReducer.id);
  const params = useParams();
  const chatBodyRef = useRef(null);
  const navigate = useNavigate();

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [dataChat, setDataChat] = useState([]);
  const [roomData, setRoomData] = useState([]);

  const [upload, setUpload] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const rooms = await getRoom();
      console.log(rooms);
      setRoomData(rooms);

      if (params.id !== "1") {
        const checkRoomId = await getRoom(params.id);
        console.log(checkRoomId);
        if (checkRoomId.length === 0) {
          navigate("/chat/1");
          return;
        }

        const data = await getChatAll(params.id);
        setDataChat(data);
      }
    };
    fetchApi();
  }, [params.id]);

  const previewSentImage = useCallback((url) => {
    setPreviewImage(url);
    setPreviewOpen(true);
  }, []);
  useEffect(() => {
    const chatBody = chatBodyRef.current;

    if (chatBody) {
      // Lắng nghe sự kiện thay đổi trong chat body
      const observer = new MutationObserver(() => {
        const images = chatBody.querySelectorAll("img");
        if (images) {
          images.forEach((image) => {
            image.onclick = () => previewSentImage(image.getAttribute("src"));
          });
        }
        chatBody.scrollTop = chatBody.scrollHeight; // Cuộn xuống cuối
      });

      // Quan sát các thay đổi trong DOM của chatBody
      observer.observe(chatBody, { childList: true, subtree: true });

      // Cleanup observer khi component unmount
      return () => observer.disconnect();
    }
  }, [chatBodyRef, previewSentImage]);

  const onSearch = (value) => {
    if ((value || fileList.length > 0) && params.id !== '1') {
      const formData = {
        room: params.id
      };
      if (value) formData["message"] = value;

      if (fileList.length === 1) {
        formData["file"] = fileList[0];
      } else if (fileList.length > 1) {
        formData["files"] = fileList;
      }
      sendMessage(formData);
      if (fileList.length > 0) setFileList([]);
      setUpload(false);
      setState(false);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);
      setState(false);
      setInput("");
    }
  };

  const emoji = (emoji) => {
    setInput(input + emoji.native);
  };

  const handleChange = (e) => {
    sendTyping();
    setInput(e.target.value);
  };

  //Image
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const onChange = ({ fileList: newFileList }) => {
    setState(false);
    setFileList(newFileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
          <div className="chat__search--list">
            {roomData.map((item) => (
              <NavLink to={"/chat/" + item._doc._id}>
                <div className="chat__search--item">
                  {!item.avatar && <Avatar size={60} src='/images/avatar-default.png' />}
                  <div className="chat__search--content">
                    <div className="chat__search--name">{item.info.fullName}</div>
                    <div className="chat__search--inner">{item.chat ? item.chat : '...'}</div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </Col>
        {params.id !== "1" ? (
          <Col span={14}>
            <div className="chat" my-id={id}>
              <div className="chat__body" ref={chatBodyRef}>
                {dataChat.map((item, index) =>
                  item._doc.user_id === id ? (
                    <div key={index} class="inner-outgoing">
                      {item._doc.content && (
                        <div class="inner-content">{item._doc.content}</div>
                      )}
                      {item._doc.images && (
                        <div class="inner-images">
                          {item._doc.images.map((item, key) => (
                            <img
                              key={key}
                              src={item}
                              alt="ảnh"
                              onClick={() => previewSentImage(item)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div key={index} class="inner-incoming">
                      <div class="inner-name">{item.fullName}</div>
                      {item._doc.content && (
                        <div class="inner-content">{item._doc.content}</div>
                      )}
                      {item._doc.images && (
                        <div class="inner-images">
                          {item._doc.images.map((item, key) => (
                            <img
                              key={key}
                              src={item}
                              alt="ảnh"
                              onClick={() => previewSentImage(item)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
              <div className="chat__typing">
                {/* <div className="chat__typing--box">
                <div className="inner-name">Foxy</div>
                <div className="inner-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div> */}
              </div>
              <div className="chat__send">
                {upload && (
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={onChange}
                    accept="image/*"
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                )}
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
                {state && (
                  <Picker
                    data={data}
                    previewPosition="none"
                    onEmojiSelect={(e) => emoji(e)}
                  />
                )}
                <SmileOutlined
                  onClick={() => setState(!state)}
                  className="chat__icon"
                  style={{ display: "inline-block" }}
                />
                <FileImageOutlined
                  onClick={() => setUpload(!upload)}
                  className="chat__icon"
                />
                <Search
                  onSearch={onSearch}
                  className="chat__input"
                  placeholder="Nhập tin nhắn"
                  value={input}
                  onChange={handleChange}
                  style={{ display: "inline-block", width: "95%" }}
                  loading={loading}
                  enterButton={!loading ? <SendOutlined /> : ""}
                />
              </div>
            </div>
          </Col>
        ) : (
          <Col span={14}>
            <About />
          </Col>
        )}
      </Row>
    </>
  );
}

export default Chat;
