import { TMApi } from "../api/calls"

//const url = '/api/events'

class EventService {
    getAllEvents() {
        return TMApi.get(`api/manager/events`)
    }

    getEvent(id) {
        return TMApi.get(`api/manager/events/${id}`)
    }

    updateEvent(data) {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("organizer", data.organizer)
        formData.append("manager", data.manager)
        formData.append("coordinators", JSON.stringify(data.coordinators))
        formData.append("start_date", data.start_date)
        formData.append("end_date", data.end_date)
        formData.append("type", data.type)
        formData.append("sub_type", data.sub_type)
        formData.append("featured", data.featured)
        formData.append("free_seating", data.free_seating)
        formData.append("venue", data.venue)
        formData.append("invoice", JSON.stringify(data.invoice))
        formData.append("banner_img", data.banner_img)
        formData.append("thumbnail_img", data.thumbnail_img)
        formData.append("message", data.sold_out_msg)
        
        return TMApi.post(`/api/manager/events/${data.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }

    sendInvitations(data) {
        return TMApi.post(`api/manager/sendInvitations`, data)
    }
    
    getInvitations(event_id) {
        return TMApi.get(`api/manager/getInvitations/${event_id}`)
    }
}

export default new EventService()