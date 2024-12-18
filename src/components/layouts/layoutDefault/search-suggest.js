const search_suggest = (value, users) => {
  const boxSuggest = document.querySelector(".layout-default__inner-suggest");
  if(!users || !value) {
    boxSuggest.classList.remove('show')
    return;
  }
  if (boxSuggest && users.length > 0) {
    boxSuggest.classList.add("show");
    let htmls = '';
    console.log(users)
    for ( let user of users ) {
        htmls += `
          <div className="layout-default__suggest--item">
            <div className="layout-default__inner-img">
              <img src=${user.avatar ? user.avatar : '/images/avatar-default.png'} alt="${user.fullName}" />
            </div>
            <div className="layout-default__inner-info">
              <div className="layout-default__suggest-btn">${user.fullName}</div>
            </div>
          </div>
        `;
    }
    const boxList = boxSuggest.querySelector('.layout-default__inner-list')
    boxList.innerHTML = htmls
    console.log(htmls, boxList)
  }
}

export default search_suggest;
