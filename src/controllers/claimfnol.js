import accident_report from "../../masterData/accident_report.js";
import claim_form_model from "../../masterData/claim_form_model.js";
import damage_accessment from "../../masterData/damage_accessment.js";
import policy_data from "../../masterData/policy_data.js";
import { EXTRACT_DOCUMENT, VALIDATE_DA_REPORT } from "../../masterData/promts.js";
import { askPerplexity } from "../services/perplexity.service.js";
import mock_extraction from '../../masterData/mock_extraction.js'

export async function claimfnolCreateCaseData(req, res) {
    try {
        const extractedJSONForm = process.env.MOCK_EXTRACTION == 1 ? mock_extraction : (await askPerplexity(claim_form_model, EXTRACT_DOCUMENT, req.file.path));
        
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
            damageAccessment: damage_info[0]?.caseDetails,
            interestInfo: policy_details_data[0],
            claim_type : extractedJSONForm.claimantParty.claimantChassisNo == extractedJSONForm.respondentParty.RespondentChassisNo ? "OD" : "TP"
        }

        const validateDA = await askPerplexity(caseData.damageAccessment, VALIDATE_DA_REPORT);

        res.status(200).send(validateDA);
    } catch (err) {
        res.status(500).send(err);
    }
}