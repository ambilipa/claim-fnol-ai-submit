const EXTRACT_DOCUMENT = 'Extract information in this document into the provided model structure and return only valid JSON.';
const VALIDATE_DA_REPORT =  'Validate below spareparts cost against the model and make provide in Indian Rupees. Respond back with only JSON array which have indicators, and red score from 1 to 10 (eg [{"indicator": "SparePart - Rear Bumper Parking Sensor - Price is too high", "red_score": 9.0}])\nhere are some of the sources to refer Toyota Genuine Parts EPC, Toyota Authorized Dealer Spare Parts Price Lists (India & GCC), Boodmo (India), Partsouq, Amayama Trading, RockAuto, ToyotaPartsDeal, Carwale';

export {
    EXTRACT_DOCUMENT,
    VALIDATE_DA_REPORT
}