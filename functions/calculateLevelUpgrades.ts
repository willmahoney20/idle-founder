import milestones from "../data/milestones"

// a function for getting the next milestone for the business
const nextMilestone = (arr: number[], value: number): number => {
    if(value >= arr[arr.length - 1]) return Math.ceil(value / 100) * 100

    for(let i = 0; i < arr.length; i++){
        if(value < arr[i]) return arr[i]
    }
}

// function for getting the max number of possible level upgrades for a business
const maxUpgrade = (money: number, init_cost: number, coefficient: number): number => {
    let n = 1 // number of upgrades
    let sum = 0 // geometric sum of the formula
    
    while(true){
        sum = init_cost * ((1 - Math.pow(coefficient, n)) / (1 - coefficient))
        if(sum > money) break
        n++
    }
    
    return n === 1 ? 1 : n - 1
}  

// function for getting the cost of upgrading the business to the desired level, and what this level is
export default (money: number, buy_qty: string, init_cost: number, level: number, coefficient: number): { upgrade_to: number, next_upgrade: number } => {
    let next_level = init_cost * (coefficient ** level)
    
    // the level we are upgrading to
    let upgrade_to = buy_qty === 'NEXT' ?
    nextMilestone(milestones, level) :
    buy_qty === 'MAX' ?
    level + maxUpgrade(money, next_level, coefficient) :
    level + parseInt(buy_qty) 

    // cost of the upgrade
    let next_upgrade = next_level * (1 - (coefficient ** (upgrade_to - level))) / (1 - coefficient)

    return { upgrade_to, next_upgrade }
}