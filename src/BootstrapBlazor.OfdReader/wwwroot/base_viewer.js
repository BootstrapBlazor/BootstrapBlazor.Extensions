
function getViewerConfiguration() {
    let errorWrapper = null;
    if (typeof PDFJSDev === "undefined" || !PDFJSDev.test("MOZCENTRAL")) {
        errorWrapper = {
            container: document.getElementById("errorWrapper"),
            errorMessage: document.getElementById("errorMessage"),
            closeButton: document.getElementById("errorClose"),
            errorMoreInfo: document.getElementById("errorMoreInfo"),
            moreInfoButton: document.getElementById("errorShowMore"),
            lessInfoButton: document.getElementById("errorShowLess"),
        };
    }

    return {
        appContainer: document.body,
        mainContainer: document.getElementById("viewerContainer"),
        viewerContainer: document.getElementById("viewer"),
        toolbar: {
            container: document.getElementById("toolbarViewer"),
            numPages: document.getElementById("numPages"),
            pageNumber: document.getElementById("pageNumber"),
            scaleSelect: document.getElementById("scaleSelect"),
            customScaleOption: document.getElementById("customScaleOption"),
            previous: document.getElementById("previous"),
            next: document.getElementById("next"),
            zoomIn: document.getElementById("zoomIn"),
            zoomOut: document.getElementById("zoomOut"),
            openFile: document.getElementById("openFile"),
            print: document.getElementById("print"),
            download: document.getElementById("download"),
        },
        secondaryToolbar: {
            toolbar: document.getElementById("secondaryToolbar"),
            toggleButton: document.getElementById("secondaryToolbarToggle"),
            downloadButton: document.getElementById("secondaryDownload"),
            toolbarButtonContainer: document.getElementById(
                "secondaryToolbarButtonContainer"
            ),
            openFileButton: document.getElementById("secondaryOpenFile"),
            printButton: document.getElementById("secondaryPrint"),
            viewBookmarkButton: document.getElementById("secondaryViewBookmark"),
            firstPageButton: document.getElementById("firstPage"),
            lastPageButton: document.getElementById("lastPage"),
            pageRotateCwButton: document.getElementById("pageRotateCw"),
            pageRotateCcwButton: document.getElementById("pageRotateCcw"),
            cursorSelectToolButton: document.getElementById("cursorSelectTool"),
            cursorHandToolButton: document.getElementById("cursorHandTool"),
            scrollPageButton: document.getElementById("scrollPage"),
            scrollVerticalButton: document.getElementById("scrollVertical"),
            scrollHorizontalButton: document.getElementById("scrollHorizontal"),
            scrollWrappedButton: document.getElementById("scrollWrapped"),
            spreadNoneButton: document.getElementById("spreadNone"),
            spreadOddButton: document.getElementById("spreadOdd"),
            spreadEvenButton: document.getElementById("spreadEven"),
            documentPropertiesButton: document.getElementById("documentProperties"),
        },
        sidebar: {
            // Divs (and sidebar button)
            outerContainer: document.getElementById("outerContainer"),
            viewerContainer: document.getElementById("viewerContainer"),
            toggleButton: document.getElementById("sidebarToggle"),
            // Buttons
            // thumbnailButton: document.getElementById("viewThumbnail"),
            outlineButton: document.getElementById("viewOutline"),
            attachmentsButton: document.getElementById("viewAttachments"),
            // layersButton: document.getElementById("viewLayers"),
            signaturesButton: document.getElementById("viewSignatures"),
            // Views
            // thumbnailView: document.getElementById("thumbnailView"),
            outlineView: document.getElementById("outlineView"),
            attachmentsView: document.getElementById("attachmentsView"),
            // layersView: document.getElementById("layersView"),
            signaturesView: document.getElementById("signaturesView"),
            // View-specific options
            outlineOptionsContainer: document.getElementById(
                "outlineOptionsContainer"
            ),
            currentOutlineItemButton: document.getElementById("currentOutlineItem"),
        },
        sidebarResizer: {
            outerContainer: document.getElementById("outerContainer"),
        },
        documentProperties: {
            dialog: document.getElementById("documentPropertiesDialog"),
            closeButton: document.getElementById("documentPropertiesClose"),
            fields: {
                fileName: document.getElementById("fileNameField"),
                fileSize: document.getElementById("fileSizeField"),
                title: document.getElementById("titleField"),
                author: document.getElementById("authorField"),
                subject: document.getElementById("subjectField"),
                keywords: document.getElementById("keywordsField"),
                creationDate: document.getElementById("creationDateField"),
                modificationDate: document.getElementById("modificationDateField"),
                creator: document.getElementById("creatorField"),
                producer: document.getElementById("producerField"),
                version: document.getElementById("versionField"),
                pageCount: document.getElementById("pageCountField"),
                pageSize: document.getElementById("pageSizeField"),
                linearized: document.getElementById("linearizedField"),
            },
        },
        signatureProperties: {
            dialog: document.getElementById("signaturePropertiesDialog"),
            closeButton: document.getElementById("signaturePropertiesClose"),
            fields: {
                signer: document.getElementById("signerField"),
                provider: document.getElementById("providerField"),
                hashedValue: document.getElementById("hashedValueField"),
                signedValue: document.getElementById("signedValueField"),
                signMethod: document.getElementById("signMethodField"),
                signVersion: document.getElementById("signVersionField"),
                verify: document.getElementById("verifyField"),

                sealID: document.getElementById("sealIDField"),
                sealName: document.getElementById("sealNameField"),
                sealType: document.getElementById("sealTypeField"),
                sealAuthTime: document.getElementById("sealAuthTimeField"),
                sealMakeTime: document.getElementById("sealMakeTimeField"),
                sealVersion: document.getElementById("sealVersionField"),
            },
        },
        errorWrapper,
        printContainer: document.getElementById("printContainer"),
        openFileInputName: "fileInput",
    };
}

function webViewerLoad() {
    const config = getViewerConfiguration();
    let img = new Image();
    img.style.position = 'absolute';
    img.style.left = 0;
    img.style.right = 0;
    img.style.margin = 'auto';
    img.style.top = 0;
    img.style.bottom = 0;
    img.src = 'data:image/gif;base64,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';
    img.draggable = false;
    config.loadingContainer = img
    config.parserOFDSuccess = function () {
        console.log('解析成功')
    }
    config.parserOFDFail = function (error) {
        console.log(error)
    }
    parser_x.openOFDViewer(config)
}

window.onload = function () {
    webViewerLoad()
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}


