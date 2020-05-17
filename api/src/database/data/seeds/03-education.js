exports.seed = function eduSeed(knex) {
    return knex("education")
        .del()
        .then(function eduTable() {
            return knex("education").insert([
                {
                    userId: "google-oauth2|106346646323547324114",
                    schoolType: "UNDERGRAD",
                    schoolName: "UCLA",
                    startDate: "1995-02-11",
                    endDate: "2000-02-12",
                    certName: "Cert",
                    courses: "A Course",
                },
                {
                    userId: "1",
                    schoolType: "BOOTCAMP_OR_EQUIVALENT",
                    schoolName: "A&M",
                    startDate: "2000-02-12",
                    endDate: "2004-06-24",
                    certName: "Cert A",
                    courses: "Another Course",
                },
            ]);
        });
};
