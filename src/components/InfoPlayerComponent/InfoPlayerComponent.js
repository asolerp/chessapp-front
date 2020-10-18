import React from 'react'
import { Row, Col } from 'react-bootstrap'

import './InfoPlayerComponent.scss'

export const InfoPlayerComponent = ({board}) => {
  return (
    <Row className="players-info-wrapper m-0 p-0">
      <Col className="players-info-wrapper__white">
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player">{board.headers.White}</h1>
        <p>Elo: {board.headers.WhiteElo}</p>
      </Col>
      <Col style={{ paddingTop: '10px', background: '#343B40', borderRadius: '10px'}}>
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player white">{board.headers.Black}</h1>
        <p className="white">Elo: {board.headers.BlackElo}</p>
      </Col>
    </Row>
  )
}