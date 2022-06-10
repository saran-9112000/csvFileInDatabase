const { Model } = require('objection');

class Product extends Model {
  static get tableName() {
    return 'products';
  };

  static get productIdColumn() {
    return 'productId';
  };

  static get productNameColumn() {
    return 'productName';
  };

  static get descriptionColumn() {
    return 'description';
  };

}

module.exports = Product
