import { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import PlacesDetails from '../PlaceDetails/PlaceDetails.jsx'

import useStyles from './style'

const List = ({ places, childClicked, isLoading }) => {
    const classes = useStyles()

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)
    const [elRefs, setElRefs] = useState([])

    console.log({ childClicked })

    useEffect(() => {
        setElRefs((refs) =>
            Array(places?.length)
                .fill()
                .map((_, i) => refs[i] || createRef())
        )
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurantes, Hotéis e Atrações próximas a você</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Digite</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurantes</MenuItem>
                            <MenuItem value="hotels">Hotéis</MenuItem>
                            <MenuItem value="attractions">Atrações</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Avaliações</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>Todos</MenuItem>
                            <MenuItem value={3}>Acima de 3.0</MenuItem>
                            <MenuItem value={4}>Acima de 4.0</MenuItem>
                            <MenuItem value={4.5}>Acima de 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid item ref={elRefs[i]} key={i} xs={12}>
                                <PlacesDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List
