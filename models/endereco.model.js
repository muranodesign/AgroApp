module.exports = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: {
      type: DataType.STRING(9),
      validate: { notEmpty: true }
    },
    logradouro: {
      type: DataType.STRING,
      validate: { notEmpty: true }
    },
    numero: {
      type: DataType.STRING
    },
    complemento: {
      type: DataType.STRING(30),
      allowNull: false
    },
    bairro: {
      type: DataType.STRING(45),
      validate: { notEmpty: true }
    },
    cidade: {
      type: DataType.STRING(45),
      allowNull: false,
      validate: { notEmpty: true }
    },
    estado: {
      type: DataType.STRING(2),
      allowNull: false,
      validate: { notEmpty: true }
    },
    latitude: {
      type: DataType.DOUBLE
    },
    longitude: {
      type: DataType.DOUBLE
    }
  };
  const configs = { tableName: 'endereco' };
  const Model = sequelize.define('Endereco', constructor, configs);

  return Model
}
