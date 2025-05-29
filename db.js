// 初始化IndexedDB数据库
let db;

const request = indexedDB.open('WebsiteDB', 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  
  // 创建对象存储空间
  if (!db.objectStoreNames.contains('siteData')) {
    db.createObjectStore('siteData', { keyPath: 'id', autoIncrement: true });
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log('数据库初始化成功');
};

request.onerror = function(event) {
  console.error('数据库初始化失败:', event.target.error);
};

// 数据库操作方法
function addData(data) {
  const transaction = db.transaction(['siteData'], 'readwrite');
  const store = transaction.objectStore('siteData');
  const request = store.add(data);

  request.onsuccess = function() {
    console.log('数据添加成功');
  };

  request.onerror = function(event) {
    console.error('数据添加失败:', event.target.error);
  };
}

function getData(id, callback) {
  const transaction = db.transaction(['siteData'], 'readonly');
  const store = transaction.objectStore('siteData');
  const request = store.get(id);

  request.onsuccess = function() {
    callback(request.result);
  };

  request.onerror = function(event) {
    console.error('数据获取失败:', event.target.error);
  };
}

// 导出方法供其他脚本使用
export { addData, getData };
