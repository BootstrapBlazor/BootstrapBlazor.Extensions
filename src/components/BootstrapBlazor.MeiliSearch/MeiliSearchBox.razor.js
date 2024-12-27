import { addScript, addLink, debounce, isMobile } from "../BootstrapBlazor/modules/utility.js"
import Data from "../BootstrapBlazor/modules/data.js"
import EventHandler from "../BootstrapBlazor/modules/event-handler.js"
import Input from "../BootstrapBlazor/modules/input.js"

if (window.BootstrapBlazor === void 0) {
    window.BootstrapBlazor = {};
}

export async function init(id, options) {
    const el = document.getElementById(id);
    await addLink('_content/BootstrapBlazor.MeiliSearch/meilisearch.css');
    await addScript('_content/BootstrapBlazor.MeiliSearch/meilisearch.umd.min.js');

    const search = {
        el, options,
        status: el.querySelector('.search-dialog-status'),
        input: el.querySelector('.search-dialog-input > input'),
        clearButton: el.querySelector('.search-dialog-clear'),
        menu: el.querySelector('.search-dialog-menu'),
        list: el.querySelector('.search-dialog-list'),
        template: el.querySelector('.search-dialog-item-template'),
        blockTemplate: el.querySelector('.search-dialog-block-template'),
        emptyTemplate: el.querySelector('.search-dialog-empty-template'),
        dialog: el.querySelector('.search-dialog'),
        mask: el.querySelector('.search-dialog-mask')
    };
    Data.set(id, search);

    handlerSearch(search);
    handlerClearButton(search);
    handlerToggle(search);
    handlerMask(search);

    resetSearch(search);

    new bootstrap.ScrollSpy(search.list, {
        target: '.search-dialog-menu'
    })
}

export function dispose(id) {
    const search = Data.get(id);
    Data.remove(id);

    if (search) {
        const { el, menu, dialog, clearButton, input, mask } = search;
        EventHandler.off(clearButton, 'click');
        EventHandler.off(dialog, 'click');
        EventHandler.off(input, 'keyup');
        EventHandler.off(menu, 'click');
        EventHandler.off(el, 'click');
        EventHandler.off(mask, 'click');
        Input.dispose(input);
    }
}

const handlerMask = search => {
    const { mask } = search;
    document.body.appendChild(mask);
    EventHandler.on(mask, 'click', e => {
        closeDialog();
    });
}

const handlerToggle = search => {
    const { el, dialog, input } = search;
    EventHandler.on(dialog, 'click', e => {
        e.stopPropagation();
    });
    EventHandler.on(el, 'click', e => {
        document.documentElement.classList.toggle('bb-g-search-open');
        input.focus();
        if (!isMobile()) {
            input.select();
        }
    });
}

const handlerClearButton = search => {
    const { clearButton } = search;
    EventHandler.on(clearButton, 'click', () => {
        resetSearch(search);
    });
}

const handlerSearch = search => {
    const { input, options, menu } = search;
    const filter = {
        attributesToSearchOn: options.searchableColumns
    };
    EventHandler.on(input, 'keyup', async e => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            const activeItem = search.list.querySelector('.active');
            if (activeItem) {
                const link = activeItem.querySelector('a');
                if (link) {
                    link.click();
                }
            }
            else {
                await doSearch(search, input.value, filter);
                if (!isMobile()) {
                    input.select();
                }
            }
        }
        else if (e.key === 'Escape') {
            resetSearch(search);
        }
        else if (e.key === 'ArrowUp') {
            doToggleActive(search, true);
        }
        else if (e.key === 'ArrowDown') {
            doToggleActive(search, false);
        }
    });
    const fn = debounce(v => doSearch(search, v, filter));
    Input.composition(input, fn);

    EventHandler.on(menu, 'click', '.search-dialog-menu-item', e => {
        e.preventDefault();

        const link = e.delegateTarget;
        const target = link.getAttribute('href');
        if (target) {
            const targetEl = document.querySelector(target);

            if (targetEl) {
                targetEl.scrollIntoView(getScrollIntoViewOptions(options));
            }
        }
    });
}

