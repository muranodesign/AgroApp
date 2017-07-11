var MODEL_NAME = 'PessoaJuridica';

function pessoaJuridicaModel(sequelize, DataType) {
  var constructor = {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    razao_social: { type: DataType.STRING(200), allowNull: false, validate: { notEmpty: true }  },
    responsavel:  { type: DataType.STRING(100), allowNull: false, validate: { notEmpty: true } },
    endereco: { type: DataType.STRING(200), allowNull: false, validate: { notEmpty: true } },
    cnpj:     { type: DataType.STRING(16), primaryKey: true, validate: { notEmpty: true } },
    bairro:   { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } },
    cidade:   { type: DataType.STRING(45), allowNull: false, validate: { notEmpty: true } },
    estado:   { type: DataType.STRING(2), allowNull: false, validate: { notEmpty: true } },
    cep:      { type: DataType.STRING(12), allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { tableName: 'pessoa_juridica' };
  var PessoaJuridica = sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = function (app) {
  return { name: MODEL_NAME, constructor: pessoaJuridicaModel };
};
