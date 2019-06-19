import initApollo from '@app/lib/initApollo';
import { parseCookies } from '@app/utils';

export default initApollo({}, { getToken: () => parseCookies().token });
