class OrgInfoService {
    constructor(db) {
        this.client = db.sequelize;
        this.orgInfo = db.orginformation;
    }
    create(orgformkode,orgbeskrivele) {
        return this.orgInfo.create(
            {
                organisasjonsformkode: orgformkode,
                orgbeskrivelse: orgbeskrivele
            }
        )
    }
    getAll() {
        return this.orgInfo.findAll({
            where: {}
        })
    }
    deleteAll(){
        return this.orgInfo.destroy({
            where: {}
        })
    }
}
module.exports = OrgInfoService;