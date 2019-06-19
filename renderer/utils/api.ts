import initApollo from '@app/renderer/lib/initApollo';
import { parseCookies } from '@app/renderer/utils';

export default initApollo({}, { getToken: () => parseCookies().token });
