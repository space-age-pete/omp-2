export default {
  dayConvert: arg => {
    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    if (typeof arg === Number) return week[arg];
    else if (typeof arg === String) return week.indexOf(arg);
  },
  timeConvert: arg => {
    let firstBit = +arg.substring(0, 2);
    let secondBit = arg.substring(2);
    if (firstBit > 12) return `${firstBit - 12}${secondBit} PM`;
    else if (firstBit === 0) return `12${secondBit} AM`;
    else if (firstBit === 12) return `${arg} PM`;
    else return `${arg} AM`;
  },
  timeUnConvert: arg => {
    let c = arg.indexOf(":");
    let firstBit = +arg.substring(0, c);
    let secondBit = arg.substring(c, c + 3);
    let thirdBit = arg.substring(c + 4);
    //console.log(firstBit, secondBit, thirdBit);
    //if (firstBit === 12 && thirdBit === "PM") return `${firstBit + 12}${secondBit}`;
    if (thirdBit === "PM" && firstBit < 12)
      return `${firstBit + 12}${secondBit}`;
    else if (thirdBit === "AM" && firstBit === 12) return `00${secondBit}`;
    else if (firstBit < 10) return `0${firstBit}${secondBit}`;
    else return `${firstBit}${secondBit}`;
  }
};