const getScrollIntoViewOptions = options => options.scrollIntoViewOptions ?? {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
}

const doToggleActive = (search, up) => {
    const { list, options } = search;
    const items = [...list.querySelectorAll('.search-dialog-item')].flatMap(i => [...i.querySelectorAll('li')]);
    if (items.length > 0) {
        const activeItem = list.querySelector('.active');
        if (activeItem) {
            activeItem.classList.remove('active');
            let index = items.indexOf(activeItem);
            index = up ? index - 1 : index + 1;
            if (index < 0) {
                index = items.length - 1;
            }
            else if (index >= items.length) {
                index = 0;
            }
            items[index].classList.add('active');
            items[index].scrollIntoView(getScrollIntoViewOptions(options));
        }
        else {
            items[0].classList.add('active');
        }
    }
}

const doSearch = async (search, query, filter = null) => {
    if (query) {
        const { status, options } = search;
        if (status) {
            status.innerHTML = options.searchingText;
        }
        const client = new MeiliSearch({
            host: options.url,
            apiKey: options.apiKey,
        });
        const index = client.index(options.index);
        const result = await index.search(query, filter);
        if (status) {
            updateStatus(search, result.estimatedTotalHits, result.processingTimeMs);
        }

        const cb = BootstrapBlazor.MeiliSearch?.updateList ?? updateList;
        cb(search, result);
    }
}

const updateStatus = (search, hits, ms) => {
    const { status, options } = search;
    status.innerHTML = options.searchResultText.replace('{0}', hits).replace('{1}', ms);
}

const updateList = (search, result) => {
    const { menu, list, input, template, blockTemplate } = search;
    list.innerHTML = '';
    menu.innerHTML = '';
    menu.classList.add('show');

    if (result.hits.length > 0) {
        const html = template.innerHTML;
        const blockHtml = blockTemplate.innerHTML;

        result.hits.forEach(hit => {
            const link = document.createElement('a');
            link.className = "search-dialog-menu-item";
            link.setAttribute('href', `#hit${hit.id}`);
            link.innerHTML = hit.menu;
            menu.appendChild(link);

            if (hit.title === '') {
                return;
            }
            const div = document.createElement('div');
            div.innerHTML = html.replace('{url}', hit.url)
                .replace('{title}', highlight(hit.title, result.query))
                .replace('{sub-title}', highlight(hit.subTitle, result.query))
                .replace('{count}', hit.demos.length);
            const item = div.firstChild;
            item.setAttribute("id", `hit${hit.id}`);

            if (hit.demos) {
                const ul = document.createElement('ol');
                hit.demos.forEach(block => {
                    const li = document.createElement('li');
                    const url = block.url || hit.url;
                    li.innerHTML = blockHtml.replace('{url}', url)
                        .replace('{title}', highlight(block.title, result.query))
                        .replace('{intro}', highlight(block.intro, result.query));
                    ul.appendChild(li.firstChild);
                });
                item.appendChild(ul);
            }
            list.appendChild(item);
        });
        input.focus();

        bootstrap.ScrollSpy.getInstance(list).refresh();
    }
    else {
        resetResult(search);
        list.querySelector('.search-dialog-empty-template').innerHTML = search.options.emptySearchResultPlaceHolder;
    }
}

const highlight = (text, query) => {
    const regex = new RegExp(query, 'i');
    return text.replace(regex, `<i class=\"search-key\">${query}</i>`);
}

const resetSearch = search => {
    const { input } = search;

    if (input.value === '') {
        closeDialog();
    }
    else {
        input.value = '';
        input.focus();
        resetResult(search);
    }
}

const resetResult = search => {
    const { list, menu, emptyTemplate } = search;
    list.innerHTML = emptyTemplate.outerHTML;
    menu.innerHTML = '';
    menu.classList.remove('show');
}

const closeDialog = () => {
    document.documentElement.classList.remove('bb-g-search-open');
}
