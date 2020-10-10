import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Dimensions } from 'react-native';
import Constants from 'expo-constants'
import LottieView from 'lottie-react-native';

import { getBoard } from '../../redux/actions/boardAction'
import { checkAnswer } from '../../redux/actions/boardAction'
import { solveBoard } from '../../redux/actions/boardAction'

const windowWidth = Dimensions.get('window').width;

export default function Play({ route, navigation }) {
  const dispatch = useDispatch()

  const animation = useRef(null);
  const [loading, setLoading] = useState(true)
  const [localBoard, setLocalBoard] = useState([])
  const [status, setStatus] = useState({
    col: '',
    row: ''
  })
  const [win, setWin] = useState({
    status: 'neutral',
    attempt: 1
  })

  useEffect(() => {
    dispatch(getBoard(route.params.difficulty.toLowerCase()))
    if(loading) {
      animation.current.play()
    }
  }, [dispatch])

  const boardData = useSelector(state => state.boardReducer)

  useEffect(() => {
    setLocalBoard(boardData.board)
    if (boardData.board.length > 0) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [boardData.board])

  const changeStatus = (col, row) => {
    setStatus({
      col,
      row
    })
  }

  const changeValue = (number) => {
    let changed = JSON.parse(JSON.stringify(localBoard))
    changed[status.row][status.col] = Number(number)

    setLocalBoard(changed)
  }

  const checkHandler = () => {
    dispatch(checkAnswer(localBoard))

    if (boardData.status === 'broken' || 'unsolved') {
      setWin({
        ...win,
        attempt: win.attempt + 1
      })
    }
    if (boardData.status === 'solved') {
      navigation.navigate('Finish', {
        status: 'win',
        name: route.params.name,
        difficulty: route.params.difficulty
      })
    }

    if (win.attempt >= 7) {
      navigation.navigate('Finish', {
        status: 'lose',
        name: route.params.name,
        difficulty: route.params.difficulty
      })
    }
  }

  const autoCompleteHandler = () => {
    dispatch(solveBoard(boardData.undisturbedBoard))
  }

  useEffect(() => {
    setLocalBoard(boardData.solution)
  }, [boardData.solution])

  console.log(loading)
  if (loading) {
    return (
      <LottieView
        ref={animation}        
        source={require('../../../assets/loading.json')}
      />
    )
  }

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight + 30 }}>
      <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Text style={{ color: 'gray', fontSize: 18 }}>
          {route.params.difficulty}
        </Text >
        <Text style={{ color: 'gray', fontSize: 18 }} t>
          Mistake  {win.attempt - 1}/7
      </Text>
      </View>
      <View style={style.gameContainer}>
        {localBoard.map((row, iRow) => (
          <View key={iRow}>
            {row.map((col, iCol) => (
              boardData.board[iRow][iCol] === 0 ?
                <TouchableOpacity
                  key={iCol}
                  onPress={() => changeStatus(iCol, iRow)}
                >
                  <Text
                    style={[style.colContainer, iRow === status.row && iCol === status.col && { backgroundColor: 'red' }]}
                  >
                    {col === 0 ? '' : col}
                  </Text>
                </TouchableOpacity>
                :
                <Text
                  key={iCol}
                  style={[style.colContainer, { backgroundColor: '#e3dfde' }]}
                >
                  {col === 0 ? '' : col}
                </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'column', marginTop: 20 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 }}>
          <Button
            title="Check My Answer"
            onPress={() => checkHandler()}
          />
          <Button
            title="Autocomplete"
            onPress={() => autoCompleteHandler()}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
            <View
              key={el}
            >
              {status.col === '' || status.row === '' ?
                <TouchableOpacity
                  style={{ width: (windowWidth - 10) / 7, height: (windowWidth - 10) / 7, borderWidth: 0.4, margin: 7, borderRadius: 30, borderColor: 'gray' }}
                >
                  <Text
                    style={{ textAlign: 'center', fontSize: 25, padding: 5 }}
                  >
                    {el}
                  </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={{ width: (windowWidth - 10) / 7, height: (windowWidth - 10) / 7, borderWidth: 0.4, margin: 7, borderRadius: 30, borderColor: 'gray' }}
                  onPress={() => changeValue(el)}
                >
                  <Text
                    style={{ textAlign: 'center', fontSize: 25, padding: 5 }}
                  >
                    {el}
                  </Text>
                </TouchableOpacity>
              }
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  gameContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colContainer: {
    borderWidth: 1,
    padding: 5,
    color: 'black',
    width: (windowWidth - 40) / 9,
    height: (windowWidth - 40) / 9,
    textAlign: 'center',
    fontSize: 19
  }
})
