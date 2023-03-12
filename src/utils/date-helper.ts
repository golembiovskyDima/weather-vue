import moment from "moment"

type UnitType = 'h' | 'min'

const ONE_DAY_CNT = 9;
const FIVE_DAY_CNT = 24 / 3 * 4;


const getCntForForecast = (type: 1 | 4): number => {
    if (type === 1) {
        return ONE_DAY_CNT
    }
    const [endDay, unit] = moment().endOf('day').fromNow(true).split(' ');
    if (unit === 'hours') {
        return FIVE_DAY_CNT + Math.ceil(Number(endDay) / 3);
    }

    return FIVE_DAY_CNT + 1

}

export default {
    getCntForForecast,
}