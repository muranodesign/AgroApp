const GenericDAO = require('./generic.dao');

class UsuarioProdutoDAO extends GenericDAO {
  constructor(models) {
    super(models.UsuarioProduto);
    this.models = models;
  }
}

module.exports = UsuarioProdutoDAO;
