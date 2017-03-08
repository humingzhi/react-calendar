/**
 * Author: humingzhi
 * Date: 20/02/2017
 * Email: 1330745625@qq.com
 */
function _isDate(date) {
    if(!date) return false
    return Object.prototype.toString.call(date) === '[object Date]'
}

export function sameDay(date1, date2) {
    if(!date1 || !date2 || !_isDate(date1) || !_isDate(date2)) return false
    return date1.toLocaleDateString() === date2.toLocaleDateString()
}

/**
 * Get days of certain month and year
 * @param year
 * @param month base 0
 * @returns {number}
 */
export function getYMDays(year, month) {
    return new Date(year, month+1, 0).getDate()
}

/**
 * Get week of date
 * @param year
 * @param month base 0
 * @param date
 * @returns {number}
 */
export function getWeekOfDate(year, month, date) {
    return new Date(year, month, date).getDay()
}

export function isToday(date) {
    let today = new Date()
    return sameDay(date, today)
}

export function formatDate(viewMode, date, format) {
    if(!date) return ''
    switch (viewMode) {
        case 'years':
            return format.replace(/YYYY/g, date.getFullYear())
        case 'months':
            return format
                .replace(/YYYY/g, date.getFullYear())
                .replace(/MM/g, date.getMonth()+1)
        case 'time':
            return format
                .replace(/YYYY/g, date.getFullYear())
                .replace(/MM/g, date.getMonth()+1)
                .replace(/DD/g, date.getDate())
                .replace(/hh/g, date.getHours())
                .replace(/mm/g, date.getMinutes())
                .replace(/ss/g, date.getSeconds())
        case 'days':
        default:
            return format
                .replace(/YYYY/g, date.getFullYear())
                .replace(/MM/g, date.getMonth()+1)
                .replace(/DD/g, date.getDate())
    }
}

/**
 * Compare dates date1>date2:positive date1=date2:0 date1<date2:negative
 * @param date1
 * @param date2
 */
export function compareDates(date1, date2) {
    if(!_isDate(date1) || !_isDate(date2)) throw new Error('two Date type dates required')
    return date1.getTime() - date2.getTime()
}