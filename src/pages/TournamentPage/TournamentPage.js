import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'

import { Navbar } from 'react-bootstrap'


//STORE
import { SET_MAIN_BOARD } from '../../state/reducer' 


import {
  useHistory,
} from "react-router-dom";
import './TournamentPage.scss'
import { MainBoardComponent } from '../../components/MainBoardComponent/MainBoardComponent';


const TournamentPage = ({tournament, mainBoard, setMainBoard}) => {

  const history = useHistory()
  const [ options, setOptions ] = useState()
  // const [ optionSelected, setOptionSelected ] = useState(0)

    
  useEffect(() => {
    if (!tournament.length > 0) {
      history.push('/')
    } 
  },[])

  useEffect(() => {
    const options = tournament.map((game, i) => ({ value: i, label: `${game.headers.White} | ${game.headers.Black}` }))
    setOptions(options)
  }, [tournament])


  return (
    <React.Fragment>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Torneo de Balears</Navbar.Brand>
      </Navbar>
      <Row className="p-0 m-0">
        <Col xl={{span: 4, offset: 4 }} className="mt-4 select-wrapper">
          {
            options && (
              <Select 
                defaultValue={options[0] || options.filter(o => o.value === mainBoard)[0]}
                onChange={(e) => setMainBoard(e.value)}
                options={options} 
              />
            )
          }
        </Col>
      </Row>    
      <Row style={{display:'flex', justifyContent: 'center', width: '100%'}} className="p-0 m-0">
        <Col xl={{span: 8, offset: 2 }} lg={12} className="board-wrapper">
          <MainBoardComponent board={tournament[mainBoard]} />
        </Col>

      </Row>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    mainBoard: state.mainBoard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMainBoard: (board) => dispatch({ type: SET_MAIN_BOARD, payload: board })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentPage)
