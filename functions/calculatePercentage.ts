export default (arr: number[], input: number): number => {
    if(input >= arr[-1]) return 100

    let lower_bound = 0
    let upper_bound = 25
    if(input >= arr[0]){
        for(let i = 1; i < arr.length; i++){
            if(arr[i] <= input && input < arr[i+1]){
                lower_bound = arr[i]
                upper_bound = arr[i+1]
            }
        }
    }

    return 100 * ((input % lower_bound) / upper_bound)
}