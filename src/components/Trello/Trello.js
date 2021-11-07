import React, { useState } from "react";
import "./style.css";

const Trello = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Do",
      items: [
        { id: 1, title: "Got to Shop" },
        { id: 2, title: "Throw out the trash" },
        { id: 3, title: "Got to Shop" },
      ],
    },
    {
      id: 2,
      title: "Verify",
      items: [
        { id: 4, title: "Take a video" },
        { id: 5, title: "Throw out the trash" },
        { id: 6, title: "Got to Shop" },
      ],
    },
    {
      id: 3,
      title: "Made",
      items: [
        { id: 7, title: "Got to Shop" },
        { id: 8, title: "Throw out the trash" },
        { id: 9, title: "Got to Shop" },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((i) => {
        if (i.id === board.id) {
          return board;
        }
        if (i.id === currentBoard.id) {
          return currentBoard;
        }
        return i;
      })
    );
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((i) => {
        if (i.id === board.id) {
          return board;
        }
        if (i.id === currentBoard.id) {
          return currentBoard;
        }
        return i;
      })
    );
  };
  return (
    <div className="trello">
      {boards.map((board) => (
        <div
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className="board-title" key={board.id}>
            {board.title}
          </div>
          {board.items.map((item) => (
            <div
              //   key={item.id}
              // className="todo"
              draggable={true}
              className="item"
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Trello;
