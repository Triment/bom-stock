import { makeSchema, objectType, queryType, mutationType, extendType, nonNull, stringArg } from 'nexus'
import { PackageType, Component } from 'nexus-prisma'
import { join } from 'path'
import { Context } from './Context'
const schema = makeSchema({
  types: [objectType({
    name: 'PackageType',
    definition(t) {
        t.field('id', PackageType.id)
        t.field('name', PackageType.name)
    },
  }),
  objectType({
    name: 'Component',
    definition(t) {
        t.field('id', Component.id)
        t.field('name', Component.name)
    },
  }),queryType({
    definition(t) {
        t.list.field('packages', {
            async resolve(_, args, ctx: Context) {
                return await ctx.prisma.packageType.findMany()
            },
            type: 'PackageType'
        })
        t.list.field('components', {
            async resolve(_, args, ctx: Context) {
                return await ctx.prisma.component.findMany()
            },
            type: 'Component'
        })
    },
  }),extendType({
    type: 'Mutation',
    definition(t) {
      t.nonNull.field("createPack", {
        type: 'PackageType',
        args: {
          name: nonNull(stringArg())
        },
        async resolve(_, {name}, ctx: Context){
          return await ctx.prisma.packageType.create({ data: {name} })
        }
      })
    },
  })],
  outputs: {
    schema: import.meta.dir + '/schema.graphql',
    typegen: import.meta.dir + '/generated/nexus.ts',
  },
  contextType: { module: join(import.meta.dir, 'Context.ts'), export: 'Context'}
})

export default schema