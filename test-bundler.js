const context = require.context('./static', true, /\.test\.js$/)
context.keys().forEach(context)
