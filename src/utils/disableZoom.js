// 禁用Safari缩放
export default function () {
  let lastTouchEnd = 0;
  document.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    (event) => {
      let now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener("gesturestart", (event) => {
    event.preventDefault();
  });
  document.addEventListener("dblclick", (event) => {
    event.preventDefault();
  });
}