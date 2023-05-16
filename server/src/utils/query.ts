import moment from "moment";

export const getToday = () => {
    const now = moment();
    const start = now.startOf("day").toDate();
    const end = now.endOf("day").toDate();
    return {
        $gte: start,
        $lt: end
    }
}

export const getCurrentMonth = () => {
    const now = moment();
    const start = now.startOf("month").toDate();
    const end = now.endOf("month").toDate();
    return {
        $gte: start,
        $lt: end
    }
}

export const getLastDays = (days: number) => {
   return {
    $gte: moment().subtract(days, "days").toDate(),
    
   }
}

export const getLastMonth = () => {
    const start = moment().subtract(1, "months").startOf("month").toDate();
    const end = moment().subtract(1, "months").endOf("month").toDate();
    return {
        $gte: start,
        $lt: end
    }
}