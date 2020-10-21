import app from "./index";
import chalk from 'chalk'

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}, ${chalk.green('✓')}`);
});
