import { TMApi } from "../api/calls"

const url = '/api/users'

class UserService {

    getAllUserByRole(role) {
        return TMApi.get(url, {
            params: {
                type: role
            }
        })
    }

    createUser(data) {
        return TMApi.post('/api/manager/coordinators', data)
    }

    updateUser(data, id) {
        return TMApi.put(`/api/manager/coordinators/${id}`, data)
    }

    deleteUser(id) {
        return TMApi.delete(`/api/manager/coordinators/${id}`)
    }

    deactivateUser(id) {
        return TMApi.put(`/api/manager/coordinators/deactivate/${id}`)
    }

    activateUser(id) {
        return TMApi.put(`/api/manager/coordinators/activate/${id}`)
    }

    getManagerCoordinators() {
        return TMApi.get(`/api/manager/coordinators`)
    }
}

export default new UserService()