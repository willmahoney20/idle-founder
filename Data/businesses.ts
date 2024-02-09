export default [
    {
        id: 0,
        name: 'Hotdog Stand',
        init_payout: 1,
        init_cost: 5/1.1, // we start on level 1, and to upgrade to level 2 costs $4 so level 1 would cost 4/coefficient
        level: 1,
        coefficient: 1.1, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 0.5,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 1,
        name: 'Laundromat',
        init_payout: 50,
        init_cost: 50,
        level: 0,
        coefficient: 1.15, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 3,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 2,
        name: 'Comic Book Store',
        init_payout: 500,
        init_cost: 750,
        level: 0,
        coefficient: 1.14, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 6,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 3,
        name: 'Fast Food Restaurant',
        init_payout: 4000,
        init_cost: 9000,
        level: 0,
        coefficient: 1.13, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 12,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 4,
        name: 'Fitness Center',
        init_payout: 48000,
        init_cost: 100000,
        level: 0,
        coefficient: 1.12, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 30,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 5,
        name: 'Movie Theater',
        init_payout: 700000,
        init_cost: 1200000,
        level: 0,
        coefficient: 1.12, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 90,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 6,
        name: 'Sports Franchise',
        init_payout: 7500000,
        init_cost: 15000000,
        level: 0,
        coefficient: 1.13, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 300,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 7,
        name: 'Airline Company',
        init_payout: 90000000,
        init_cost: 180000000,
        level: 0,
        coefficient: 1.14, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 1500,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 8,
        name: 'Global Streaming Platform',
        init_payout: 1000000000,
        init_cost: 2500000000,
        level: 0,
        coefficient: 1.15, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 6000,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    },
    {
        id: 9,
        name: 'Space Tourism Company',
        init_payout: 25000000000,
        init_cost: 30000000000,
        level: 0,
        coefficient: 1.1, // the cost of each level will multiply by this value
        multiplier: 1,
        init_timer: 36000,
        time_divisor: 1,
        level_milestones: [25, 50, 100, 200, 300, 400]
    }
]