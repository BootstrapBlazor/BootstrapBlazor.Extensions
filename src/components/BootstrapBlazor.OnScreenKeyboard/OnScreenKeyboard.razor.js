import { addScript } from '../BootstrapBlazor/modules/utility.js'

export async function init(className, option) {
    await addScript('./_content/BootstrapBlazor.OnScreenKeyboard/lib/kioskboard/kioskboard-aio-2.3.0.min.js');

    KioskBoard.run(`.${className}`, option);
}
