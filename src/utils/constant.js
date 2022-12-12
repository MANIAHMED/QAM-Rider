export const googleApiKey = 'AIzaSyAsY3fBIQUyDkDeMj_U-gv5oKmFrSMN5gI';
export const onesignalAppId = '21713bac-c47b-4041-b530-0efbb8da658c';
export const SW = Dimensions.get('window').width;
export const SH = Dimensions.get('window').height;


export const RECORD_TYPE = {
    BOOKING: 'BOOKING',
    APPOINTMENT: 'APPOINTMENT'
}

export const PAYMENT_TYPE = {
    CASH: {
        name: "Pay by Cash",
        value: "CASH",
    }, // Rider
    CARD: {
        name: "Pay directly to {{1}}",
        value: "CARD",
    }, // Vendor
    CREDIT_CARD: {
        name: "Pay by Credit Card",
        value: "CREDIT_CARD",
    }, // Bank
    ONLINE_TRANSFER: {
        name: "Pay by Online Transfer",
        value: "ONLINE_TRANSFER",
    }, // Bank
    PAID: {
        name: "Pay directly to vendor by card",
        value: "PAID",
    }, // Bank
    UNPAID: {
        name: "Pay by Cash on time",
        value: "UNPAID",
    }, // Bank
}

export const STATUS = {
    BOOKED: 'BOOKED',
    EN_ROUTE: 'EN_ROUTE',
    ARRIVED: 'ARRIVED',
    SAMPLE_COLLECTED: 'SAMPLE_COLLECTED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
    PENDING: 'PENDING'
}