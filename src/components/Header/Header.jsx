import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

import useStyles from './style'

const Header = () => {
    const classes = useStyles()

    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Consultor de Viagens
                </Typography>
                <Box style={{ display: 'flex' }}>
                    <Typography variant="h6" className={classes.title}>
                        Encontre novos lugares
                    </Typography>
                    {/* <Autocomplete> */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            classes={{ root: classes.inputRoot, input: classes.inputInput }}
                        />
                    </div>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
