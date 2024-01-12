import { recommended, selected, dark, light } from "./colors.js";

let white = 0;
// Function for initializing the blocks with alternate black and white colors and adding the initial icons
function initializeBlock(block) {
  let row = Math.floor(white / 8);
  let col = white % 8;
  if ((row + col) & 1) block.style.backgroundColor = dark;
  else block.style.backgroundColor = light;

  if (row == 1 || row == 6) {
    let image = document.createElement("img");
    image.setAttribute("alt", "pawn");
    image.setAttribute(
      "src",
      `./images/pawn_${row === 1 ? "black" : "white"}.png`
    );
    image.setAttribute("data-category", row === 1 ? "black" : "white");
    image.setAttribute("data-block", white);
    block.appendChild(image);
  }

  if (row == 0 || row == 7) {
    let image = document.createElement("img");
    if (col === 0 || col === 7) {
      image.setAttribute("alt", "tank");
      image.setAttribute(
        "src",
        `./images/tank_${row === 0 ? "black" : "white"}.png`
      );
    }

    if (col == 1 || col === 6) {
      image.setAttribute("alt", "horse");
      image.setAttribute(
        "src",
        `./images/horse_${row === 0 ? "black" : "white"}.png`
      );
    }

    if (col === 2 || col === 5) {
      image.setAttribute("alt", "top");
      image.setAttribute(
        "src",
        `./images/top_${row === 0 ? "black" : "white"}.png`
      );
    }

    if (col === 3) {
      image.setAttribute("alt", "queen");
      image.setAttribute(
        "src",
        `./images/queen_${row === 0 ? "black" : "white"}.png`
      );
    }

    if (col === 4) {
      image.setAttribute("alt", "king");
      image.setAttribute(
        "src",
        `./images/king_${row === 0 ? "black" : "white"}.png`
      );
    }

    image.setAttribute("data-category", row === 0 ? "black" : "white");
    image.setAttribute("data-block", white);
    block.appendChild(image);
  }
  block.setAttribute("data-block", white);
  // logic for removing the borders of the corner blocks
  if (row == 0 || row == 7 || col == 0 || col == 7) {
    block.style.border = "none";
  }
  white++;
}

export { initializeBlock };
