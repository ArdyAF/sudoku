export const getBoard = (difficulty) => {
  return (dispatch, useState) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'GET_BOARD',
          payload: data
        })
      })
      .catch(err => console.log(err))
  }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export const checkAnswer = (board) => {
  return (dispatch, useState) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({
        board
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(res => dispatch({
        type: 'SET_STATUS',
        payload: {
          status : res.status,
          currentBoard: board
        }
      }))
      .catch(err => console.log(err))
  }
}

export const solveBoard = (board) => {
  return (dispatch, useState) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({
        board
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(res => dispatch({
        type: 'SOLVE_BOARD',
        payload: res
      }))
      .catch(err => console.log(err))
  }
}