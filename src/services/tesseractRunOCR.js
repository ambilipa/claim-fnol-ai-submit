import Tesseract from "tesseract.js";

export async function runOCR(filePath) {
    try {
        const result = await Tesseract.recognize(
            filePath,
            "eng",
            {
                tessedit_pageseg_mode: Tesseract.PSM.SINGLE_PAGE,
                preserve_interword_spaces: 1,
                logger: m => console.log(m.status)
            }
        );

        return result.data.text;
    } catch (error) {
        console.error("OCR error:", error);
        throw error;
    }
}