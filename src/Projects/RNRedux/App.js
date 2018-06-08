import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import { fetchCharactersFromAPI } from './actions'

const App = (props) => {

  const { people, isFetching } = props.charactersData

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redux App</Text>
      <TouchableOpacity onPress={props.fetchCharactersFromAPI} style={styles.button}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {
        isFetching && <Text style={styles.text}>loading...</Text>
      }
      {
        people.length ? (
          people.map((person, index) => {
            return(
              <View key={index}>
                <Text>Name: {person.name}</Text>
                <Text>Birth Year: {person.birth_year}</Text>
              </View>
            )
          })
        ) : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 28
  },
  button: {
    backgroundColor: '#377df6',
    height: 60,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
})

function mapStateToProps(state) {
  return {
    charactersData : state.charactersData
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
    getPeople: () => dispatch(fetchCharactersFromAPI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)*/
export default connect(mapStateToProps, { fetchCharactersFromAPI })(App)
