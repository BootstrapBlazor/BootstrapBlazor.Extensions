// 查找图元的所有子图元
const getAllChildren = (pen, pensMap) => {
    if (!pen || !pen.children || !pensMap) {
        return [];
    }
    const children = [];
    pen.children.forEach((id) => {
        const child = pensMap[id];
        if (child) {
            children.push(child);
            children.push(...getAllChildren(child, pensMap));
        }
    });
    return children;
}
// 查找图元下的所有指定图元
const myFind = (pen, mark, pensMap) => {
    if (!pen || !mark || !pensMap) {
        return [];
    }
    const children = [];
    pen = typeof pen == 'string' ? pensMap[pen] : pen
    if (!pen.children) {
        return [];
    }
    pen.children.forEach((id) => {
        const child = pensMap[id];
        if (child) {
            (child.id === mark || child.tags && child.tags.includes(mark)) && children.push(child);
            children.push(...myFind(child, mark, pensMap));
        }
    });
    return children;
}
// 查找图元的指定的祖先元素
const myGetParent = (pen, mark, meta2d) => {
    let parent = meta2d.getParent(pen)
    if (!parent || parent.id == mark || (parent.tags && parent.tags.includes(mark))) {
        return parent
    } else {
        return myGetParent(parent, mark, meta2d)
    }
}
// 单条线路颜色修改, 传入颜色和起始图元的ID
const run = (id, color, idMap, count, valveArr, pensMap, meta2d, option, inOutMark) => {// inOutMark为四通管标记
    count++
    if (idMap[id] || count > 999) return
    let currentPen = pensMap[id]
    if (!currentPen) return
    // currentPen.myId = id
    // 1、给传入的图元设置颜色并记录该图元
    let prop = { id }
    if (currentPen.type != 1) {
        prop.background = color
    } else {
        prop.color = color
    }
    inOutMark && (prop.inOutMark = inOutMark)
    // 传入的图元不是气泵才修改颜色
    if (!currentPen.tags?.includes(option.pump.penTag) && !currentPen.tags?.includes(option.startTag)) {
        // count++
        meta2d.setValue(prop, { render: false })
    }
    idMap[id] = 1
    // 2、获取当前图元的下一个展现出来的图元, 传入run方法
    // 如果当前图元为连接线时下一个为图形或连接线，如果当前图元为图形，下一个为连接线
    // 2.1、下一个为图形图元
    if (currentPen.type == 1) {// 当前为连接线时下一个才可能是图形
        currentPen.anchors.forEach(anchor => {
            // 获取下一个图元id
            let penId = anchor?.connectTo
            let pen = pensMap[penId]
            // 当前图元的下一个图元是'GasSource'时结束传递
            if (!pen || pen.tags?.includes(option.startTag) || pen.tags?.includes(option.pump.penTag)) return
            // 获取图元的标识
            let tags = pen && pen.tags
            // 遇到截止阀的基础图元
            if (tags?.includes(option.cutOffValve.penTag)) {
                // 找到完整的阀：cutOffValve图元
                let cutOffValve = myGetParent(pen, option.cutOffValve.tag, meta2d)
                // 通过完整的阀找到当前显示的状态图元
                const showId = cutOffValve.children[cutOffValve.showChild]
                const showPen = pensMap[showId]
                // 找到两种状态的连接点基础图元
                let onPen = myFind(cutOffValve, 'on', pensMap)[0]
                let offPen = myFind(cutOffValve, 'off', pensMap)[0]
                // 如果当前显示的是off状态, 重置传递的颜色
                if (showPen?.tags?.includes(option.cutOffValve.onTag)) {
                    color = '#FFF'
                }
                // 两种状态的基础连接图元都要设置颜色，因为不知道线段连接的是哪种状态
                run(offPen?.id || offPen?.myId, color, idMap, count, valveArr, pensMap, meta2d, option)
                run(onPen?.id || onPen?.myId, color, idMap, count, valveArr, pensMap, meta2d, option)
            }
            // 遇到六通阀的基础图元
            else if (tags?.includes(option.multiWayValve.penTag)) {
                // 找到完整的阀：sixWayValve
                // let sixWayValve = meta2d.find('sixWayValve')[0]
                let sixWayValve = myGetParent(pen, option.multiWayValve.tag, meta2d)
                // 通过完整的阀找到当前显示的状态图元
                const showTypeId = sixWayValve.children[sixWayValve.showChild]
                const showType = pensMap[showTypeId]
                let valveIndex = tags.find(tag => valveArr.includes(tag))
                let showChildren = showType.children.map(id => pensMap[id])
                let showConnectChild = showChildren.find(child => child.tags?.includes(valveIndex))
                showConnectChild && run(showConnectChild.id || showConnectChild.myId, color, idMap, count, valveArr, pensMap, meta2d, option)
            }
            // 遇到四通管的基础图元
            else if (tags?.includes(option.fourWayPipe.penTag)) {
                if (currentPen.tags?.includes(option.fourWayPipe.lineTag)) {
                    if (pen.inOutMark != 'in') {
                        run(penId, color, idMap, count, valveArr, pensMap, meta2d, option)
                    }
                } else {
                    run(penId, color, idMap, count, valveArr, pensMap, meta2d, option, 'in')
                }
            }
            else {
                run(penId, color, idMap, count, valveArr, pensMap, meta2d, option)
            }
        });
    }
    // 2.2、下一个为连接线
    // 当前图元为六通阀时
    if (currentPen.tags?.includes(option.multiWayValve.penTag)) {
        // 找到完整的阀：sixWayValve
        // let sixWayValve = meta2d.find('sixWayValve')[0]
        let sixWayValve = myGetParent(currentPen, option.multiWayValve.tag, meta2d)
        // 通过完整的阀找到当前显示的状态图元
        const showTypeId = sixWayValve.children[sixWayValve.showChild]
        const showType = pensMap[showTypeId]
        let ids = sixWayValve.children.map(id => pensMap[id]).map(child => child.children).flat()

        // 找到当前位置所有的图元(包括显示和隐藏)的连接线
        let valveIndex = currentPen.tags.find(tag => valveArr.includes(tag))
        // let currentPens = meta2d.find(valveIndex)
        let currentPens = myFind(sixWayValve, valveIndex, pensMap)
        currentPens.forEach(pen => {
            pen.connectedLines.forEach(connectedLine => {
                let lineId = connectedLine?.lineId
                if (lineId && pensMap[lineId] && (showType.children.includes(lineId) || !ids.includes(lineId))) {
                    run(lineId, color, idMap, count, valveArr, pensMap, meta2d, option)
                }
                else{
                    if(sixWayValve.tags.includes(option.multiWayValve.WhiteGasTag)){
                        run(lineId, '#fff', idMap, count, valveArr, pensMap, meta2d, option)
                    }
                }
            })
        })
    }
    // 当前图元为四通管时
    else if (currentPen.tags?.includes(option.fourWayPipe.penTag)) {
        currentPen.connectedLines?.forEach(connectedLine => {
            let lineId = connectedLine?.lineId
            let line = lineId && pensMap[lineId]
            if (line.tags?.includes(option.fourWayPipe.lineTag)) {
                let fourWayPipe = myGetParent(currentPen, 'fourWayPipe', meta2d)
                let inColors = myFind(fourWayPipe, option.fourWayPipe.penTag, pensMap).filter(item => item.inOutMark == 'in').map(item => item.background || 'rgba(0,0,0,1)') || []
                if (inColors.length > 1) {
                    color = colorMixin(inColors)
                }
                run(lineId, color, idMap, count, valveArr, pensMap, meta2d, option)
            } else {
                run(lineId, color, idMap, count, valveArr, pensMap, meta2d, option)
            }
        });
    }
    // 当前图元为普通图元
    else {
        currentPen.connectedLines?.forEach(connectedLine => {
            let lineId = connectedLine?.lineId
            if (lineId && pensMap[lineId]) {
                run(lineId, color, idMap, count, valveArr, pensMap, meta2d, option)
            }
        });
    }
}
// 整个图纸线路颜色渲染
const fillLinesColor = (gasSourceArr, valveArr, pensMap, meta2d, option) => {
    gasSourceArr.forEach(item => {
        let color = item.background
        if (item.tags.includes(option.pump.tag)) {//item是泵
            let showChild = pensMap[item.children[item.showChild]]
            let GasPumpPens = myFind(item, option.pump.penTag, pensMap)
            // color = showGasPumpPen?.background
            if (showChild.tags.includes(option.pump.offTag)) {
                color = '#FFFFFFFF'
            }
            GasPumpPens.forEach(GasPumpPen => {
                let idMap = {}, count = 0
                run(GasPumpPen.id || GasPumpPen.myId, color, idMap, count, valveArr, pensMap, meta2d, option)
            })
        } else {
            let value = parseFloat(item.text)
            let threshold = item.Threshold
            if (!isNaN(value) && threshold && value < threshold) {
                color = '#FFF'
            }
            let idMap = {}, count = 0
            run(item.id || item.myId, color, idMap, count, valveArr, pensMap, meta2d, option)
        }
    })
    // 循环结束时统一渲染
    meta2d.render()
}

