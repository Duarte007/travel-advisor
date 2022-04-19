import { useState, useEffect } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'

import Header from './components/Header/Header.jsx'
import List from './components/List/List.jsx'
import Map from './components/Map/Map.jsx'

const App = () => {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [childClicked, setChildClicked] = useState([])

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [timeoutDebounce, setTimeoutDebounce] = useState(null)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const filteredPlacesByRating = places.filter((place) => place.rating >= rating)

        setFilteredPlaces(filteredPlacesByRating)
    }, [rating])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        if (timeoutDebounce) {
            clearTimeout(timeoutDebounce)
        }

        const timeout = setTimeout(() => {
            setIsLoading(true)
            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                setPlaces(data)
                setIsLoading(false)
                setFilteredPlaces([])
                setTimeoutDebounce(null)
            })
        }, 1300)
        setTimeoutDebounce(timeout)
    }, [type, bounds, coordinates])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        setChildClicked={setChildClicked}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App
