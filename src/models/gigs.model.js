// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const gigs = sequelizeClient.define('gigs', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    
    basic_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    basic_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    basic_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    basic_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    standard_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    standard_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    standard_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    standard_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    premium_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    premium_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    premium_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    premium_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  gigs.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    const { users, categories, tags, media } = models;

    gigs.belongsTo(users);
    gigs.belongsTo(categories);
    gigs.belongsToMany(tags, {
      through: 'gigs_tags',
      as: 'tags',
      foreignKey: 'gigs_id'
    });
    gigs.belongsToMany(media, {
      through: 'gigs_media',
      as: 'media',
      foreignKey: 'gigs_id'
    });
  };

  return gigs;
};
