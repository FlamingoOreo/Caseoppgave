const moment = require('moment');

class OrgDataService {
    constructor(db) {
        this.client = db.sequelize;
        this.orgData = db.organization;
    }
    async create(organisasjonsnummer,navn,orgformkode,registreringsdato ) {
        const formattedDate = moment(registreringsdato, 'DD/MM/YYYY').format('YYYY-MM-DD');
        return this.orgData.create(
            {
                organisasjonsnummer: organisasjonsnummer,
                navn: navn,
                organisasjonsformkode: orgformkode,
                registreringsdato: formattedDate
            }
        )
    }
    async getAllJoinInfo() {
        const results = await this.client.query(
          'SELECT organizations.Organisasjonsnummer, organizations.Navn, orginformations.orgbeskrivelse, organizations.Registreringsdato FROM organizations JOIN orginformations ON organizations.organisasjonsformkode = orginformations.organisasjonsformkode',
          { type: this.client.QueryTypes.SELECT }
        );
        return results;
      }
    async getSomeJoinInfo(amount) {
        const results = await this.client.query(
          `SELECT organizations.Organisasjonsnummer, organizations.Navn, orginformations.orgbeskrivelse, organizations.Registreringsdato FROM organizations JOIN orginformations ON organizations.organisasjonsformkode = orginformations.organisasjonsformkode LIMIT ${amount}`,
          { type: this.client.QueryTypes.SELECT }
        );
        return results;
      }
     deleteAll(){
        return this.orgData.destroy({
            where: {}
        })
    }
}
module.exports = OrgDataService;