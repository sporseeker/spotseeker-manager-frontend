import { TMApi } from "../api/calls"

const url = '/api/venues'

class VenueService {

    getAllVenues() {
        return TMApi.get(url)
    }

    createVenue(venueObj) {
        const formData = new FormData()

        formData.append("name", venueObj.name)
        formData.append("desc", venueObj.desc)
        formData.append("seat_map", venueObj.seat_map)
        
        return TMApi.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    getVenue(id) {
        return TMApi.get(`${url}/${id}`)
    }

    updateVenue(venueObj, id) {

        const formData = new FormData()

        formData.append("name", venueObj.name)
        formData.append("desc", venueObj.desc)
        formData.append("seat_map", venueObj.seat_map)
        
        return TMApi.post(`/api/updateVenue/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export default new VenueService()