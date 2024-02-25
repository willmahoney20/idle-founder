// a function for getting the next milestone for the business
export default (arr: number[], value: number): number => {
    if(value >= arr[arr.length - 1]) return Math.ceil(value / 100) * 100

    for(let i = 0; i < arr.length; i++){
        if(value < arr[i]) return arr[i]
    }
}