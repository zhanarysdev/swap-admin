// Pricing configuration based on the new requirements
export const PRICING_CONFIG = {
    bronze: {
        reels: { base: 12000, commission: 4200, total: 16200 },
        post: { base: 8400, commission: 2940, total: 11340 },
        story: { base: 6000, commission: 2100, total: 8100 }
    },
    silver: {
        reels: { base: 20000, commission: 7000, total: 27000 },
        post: { base: 14000, commission: 4900, total: 18900 },
        story: { base: 10000, commission: 3500, total: 13500 }
    },
    gold: {
        reels: { base: 36000, commission: 12600, total: 48600 },
        post: { base: 25200, commission: 8820, total: 34020 },
        story: { base: 18000, commission: 6300, total: 24300 }
    },
    platinum: {
        reels: { base: 60000, commission: 21000, total: 81000 },
        post: { base: 42000, commission: 14700, total: 56700 },
        story: { base: 30000, commission: 10500, total: 40500 }
    }
};

export const getLabel = (name: string) => {
    if (name === "bronze") return "Бронза"
    if (name === "silver") return "Серебро"
    if (name === "gold") return "Золото"
    if (name === "platinum") return "Платина"
    return name
}

export const getContentTypeLabel = (type: string) => {
    if (type === "reels") return "Reels"
    if (type === "post") return "Post"
    if (type === "story") return "Stories"
    return type
}

// Calculate total budget for all ranks and content type
export const calculateTotalBudget = (publicationType: string, influencerAmount: number, ranks: any[]) => {
    if (!publicationType || influencerAmount <= 0 || !ranks.length) return 0;

    let total = 0;
    ranks.forEach(rank => {
        const pricing = PRICING_CONFIG[rank.name]?.[publicationType];
        if (pricing) {
            total += pricing.total;
        }
    });

    return total * influencerAmount;
}

// Generate reward_by_rank array for form
export const generateRewardsByRank = (publicationType: string, ranks: any[]) => {
    if (!publicationType || !ranks.length) return [];

    return ranks.map(rank => {
        const pricing = PRICING_CONFIG[rank.name]?.[publicationType];
        return {
            rank_id: rank.id,
            reward: pricing ? pricing.total.toString() : "0"
        };
    });
} 