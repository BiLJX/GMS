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


export const getLastDays = (days: number) => {
   return {
    $gte: moment().subtract(days, "days").toDate(),
    
   }
}