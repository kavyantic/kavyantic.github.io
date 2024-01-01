const Modes = ["dracula", "dark", "navy"] as const;
type Mode = (typeof Modes)[number];

export default function theme(mode: Mode) {
  document.body.setAttribute("data-theme", mode);
}

export function updateTheme() {
  var ind = Modes.findIndex((v) => v == document.body.getAttribute("data-theme"))+1
  ind = ind>=Modes.length?ind=0:ind
  document.body.setAttribute("data-theme", Modes[ind]);
}
