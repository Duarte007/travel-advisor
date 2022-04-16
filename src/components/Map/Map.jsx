import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import { LocationOnOutlinedIcon } from '@material-ui/icons/LocationOnOutlined'
import { Rating } from '@material-ui/lab'

import useStyles from './style'

const Map = () => {
    const classes = useStyles()
    const isMobile = useMediaQuery('(min-width:600px)')

    const coordinates = { lat: -19.912998, lng: -43.940933 }
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAn2SsmbaJ3VjT_a_EhsQfMpccYEZa2GAQ' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={() => {}}
                onChildClick={() => {}}
            ></GoogleMapReact>
        </div>
    )
}

export default Map
