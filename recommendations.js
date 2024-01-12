import { recommended, selected, dark, light } from "./colors.js";

function pawnRecommenations(block) {
  let category = block.children[0].getAttribute("data-category");
  let blockNo = block.getAttribute("data-block");
  let row = Math.floor(blockNo / 8);
  let col = blockNo % 8;
  if (category === "black" && row < 7) {
    if (
      row === 1 &&
      board.children[(row + 1) * 8 + col].childElementCount === 0 &&
      board.children[(row + 2) * 8 + col].childElementCount === 0
    ) {
      board.children[(row + 1) * 8 + col].style.backgroundColor = recommended;
      board.children[(row + 2) * 8 + col].style.backgroundColor = recommended;
    } else if (board.children[(row + 1) * 8 + col].childElementCount === 0) {
      board.children[(row + 1) * 8 + col].style.backgroundColor = recommended;
    }
    if (
      col < 7 &&
      board.children[(row + 1) * 8 + col + 1].childElementCount !== 0 &&
      board.children[(row + 1) * 8 + col + 1].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[(row + 1) * 8 + col + 1].style.backgroundColor =
        recommended;
    }
    if (
      col > 0 &&
      board.children[(row + 1) * 8 + col - 1].childElementCount !== 0 &&
      board.children[(row + 1) * 8 + col - 1].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[(row + 1) * 8 + col - 1].style.backgroundColor =
        recommended;
    }
  } else if (row > 0 && category === "white") {
    if (
      row === 6 &&
      board.children[(row - 1) * 8 + col].childElementCount === 0 &&
      board.children[(row - 2) * 8 + col].childElementCount === 0
    ) {
      board.children[(row - 1) * 8 + col].style.backgroundColor = recommended;
      board.children[(row - 2) * 8 + col].style.backgroundColor = recommended;
    } else if (board.children[(row - 1) * 8 + col].childElementCount === 0) {
      board.children[(row - 1) * 8 + col].style.backgroundColor = recommended;
    }
    if (
      col < 7 &&
      board.children[(row - 1) * 8 + col + 1].childElementCount !== 0 &&
      board.children[(row - 1) * 8 + col + 1].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[(row - 1) * 8 + col + 1].style.backgroundColor =
        recommended;
    }
    if (
      col > 0 &&
      board.children[(row - 1) * 8 + col - 1].childElementCount !== 0 &&
      board.children[(row - 1) * 8 + col - 1].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[(row - 1) * 8 + col - 1].style.backgroundColor =
        recommended;
    }
  }
}

function horseRecommendations(block) {
  let category = block.children[0].getAttribute("data-category");
  let blockNo = block.getAttribute("data-block");
  let row = Math.floor(blockNo / 8);
  let col = blockNo % 8;

  let possibleBlocks = [
    [row - 2, col - 1],
    [row - 2, col + 1],
    [row - 1, col - 2],
    [row + 1, col - 2],
    [row + 2, col - 1],
    [row + 2, col + 1],
    [row - 1, col + 2],
    [row + 1, col + 2],
  ];

  possibleBlocks.forEach((possibleBlock) => {
    if (
      possibleBlock[0] < 0 ||
      possibleBlock[0] > 7 ||
      possibleBlock[1] < 0 ||
      possibleBlock[1] > 7 ||
      (board.children[possibleBlock[0] * 8 + possibleBlock[1]]
        .childElementCount > 0 &&
        board.children[
          possibleBlock[0] * 8 + possibleBlock[1]
        ].children[0].getAttribute("data-category") == category)
    ) {
      //   console.log(possibleBlock);
      //   console.log("Out of bound or same category");
      return;
    } else {
      board.children[
        possibleBlock[0] * 8 + possibleBlock[1]
      ].style.backgroundColor = recommended;
    }
  });
}

