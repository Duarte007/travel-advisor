import { useState, useEffect } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from './api'

import Header from './components/Header/Header.jsx'
import List from './components/List/List.jsx'
import Map from './components/Map/Map.jsx'

const App = () => {
    const [places, setPlaces] = useState([])
    const [childClicked, setChildClicked] = useState([])

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getPlacesData(bounds.sw, bounds.ne).then((data) => {
            setPlaces(data)
            setIsLoading(false)
        })
    }, [bounds, coordinates])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} childClicked={childClicked} isLoading={isLoading} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        setChildClicked={setChildClicked}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App
