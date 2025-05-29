document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有功能
  initCarousel();
  initProfileEffects();
  initBlogCards();
  initProjectCards();
  initSkillsAnimation();
  initTimelineAnimation();
  initSearchEffects();
  initScrollEffects();
  initScrollAnimations();
});

// 轮播图功能
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".carousel-item");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function showSlide(index) {
    items.forEach((item) => item.classList.remove("active"));
    if (index >= items.length) currentIndex = 0;
    if (index < 0) currentIndex = items.length - 1;
    items[currentIndex].classList.add("active");
  }

  // 自动轮播
  let slideInterval = setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
  }, 5000);

  // 触摸事件
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(slideInterval);
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
      currentIndex++;
      showSlide(currentIndex);
    } else if (touchEndX - touchStartX > 50) {
      currentIndex--;
      showSlide(currentIndex);
    }
    // 重新启动自动轮播
    slideInterval = setInterval(() => {
      currentIndex++;
      showSlide(currentIndex);
    }, 5000);
  });

  // 按钮点击事件
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
  });

  // 鼠标悬停暂停
  carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
  carousel.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      currentIndex++;
      showSlide(currentIndex);
    }, 5000);
  });
}

// 个人信息卡片效果
function initProfileEffects() {
  // 添加头像更改功能
  const avatarImg = document.getElementById("avatarImg");
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");
  const avatarInput = document.getElementById("avatarInput");
  const profileImage = document.querySelector(".profile-image");

  // 点击更换头像按钮时触发文件选择
  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  // 处理文件选择
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        avatarImg.src = event.target.result;
        // 保存到 localStorage
        localStorage.setItem("userAvatar", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // 支持拖拽上传
  profileImage.addEventListener("dragover", (e) => {
    e.preventDefault();
    profileImage.classList.add("dragging");
  });

  profileImage.addEventListener("dragleave", () => {
    profileImage.classList.remove("dragging");
  });

  profileImage.addEventListener("drop", (e) => {
    e.preventDefault();
    profileImage.classList.remove("dragging");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        avatarImg.src = event.target.result;
        localStorage.setItem("userAvatar", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // 页面加载时恢复保存的头像
  const savedAvatar = localStorage.getItem("userAvatar");
  if (savedAvatar) {
    avatarImg.src = savedAvatar;
  }
}

// 博客卡片效果
function initBlogCards() {
  const blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// 项目卡片效果
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// 技能动画
function initSkillsAnimation() {
  const skills = document.querySelectorAll(".skill-card");

  skills.forEach((skill) => {
    skill.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    skill.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// 时间轴动画
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// 搜索框效果
function initSearchEffects() {
  const searchBox = document.querySelector(".search-box");
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("focus", () => {
    searchBox.style.transform = "scale(1.02)";
  });

  searchInput.addEventListener("blur", () => {
    searchBox.style.transform = "scale(1)";
  });
}

// 滚动效果
function initScrollEffects() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    section.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    section.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// 搜索功能
function searchBaidu() {
  const searchTerm = document.getElementById("searchInput").value;
  window.open(
    `https://www.baidu.com/s?wd=${encodeURIComponent(searchTerm)}`,
    "_blank"
  );
}

function searchBing() {
  const searchTerm = document.getElementById("searchInput").value;
  window.open(
    `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`,
    "_blank"
  );
}

// 添加滚动触发动画
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".design-card, .featured-card, .activity-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    element.classList.add("scroll-reveal");
    observer.observe(element);
  });
}
