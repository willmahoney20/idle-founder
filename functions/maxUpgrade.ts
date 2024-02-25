// function for getting the max number of possible level upgrades for a business
export default (money: number, init_cost: number, coefficient: number): number => {
    let n = 1 // number of upgrades
    let sum = 0 // geometric sum of the formula
    
    while(true){
        sum = init_cost * ((1 - Math.pow(coefficient, n)) / (1 - coefficient))
        if(sum > money) break
        n++
    }
    
    return n === 1 ? 1 : n - 1
}  