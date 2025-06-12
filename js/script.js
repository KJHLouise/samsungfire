window.addEventListener("load", () => {
  // --- 스크롤 헤더 기능 (새로 추가) ---
  const headerTop = document.querySelector(".header-top");
  const headerBtm = document.querySelector(".header-btm");
  const Main = document.querySelector(".main");
  const Hinner = document.querySelector(".header-btm .inner");

  if (headerTop && headerBtm) {
    const headerTopHeight = headerTop.offsetHeight;

    window.addEventListener("scroll", () => {
      if (window.scrollY > headerTopHeight) {
        headerBtm.classList.add("is-fixed1");
        Main.classList.add("is-fixed2");
        Hinner.classList.add("is-fixed3");
      } else {
        headerBtm.classList.remove("is-fixed1");
        Main.classList.remove("is-fixed2");
        Hinner.classList.remove("is-fixed3");
      }
    });
  }
  const menuBtm = document.querySelector(".menu-btm");
  const navItems = document.querySelectorAll(".menu-btm .nav > li");
  const menuBg = document.querySelector(".menubg");
  const header = document.querySelector(".header");

  if (menuBtm && navItems.length > 0 && menuBg) {
    menuBtm.addEventListener("mouseenter", () => {
      menuBtm.classList.add("active");
      header.classList.add("active");
    });

    menuBtm.addEventListener("mouseleave", () => {
      menuBtm.classList.remove("active");
      navItems.forEach((item) => item.classList.remove("on"));
      menuBg.style.height = "0px"; // 높이 초기화
      header.classList.remove("active");
    });

    navItems.forEach((item) => item.classList.remove("on"));
    menuBg.style.height = "0px";

    navItems.forEach((item) => {
      const submenu = item.querySelector(".submenu");

      item.addEventListener("mouseenter", () => {
        navItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("on");
          }
        });
        item.classList.add("on");

        // submenu의 높이 계산 → menubg에 적용
        if (submenu) {
          const submenuHeight = submenu.scrollHeight;
          menuBg.style.height = submenuHeight + "px";
        } else {
          menuBg.style.height = "0px";
        }
      });
    });
  }

  const mainSwiperContainer = document.querySelector(".img-slide .slide-list");
  if (mainSwiperContainer) {
    // 제어할 요소들을 미리 찾아둡니다.
    const currentNumEl = mainSwiperContainer.querySelector(".button-number .current");
    const totalNumEl = mainSwiperContainer.querySelector(".button-number .total");
    const playStopBtn = mainSwiperContainer.querySelector(".stop-start .start");

    const mainSwiper = new Swiper(mainSwiperContainer, {
      loop: true, // 무한 루프 설정
      autoplay: {
        delay: 3000, // 3초마다 자동 재생
        disableOnInteraction: false, // 사용자가 조작한 후에도 자동 재생 유지
      },
      navigation: {
        nextEl: ".img-slide .swiper-button-next",
        prevEl: ".img-slide .swiper-button-prev",
      },
      // Swiper 이벤트 리스너
      on: {
        // Swiper가 초기화될 때 실행
        init: (swiper) => {
          // loop 모드에서는 실제 슬라이드 개수가 복제본을 제외한 값입니다.
          // swiper.slides.length는 복제본을 포함하므로 swiper.realIndex를 사용해야 합니다.
          // HTML에 총 개수가 6으로 이미 하드코딩 되어 있으므로 이 부분은 생략 가능합니다.
          // totalNumEl.textContent = swiper.slides.length - swiper.loopedSlides * 2;
        },
        // 슬라이드가 바뀔 때마다 실행
        slideChange: (swiper) => {
          // 현재 슬라이드 번호(realIndex는 0부터 시작하므로 +1)를 업데이트합니다.
          currentNumEl.textContent = swiper.realIndex + 1;
        },
      },
    });

    // 재생/정지 버튼에 클릭 이벤트 추가
    if (playStopBtn) {
      playStopBtn.addEventListener("click", () => {
        // 버튼에 'start' 클래스가 있다면, 현재 재생 중이라는 의미
        if (playStopBtn.classList.contains("start")) {
          mainSwiper.autoplay.stop(); // 자동 재생을 멈춥니다.
          playStopBtn.classList.remove("start"); // 'start' 클래스를 제거하고
          playStopBtn.classList.add("stop"); // 'stop' 클래스를 추가합니다. (CSS에서 아이콘 변경을 위해)
          // 재생 아이콘으로 배경 이미지 변경 (이미지가 있다면)
          playStopBtn.style.backgroundImage = "url(../img/slider_play.png)";
        } else {
          // 'start' 클래스가 없다면, 현재 정지 상태라는 의미
          mainSwiper.autoplay.start(); // 자동 재생을 시작합니다.
          playStopBtn.classList.remove("stop"); // 'stop' 클래스를 제거하고
          playStopBtn.classList.add("start"); // 'start' 클래스를 다시 추가합니다.
          // 정지 아이콘으로 배경 이미지 변경
          playStopBtn.style.backgroundImage = "url(../img/slider_stop.png)";
        }
      });
    }
  }
  const menuSwiper = new Swiper(".menu-slide .slide-list", {
    slidesPerView: 3, // 한 화면에 보이는 카드 수
    spaceBetween: 33, // 카드 간 간격
    breakpoints: {
      1219: {
        slidesPerView: 4, // 한 화면에 보이는 카드 수
        spaceBetween: 16, // 카드 간 간격
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".menu-slide .swiper-button-next",
      prevEl: ".menu-slide .swiper-button-prev",
    },
  });
  const chattingBox = document.querySelector(".chatting");
  const closeChatBtn = document.querySelector(".chatting .button");

  if (chattingBox && closeChatBtn) {
    closeChatBtn.addEventListener("click", () => {
      chattingBox.classList.add("hide");
    });
  }
  const noteSwiper = new Swiper(".notebook .slide-list", {
    slidesPerView: 4, // 한 화면에 보이는 카드 수
    spaceBetween: 33, // 카드 간 간격
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".notebook .swiper-button-next",
      prevEl: ".notebook .swiper-button-prev",
    },
  });
});
