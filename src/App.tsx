import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/core/Pagination';
import Game from './components/Game';
import Search from './components/Search';
import Sort from './components/Sort';

const SORT_BY: {[key: string]: any} = { 
  none: 'none',
  id: 'id'
}

const useStyles = makeStyles<Theme>((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1
    },
  })
);

export default function App() {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [games, setGames] = useState(Array<any>());
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(SORT_BY.none);
  const [specific, setSpecific] = useState(-1);

  const getGames = async() => {
    let url = `https://www.balldontlie.io/api/v1/games?page=${offset}${search}`;
    const res = await axios.get(url);
    setGames(res.data.data);
    setPageCount(res.data.meta.total_pages)
  }

  const getGame = async() => {
    let url = `https://www.balldontlie.io/api/v1/games/${specific}`;
    const res = await axios.get(url);
    setGames(res.data.data);
  }

  const addSearch = (id: number) => {
    if (id > 0) {
      setSearch(`&team_ids[]=${id}`);
    } else {
      setSearch('');
    }
  }

  const sort = Object.keys(SORT_BY).map((name:string) => (
    <Sort 
      key={name}
      name={name}
      setSortBy={setSortBy} 
      />
  ))
  
  useEffect(() => {
    getGames()
  }, [offset, search, sortBy])
  

  const sortedGamesList = () => {
    if (sortBy === SORT_BY.none) {
      return games;
    } else if (sortBy === SORT_BY.id) {
        return games.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);
    } 
    return [];
  }

  const gamesList = sortedGamesList().map((item: any) => (
    <Grid item xs={3} md={3}>
    <Game
      id={item.id}
      date={item.date}
      home_team_score={item.home_team_score}
      visitor_team_score={item.visitor_team_score}
      season={item.season}
      period={item.period}
      status={item.status}
      time={item.time}
      postseason={item.postseason}
      home_team={item.home_team}
      visitor_team={item.visitor_team}
      key={item.id}
    />
    </Grid>
  ));

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setOffset(page + 1)
};

  return (
    <div className="App">
      <div>
        <div className="search">
        <Search 
          addSearch={addSearch}
        />
        </div>
        <div className="sort">
          Sort by: {sort}
        </div>
        <h1>My Grocery List</h1>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignContent="flex-start"
          >
          {gamesList}

          </Grid>

        <Pagination
          shape='rounded'
          count={pageCount}
          onChange={handlePageChange}
          color='primary'
          />
      </div>
    </div>
  );
}