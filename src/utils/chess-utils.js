import {NotificationManager} from 'react-notifications';


export const boardCompare = (tournament, setter) => {

  const localBoards = JSON.parse(localStorage.getItem('tournament'))

  if (localBoards) {
    tournament.forEach((board, i) => {
        const localSelectedBoard = localBoards.filter(b => b.headers.White === board.headers.White && b.headers.Black === board.headers.Black)
        console.log(localSelectedBoard, "Tablero")
        if (localSelectedBoard.length > 0) {
          if (board.match.length > localSelectedBoard[0].match.length) {
            NotificationManager.success(`${board.headers.White} | ${board.headers.Black}`, 'Nuevo movimiento partida', 5000, () => setter(i));
          }
        }
    });
  } 
}