function tankRecommendations(block) {
  let category = block.children[0].getAttribute("data-category");
  let blockNo = block.getAttribute("data-block");
  let row = Math.floor(blockNo / 8);
  let col = blockNo % 8;

  //   Moving left
  for (let i = col - 1; i >= 0; i--) {
    if (board.children[row * 8 + i].childElementCount === 0) {
      board.children[row * 8 + i].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[row * 8 + i].children[0].getAttribute("data-category") !==
      category
    ) {
      board.children[row * 8 + i].style.backgroundColor = recommended;
    }
    break;
  }

  //   Moving right
  for (let i = col + 1; i <= 7; i++) {
    if (board.children[row * 8 + i].childElementCount === 0) {
      board.children[row * 8 + i].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[row * 8 + i].children[0].getAttribute("data-category") !==
      category
    ) {
      board.children[row * 8 + i].style.backgroundColor = recommended;
    }
    break;
  }

  // Move Up
  for (let i = row - 1; i >= 0; i--) {
    if (board.children[i * 8 + col].childElementCount === 0) {
      board.children[i * 8 + col].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[i * 8 + col].children[0].getAttribute("data-category") !==
      category
    ) {
      board.children[i * 8 + col].style.backgroundColor = recommended;
    }
    break;
  }

  // Move down
  for (let i = row + 1; i <= 7; i++) {
    if (board.children[i * 8 + col].childElementCount === 0) {
      board.children[i * 8 + col].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[i * 8 + col].children[0].getAttribute("data-category") !==
      category
    ) {
      board.children[i * 8 + col].style.backgroundColor = recommended;
    }
    break;
  }
}

function topRecommendation(block) {
  let category = block.children[0].getAttribute("data-category");
  let blockNo = block.getAttribute("data-block");
  let row = Math.floor(blockNo / 8);
  let col = blockNo % 8;

  //   Move top left
  let trow = row;
  let tcol = col;
  for (let i = Math.min(row, col); i > 0; i--) {
    trow -= 1;
    tcol -= 1;
    if (board.children[trow * 8 + tcol].childElementCount === 0) {
      board.children[trow * 8 + tcol].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[trow * 8 + tcol].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[trow * 8 + tcol].style.backgroundColor = recommended;
    }
    break;
  }

  // Move bottom left
  let sum = row + col;
  for (let trow = row + 1; trow <= 7; trow++) {
    let flag = false;
    for (let tcol = col - 1; tcol >= 0; tcol--) {
      if (trow + tcol != sum) continue;
      if (board.children[trow * 8 + tcol].childElementCount === 0) {
        board.children[trow * 8 + tcol].style.backgroundColor = recommended;
        continue;
      } else if (
        board.children[trow * 8 + tcol].children[0].getAttribute(
          "data-category"
        ) !== category
      ) {
        board.children[trow * 8 + tcol].style.backgroundColor = recommended;
      }
      flag = true;
      break;
    }
    if (flag) break;
  }

  // Move bottom right
  trow = row;
  tcol = col;
  for (let i = Math.max(row, col); i < 7; i++) {
    trow += 1;
    tcol += 1;
    if (board.children[trow * 8 + tcol].childElementCount === 0) {
      board.children[trow * 8 + tcol].style.backgroundColor = recommended;
      continue;
    } else if (
      board.children[trow * 8 + tcol].children[0].getAttribute(
        "data-category"
      ) !== category
    ) {
      board.children[trow * 8 + tcol].style.backgroundColor = recommended;
    }
    break;
  }

  // Move top right
  sum = row + col;
  for (let trow = row - 1; trow >= 0; trow--) {
    let flag = false;
    for (let tcol = col + 1; tcol <= 7; tcol++) {
      if (trow + tcol != sum) continue;
      if (board.children[trow * 8 + tcol].childElementCount === 0) {
        board.children[trow * 8 + tcol].style.backgroundColor = recommended;
        continue;
      } else if (
        board.children[trow * 8 + tcol].children[0].getAttribute(
          "data-category"
        ) !== category
      ) {
        board.children[trow * 8 + tcol].style.backgroundColor = recommended;
      }
      flag = true;
      break;
    }
    if (flag) break;
  }
}

