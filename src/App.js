import './App.css';
import teams from './data/teams_new.json';
import runnerinfo from './data/runnerinfo_new.json';
import MainStream from './MainStream';
import Stream from './Stream';
import TeamControl from './TeamControl';
import Teams from './Team';
import { BrowserRouter, Routes, Route, Link} from 'react-router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainTeamCard from './MainTeamCard';

function App(props) {

    return (
        <Routes>
            <Route index element={<MainStream />} />
        </Routes>
    )
}

export default App;
