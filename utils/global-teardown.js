// import { execSync } from 'child_process';

// export default async function globalTeardown() {
//   console.log('Tests khatam ho gaye, Allure report generate ho rahi hai...');
//   try {
  
//     execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
//     console.log('Allure report kamiyabi se generate ho gayi hai!');
//   } catch (error) {
//     console.error(' Allure report generate karne mein error aaya:', error);
//   }
// }

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function globalTeardown() {
  console.log('Test completed successfully ...');
  try {
    
    await execAsync('npx allure generate allure-results --clean -o allure-report & npx allure open allure-report ', { stdio: 'inherit' });
    console.log('Allure report successfully generated!');
    
    
  } catch (error) {
     console.error('Error generating Allure report :', error);
  }
}