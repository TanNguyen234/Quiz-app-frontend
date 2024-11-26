import "./home.scss";
import swal from 'sweetalert';

function Home() {
  const login = localStorage.getItem('login');
  const register = localStorage.getItem('register');
  if(login) {
    swal({
      title: "Thông báo",
      text: "Chúc mừng bạn đã đăng nhập thành công!",
      icon: "success",
    });
    localStorage.removeItem("login")
  } else if(register) {
    swal({
      title: "Thông báo",
      text: "Chúc mừng bạn đã đăng ký thành công!",
      icon: "success",
    });
    localStorage.removeItem("register")
  }
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