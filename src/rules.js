export function evaluateSparePartsRisk(indicators) {
    if (!Array.isArray(indicators) || indicators.length === 0) {
        return null;
    }

    const totalRedScore = indicators.reduce(
        (sum, item) => sum + (item.red_score || 0),
        0
    );

    const itemCount = indicators.length;
    const maxPossibleScore = itemCount * 10;

    const riskPercentage = (totalRedScore / maxPossibleScore) * 100;

    let riskLevel;
    if (riskPercentage > 60) riskLevel = "HIGH";
    else if (riskPercentage >= 30) riskLevel = "MEDIUM";
    else riskLevel = "LOW";

    return {
        itemCount,
        totalRedScore: Number(totalRedScore.toFixed(2)),
        maxPossibleScore,
        riskPercentage: Number(riskPercentage.toFixed(2)),
        riskLevel
    };
}