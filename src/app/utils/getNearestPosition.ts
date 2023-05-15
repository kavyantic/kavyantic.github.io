
const NULL_REST = {
  left: null,
  right: 'none',
  top: 'none',
  bottom: 'none',
};

const getNearestNavStack: (options: { left: number; top: number }) => {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
} = (opt) => {
  const body = document.querySelector("body");

  if (body) {
    const rects = body.getBoundingClientRect();
    const midX = rects.width / 2;
    const midY = rects.height / 2;
    // return { left: midX, top: midY };
    console.log(opt);

    if (opt.left > midX) {
      if (opt.top > midY) {
        console.log("retsdfsf");
        return { ...NULL_REST, right: 10 };
      } else {
        return { ...NULL_REST, right: 10 };
      }
    } else {
    }
  }
  return {};
};

export default getNearestNavStack;
