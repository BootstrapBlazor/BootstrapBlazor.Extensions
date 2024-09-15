let fileHandle;

const pickerOpts = {
    types: [
        {
            description: 'Text documents/Images/Office documents',
            accept: {
                'text/plain': ['.txt'],
                'image/*': ['.txt', '.png', '.gif', '.jpeg', '.jpg'],
                'office/*': ['.xls', '.xlsx', '.doc', '.docs']
            },
            startIn: 'desktop'
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

const pickerAllOpts = {
    types: [
        {             
            startIn: 'desktop'
        },
    ], 
    multiple: false
};

////指定建议的文件名和起始目录
//const txtfileHandle = await self.showSaveFilePicker({
//    suggestedName: 'Untitled Text.txt',
//    types: [{
//        description: 'Text documents',
//        accept: {
//            'text/plain': ['.txt'],
//        },
//    }],
//});

////默认启动目录
//const picPathfileHandle = await self.showOpenFilePicker({
//    startIn: 'pictures'
//});

//desktop: 用户的桌面目录，如果有的话。
//documents：通常存储用户创建的文档的目录。
//downloads：通常存储下载文件的目录。
//music：通常存储音频文件的目录。
//pictures：通常存储照片和其他静止图像的目录。
//videos：通常存储视频 / 电影的目录。





export async function GetFile(wrapper)
{

    // open file picker
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    // get file contents
    const fileData = await fileHandle.getFile();
    const contents = await fileData.text(); //stream()text()arrayBuffer()slice()
    wrapper.invokeMethodAsync('GetFileResult',
        {
            "lastModified": fileData.lastModified,
            "lastModifiedDate": fileData.lastModifiedDate,
            "name": fileData.name,
            "size": fileData.size,
            "type": fileData.type,
            "kind": fileHandle.kind,
            "name": fileData.name,
            "webkitRelativePath": fileData.webkitRelativePath,
        },
    );
    return {
        "name": fileHandle.name,
        "kind": fileHandle.kind,
        "status": "GetFile ok",
        "contents": contents
    };

}

export async function GetFileStream(wrapper) {

    // open file picker
    [fileHandle] = await window.showOpenFilePicker(pickerAllOpts);

    // get file contents
    const fileData = await fileHandle.getFile();
    const stream = await fileData.arrayBuffer();  //stream()text()arrayBuffer()slice()
    wrapper.invokeMethodAsync('GetFileResult',
        {
            "lastModified": fileData.lastModified,
            "lastModifiedDate": fileData.lastModifiedDate,
            "name": fileData.name,
            "size": fileData.size,
            "type": fileData.type,
            "kind": fileHandle.kind,
            "name": fileData.name,
            "webkitRelativePath": fileData.webkitRelativePath,
        },
    );
    return stream;

}

export async function GetDir()
{
    const dirHandle = await window.showDirectoryPicker();
    const promises = [];
    promises.push(`Dir : ${dirHandle.name} `);
    for await (const entry of dirHandle.values()) {
        if (entry.kind !== 'file') {
            promises.push(`+ ${entry.name}`);
            continue;
        }
        promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
    }
    var res = await Promise.all(promises);
    console.log(res);
    return res;
}

export async function newFile(name=null,contents=null)
{
    const options = {
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': ['.txt'],
                },
            },
        ],
    };
    if (name) options.suggestedName = name;
    let newfileHandle = await window.showSaveFilePicker(options);
    let msg = 'New FIle OK';
    if (contents) {
        console.debug(newfileHandle); 
        const writableStream = await newfileHandle.createWritable();
        await writableStream.write(contents);
        await writableStream.close();
        msg = 'New & Save OK';
    }
    fileHandle = newfileHandle;
    return {
        "name": fileHandle.name,
        "kind": fileHandle.kind,
        "status": msg,
        "contents": contents
    };
}

export async function saveFile(contents)
{

    // create a new handle
    if (!fileHandle) [fileHandle] = await window.showSaveFilePicker(pickerOpts);

    // create a FileSystemWritableFileStream to write to
    const writableStream = await fileHandle.createWritable();

    // write our file
    await writableStream.write(contents);

    // close the file and write the contents to disk.
    await writableStream.close();
    return {
        "name": fileHandle.name,
        "kind": fileHandle.kind,
        "status": "save OK"
    };
}

export async function saveURLToFile(fileHandle, url) {
    [fileHandle] = await window.showSaveFilePicker(pickerOpts);
    // Create a FileSystemWritableFileStream to write to.
    const writable = await newHandle.createWritable();
    // Make an HTTP request for the contents.
    const response = await fetch(url);
    // Stream the response into the file.
    await response.body.pipeTo(writable);
    // pipeTo() closes the destination pipe by default, no need to close it.
    return {
        "name": fileHandle.name,
        "kind": fileHandle.kind,
        "status": "saveURLToFile OK"
    };
}

export async function verifyPermission(readWrite=true) {
    const options = {};
    // The user didn't grant permission, so return false. 
    const result = false;
    if (readWrite) {
        options.mode = 'readwrite';
    }
    // Check if permission was already granted. If so, return true.
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        result= true;
    }
    // Request permission. If the user grants permission, return true.
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        result = true;
    }
    return result;
}