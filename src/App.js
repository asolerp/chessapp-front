import React, { useEffect }from 'react';
import './App.scss';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux'

import socketIOClient from "socket.io-client";
import { boardCompare } from './utils/chess-utils'
import {NotificationContainer} from 'react-notifications';

import {
  Switch,
  Route,
} from "react-router-dom";

// PAGES
import TournamentPage from './pages/TournamentPage/TournamentPage'
import { WaitingPage } from './pages/WaitingPage/WaitingPage'

import {
  useHistory
} from "react-router-dom";


const ENDPOINT = "https://chessapp-server.herokuapp.com/";

function App({ addTournament, setMainBoard }) {

  const history = useHistory()

  useEffect(() => {
    const tournament = localStorage.getItem('tournament')
    if (tournament) {
      addTournament(JSON.parse(tournament))
      history.push('/partidas')
    }
  },[])

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("finish_torneo", () => {
      console.log("finalizando torneo....")
      localStorage.removeItem('tournament')
      history.push('/')
    });
    socket.on("get_data", data => {
      addTournament(data)
      console.log("LLegando torneo.....", data)
      boardCompare(data, setMainBoard)
      localStorage.setItem('tournament', JSON.stringify(data))
      if (window.location.pathname === '/') {
        history.push('/partidas')
      }
    });
  }, []);
  
  return (
    <div className="App">
      <NotificationContainer />
      <Switch>
        <Route exact path="/">
          <WaitingPage />
        </Route>
        <Route path="/partidas">
          <TournamentPage />
        </Route>
      </Switch>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTournament: (data) => dispatch({ type: "ADD_TOURNAMENT", payload: data }),
    setMainBoard: (board) => dispatch({type: "SET_MAIN_BOARD", payload: board})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
