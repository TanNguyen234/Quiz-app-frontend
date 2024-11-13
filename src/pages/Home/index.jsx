import { useEffect, useState } from "react";
import "./home.scss";

function Home() {
  // const [value, setValue] = useState([])

  // useEffect(() => {
  //  fetch('http://localhost:3001/one')
  //   .then(response => response.json())
  //   .then(data => {
  //     setValue(data)
  //     console.log(value)
  //   })
  // }, [value])

  return (
    <>
      <div className="home">
        <div className="home__main">
        <h1 className="home__title">Chào mừng đến với Website Trắc Nghiệm Lập Trình</h1>
        <p className="home__content">
          Mỗi câu hỏi là một cơ hội để học hỏi – Cùng kiểm tra kiến thức của bạn
          ngay hôm nay!
        </p>
        <a href="/topics"><button className="home__btn">Bắt đầu ngay</button></a>
        </div>
        <div className="home__img">
          <img src="/images/home.png" alt="Trắc nghiệm lập trình" />
        </div>
      </div>
    </>
  );
}

export default Home;