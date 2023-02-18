class OrgInfoService {
    constructor(db) {
        this.client = db.sequelize;
        this.orgInfo = db.orginformation;
    }
    async create(orgformkode,orgbeskrivele) {
        return this.orgInfo.create(
            {
                organisasjonsformkode: orgformkode,
                orgbeskrivelse: orgbeskrivele
            }
        )
    }
    async getAll() {
        return this.orgInfo.findAll({
            where: {}
        })
    }
    async deleteAll(){
        return this.orgInfo.destroy({
            where: {}
        })
    }
}
module.exports = OrgInfoService;