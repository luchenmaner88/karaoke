const items = document.querySelectorAll(".img-item");

for (let i = 0; i < items.length; i++) {
  // get the row
  const r = Math.floor(i / 3);
  // get the col
  const c = i % 3;

  const bgX = -c * 100 + "%";
  const bgY = -r * 100 + "%";

  items[i].style.setProperty("--bgX", bgX);
  items[i].style.setProperty("--bgY", bgY);
}
