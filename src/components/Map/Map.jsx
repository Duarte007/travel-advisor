import GoogleMapReact from 'google-map-react'
import { Paper, useMediaQuery, Typography } from '@material-ui/core'

import useStyles from './style'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

let count = 0

const Map = ({ setCoordinates, setBounds, setChildClicked, coordinates, places }) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px)')

    console.log('map coordinates', coordinates)

    console.log('map', ++count)

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, i) => (
                    <div
                        key={i}
                        className={classes.markerContainer}
                        lat={Number(place.latitude || 0)}
                        lng={Number(place.longitude || 0)}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (
                            <Paper elevations={3} className={classes.paper}>
                                <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img
                                    className={classes.pointer}
                                    src={
                                        place.photo
                                            ? place.photo.images.large.url
                                            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                    }
                                    alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                        )}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map
