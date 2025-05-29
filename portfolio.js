document.addEventListener("DOMContentLoaded", function () {
  // 管理员状态
  let isAdmin = false;
  const adminPassword = "123456"; // 这里设置管理员密码
  const adminUsername = "123"; // 设置管理员用户名

  // DOM元素
  const adminLoginBtn = document.getElementById("adminLoginBtn");
  const adminControls = document.getElementById("adminControls");
  const addContentBtn = document.getElementById("addContentBtn");
  const loginModal = document.getElementById("loginModal");
  const addModal = document.getElementById("addModal");
  const loginForm = document.getElementById("loginForm");
  const uploadForm = document.getElementById("uploadForm");
  const portfolioGrid = document.getElementById("portfolioGrid");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // 从localStorage获取保存的作品数据
  let portfolioItems = JSON.parse(localStorage.getItem("portfolioItems")) || [];

  // 显示作品
  function displayItems(type = "all") {
    portfolioGrid.innerHTML = "";
    portfolioItems.forEach((item, index) => {
      if (type === "all" || item.type === type) {
        const itemElement = createPortfolioItem(item, index);
        portfolioGrid.appendChild(itemElement);
      }
    });
  }

  // 创建作品项目元素
  function createPortfolioItem(item, index) {
    const div = document.createElement("div");
    div.className = "portfolio-item";

    let contentHtml = "";
    switch (item.type) {
      case "image":
        contentHtml = `<img src="${item.url}" alt="${item.title}">`;
        break;
      case "video":
        contentHtml = `<video controls><source src="${item.url}" type="video/mp4"></video>`;
        break;
      case "file":
        contentHtml = `
                    <div class="content">
                        <i class="fas fa-file-archive fa-3x"></i>
                        <a href="${item.url}" download>下载文件</a>
                    </div>`;
        break;
    }

    div.innerHTML = `
            ${contentHtml}
            <div class="content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${
                  isAdmin
                    ? `<button onclick="deleteItem(${index})" class="delete-btn">删除</button>`
                    : ""
                }
            </div>
        `;
    return div;
  }

  // 添加新作品时保存到localStorage
  function addNewItem(data) {
    portfolioItems.push(data);
    // 保存到localStorage
    localStorage.setItem("portfolioItems", JSON.stringify(portfolioItems));
    displayItems();
  }

  // 删除作品时也更新localStorage
  window.deleteItem = function (index) {
    if (!isAdmin) return;
    if (confirm("确定要删除这个作品吗？")) {
      portfolioItems.splice(index, 1);
      // 更新localStorage
      localStorage.setItem("portfolioItems", JSON.stringify(portfolioItems));
      displayItems();
    }
  };

  // 初始化函数
  function init() {
    // 隐藏添加内容按钮
    const addContentBtn = document.getElementById("addContentBtn");
    if (addContentBtn) {
      addContentBtn.style.display = "none";
    }

    // 添加事件监听器
    document
      .getElementById("adminLoginBtn")
      .addEventListener("click", showLoginForm);
    document
      .getElementById("addContentBtn")
      ?.addEventListener("click", showAddItemForm);

    // 登录表单提交事件
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        handleLogin();
      });

    // 上传表单提交事件
    document
      .getElementById("uploadForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        handleUpload();
      });

    // 关闭模态框的点击事件
    document.querySelectorAll(".close").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("addModal").style.display = "none";
      });
    });
  }

  // 显示登录表单
  function showLoginForm() {
    document.getElementById("loginModal").style.display = "block";
  }

  // 处理登录
  function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 验证管理员凭证
    if (username === "123" && password === "123456") {
      // 登录成功
      document.getElementById("loginModal").style.display = "none";
      document.getElementById("adminLoginBtn").style.display = "none";
      // 显示添加内容按钮
      const addContentBtn = document.getElementById("addContentBtn");
      if (addContentBtn) {
        addContentBtn.style.display = "block";
      }
      alert("登录成功！");
    } else {
      alert("用户名或密码错误！");
    }
  }

  // 显示添加内容表单
  function showAddItemForm() {
    document.getElementById("addModal").style.display = "block";
  }

  // 处理上传
  function handleUpload() {
    const title = document.getElementById("contentTitle").value;
    const type = document.getElementById("contentType").value;
    const file = document.getElementById("contentFile").files[0];
    const description = document.getElementById("contentDescription").value;

    // 这里添加上传逻辑
    console.log("上传内容:", { title, type, file, description });

    // 关闭模态框
    document.getElementById("addModal").style.display = "none";

    // 清空表单
    document.getElementById("uploadForm").reset();

    alert("上传成功！");
  }

  // 页面加载时初始化
  window.addEventListener("load", init);

  // 标签切换
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      displayItems(this.dataset.type);
    });
  });

  // 初始显示保存的内容
  displayItems();
});
