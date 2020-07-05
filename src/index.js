import './assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-table/react-table.css'
import 'rc-switch/assets/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { getColor } from './utils/theme.utils'


const render = (color) => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require('./AppRenderer')
  })
}

// created getColor so we can return the color and pass it to the render function
getColor().then((result) => render(result))
