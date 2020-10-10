const initialState = {
  board: [],
  undisturbedBoard: [],
  solution: [],
  status: 'unsolved'
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOARD":
      const newState = { ...state, board: action.payload.board, undisturbedBoard: action.payload.board ,status: 'unsolved' }

      return newState
    case "SOLVE_BOARD":
      const solvedBoard = { ...state, solution: action.payload.solution, status: action.payload.status }

      return solvedBoard
    case "SET_STATUS":
      const checkedBoard = { ...state, status: action.payload.status }

      return checkedBoard
    default:
      return state
  }
}

export default boardReducer