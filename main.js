let galleryWrapper = document.querySelectorAll('.hero_gallery_wrapper');

// let galleryImages = document.querySelectorAll('.hero_gallery_image');
// let galleryWidth;

// console.log(galleryWidth)

let scroll = {
  current: [],
  target: [],
  ease: .05,
  speed: .25,
  limit: []
}

let init = () => {
  onResize();
  initAnimaition();
};

let onResize = () => {
  galleryWrapper.forEach((wrapper, index) => {
    let galleryWidth = wrapper.getBoundingClientRect().width;
    scroll.limit[index]=galleryWidth - window.innerWidth
  })
  // galleryImages = gallery.querySelectorAll('.hero_gallery_image');
  // scroll.limit = galleryWidth - window.innerWidth
};

let initAnimaition = () => {
  galleryWrapper.forEach((wrapper, index) => {
    scroll.current[index] = 0;
    scroll.target[index] = 0;
  })
}

let onScroll = (e) => {
  let speed = e.deltaY; //마우스휠을 올릴때와 내릴때 100,-100 이뜸.
  // console.log(speed)

  galleryWrapper.forEach((wrapper, index) => {
    if (index % 2 == 0) {
      //%나머지를 구한다.
      scroll.target[index] += speed * scroll.speed;
    } else {
      scroll.target[index] -= speed * scroll.speed;
    }

  })


  //0 += 델타스크롤값 100 or -100 * .25
  //+=하는 이유는 스크롤값이 들어갈때마다 계속계속 스피드에 속도를 추가하기 위함이다. 그래야 스무스하게 들어감.
  return speed;

};

function clamp( max, number) {
  return Math.min(number, max)
}

function lerp(p1, p2, p3) {
  return p1 + (p2 - p1) * p3
  // 스크롤이 움직일때 너무 많이 안움직이게 값을 줄여주는것

}

let update = () => {
  galleryWrapper.forEach((wrapper, index) => {
    scroll.target[index] = clamp(scroll.limit[index], scroll.target[index])
    scroll.current[index] = lerp(scroll.current[index], scroll.target[index], scroll.ease)
    scroll.current[index] = parseFloat(scroll.current[index].toFixed(2))
    wrapper.style.transform = `translate3d(${-scroll.current[index]}px,0,0)`
  })
  window.requestAnimationFrame(update)

}
update();
window.addEventListener('resize', onResize);
window.addEventListener('wheel', onScroll);
//스크롤되면 온스크롤 함수를 불러서 써라.
window.addEventListener('load', () => {
  init();
})