// 混合颜色
const colorMixin = (colors) => {
    let rgbaArrList = colors.map(colorStr => {
        let rgbaStr = colorStr
        if (!colorStr.includes('rgb')) {
            let div = document.createElement('div')
            div.style.color = colorStr
            document.body.appendChild(div)
            rgbaStr = getComputedStyle(div).color
            div.remove()
        }
        if (!rgbaStr.includes('rgba')) {//rgb(1, 2, 3)
            rgbaStr = rgbaStr.replace('(', 'a(').replace(')', ', 1)')
        }
        return rgbaStr.split('(')[1].split(')')[0].split(',')
    })
    let newArr = rgbaArrList[0].map((item, index) => rgbaArrList.map(rgbaArr => rgbaArr[index]).reduce((prev, curr) => Math.round((prev * 1 + curr * 1) / rgbaArrList.length)))
    return 'rgba(' + newArr.toString() + ')'
}
const deepMerge = (...sources) => {
    const result = {};
    for (const source of sources) {
        if (source instanceof Object) {
            for (const [key, value] of Object.entries(source)) {
                if (value instanceof Object && key in result) {
                    result[key] = deepMerge(result[key], value);
                } else {
                    result[key] = value;
                }
            }
        }
    }
    return result;
}
export default function fillColor(meta2d, option) {
    const defaultOption = {
        startTag: 'GasSource',// 线路起点图元标识
        multiWayValve: {//多通阀
            maxWay: 14,//设置最大支持n通阀
            tag: 'sixWayValve',//阀标识
            penTag: 'sixWayValvePen',//阀的点位标识
            WhiteGasTag: 'WhiteGas',//三通阀阻断填充白色的标识符
        },
        cutOffValve: {//截止阀
            tag: 'cutOffValve',
            penTag: 'cutOffValvePen',
            onTag: 'cutOffValveOn',// on状态标识
        },
        fourWayPipe: {//四通管
            penTag: 'fourWayPipePen',
            lineTag: 'fourWayPipeLine',
        },
        pump: {//泵
            tag: 'GasPump',
            penTag: 'GasPumpPen',
            offTag: 'GasPumpOff'// off状态标识
        },
    }
    option = option ? deepMerge(defaultOption, option) : defaultOption
    const gasSourceArr = meta2d.find(option.startTag)
    // 生成多通阀点位标识的集合(当前设置最高支持14点位)
    const valveArr = [...new Array(option.multiWayValve.maxWay)].map((item, index) => 'V' + (index + 1))
    const pensMap = meta2d.store.pens
    // 挂载切换开关执行方法
    meta2d.switchHandle = () => {
        // 每次切换开关都需要清除四通管的进出标记属性
        meta2d.find(option.fourWayPipe.penTag).forEach(pipePen => {
            meta2d.setValue({ id: pipePen.id, inOutMark: undefined }, { render: false })
        })
        // 切换开关重新填充颜色
        return fillLinesColor(gasSourceArr, valveArr, pensMap, meta2d, option)
    }
    // 首次填充颜色
    fillLinesColor(gasSourceArr, valveArr, pensMap, meta2d, option)
}


