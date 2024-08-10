import moment from 'moment';

// Function to get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    return { startDate, endDate };
};

// Function to get the start and end dates of this week
export const getThisWeekDate = () => {
    const startDate = moment().startOf('week').format('YYYY-MM-DD');
    const endDate = moment().endOf('week').format('YYYY-MM-DD');
    return { startDate, endDate };
};

// Function to get the start and end dates of this month
export const getThisMonthDate = () => {
    const startDate = moment().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().endOf('month').format('YYYY-MM-DD');
    return { startDate, endDate };
};

export const getThisYearDate = () => {
    const startDate = moment().startOf('year').format('YYYY-MM-DD');
    const endDate = moment().endOf('year').format('YYYY-MM-DD');
    return { startDate, endDate };
};