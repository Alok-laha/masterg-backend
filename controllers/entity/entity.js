const { Entity } = require('../../models/entity/entity')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// this router gives us all the entities from database
exports.getEntities = async (req, res, next) => {
    try {
        const { apitype, apiversion } = req.headers;

        let limit = 3
        let offset = 0 + (req.params.page - 1) * limit

        const entity = await Entity.findAll(
            {
                attributes: ['entityID', 'entityName'], where: [
                    { entityName: { [Op.like]: req.body.searchWord + '%' } }, { entityStatus: "Active" }],
                offset: offset, limit: limit
            });

        res.status(200).json({
            status: true,
            message: 'Entities given',
            data: {
                entity
            }
        })
    } catch (error) {
        return next(error);
    }

}