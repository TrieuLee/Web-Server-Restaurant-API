const { Sequelize } = require("sequelize");
const { DATABASE } = require("../config/index");

const CustomerModel = require("./customer");
const FavListFoodModel = require("./favListFood");
const FavListRestaurantModel = require("./favListRestaurant");
const FoodModel = require("./food");
const ListOrderFoodModel = require("./listOrderFood");
const PaymentModel = require("./payment");
const RestaurantModel = require("./restaurant");
const TypeofFoodModel = require("./typeOfFood");
const FounderModel = require("./founder");
const TableModel = require("./table");

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = DATABASE;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mssql",
});

const Customer = CustomerModel(sequelize);
const Restaurant = RestaurantModel(sequelize);
const FavListFood = FavListFoodModel(sequelize);
const FavListRestaurant = FavListRestaurantModel(sequelize);
const Food = FoodModel(sequelize);
const ListOrderFood = ListOrderFoodModel(sequelize);
const Payment = PaymentModel(sequelize);
const TypeofFood = TypeofFoodModel(sequelize);
const Founder = FounderModel(sequelize);
const Table = TableModel(sequelize);

Customer.hasMany(FavListRestaurant, {
  foreignKey: "Cus_id",
});
FavListRestaurant.belongsTo(Customer, {
  foreignKey: "Cus_id",
});

Restaurant.hasMany(FavListRestaurant, {
  foreignKey: "Res_id",
});
FavListRestaurant.belongsTo(Restaurant, {
  foreignKey: "Res_id",
});
Restaurant.hasMany(Table, {
  foreignKey: "Res_id",
});
Table.belongsTo(Restaurant, {
  foreignKey: "Res_id",
});

Founder.hasMany(Restaurant, {
  foreignKey: "Fdr_id",
});

Restaurant.belongsTo(Founder, {
  foreignKey: "Fdr_id",
});

Restaurant.hasMany(TypeofFood, {
  foreignKey: "Res_id",
});
TypeofFood.belongsTo(Restaurant, {
  foreignKey: "Res_id",
});

TypeofFood.hasMany(Food, {
  foreignKey: "ToF_id",
});
Food.belongsTo(TypeofFood, {
  foreignKey: "ToF_id",
});

Customer.hasMany(FavListFood, {
  foreignKey: "Cus_id",
});
FavListFood.belongsTo(Customer, {
  foreignKey: "Cus_id",
});

Food.hasMany(FavListFood, {
  foreignKey: "Fd_id",
});
FavListFood.belongsTo(Food, {
  foreignKey: "Fd_id",
});

ListOrderFood.hasMany(Payment, {
  foreignKey: "Ord_id",
});
Payment.belongsTo(ListOrderFood, {
  foreignKey: "Ord_id",
});

Table.hasMany(Payment, {
  foreignKey: "Tbl_id",
});
Payment.belongsTo(Table, {
  foreignKey: "Tbl_id",
});

Food.hasMany(ListOrderFood, {
  foreignKey: "Fd_id",
});
ListOrderFood.belongsTo(Food, {
  foreignKey: "Fd_id",
});

Customer.hasMany(ListOrderFood, {
  foreignKey: "Cus_id",
});
ListOrderFood.belongsTo(Customer, {
  foreignKey: "Cus_id",
});

module.exports = {
  sequelize,
  Customer,
  Restaurant,
  Founder,
  FavListRestaurant,
  FavListFood,
  Food,
  Payment,
  ListOrderFood,
  TypeofFood,
  Table,
};
