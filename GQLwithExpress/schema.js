const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

//hardcode data
// const Customers = [
//   { id: "1", name: "John Doe", email: "john@test.in", age: 18 },
//   { id: "2", name: "Alen Doe", email: "alen@test.in", age: 15 },
//   { id: "3", name: "lucy Doe", email: "lucy@test.in", age: 20 },
//   { id: "4", name: "Arther Doe", email: "arther@test.in", age: 10 }
// ];


//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString},
    name: { type: GraphQLString},
    email: { type: GraphQLString},
    age: { type: GraphQLInt},
  })
});


// Root Query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                
                // for(let i = 0;i < Customers.length;i++){
                //     if(Customers[i].id == args.id){
                //         return Customers[i];
                //     }
                // }
                
                return axios.get('http://localhost:4000/Customers/'+ args.id)
                    .then(res => res.data);
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:4000/Customers')
                    .then(res => res.data);
                // return Customers;
            }
        }
    }
});

//Mutation
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios
          .post("http://localhost:4000/Customers", {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res) => res.data);
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete("http://localhost:4000/Customers/" + args.id)
          .then((res) => res.data);
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return axios
          .patch("http://localhost:4000/Customers/" + args.id, args)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});