function queenRecommendations(block) {
  tankRecommendations(block);
  topRecommendation(block);
}

function kingRecommendations(block) {
  let category = block.children[0].getAttribute("data-category");
  let blockNo = block.getAttribute("data-block");
  let row = Math.floor(blockNo / 8);
  let col = blockNo % 8;

  let possibleBlocks = [
    [row - 1, col - 1],
    [row, col - 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
    [row, col + 1],
    [row - 1, col + 1],
    [row - 1, col],
  ];

  possibleBlocks.forEach((possibleBlock) => {
    if (
      possibleBlock[0] < 0 ||
      possibleBlock[0] > 7 ||
      possibleBlock[1] < 0 ||
      possibleBlock[1] > 7 ||
      (board.children[possibleBlock[0] * 8 + possibleBlock[1]]
        .childElementCount > 0 &&
        board.children[
          possibleBlock[0] * 8 + possibleBlock[1]
        ].children[0].getAttribute("data-category") == category)
    ) {
      //   console.log(possibleBlock);
      //   console.log("Out of bound or same category");
      return;
    } else {
      board.children[
        possibleBlock[0] * 8 + possibleBlock[1]
      ].style.backgroundColor = recommended;
    }
  });
}

function handlePawnReachingOthersTerritory(
  block,
  iconOptions,
  iconOptionsContainer
) {
  while (iconOptions.childElementCount > 0) {
    iconOptions.removeChild(iconOptions.children[0]);
  }
  let blockNo = block.getAttribute("data-block");
  let category = block.children[0].getAttribute("data-category");

  let image = document.createElement("img");
  image.setAttribute("alt", "horse");
  image.setAttribute("src", `./images/horse_${category}.png`);
  image.setAttribute("data-category", category);
  image.setAttribute("data-block", blockNo);
  image.addEventListener(
    "click",
    (e) => {
      board.children[blockNo].removeChild(board.children[blockNo].children[0]);
      board.children[blockNo].appendChild(e.target);
      iconOptionsContainer.style.display = "none";
    },
    { once: true }
  );
  iconOptions.appendChild(image);

  image = document.createElement("img");
  image.setAttribute("alt", "queen");
  image.setAttribute("src", `./images/queen_${category}.png`);
  image.setAttribute("data-category", category);
  image.setAttribute("data-block", blockNo);
  image.addEventListener(
    "click",
    (e) => {
      board.children[blockNo].removeChild(board.children[blockNo].children[0]);
      board.children[blockNo].appendChild(e.target);
      iconOptionsContainer.style.display = "none";
    },
    { once: true }
  );
  iconOptions.appendChild(image);

  image = document.createElement("img");
  image.setAttribute("alt", "tank");
  image.setAttribute("src", `./images/tank_${category}.png`);
  image.setAttribute("data-category", category);
  image.setAttribute("data-block", blockNo);
  image.addEventListener(
    "click",
    (e) => {
      board.children[blockNo].removeChild(board.children[blockNo].children[0]);
      board.children[blockNo].appendChild(e.target);
      iconOptionsContainer.style.display = "none";
    },
    { once: true }
  );
  iconOptions.appendChild(image);

  image = document.createElement("img");
  image.setAttribute("alt", "top");
  image.setAttribute("src", `./images/top_${category}.png`);
  image.setAttribute("data-category", category);
  image.setAttribute("data-block", blockNo);
  image.addEventListener(
    "click",
    (e) => {
      board.children[blockNo].removeChild(board.children[blockNo].children[0]);
      board.children[blockNo].appendChild(e.target);
      iconOptionsContainer.style.display = "none";
    },
    { once: true }
  );
  iconOptions.appendChild(image);

  iconOptionsContainer.style.display = "flex";
}

export {
  pawnRecommenations,
  horseRecommendations,
  tankRecommendations,
  topRecommendation,
  queenRecommendations,
  kingRecommendations,
  handlePawnReachingOthersTerritory,
};
