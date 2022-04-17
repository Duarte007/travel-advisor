import axios from 'axios'
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

let i = 0
export const getPlacesData = async(sw, ne) => {
    try {
        console.log('API', ++i)
        const options = {
            params: {
                bl_latitude: sw ? sw.lat : 0,
                tr_latitude: ne ? ne.lat : 0,
                bl_longitude: sw ? sw.lng : 0,
                tr_longitude: ne ? ne.lng : 0,
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
            },
        }
        const response = await axios.get(URL, options)

        return response.data.data
    } catch (error) {
        console.log(error)
    }
}