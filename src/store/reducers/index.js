// import auth from './authSlice';
// import common from './commonSlice';
// import bookings from './bookingsSlice';
// import service from './serviceSlice';
// import lab from './labSlice'



// export default {
//     auth,
//     common,
//     bookings,
//     service,
//     lab
// }

import user from './user.reducer.js';
import bookings from './bookings.reducer.js';
import completedBookings from './completed_bookings.reducer.js';
import services from './services.reducer';
import labs from './labs.reducer.js';
import extras from './extra.reducer'

export default {
    user,
    bookings,
    extras,
    completedBookings,
    labs,
    services
};