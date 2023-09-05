const z = require('zod');

module.exports = {
  citiesByTag: z.object({
    query: z.object({
      tag: z.string().min(1).max(100),
      isActive: z.literal('true', 'false').optional()
    })
  }),
  distance: z.object({
    query: z.object({
      from: z.string().uuid(),
      to: z.string().uuid()
    })
  }),
  area: z.object({
    query: z.object({
      from: z.string().uuid(),
      distance: z.string().min(1).max(10)
    })
  }),
  areaResult: z.object({
    params: z.object({
      id: z.string().uuid()
    })
  })
};
