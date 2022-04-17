import GoogleMapReact from 'google-map-react'
// import { useMediaQuery } from '@material-ui/core'

import useStyles from './style'

let count = 0

const Map = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles()
    // const isMobile = useMediaQuery('(min-width:600px)')

    console.log('map coordinates', coordinates)

    console.log('map', ++count)

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={() => {}}
            ></GoogleMapReact>
        </div>
    )
}

export default Map
