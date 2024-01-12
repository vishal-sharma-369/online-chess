import { recommended, selected, dark, light } from "./colors.js";
import {
  pawnRecommenations,
  horseRecommendations,
  tankRecommendations,
  topRecommendation,
  queenRecommendations,
  kingRecommendations,
  handlePawnReachingOthersTerritory,
} from "./recommendations.js";
import { initializeBlock } from "./initializer.js";

const game = document.getElementById("game");
const board = document.getElementById("board");
const landingPage = document.getElementById("landing");
const playBtn = document.getElementById("play-btn");
const scoreCard = document.getElementById("score-card");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restart-button");
const iconOptions = document.getElementById("icon-options");
const iconOptionsContainer = document.getElementById("icon-options-container");
const outPlayers = document.getElementsByClassName("out-players");

// Function for showing available blocks to move after a block has been selected
function showRecommendations(block) {
  let type = block.children[0].getAttribute("alt");

  if (type === "pawn") {
    pawnRecommenations(block);
  } else if (type === "horse") {
    horseRecommendations(block);
  } else if (type === "queen") {
    queenRecommendations(block);
  } else if (type === "tank") {
    tankRecommendations(block);
  } else if (type === "top") {
    topRecommendation(block);
  } else {
    // this must be a king
    kingRecommendations(block);
  }
}

// Function to set block color
function setBlockColor(block, color) {
  block.style.backgroundColor = color;
}

// Function to remove the recommendations once a block is unselected or moved
function removeRecommendations() {
  for (let i = 0; i < 64; i++) {
    if (
      board.children[i].style.backgroundColor === recommended ||
      board.children[i].style.backgroundColor === selected
    ) {
      let row = Math.floor(i / 8);
      let col = i % 8;
      if ((row + col) & 1) setBlockColor(board.children[i], dark);
      else setBlockColor(board.children[i], light);
    }
  }
}

// Event handlers
let selectedBlock = null;
let previousTurn = null;

function handleClick(e) {
  // console.log(e.target.getAttribute("data-block"));
  let blockNo = e.target.getAttribute("data-block");
  // console.log(board.children[blockNo].childElementCount);
  // If there is no icon in the block then take no action

  if (
    !board.children[blockNo].childElementCount &&
    board.children[blockNo].style.backgroundColor !== recommended
  )
    return;

  // If there is no selected block till now
  if (selectedBlock === null) {
    if (
      previousTurn !== null &&
      previousTurn ===
        board.children[blockNo].children[0].getAttribute("data-category")
    ) {
      return;
    }
    selectedBlock = board.children[blockNo];
    previousTurn = selectedBlock.children[0].getAttribute("data-category");
    // console.log(previousTurn);
    setBlockColor(selectedBlock, selected);
    showRecommendations(selectedBlock);
  }
  // If the selected block is clicked again to unselect it
  else if (board.children[blockNo] === selectedBlock) {
    removeRecommendations();
    previousTurn =
      selectedBlock.children[0].getAttribute("data-category") === "black"
        ? "white"
        : "black";
    selectedBlock = null;
  }
  // If a new block is selected other than selected block
  else {
    // console.log("hey");
    // If the new block is not a recommended block then simply take no action
    if (board.children[blockNo].style.backgroundColor !== recommended) return;
    let newBlock = board.children[blockNo];
    // If the new block has some icon then it must be of other category so remove it and place selected block icon in new block
    if (newBlock.childElementCount !== 0) {
      if (newBlock.children[0].getAttribute("alt") === "king") {
        game.style.display = "none";
        score.innerText =
          (newBlock.children[0].getAttribute("data-category") === "black"
            ? "White"
            : "Black") + " Team Won!";
        scoreCard.style.display = "flex";
      }
      newBlock.removeChild(newBlock.children[0]);
    }
    // console.log(selectedBlock.children[0]);
    // Set the data-block attribute of icon to new block no before moving
    selectedBlock.children[0].setAttribute("data-block", blockNo);
    // Now move the icon
    newBlock.appendChild(selectedBlock.children[0]);

    // Check if new block is pawn and it has reached others territory
    let row = Math.floor(blockNo / 8);
    if (
      newBlock.children[0].getAttribute("alt") === "pawn" &&
      (row === 0 || row === 7)
    ) {
      handlePawnReachingOthersTerritory(
        newBlock,
        iconOptions,
        iconOptionsContainer
      );
    }
    // console.log(selectedBlock.children[0]);
    // console.log(selectedBlock.childElementCount);
    removeRecommendations();
    selectedBlock = null;
  }
}

// Calling the initial block function for all the blocks in the board
Array.from(board.children).forEach((block) => {
  initializeBlock(block);
  block.addEventListener("click", handleClick);
});

// Implementing the play btn functionality
playBtn.addEventListener("click", () => {
  landingPage.style.display = "none";
  game.style.display = "block";
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});
