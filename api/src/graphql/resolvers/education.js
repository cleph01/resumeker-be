const db = require("../../database/config/dbConfig");

const education = db("education");
const DRAFTS = "drafts";
module.exports = {
    Query: {
        getEducationHistory: async (
            _,
            { educationID },
            { decoded, throwAuthError }
        ) => {
            const edResult = await education.where({ id: educationID });
            const { userID } = await db(DRAFTS).where({ id: edResult.draftID });
            if (userID !== decoded.sub) {
                throwAuthError();
            }
            return edResult;
        },
        getEducationByDraft: async (
            __,
            { draftID },
            { decoded, throwAuthError }
        ) => {
            const result = await education
                .select("education.*", "drafts.userID")
                .join(DRAFTS, "education.draftID", "=", `${DRAFTS}.id`)
                .where({ draftID });

            // if array isn't empty, and the id doesn't match
            if (result.length > 0 && result[0].userID !== decoded.sub) {
                throwAuthError();
            }
            return education;
        },
    },
    Mutation: {
        addEducationHistory: async (
            _,
            { input },
            { decoded, throwAuthError }
        ) => {
            const { draftID } = input;
            const draft = await db(DRAFTS).where({ id: draftID });

            if (!draft.userID === decoded.sub) {
                throwAuthError();
            }

            const [result] = await education.insert(input, ["*"]);
            return result;
        },
        updateEducationHistory: () => {},
        deleteEducation: async (
            _,
            { educationID },
            { decoded, throwAuthError }
        ) => {
            const [result] = await education
                .select("drafts.userID")
                .join(DRAFTS, "education.draftID", "=", `${DRAFTS}.id`)
                .where("education.id", educationID);

            if (result.userID !== decoded.sub) {
                throwAuthError();
            }

            return education.where({ id: educationID }).del();
        },
    },
};
