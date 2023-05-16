import moment from "moment"
export const enumerateDays = (from_days: number) => {
    const dates = [];

    const currDate = moment().startOf('day');
    const lastDate = moment().subtract(from_days, "days");
    while(lastDate.isSameOrBefore(currDate)) {
        dates.push(currDate.clone().toDate());
        lastDate.add(1, "days")
    }
    return dates;
};