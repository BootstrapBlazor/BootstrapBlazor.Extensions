const svgNs = "http://www.w3.org/2000/svg";

function parseIdList(value) {
    return (value ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
}

function createSvgElement(tagName) {
    return document.createElementNS(svgNs, tagName);
}

function buildArrowPoints(fromX, fromY, tipX, tipY) {
    const arrowLength = 7;
    const arrowHalfHeight = 3.8;
    let dx = tipX - fromX;
    let dy = tipY - fromY;
    let length = Math.hypot(dx, dy);

    if (length <= Number.EPSILON) {
        dx = -1;
        dy = 0;
        length = 1;
    }

    const ux = dx / length;
    const uy = dy / length;
    const baseX = tipX - (ux * arrowLength);
    const baseY = tipY - (uy * arrowLength);
    const perpX = -uy * arrowHalfHeight;
    const perpY = ux * arrowHalfHeight;

    return `${tipX.toFixed(2)},${tipY.toFixed(2)} ${(baseX + perpX).toFixed(2)},${(baseY + perpY).toFixed(2)} ${(baseX - perpX).toFixed(2)},${(baseY - perpY).toFixed(2)}`;
}

function getBarAnchor(bar, svgRect, edge) {
    const rect = bar.getBoundingClientRect();
    const isMilestone = bar.dataset.isMilestone === "true";
    const x = isMilestone
        ? ((rect.left + (rect.width / 2)) - svgRect.left)
        : (edge === "start" ? rect.left - svgRect.left : rect.right - svgRect.left);

    return {
        x,
        y: (rect.top + (rect.height / 2)) - svgRect.top
    };
}

function getHierarchyAnchor(bar, svgRect, edge) {
    const rect = bar.getBoundingClientRect();
    return {
        x: (edge === "bottom" ? rect.left + (rect.width / 2) : rect.left) - svgRect.left,
        y: (edge === "bottom" ? rect.bottom : rect.top + (rect.height / 2)) - svgRect.top
    };
}

function buildDependencyGeometry(fromBar, toBar, svgRect) {
    const start = getBarAnchor(fromBar, svgRect, "end");
    const end = getBarAnchor(toBar, svgRect, "start");
    const entryStubX = Math.max(0, end.x - 8);

    if (Math.abs(start.y - end.y) < 1) {
        const loopX = Math.max(start.x, end.x) + 22;
        const loopY = Math.max(8, start.y - 18);
        return {
            path: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${loopX.toFixed(2)} ${start.y.toFixed(2)} L ${loopX.toFixed(2)} ${loopY.toFixed(2)} L ${entryStubX.toFixed(2)} ${loopY.toFixed(2)} L ${entryStubX.toFixed(2)} ${end.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
            arrowPoints: buildArrowPoints(entryStubX, end.y, end.x, end.y)
        };
    }

    const corridorX = Math.max(start.x + 22, end.x + 10);
    return {
        path: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${corridorX.toFixed(2)} ${start.y.toFixed(2)} L ${corridorX.toFixed(2)} ${end.y.toFixed(2)} L ${entryStubX.toFixed(2)} ${end.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
        arrowPoints: buildArrowPoints(entryStubX, end.y, end.x, end.y)
    };
}

function buildHierarchyGeometry(parentBar, childBar, svgRect) {
    const start = getHierarchyAnchor(parentBar, svgRect, "bottom");
    const end = getHierarchyAnchor(childBar, svgRect, "start");
    const elbowY = start.y + Math.max(10, (end.y - start.y) / 2);
    const entryX = Math.max(0, end.x - 10);

    return {
        path: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${start.x.toFixed(2)} ${elbowY.toFixed(2)} L ${entryX.toFixed(2)} ${elbowY.toFixed(2)} L ${entryX.toFixed(2)} ${end.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
    };
}

function renderDependencyLines(root, showDependencies, showHierarchyLines) {
    const svg = root.querySelector(".gantt-chart__links");
    if (!svg || !svg.isConnected) {
        return;
    }

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width <= 0 || svgRect.height <= 0) {
        svg.replaceChildren();
        return;
    }

    svg.setAttribute("viewBox", `0 0 ${svgRect.width.toFixed(2)} ${svgRect.height.toFixed(2)}`);

    const bars = Array.from(root.querySelectorAll(".gantt-chart__bar[data-item-id]"));
    const leafBars = bars.filter((bar) => bar.dataset.hasChildren !== "true");
    const parentBars = bars.filter((bar) => bar.dataset.hasChildren === "true");
    const barById = new Map(leafBars.map((bar) => [bar.dataset.itemId, bar]));
    const dependencyNodes = [];
    const hierarchyNodes = [];

    if (showHierarchyLines) {
        for (const parentBar of parentBars) {
            for (const childId of parseIdList(parentBar.dataset.childItemIds)) {
                const childBar = bars.find((candidate) => candidate.dataset.itemId === childId);
                if (!childBar) {
                    continue;
                }

                hierarchyNodes.push(buildHierarchyGeometry(parentBar, childBar, svgRect));
            }
        }
    }

    if (showDependencies) {
        for (const successor of leafBars) {
            for (const dependencyId of parseIdList(successor.dataset.dependencies)) {
                const predecessor = barById.get(dependencyId);
                if (!predecessor) {
                    continue;
                }

                dependencyNodes.push(buildDependencyGeometry(predecessor, successor, svgRect));
            }
        }
    }

    svg.replaceChildren();

    for (const geometry of hierarchyNodes) {
        const path = createSvgElement("path");
        path.setAttribute("d", geometry.path);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(77, 143, 188, 0.72)");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-dasharray", "5 4");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        svg.appendChild(path);
    }

    for (const geometry of dependencyNodes) {
        const path = createSvgElement("path");
        path.setAttribute("class", "gantt-chart__link-path");
        path.setAttribute("d", geometry.path);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(61, 138, 99, 0.9)");
        path.setAttribute("stroke-width", "2.5");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        svg.appendChild(path);

        const arrow = createSvgElement("polygon");
        arrow.setAttribute("class", "gantt-chart__link-arrow");
        arrow.setAttribute("points", geometry.arrowPoints);
        arrow.setAttribute("fill", "rgb(61, 138, 99)");
        svg.appendChild(arrow);
    }
}

export function createDependencyRenderer(root, initialOptions) {
    let dependencyFrame = 0;
    let resizeObserver = null;
    let showDependencies = initialOptions.showDependencies ?? true;
    let showHierarchyLines = initialOptions.showHierarchyLines ?? true;

    function cancelDependencyFrame() {
        if (dependencyFrame) {
            cancelAnimationFrame(dependencyFrame);
            dependencyFrame = 0;
        }
    }

    function scheduleRender() {
        if (dependencyFrame) {
            return;
        }

        dependencyFrame = requestAnimationFrame(() => {
            dependencyFrame = 0;
            renderDependencyLines(root, showDependencies, showHierarchyLines);
        });
    }

    resizeObserver = new ResizeObserver(() => {
        scheduleRender();
    });
    resizeObserver.observe(root);
    scheduleRender();

    return {
        scheduleRender,
        updateOptions(nextOptions) {
            showDependencies = nextOptions.showDependencies ?? true;
            showHierarchyLines = nextOptions.showHierarchyLines ?? true;
            scheduleRender();
        },
        dispose() {
            cancelDependencyFrame();
            resizeObserver?.disconnect();
            resizeObserver = null;
        }
    };
}
