import Data from '../BootstrapBlazor/modules/data.js'
import EventHandler from "../BootstrapBlazor/modules/event-handler.js"
import EmbedPDF from './embedpdf.js'
import { getTheme, registerBootstrapBlazorModule } from '../BootstrapBlazor/modules/utility.js'

export async function init(id, invoke, options) {
    const el = document.getElementById(id);
    if (el === null) {
        return null;
    }

    const { src, tabBar, theme, lang, assetsUrl, currentPage, scrollStrategy, pageGap } = options;
    const preference = getViewerTheme(theme);
    const currentPageGap = pageGap === 0 ? 20 : pageGap;
    const pdf = {
        element: null,
        viewer: null,
        scrollStrategy,
        resolveReady: null
    };
    pdf.ready = new Promise(resolve => {
        pdf.resolveReady = resolve;
    });

    const element = EmbedPDF.init({
        target: el,
        src,
        locale: lang || 'auto',
        theme: preference,
        layout: layout => layout.tabs(tabBar),
        plugins: {
            stage: {
                layout: scrollStrategy,
                gap: currentPageGap
            },
            i18n: {
                fallbackLocale: 'en'
            }
        },
        engine: {
            assetsUrl
        },
        onReady: viewer => {
            pdf.viewer = viewer;
            viewer.documents.onOpened(({ documentId }) => {
                const stage = viewer.forDocument(documentId).get('stage');
                stage.updateSettings({ layout: pdf.scrollStrategy });
                if (currentPage > 0) {
                    stage.goToPage(currentPage - 1);
                }
            });

            viewer.documents.onActiveChanged(() => {
                viewer.tryGet('stage')?.updateSettings({ layout: pdf.scrollStrategy });
            });
            pdf.resolveReady(viewer);
        }
    });

    pdf.element = element;
    Data.set(id, pdf);

    registerBootstrapBlazorModule('EmbedPDF', id, () => {
        EventHandler.on(document, 'changed.bb.theme', updateTheme);
    });
    await pdf.ready;
}

export async function setUrl(id, url, keepCurrentDoc) {
    const pdf = Data.get(id);
    if (!pdf) {
        return;
    }

    const viewer = await pdf.ready;
    if (!viewer || Data.get(id) !== pdf) {
        return;
    }

    if (!keepCurrentDoc) {
        const activeDocumentId = viewer.documents.getActiveId();
        if (activeDocumentId) {
            await viewer.documents.close(activeDocumentId);
        }
    }

    if (!url || Data.get(id) !== pdf) {
        return;
    }

    await viewer.documents.open(
        { kind: 'url', url },
        { name: getFileName(url) }
    );
}

export function setTheme(id, theme) {
    const pdf = Data.get(id);
    if (pdf?.element) {
        pdf.element.theme = getViewerTheme(theme);
    }
}

export function setLocale(id, locale) {
    const pdf = Data.get(id);
    if (pdf?.element) {
        pdf.element.locale = locale;
    }
}

export function setScrollStrategy(id, strategy) {
    const pdf = Data.get(id);
    if (pdf) {
        pdf.scrollStrategy = strategy;
        const stage = pdf.viewer?.tryGet('stage');
        if (stage) {
            stage.updateSettings({ layout: strategy });
        }
    }
}

export function dispose(id) {
    const pdf = Data.get(id);
    Data.remove(id);
    pdf?.resolveReady(null);

    if (pdf?.element) {
        pdf.element.remove();
    }

    const { EmbedPDF } = window.BootstrapBlazor;
    if (EmbedPDF) {
        EmbedPDF.dispose(id, () => {
            EventHandler.off(document, 'changed.bb.theme', updateTheme);
        });
    }
}

const updateTheme = e => {
    const theme = e.theme;

    [...document.querySelectorAll('.bb-embed-pdf')].forEach(s => {
        const id = s.getAttribute('id');
        if (id) {
            const pdf = Data.get(id);
            if (pdf?.element) {
                pdf.element.theme = getViewerTheme(theme);
            }
        }
    });
}

function getFileName(filePath) {
    const lastSeparatorIndex = Math.max(
        filePath.lastIndexOf('/'),
        filePath.lastIndexOf('\\')
    );
    return filePath.substring(lastSeparatorIndex + 1);
}

function getViewerTheme(theme) {
    const preference = theme === 'system' ? getTheme() : theme;
    return preference === 'auto' ? 'system' : preference;
}
