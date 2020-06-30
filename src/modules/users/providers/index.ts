import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHasProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
