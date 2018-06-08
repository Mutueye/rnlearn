import { FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE } from './constants'

export function fetchCharactersFromAPI() {
  return function(dispatch) {
    dispatch(getPeople())
    fetch('https://swapi.co/api/people/')
      .then(res => res.json())
      .then(res => dispatch(getPeopleSuccess(res.results)))
      .catch(err => dispatch(getPeopleFailure(err)))
  }
}

function getPeople() {
  return {
    type : FETCHING_PEOPLE
  }
}

function getPeopleSuccess(data) {
  console.log(data)
  return {
    type : FETCHING_PEOPLE_SUCCESS,
    data
  }
}

function getPeopleFailure(err) {
  console.log(err)
  return {
    type : FETCHING_PEOPLE_FAILURE,
    err
  }
}
