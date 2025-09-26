import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AlertSwal = withReactContent(Swal)

export const Alert = (title, icon, toast = false, position = 'center', showConfirmButton = true, timer = false) => {
    return AlertSwal.fire({
        title,
        icon,
        toast,
        position,
        customClass: toast ? '' : {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
        showConfirmButton,
        timer
    })
}