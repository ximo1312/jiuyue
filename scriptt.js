// 模拟数据存储
let items = {
  software: [],
  plugins: [],
  websites: [],
  freeSites: [],
};

// 管理员信息存储
let adminCredentials = null;

// 修改管理员凭证部分
const ADMIN_CREDENTIALS = {
  username: "123",
  password: "123456",
};

let editMode = false; // 编辑模式状态

// 初始化函数
function init() {
  // 从本地存储加载数据
  loadItems();

  // 添加事件监听器
  document.getElementById("login-btn").addEventListener("click", showLoginForm);
  document
    .getElementById("add-item-btn")
    .addEventListener("click", showAddItemForm);
  document.getElementById("logout-btn").addEventListener("click", handleLogout);

  // 在init函数中添加编辑模式切换监听
  document
    .getElementById("edit-mode-toggle")
    .addEventListener("change", (e) => {
      editMode = e.target.checked;
      displayItems(); // 重新显示所有项目以更新界面
    });

  // 添加一键删除按钮的事件监听
  document
    .getElementById("delete-all-btn")
    .addEventListener("click", deleteAllItems);

  // 显示项目
  displayItems();
}

// 加载管理员凭证
function loadAdminCredentials() {
  const storedCredentials = localStorage.getItem("adminCredentials");
  if (storedCredentials) {
    adminCredentials = JSON.parse(storedCredentials);
  }
}

// 保存管理员凭证
function saveAdminCredentials(username, password) {
  adminCredentials = { username, password };
  localStorage.setItem("adminCredentials", JSON.stringify(adminCredentials));
}

// 加载存储的项目
function loadItems() {
  const storedItems = localStorage.getItem("virtualItems");
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
}

// 保存项目到存储
function saveItems() {
  localStorage.setItem("virtualItems", JSON.stringify(items));
}

// 显示项目
function displayItems() {
  displayCategoryItems("software");
  displayCategoryItems("plugins");
  displayCategoryItems("freeSites");
  displayCategoryItems("websites");
}

// 显示特定分类的项目
function displayCategoryItems(category) {
  const grid = document.getElementById(`${category}-grid`);
  if (!grid) {
    console.error(`找不到分类 ${category} 的容器元素`);
    return;
  }

  grid.innerHTML = "";

  if (!items[category]) {
    console.error(`找不到分类 ${category} 的数据`);
    return;
  }

  items[category].forEach((item) => {
    const itemCard = createItemCard(item);
    grid.appendChild(itemCard);
  });
}

// 创建项目卡片
function createItemCard(item) {
  const div = document.createElement("div");
  div.className = "item-card";

  let cardContent = `
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <button class="glow-button get-btn" onclick="getItem('${item.id}', '${item.link}')">
      获取链接
    </button>
  `;

  // 在编辑模式下显示删除按钮
  if (
    editMode &&
    document.getElementById("admin-controls").classList.contains("hidden") ===
      false
  ) {
    cardContent += `
      <button class="delete-btn" onclick="deleteItem('${item.id}')">
        <span class="delete-icon">×</span>
      </button>
    `;
  }

  div.innerHTML = cardContent;
  return div;
}

// 获取项目链接
function getItem(itemId, link) {
  alert(`获取成功！链接地址：${link}`);
  // 这里可以添加复制链接到剪贴板的功能
}

// 显示登录表单
function showLoginForm() {
  const username = prompt("请输入管理员用户名：");
  if (!username) return;

  const password = prompt("请输入管理员密码：");
  if (!password) return;

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    document.getElementById("admin-controls").classList.remove("hidden");
    document.getElementById("login-btn").classList.add("hidden");
    alert("登录成功！");
  } else {
    alert("用户名或密码错误！");
  }
}

// 处理登出
function handleLogout() {
  document.getElementById("admin-controls").classList.add("hidden");
  document.getElementById("login-btn").classList.remove("hidden");
  document.getElementById("edit-mode-toggle").checked = false;
  editMode = false;
  displayItems(); // 重新显示项目以移除删除按钮
  alert("已退出登录！");
}

// 显示添加项目表单
function showAddItemForm() {
  const category = prompt(
    "请选择分类（software/freeSites/plugins/websites）："
  );
  if (
    category !== "software" &&
    category !== "freeSites" &&
    category !== "plugins" &&
    category !== "websites"
  ) {
    alert("无效的分类！");
    return;
  }

  const name = prompt("请输入名称：");
  if (!name) return;

  const description = prompt("请输入描述：");
  if (!description) return;

  const link = prompt("请输入链接：");
  if (!link) return;

  addItem(category, name, description, link);
}

// 添加新项目
function addItem(category, name, description, link) {
  const newItem = {
    id: Date.now().toString(),
    name,
    description,
    link,
  };

  items[category].push(newItem);
  saveItems();
  displayItems();
  alert("添加成功！");
}

// 删除项目
function deleteItem(itemId) {
  if (!editMode) return;

  const confirmDelete = confirm("确定要删除这个项目吗？");
  if (!confirmDelete) return;

  // 在所有分类中查找并删除项目
  for (let category in items) {
    items[category] = items[category].filter((item) => item.id !== itemId);
  }

  saveItems();
  displayItems();
  alert("删除成功！");
}

// 添加一键删除函数
function deleteAllItems() {
  if (!editMode) {
    alert("请先开启编辑模式！");
    return;
  }

  const confirmDelete = confirm("确定要删除所有项目吗？此操作不可恢复！");
  if (!confirmDelete) return;

  // 清空所有分类的数据
  items = {
    software: [],
    plugins: [],
    websites: [],
    freeSites: [],
  };

  // 保存并刷新显示
  saveItems();
  displayItems();
  alert("所有项目已删除！");
}

// 页面加载时初始化
window.addEventListener("load", init);
