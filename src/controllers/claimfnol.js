import accident_report from "../../masterData/accident_report.js";
import damage_accessment from "../../masterData/damage_accessment.js";
import policy_data from "../../masterData/policy_data.js";
// import { aiHubExtractor } from "../services/aihub_document_extractor.js";

export async function claimfnolCreateCaseData(file) {
    try {
        // const extractClaimForm = aiHubExtractor(file);
        // const extractedJSONForm = JSON.parse(extractClaimForm);
        // mockdata
        let extractedJSONForm = {
            "accidentInfo": {
                "caseNumber": "AR1505253522",
                "callDate": "2025-12-12",
                "callTime": "24:30"
            },
            "claimantParty": {
                "claimantSerial": 1,
                "claimantName": "Ambili PA",
                "claimantId": 1453198760,
                "claimantDOB": "1999-11-12",
                "claimantCarMake": "TOYOTA",
                "claimantCarModel": "Camry",
                "claimantCarMfgYear": 2024,
                "claimantPlateNo": "9090 BDS",
                "claimantChassisNo": "XB4LZ21W9EZ701380",
                "claimantLiability": 0,
                "claimantInsuranceCompanyName": "Tanuniya Insurance Company",
                "claimantPolicyNumber": "PWIC-9384-IJAR-389483"
            },
            "respondentParty": {
                "RespondentSerial": 2,
                "RespondentOwnerName": "Mohammed Shas",
                "RespondentOwnerID": 2453198760,
                "RespondentDOB": "2002-05-16",
                "RespondentCarMake": "TOYOTA",
                "RespondentCarModel": "Van",
                "RespondentCarMfgYear": 2024,
                "RespondentPlateNo": "2912 AJS",
                "RespondentChassisNo": "DJ8932823JHHJWE",
                "RespondentLiability": 100,
                "RespondentInsuranceCompanyName": "Alrajhi Takaful",
                "RespondentPolicyNumber": "PART-2893-IJAR-389348"
            }
        }
        // get the accient report
        let accident_info = accident_report.filter((report) => report.Accident_info.caseNumber == extractedJSONForm.accidentInfo.caseNumber)
        let claim_party = accident_info[0].Parties_Info.filter((party) => {
            return party.claimantSerial == extractedJSONForm.claimantParty.claimantSerial;
        });

        if (claim_party < 1) {
            throw new Error('Claim party is not present')
        }

        let damage_info = damage_accessment.filter((obj) => obj.caseDetails.accidentNo == extractedJSONForm.accidentInfo.caseNumber);
        let policy_details_data = policy_data.filter((obj) =>
            obj.POLICY_NO === extractedJSONForm.respondentParty.RespondentPolicyNumber &&
            obj.CHASIS_NUMBER === extractedJSONForm.respondentParty.RespondentChassisNo)
        if (policy_details_data < 1) {
            throw new Error('No policy for the RespondentParty')
        }

        

        let caseData = {
            referenceNumber : `REF-` + Math.floor(100000 + Math.random() * 900000),
            accidentInfo: accident_info[0].Accident_info,
            claimantParty: claim_party[0],
            damageAccessment: damage_info[0],
            interestInfo: policy_details_data[0],
            claim_type : extractedJSONForm.claimantParty.claimantChassisNo == extractedJSONForm.respondentParty.RespondentChassisNo ? "OD" : "TP"
        }

        return caseData
    } catch (err) {
        return err
    }
}