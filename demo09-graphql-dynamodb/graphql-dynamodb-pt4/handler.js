const { ApolloServer, gql } = require('apollo-server-lambda');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const HeroFactory = require('./src/core/factories/heroFactory');
const SkillFactory = require('./src/core/factories/skillFactory');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Hero {
    id: String
    name: String
    skills: [String]
  }

  type Skill {
    id: String
    name: String
    value: Int
  }

  type Query {
      getSkill(
        id: String
        name: String
        value: Int
      ): [Skill]
      getHero(
        id: String
        name: String
      ): [Hero]
  }

  type Mutation {
      createSkill(
        name: String!
        value: Int!
      ): String
      createHero(
        name: String!
        skills: [String]!
      ): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  // GET
  Query: {
      async getSkill(root, args, context, info) {
        console.log({ args })
        
        return context.Skill.findAll(args)
      },
      async getHero(root, args, context, info) {
        console.log({ args })
        
        return context.Hero.findAll(args)
      }
  },
  // POST (atualizações, cadastro, remoção)
  Mutation: {
      async createSkill(root, args, context, info) {
        const { id } = await context.Skill.create(args);
        return id;
      },
      async createHero(root, args, context, info) {
        const { id } = await context.Hero.create(args);
        return id;
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async() => ({
    Hero: await HeroFactory.createInstance(),
    Skill: await SkillFactory.createInstance(),
  }),
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // install the Playground plugin and set the `introspection` option explicitly to `true`.
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

exports.handler = server.createHandler();

async function main() {
  console.log('creating factories..')
  const skillFactory = await SkillFactory.createInstance()
  const heroFactory = await HeroFactory.createInstance()

  console.log('inserting skill item')
  const skillId = `${new Date().getTime()}`
  await skillFactory.create({
    id: skillId,
    name: 'mage',
    value: 50
  })
  console.log('getting skil item')
  const skillItem = await skillFactory.findOne(skillId)
  console.log('skillItem', skillItem)

  const allSkills = await skillFactory.findAll()
  console.log('allSkills', allSkills)

  console.log('\n------------\n')

  console.log(typeof skillId);
  console.log(skillId);
  console.log('inserting hero item')
  const heroId = `${new Date().getTime()}`
  await heroFactory.create({
    id: heroId,
    name: 'Batman',
    skills: [skillId]
  })
  console.log('here')
  const hero = await heroFactory.findOne(heroId)
  console.log('hero', hero)

  const allHeroes = await heroFactory.findAll()
  console.log('allHeroes', allHeroes)

  return {
    statusCode: 200,
    body: JSON.stringify({
      hero: {
        hero,
        allHeroes
      },
      skill: {
        skillItem,
        allSkills
      }
    })
  }

}

module.exports.test = main