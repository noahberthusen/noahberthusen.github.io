
function handleNodeMouseOver(event, d) {
    let svg = d3.select("#vis").select("svg")

    // const currentColor = d3.select(this).style("fill")
    // const darkerColor = d3.color(currentColor).darker(0.6)
    const connectedNodes = edges.filter(edge => (d.type) ? edge.source === d.ind : edge.target === d.ind)
    svg.selectAll(".bit-node").style("opacity", node => (d.type) ? ( connectedNodes.some(edge => (edge.source === d.ind) && (edge.target === node.ind)) ? 1 : 0.2 ) 
                                            : ( (node.ind === d.ind) ? 1 : highlightOpacity) )

    svg.selectAll(".check-node").style("opacity", node => (d.type) ? ( (node.ind === d.ind) ? 1 : highlightOpacity)
                                            : ( connectedNodes.some(edge => (edge.target === d.ind) && (edge.source === node.ind)) ? 1 : highlightOpacity ) )
    svg.selectAll(".edge").style("opacity", edge => connectedNodes.includes(edge) ? 1 : 0)
}

function handleNodeMouseOverNoEdges(event, d) {
    let svg = d3.select("#vis").select("svg")

    const connectedNodes = edges.filter(edge => (d.type) ? edge.source === d.ind : edge.target === d.ind)
    svg.selectAll(".bit-node").style("opacity", node => (d.type) ? ( connectedNodes.some(edge => (edge.source === d.ind) && (edge.target === node.ind)) ? 1 : 0.2 ) 
                        : ( (node.ind === d.ind) ? 1 : highlightOpacity) )

    svg.selectAll(".check-node").style("opacity", node => (d.type) ? ( (node.ind === d.ind) ? 1 : highlightOpacity)
                        : ( connectedNodes.some(edge => (edge.target === d.ind) && (edge.source === node.ind)) ? 1 : highlightOpacity ) )
}

function handleQubitMouseOver(event, d) {
    let svg = d3.select("#vis").select("svg")

    if (d.type) {
        // cc qubit
        const horConnectedNodes = edges.filter(edge => edge.source === d.xind)
        const verConnectedNodes = edges.filter(edge => edge.source === d.yind)

        // svg.selectAll(".vv_qubit").style("opacity", highlightOpacity)
        svg.selectAll(".cc_qubit").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        svg.selectAll(".z_gen").style("opacity", node => (node.xind === d.xind && 
            verConnectedNodes.some(edge => (edge.source === d.yind) && (edge.target === node.yind))) ? 1 : highlightOpacity)
        svg.selectAll(".x_gen").style("opacity", node => (node.yind === d.yind && 
            horConnectedNodes.some(edge => (edge.source === d.xind) && (edge.target === node.xind))) ? 1 : highlightOpacity)

        svg.selectAll(".edge")
            .style("opacity", edge => horConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (e.target + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) 
                const startY = (d.yind + bitNodes.length + gap + marginTop)  * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endX = (d.xind + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))
                const midX = (endX - startX) / 2 + startX
                const midY = startY - ((endX - startX) / edgeCurviture)
    
                return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
            })
        svg.selectAll(".ver-edge")
            .style("opacity", edge => verConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (e.target + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const midX = startX - ((endY - startY) / edgeCurviture)
                const midY = (endY - startY) / 2 + startY

                return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
            })
    } else {
        // vv qubit
        const horConnectedNodes = edges.filter(edge => edge.target === d.xind)
        const verConnectedNodes = edges.filter(edge => edge.target === d.yind)

        svg.selectAll(".z_gen").style("opacity", node => (node.yind === d.yind && 
            horConnectedNodes.some(edge => (edge.target === d.xind) && (edge.source === node.xind))) ? 1 : highlightOpacity)
        svg.selectAll(".x_gen").style("opacity", node => (node.xind === d.xind && 
            verConnectedNodes.some(edge => (edge.target === d.yind) && (edge.source === node.yind))) ? 1 : highlightOpacity)

        // svg.selectAll(".cc_qubit").style("opacity", highlightOpacity)
        svg.selectAll(".vv_qubit").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        svg.selectAll(".edge")
            .style("opacity", edge => horConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endX = (e.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
                const midX = (endX - startX) / 2 + startX
                const midY = startY - ((endX - startX) / edgeCurviture)
    
                return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
            })
        svg.selectAll(".ver-edge")
            .style("opacity", edge => verConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) 
                const startY = (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endY = (e.source + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const midX = startX - ((endY - startY) / edgeCurviture)
                const midY = (endY - startY) / 2 + startY

                return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
            })
    }
}


function handleQubitMouseOverScoring(event, d) {
    let svg = d3.select("#vis").select("svg")

    if (d.type) {
        // cc qubit
        const verConnectedNodes = edges.filter(edge => edge.source === d.yind)

        // svg.selectAll(".vv_qubit").style("opacity", highlightOpacity)
        svg.selectAll(".cc_qubit").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        svg.selectAll(".z_gen").style("opacity", node => (node.xind === d.xind && 
            verConnectedNodes.some(edge => (edge.source === d.yind) && (edge.target === node.yind))) ? 1 : highlightOpacity)

        svg.selectAll(".ver-edge")
            .style("opacity", edge => verConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (e.target + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const midX = startX - ((endY - startY) / edgeCurviture)
                const midY = (endY - startY) / 2 + startY

                return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
            })
    } else {
        // vv qubit
        const horConnectedNodes = edges.filter(edge => edge.target === d.xind)

        svg.selectAll(".z_gen").style("opacity", node => (node.yind === d.yind && 
            horConnectedNodes.some(edge => (edge.target === d.xind) && (edge.source === node.xind))) ? 1 : highlightOpacity)

        // svg.selectAll(".cc_qubit").style("opacity", highlightOpacity)
        svg.selectAll(".vv_qubit").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        svg.selectAll(".edge")
            .style("opacity", edge => horConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endX = (e.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
                const midX = (endX - startX) / 2 + startX
                const midY = startY - ((endX - startX) / edgeCurviture)
    
                return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
            })
    }
}

function handleGenMouseOver(event, d) {
    let svg = d3.select("#vis").select("svg")

    if (d.type) {
        // x gen
        svg.selectAll(".x_gen").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        const horConnectedNodes = edges.filter(edge => edge.target === d.xind)
        const verConnectedNodes = edges.filter(edge => edge.source === d.yind)

        svg.selectAll(".vv_qubit").style("opacity", node => (node.xind === d.xind && 
            verConnectedNodes.some(edge => (edge.source === d.yind) && (edge.target === node.yind))) ? 1 : highlightOpacity)
        svg.selectAll(".cc_qubit").style("opacity", node => (node.yind === d.yind && 
            horConnectedNodes.some(edge => (edge.target === d.xind) && (edge.source === node.xind))) ? 1 : highlightOpacity)

        svg.selectAll(".edge")
            .style("opacity", edge => horConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endX = (e.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
                const midX = (endX - startX) / 2 + startX
                const midY = startY - ((endX - startX) / edgeCurviture)
    
                return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
            })
        svg.selectAll(".ver-edge")
            .style("opacity", edge => verConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (e.target + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const midX = startX - ((endY - startY) / edgeCurviture)
                const midY = (endY - startY) / 2 + startY

                return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
            })
    } else {
        // z gen
        svg.selectAll(".z_gen").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

        const horConnectedNodes = edges.filter(edge => edge.source === d.xind)
        const verConnectedNodes = edges.filter(edge => edge.target === d.yind)

        svg.selectAll(".vv_qubit").style("opacity", node => (node.yind === d.yind && 
            horConnectedNodes.some(edge => (edge.source === d.xind) && (edge.target === node.xind))) ? 1 : highlightOpacity)
        svg.selectAll(".cc_qubit").style("opacity", node => (node.xind === d.xind && 
            verConnectedNodes.some(edge => (edge.target === d.yind) && (edge.source === node.yind))) ? 1 : highlightOpacity)

        svg.selectAll(".edge")
            .style("opacity", edge => horConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endX = (e.target + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
                const midX = (endX - startX) / 2 + startX
                const midY = startY + ((endX - startX) / edgeCurviture)
    
                return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
            })
        svg.selectAll(".ver-edge")
            .style("opacity", edge => verConnectedNodes.includes(edge) ? 1 : 0)
            .attr("d", (e) => {
                const startX = (d.xind + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
                const startY = (e.source + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const endY = (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
                const midX = startX + ((endY - startY) / edgeCurviture)
                const midY = (endY - startY) / 2 + startY

                return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
            })
    }
}

function handleXGenScoredMouseOver(event, d) {
    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".x_gen_scored").style("opacity", node => (node.xind === d.xind && node.yind === d.yind) ? 1 : highlightOpacity)

    const horConnectedNodes = edges.filter(edge => edge.target === d.xind)
    const verConnectedNodes = edges.filter(edge => edge.source === d.yind)
    const horFlips = d.score.best_flips.hor_flips.map(i => horConnectedNodes[i].source)
    const verFlips = d.score.best_flips.ver_flips.map(i => verConnectedNodes[i].target)

    svg.selectAll(".vv_qubit").style("opacity", node => (node.xind === d.xind && 
        verConnectedNodes.some(edge => (edge.source === d.yind) && (edge.target === node.yind))) ? 1 : highlightOpacity)
    svg.selectAll(".cc_qubit").style("opacity", node => (node.yind === d.yind && 
        horConnectedNodes.some(edge => (edge.target === d.xind) && (edge.source === node.xind))) ? 1 : highlightOpacity)

    svg.selectAll(".z_gen").style("opacity", node => 
        (horConnectedNodes.some(edge => (edge.target === d.xind) && (edge.source === node.xind)) && 
        verConnectedNodes.some(edge => (edge.source === d.yind) && (edge.target === node.yind))) ? 1 : highlightOpacity)

    svg.selectAll(".edge")
        .style("opacity", edge => (horConnectedNodes.includes(edge) && horFlips.includes(edge.source) && d.score.best_synd_diff) ? 1 : 0)
        .attr("d", (e) => {
            const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
            const startY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
            const endX = (e.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
            const midX = (endX - startX) / 2 + startX
            const midY = startY - ((endX - startX) / edgeCurviture)

            return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
        })

    svg.selectAll(".ver-edge")
        .style("opacity", edge => (verConnectedNodes.includes(edge) && verFlips.includes(edge.target) && d.score.best_synd_diff) ? 1 : 0)
        .attr("d", (e) => {
            const startX = (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
            const startY = (e.target + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
            const endY = (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
            const midX = startX - ((endY - startY) / edgeCurviture)
            const midY = (endY - startY) / 2 + startY

            return `M${startX},${startY} Q${midX},${midY} ${startX},${endY}`
        })


    if (d.score.best_synd_diff) {
        const loc = d3.select(this).node().getBoundingClientRect()
        const relativeDiff = d.score.best_synd_diff/d.score.best_weight
        const index = sortedRelativeDiffs.findIndex(value => value === relativeDiff)
        const higherCount = sortedRelativeDiffs.slice(0, index).filter(value => value !== relativeDiff).length

        const tooltip = d3.select("#tooltip")
            .html(`<strong>Check ranking: #${higherCount + 1}</strong><hr><strong>Synd. weight diff.:</strong> ${d.score.best_synd_diff}<strong>\nCorrection size:</strong> ${d.score.best_flips.hor_flips.length + d.score.best_flips.ver_flips.length}`)
            .style("top", `${parseInt(d3.select(this).attr("cy"))}px`)
            .style("left", `${loc["x"] + 3*radius}px`)
            .style("display", "inline-block")
    }
}

function helpButtonMouseOver() {
    let svg = d3.select("#vis").select("svg")

    d3.select("#info-tooltip")
        .style("display", "inline-block")
}

function helpButtonMouseOut() {
    d3.select("#info-tooltip").style("display", "none")
}

function handleXGenScoredMouseOut() {
    let svg = d3.select("#vis").select("svg")
    
    svg.selectAll(".vv_qubit").style("opacity", 1)
    svg.selectAll(".cc_qubit").style("opacity", 1)
    svg.selectAll(".z_gen").style("opacity", 1)
    svg.selectAll(".x_gen_scored").style("opacity", 1)
    svg.selectAll(".edge").style("opacity", 0) 
    svg.selectAll(".ver-edge").style("opacity", 0) 

    d3.select("#tooltip").style("display", "none")
}


function handleNodeMouseOut() {
    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".bit-node").style("opacity", 1)
    svg.selectAll(".check-node").style("opacity", 1) 
    svg.selectAll(".edge").style("opacity", 0.5) 
}

function handleNodeMouseOutNoEdges() {
    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".bit-node").style("opacity", 1)
    svg.selectAll(".check-node").style("opacity", 1) 
}

function handleQubitMouseOut() {
    let svg = d3.select("#vis").select("svg")
    
    svg.selectAll(".vv_qubit").style("opacity", 1)
    svg.selectAll(".cc_qubit").style("opacity", 1)
    svg.selectAll(".z_gen").style("opacity", 1)
    svg.selectAll(".x_gen").style("opacity", 1)
    svg.selectAll(".edge").style("opacity", 0) 
    svg.selectAll(".ver-edge").style("opacity", 0) 
}

function handleQubitMouseOutScoring() {
    let svg = d3.select("#vis").select("svg")
    
    svg.selectAll(".vv_qubit").style("opacity", 1)
    svg.selectAll(".cc_qubit").style("opacity", 1)
    svg.selectAll(".z_gen").style("opacity", 1)
    svg.selectAll(".edge").style("opacity", 0) 
    svg.selectAll(".ver-edge").style("opacity", 0) 
}


function handleBitNodeClick(event, d) {
    const connectedNodes = edges.map(edge => { return (edge.target === d.ind) ? edge.source : -1 }).filter(node => node >= 0)
    checkNodes.forEach((node, i) => { if (connectedNodes.includes(i)) { node.error = !node.error } })
    d.error = !d.error 
    updateNodeColors()
    updateDeltas()
}

function handleCheckNodeClick(event, d) {
    d.mask = !d.mask
    updateNodeColors()
    updateDeltas()
}

function handleZGenClick(event, d) {
    d.mask = !d.mask
    updateScoreGenerators()
    updateQubitColors()
}

function handleXGenScoredClick(event, d) {
    const horConnectedNodes = edges.filter(edge => edge.target === d.xind)
    const verConnectedNodes = edges.filter(edge => edge.source === d.yind)
    const horFlips = d.score.best_flips.hor_flips.map(i => horConnectedNodes[i].source)
    const verFlips = d.score.best_flips.ver_flips.map(i => verConnectedNodes[i].target)

    vv.flat(1).forEach(node => { if (node.xind === d.xind && verFlips.includes(node.yind) && d.score.best_synd_diff) { handleQubitClick(null, node) }})
    cc.flat(1).forEach(node => { if (node.yind === d.yind && horFlips.includes(node.xind) && d.score.best_synd_diff) { handleQubitClick(null, node) }})
    updateScoreGenerators()
    updateQubitColors()
}

function handleQubitClick(event, d) {
    if (d.type) {
        const verConnectedNodes = edges.map(edge => { return (edge.source === d.yind) ? edge.target : -1 }).filter(node => node >= 0)
        z_gens.flat(1).forEach((node, i) => { if (node.xind == d.xind && verConnectedNodes.includes(node.yind)) { node.error = !node.error }})
        const horConnectedNodes = edges.map(edge => { return (edge.source === d.xind) ? edge.target : -1 }).filter(node => node >= 0)
        x_gens.flat(1).forEach((node, i) => { if (node.yind == d.yind && horConnectedNodes.includes(node.xind)) { node.error = !node.error }})

    } else {
        const horConnectedNodes = edges.map(edge => { return (edge.target === d.xind) ? edge.source : -1 }).filter(node => node >= 0)
        z_gens.flat(1).forEach((node, i) => { if (node.yind == d.yind && horConnectedNodes.includes(node.xind)) { node.error = !node.error }})
        const verConnectedNodes = edges.map(edge => { return (edge.target === d.yind) ? edge.source : -1 }).filter(node => node >= 0)
        x_gens.flat(1).forEach((node, i) => { if (node.xind == d.xind && verConnectedNodes.includes(node.yind)) { node.error = !node.error }})
    }
    d.error = !d.error
    updateScoreGenerators()
    updateQubitColors()
}

function updateQubitColors() {
    let svg = d3.select("#vis").select("svg")
    svg.selectAll(".vv_qubit").style("fill", node => node.error ? colors["Red"] : colors["Normal"])
    svg.selectAll(".cc_qubit").style("fill", node => node.error ? colors["Red"] : colors["Normal"])
    svg.selectAll(".z_gen").style("fill", node => node.mask ? (node.error ? "url(#diagonalRed)" : "url(#diagonalNormal)") 
                                                                            : (node.error ? colors["Red"] : colors["Normal"]))
    svg.selectAll(".x_gen").style("fill", node => node.mask ? (node.error ? "url(#diagonalRed)" : "url(#diagonalWhite)") 
                                                                            : (node.error ? colors["Red"] : colors["Normal"]))
    svg.selectAll(".x_gen_scored").style("fill", function(d) { return myColor(d.score.best_synd_diff/d.score.best_weight)})
}

function updateNodeColors() {
    let svg = d3.select("#vis").select("svg")
    svg.selectAll(".bit-node").style("fill", node => node.error ? colors["Red"] : colors["Normal"])
    svg.selectAll(".check-node").style("fill", node => node.mask ? (node.error ? "url(#diagonalRed)" : "url(#diagonalNormal)") 
                                                                              : (node.error ? colors["Red"] : colors["Normal"]))
}

function updateDeltas() {
    let bitNodesCopy = structuredClone(bitNodes)
    let currSyndWeight = checkNodes.filter(node => (node.error && !node.mask)).length

    let newDValues = bitNodesCopy.map(d => {
        let checkNodesCopy = structuredClone(checkNodes)

        const connectedNodes = edges.map(edge => { return (edge.target === d.ind) ? edge.source : -1 }).filter(node => node >= 0)
        checkNodesCopy.forEach((node, i) => { if (connectedNodes.includes(i)) { node.error = !node.error } })
        return checkNodesCopy.filter(node => (node.error && !node.mask)).length
    })

    dValues = newDValues.map((d,i) => d - currSyndWeight)

    const yScale = d3.scaleLinear()
        .domain([0, 3])
        .range([0, barHeight])

    const svg = d3.select("#vis").select("svg")
    const bitNodeBars = svg.selectAll(".bit-node-bar")

    bitNodeBars
        .data(dValues)
        .transition()
        .attr("y", (d) => d >= 0 ? height / 2 + radius - 2*radius - 10 - yScale(Math.abs(d)) : height / 2 + radius + 10)
        .attr("height", (d) => yScale(Math.abs(d)))
        .attr("fill", (d) => d >= 0 ? colors["Red"] : colors["Blue"])

}



function createColorLegend() {
    let svg = d3.select("#legend")

    const labels = ["0+", "-1", "-2", "-3", "-4"]
    const svgWidth = 400
    const colors = Array.from({ length: 5 }, (_, i) => {
        const color = myColor(i).toString();
        return color;
    });
    
    const barWidth = svgWidth / colors.length;

    svg.selectAll("rect")
        .data(colors)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("y", 30)
        .attr("width", barWidth)
        .attr("height", 20)
        .style("fill", (d) => d);

    svg.selectAll("text")
        .data(labels)
        .enter()
        .append("text")
        .text((d) => d)
        .attr("x", (d, i) => i * barWidth + barWidth / 2)
        .attr("y", 70)
        .style("text-anchor", "middle")
        .style("font-size", "12px");

    svg.append("text")
        .text("Relative syndrome weight difference")
        .attr("x", svgWidth / 2)
        .attr("y", 20)
        .style("text-anchor", "middle")
        .style("font-size", "16px");

}


function randomError(loc) {
    if (loc === 0) {
        p = d3.select("#error_p").property("value")
    } else {
        p = 0
    }

    vv.flat(1).forEach(node => node.error = false)
    cc.flat(1).forEach(node => node.error = false)
    z_gens.flat(1).forEach(node => node.error = false)
    x_gens.flat(1).forEach(node => node.error = false)
    vv.flat(1).forEach((node, i) => { if (Math.random() < p) { handleQubitClick(null, node) }})
    cc.flat(1).forEach((node, i) => { if (Math.random() < p) { handleQubitClick(null, node) }})

    updateScoreGenerators()
    updateQubitColors()
}

function randomMask(loc) {
    if (loc === 0) {
        p = d3.select("#mask_p").property("value")
    } else {
        p = 0
    }

    z_gens.flat(1).forEach(node => node.mask = false)
    z_gens.flat(1).forEach((node, i) => { if (Math.random() < p) { handleZGenClick(null, node) }})

    updateScoreGenerators()
    updateQubitColors()
}


// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their "opacity" attribute
// Each element should also have an associated class name for easy reference

function drawInitial() {
    d3.select("#legend").selectAll("*").remove()
    d3.select('#vis').selectAll("*").remove()

    createColorLegend() 

    let svg = d3.select("#vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("opacity", 1)

    for (var color in colors) {
        svg.append('defs')
            .append('pattern')
            .attr('id', 'diagonal'+color)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 4)
            .attr('height', 4)
            .append('rect')
            .attr('width', 4)
            .attr('height', 4)
            .attr('x', 0)
            .attr('x', 0)
            .attr('fill', colors[color] )

        d3.select('#diagonal'+color).append('path')
            .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.75)
            .attr("opacity", 1)
    }
      
  
    // // Create the links (edges)
    const link = svg.append("g")
        .selectAll(".edge")
        .data(edges)
        .enter().append("path")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 1.5)
        .style("opacity", 0)
        .attr("class", "edge")
        .style("pointer-events", "none")
        .attr("d", (d) => {
            const startX = (d.target + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
            const startY = height / 2
            const endX = (d.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
            const midX = (endX - startX) / 2 + startX
            const midY = startY - ((endX - startX) / edgeCurviture)

            return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
        })

    const verLink = svg.append("g")
        .selectAll(".ver-edge")
        .data(edges)
        .enter().append("path")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", 1.5)
        .style("opacity", 0)
        .style("pointer-events", "none")
        .attr("class", "ver-edge")

    // Create the bit nodes
    const bitNode = svg.append("g")
        .selectAll(".bit-node")
        .data(bitNodes)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("cx", (d, i) => (i + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))) // Position the bit nodes evenly on the lin
        .attr("cy", height/2)
        .style("opacity", 0)
        .style("pointer-events", "none")
        .attr("class", "bit-node")
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .on("mouseover", handleNodeMouseOver)
        .on("mouseout", handleNodeMouseOut)
        .on("click", handleBitNodeClick)

    // Calculate the coordinates for the bracket-like curve
    let startPointX = (1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))
    let startPointY = height / 2 + radius + 10
    let controlPointY1 = startPointY + curveHeight / 2
    let endPointX = (bitNodes.length + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))

    // Create the bracket-like curve path
    let curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    // Create the bit nodes underline
    const bitNodesUnderline = svg.append("path")
        .attr("class", "underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-width", 2)
        .style("opacity", 0)

    // Create the bit nodes label
    const bitNodesLabel = svg.append("text")
        .attr("class", "underline_label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", height / 2 + radius + curveHeight + 20)
        .style("font-family", "Domine")
        .text("Bits")
        .attr("text-anchor", "middle")
        .style("opacity", 0)

    // Create the check nodes
    const checkNode = svg.append("g")
        .selectAll(".check-node")
        .data(checkNodes)
        .enter().append("circle")
        .attr("r", radius)
        .attr("cx", (d, i) => (i + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))) // Position the check nodes evenly on the line, with a space between the bit nodes and check nodes
        .attr("cy", height/2)
        .attr("class", "check-node")
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .on("mouseover", handleNodeMouseOver)
        .on("mouseout", handleNodeMouseOut)        


    // Calculate the coordinates for the bracket-like curve
    startPointX = (bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) 
    startPointY = height / 2 + radius + 10
    controlPointY1 = startPointY + curveHeight / 2 
    endPointX = (bitNodes.length + checkNodes.length - 1 + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))

    // Create the bracket-like curve path
    curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    // Create the check nodes underline
    const checkNodesUnderline = svg.append("path")
        .attr("class", "underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .style("opacity", 0)
        .attr("stroke-width", 2)

    // Create the check nodes label
    const checkNodesLabel = svg.append("text")
        .attr("class", "underline_label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", height / 2 + radius + curveHeight + 20)
        .style("font-family", "Domine")
        .text("Checks")
        .attr("text-anchor", "middle")
        .style("opacity", 0)
 

    //-------------------------------------------------------------

    // Define the dimensions of the bars
    let yScale = d3.scaleLinear()
        .domain([0, 3])
        .range([0, barHeight])

    // Create the bar chart for bit nodes
    const bitNodeBars = svg.append("g")
        .selectAll(".bit-node-bar")
        .data(dValues)
        .enter()
        .append("rect")
        .attr("class", "bit-node-bar")
        .attr("x", (d, i) => (i + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) - radius + (2*radius - barWidth)/2)
        .attr("y", (d) => d >= 0 ? height / 2 + radius - 2*radius - 10 - yScale(Math.abs(d)) : height / 2 + radius + 10)
        .attr("width", barWidth)
        .attr("height", (d) => yScale(Math.abs(d)))
        .attr("fill", (d) => d >= 0 ? colors["Red"] : colors["Blue"])
        .style("opacity", 0)
        .style("pointer-events", "none")
    updateDeltas()
        
    const yScalePos = d3.scaleLinear()
        .domain([0, maxHeight])
        .range([height / 2 - 10 - radius, height / 2 - barHeight - radius - 10])
    const yScaleNeg = d3.scaleLinear()
        .domain([0, -maxHeight])
        .range([height / 2 + 10 + radius, height / 2 + barHeight + radius + 10])

    const yAxisPath = svg.append("g")
        .attr("class", "y-axis")
        .style("opacity", 0)
        .attr("transform", `translate(${ (1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft)) / 2}, 0)`)
    yAxisPath.append("path")
        .attr("d", `M 0 ${yScalePos(0)} V ${yScalePos(maxHeight)}`)
        .attr("stroke", "gray")
    yAxisPath.append("path")
        .attr("d", `M 0 ${yScaleNeg(0)} V ${yScaleNeg(-maxHeight)}`)
        .attr("stroke", "gray")
    yAxisPath.append("path")
        .attr("d", `M 0 ${height/2 - radius - 10} V ${height/2 + radius + 10}`)
        .attr("stroke", "gray")

    const yAxisTicksPos = yAxisPath.selectAll(".y-axis-tick-pos")
        .data(yScalePos.ticks().filter((d) => Number.isInteger(d)))
        .enter()
        .append("g")
        .attr("class", "y-axis-tick-pos")
        .attr("transform", (d) => `translate(0, ${yScalePos(d)})`)
    yAxisTicksPos.append("path")
        .attr("d", `M 0 0 H 5`)
        .attr("stroke", "gray")
    yAxisTicksPos.append("text")
        .attr("x", 23)
        .attr("y", 4)
        .attr("text-anchor", "end")
        .style("font-family", "Domine")
        .text((d) => d)

    const yAxisTicksNeg = yAxisPath.selectAll(".y-axis-tick-neg")
        .data(yScaleNeg.ticks().filter((d) => Number.isInteger(d)))
        .enter()
        .append("g")
        .attr("class", "y-axis-tick-neg")
        .attr("transform", (d) => `translate(0, ${yScaleNeg(d)})`)
    yAxisTicksNeg.append("path")
        .attr("d", `M 0 0 H 5`)
        .attr("stroke", "gray")
    yAxisTicksNeg.append("text")
        .attr("x", 23)
        .attr("y", 4)
        .attr("text-anchor", "end")
        .style("font-family", "Domine")
        .text((d) => d)

    yAxisPath.append("text")
        .attr("class", "axis-label")
        .attr("x", -height/2)  // Adjust the x-position as needed
        .attr("y", -20)  // Adjust the y-position as needed
        .attr("text-anchor", "middle")
        .attr("font-family", "Domine")
        .attr("transform", "rotate(-90)")  // Rotate the label by -90 degrees
        .text("Syndrome weight difference")

    const arrow = svg.append("g")
        .attr("class", "arrow")
        .style("opacity", 0)
        .attr("transform", `translate(${(2 + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) - 16}, ${height/2 - 30 - radius - 10})`)
    arrow.append("path")
        .attr("d", "M 0 0 L 16 30 L 32 0 L 24 0 L 24 -31 L 8 -31 L 8 0 Z")
    arrow.append("text")
        .attr("x", 15)
        .attr("y", -40)
        .text("This is a mask")
        .style("font-family", "Domine")
        .style("text-anchor", "middle")

    // ---------------------------------------------------------------


    const vv_row = svg
		.append("g")
		.selectAll(".vv_row")
		.data(vv)
		.enter()
		.append("g")
		.attr("class", "vv_row")
	const vv_column = vv_row.selectAll(".vv_qubit")
		.data(function(d) { return d })
		.enter()
        .append("circle")
		.attr("class", "vv_qubit")
        .attr("r", radius)
        .attr("cx", (d, i) => (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)))
        .attr("cy", (d, i) => (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .on("mouseover", handleQubitMouseOver)
        .on("mouseout", handleQubitMouseOut)
        .on("click", handleQubitClick)

    const cc_row = svg
		.append("g")
		.selectAll(".cc_row")
		.data(cc)
		.enter()
		.append("g")
		.attr("class", "cc_row")
	const cc_column = cc_row.selectAll(".cc_qubit")
		.data(function(d) { return d })
		.enter()
        .append("circle")
		.attr("class", "cc_qubit")
        .attr("r", radius)
        .attr("cx", (d, i) => (d.xind + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))) 
        .attr("cy", (d, i) => (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
        .style("opacity", 0)
        .style("pointer-events", "none")
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .on("mouseover", handleQubitMouseOver)
        .on("mouseout", handleQubitMouseOut)
        .on("click", handleQubitClick)


    const z_gen_row = svg
		.append("g")
		.selectAll(".z_gen_row")
		.data(z_gens)
		.enter().append("g")
		.attr("class", "z_gen_row")
	const z_gen_column = z_gen_row.selectAll(".z_gen")
		.data(function(d) {return d})
		.enter().append("circle")
		.attr("class", "z_gen")
        .attr("r", radius)
        .attr("cx", (d, i) => (d.xind + bitNodes.length + marginLeft + gap) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))) 
        .attr("cy", (d, i) => (d.yind + 1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
        .style("opacity", 0)
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .style("pointer-events", "none")
        .on("mouseover", handleGenMouseOver)
        .on("mouseout", handleQubitMouseOut)


    const x_gen_scored_row = svg
        .append("g")
        .selectAll(".x_gen_scored_row")
        .data(x_gens)
        .enter().append("g")
        .attr("class", "x_gen_scored_row")
    const x_gen_scored_column = x_gen_scored_row.selectAll(".x_gen_scored")
        .data(function(d) {return d})
		.enter().append("circle")
		.attr("class", "x_gen_scored")
        .attr("r", radius)
        .attr("cx", (d, i) => (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)))
        .attr("cy", (d, i) => (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
        .style("opacity", 0)
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .style("pointer-events", "none")
        .on("mouseover", handleXGenScoredMouseOver)
        .on("mouseout", handleXGenScoredMouseOut)
        .on("click", handleXGenScoredClick)

    const x_gen_row = svg
        .append("g")
        .selectAll(".x_gen_row")
        .data(x_gens)
        .enter().append("g")
        .attr("class", "x_gen_row")
    const x_gen_column = x_gen_row.selectAll(".x_gen")
        .data(function(d) {return d})
		.enter().append("circle")
		.attr("class", "x_gen")
        .attr("r", radius)
        .attr("cx", (d, i) => (d.xind + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)))
        .attr("cy", (d, i) => (d.yind + bitNodes.length + gap + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
        .style("opacity", 0)
        .style("fill", colors["Normal"])
        .style("stroke", colors["Black"])
        .style("pointer-events", "none")
        .on("mouseover", handleGenMouseOver)
        .on("mouseout", handleQubitMouseOut)

    startPointX = (bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) 
    startPointY =  (checkNodes.length + bitNodes.length + gap + marginTop - 1) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)) + radius + 10
    controlPointY1 = startPointY + curveHeight / 2 
    endPointX = (bitNodes.length + checkNodes.length - 1 + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))

    curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    const ccQubitUnderline = svg.append("path")
        .attr("class", "quantum-underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .style("opacity", 0)
        .attr("stroke-width", 2)

    const ccQubitLabel = svg.append("text")
        .attr("class", "quantum-underline-label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", (startPointY + curveHeight + radius/2))
        .style("font-family", "Domine")
        .text("Qubits")
        .attr("text-anchor", "middle")
        .style("opacity", 0)

    // startPointY = (1 + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom))
    // endPointY = ((bitNodes.length + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)))
    // startPointX = (bitNodes.length + checkNodes.length - 1 + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) + radius + 10 
    // controlPointX1 = startPointX + curveHeight / 2 

    // curvePath = `M ${startPointX} ${startPointY} C ${controlPointX1} ${startPointY}, ${controlPointX1} ${endPointY}, ${startPointX} ${endPointY}`

    // const zGenUnderline = svg.append("path")
    //     .attr("class", "quantum-underline")
    //     .attr("d", curvePath)
    //     .attr("fill", "none")
    //     .attr("stroke", "#555")
    //     .style("opacity", 0)
    //     .attr("stroke-width", 2)

    // const zGenLabel = svg.append("text")
    //     .attr("class", "quantum-underline-label")
    //     .attr("x", controlPointX1)
    //     .attr("y", (endPointY - startPointY) / 2 + startPointY + radius + 7)
    //     .style("font-family", "Domine")
    //     .text("Z-type checks")
    //     .attr("transform", `rotate(-90 ${controlPointX1} ${ (endPointY - startPointY) / 2 + startPointY})`)  // Rotate the label by -90 degrees
    //     .attr("text-anchor", "middle")
    //     .style("opacity", 0)

    startPointY =  (bitNodes.length + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)) + radius + 10
    controlPointY1 = startPointY + curveHeight / 2 
    curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    const zGenUnderline = svg.append("path")
        .attr("class", "quantum-underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .style("opacity", 0)
        .attr("stroke-width", 2)

    const zGenLabel = svg.append("text")
        .attr("class", "quantum-underline-label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", (startPointY + curveHeight + radius/2))
        .style("font-family", "Domine")
        .text("Z-type checks")
        .attr("text-anchor", "middle")
        .style("opacity", 0)

    startPointY =  (checkNodes.length + bitNodes.length + gap + marginTop - 1) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)) + radius + 10
    controlPointY1 = startPointY + curveHeight / 2 
    startPointX = (1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))
    endPointX = (bitNodes.length + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight))
    curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    const xGenUnderline = svg.append("path")
        .attr("class", "quantum-underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .style("opacity", 0)
        .attr("stroke-width", 2)

    const xGenLabel = svg.append("text")
        .attr("class", "quantum-underline-label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", (startPointY + curveHeight + radius/2))
        .style("font-family", "Domine")
        .text("X-type checks")
        .attr("text-anchor", "middle")
        .style("opacity", 0)

    startPointY =  (bitNodes.length + marginTop) * (height / (bitNodes.length + checkNodes.length + gap + marginTop + marginBottom)) + radius + 10
    controlPointY1 = startPointY + curveHeight / 2
    curvePath = `M ${startPointX} ${startPointY} C ${startPointX} ${controlPointY1}, ${endPointX} ${controlPointY1}, ${endPointX} ${startPointY}`

    const vvQubitUnderline = svg.append("path")
        .attr("class", "quantum-underline")
        .attr("d", curvePath)
        .attr("fill", "none")
        .attr("stroke", "#555")
        .style("opacity", 0)
        .attr("stroke-width", 2)

    const vvQubitLabel = svg.append("text")
        .attr("class", "quantum-underline-label")
        .attr("x", (endPointX - startPointX) / 2 + startPointX)
        .attr("y", (startPointY + curveHeight + radius/2))
        .style("font-family", "Domine")
        .text("Qubits")
        .attr("text-anchor", "middle")
        .style("opacity", 0)

    const questionContainer = svg.append("g")
        .attr("class", "question-container")
        .attr("transform", `translate(${width-30}, 30)`)
        .on("mouseover", helpButtonMouseOver)
        .on("mouseout", helpButtonMouseOut)
        .style("opacity", 0)
        .style("pointer-events", "none")
      
    questionContainer.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 15)
      
    questionContainer.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "20px")
        .style("font-family", "Domine")
        .style("fill", "#ffffff")
        .style("pointer-events", "none")
        .text("?");

    const loc = d3.select(".question-container").node().getBoundingClientRect()
    const infoTooltip = d3.select("#info-tooltip")
        .style("left", loc["x"]+7.5-200)
        .style("top", 60)
        
}




//Cleaning Function
//Will hide all the elements which are not necessary for a given chart type 
function clean(chartNum){
    let svg = d3.select("#vis").select("svg")
    
    if (chartNum === 1) {
        svg.select(".question-container").transition().style("opacity", 0)
        svg.select(".question-container").style("pointer-events", "none")
    }
    if (chartNum !== 2 && chartNum !== 3 && chartNum !== 4) {
        svg.selectAll(".bit-node").transition().style("opacity", 0)
        svg.selectAll(".bit-node").style("pointer-events", "none")

        svg.selectAll(".check-node").transition().style("opacity", 0)
        svg.selectAll(".check-node").style("pointer-events", "none")
    }
    if (chartNum !== 2) {
        svg.selectAll(".edge").transition().style("opacity", 0)
        svg.selectAll(".edge").attr("d", (d) => {
            const startX = (d.target + 1 + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // bit node
            const startY = height / 2
            const endX = (d.source + bitNodes.length + gap + marginLeft) * (width / (bitNodes.length + checkNodes.length + gap + marginLeft + marginRight)) // check node
            const midX = (endX - startX) / 2 + startX
            const midY = startY - ((endX - startX) / edgeCurviture)

            return `M${startX},${startY} Q${midX},${midY} ${endX},${startY}`
        })
        svg.selectAll(".underline").transition().style("opacity", 0)
        svg.selectAll(".underline_label").transition().style("opacity", 0)
    }
    if (chartNum !== 3 && chartNum !== 4) {
        svg.select(".y-axis").transition().style("opacity", 0)
        svg.selectAll(".bit-node-bar").transition().style("opacity", 0)
    }
    if (chartNum !== 4) {
        svg.select(".arrow").transition().style("opacity", 0)
    }
    if (chartNum !== 5 && chartNum !== 6 && chartNum !== 7 && chartNum !== 8 && chartNum !== 9) {
        svg.selectAll(".vv_qubit").transition().style("opacity", 0)
        svg.selectAll(".vv_qubit").style("pointer-events", "none")

        svg.selectAll(".cc_qubit").transition().style("opacity", 0)
        svg.selectAll(".cc_qubit").style("pointer-events", "none")

        svg.selectAll(".z_gen").transition().style("opacity", 0)
        svg.selectAll(".z_gen").style("pointer-events", "none")
    }
    if (chartNum !== 5) {
        svg.selectAll(".x_gen").transition().style("opacity", 0)
        svg.selectAll(".x_gen").style("pointer-events", "none")

        svg.selectAll(".quantum-underline").transition().style("opacity", 0)
        svg.selectAll(".quantum-underline-label").transition().style("opacity", 0)
    }
    if (chartNum !== 6 && chartNum !== 7 && chartNum !== 8 && chartNum !== 9) {
        svg.selectAll(".x_gen_scored").transition().style("opacity", 0)
        svg.selectAll(".x_gen_scored").style("pointer-events", "none")
    }
}


function draw1() {
    clean(1)
    // header image
}

function draw2() {
    clean(2)

    let svg = d3.select("#vis").select("svg")
    let bitNode = svg.selectAll(".bit-node")
    bitNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOver)
        .on("mouseout", handleNodeMouseOut)
        .transition().style("opacity", 1)

    let checkNode = svg.selectAll(".check-node")
    checkNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOver)
        .on("mouseout", handleNodeMouseOut)
        .transition().style("opacity", 1)
    
    svg.selectAll(".edge").transition().style("opacity", 0.5)
    svg.selectAll(".underline").transition().duration(500).style("opacity", 1)
    svg.selectAll(".underline_label").transition().duration(500).style("opacity", 1)

    svg.selectAll(".question-container").transition().style("opacity", 1)
    svg.selectAll(".question-container").style("pointer-events", "auto")
    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the bit nodes to toggle an error and update the syndrome.")
}


function draw3(){
    clean(3)

    let svg = d3.select("#vis").select("svg")
    let bitNode = svg.selectAll(".bit-node")
    bitNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOverNoEdges)
        .on("mouseout", handleNodeMouseOutNoEdges)
        .transition().style("opacity", 1)

    let checkNode = svg.selectAll(".check-node")
    checkNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOverNoEdges)
        .on("mouseout", handleNodeMouseOutNoEdges)
        .transition().style("opacity", 1)

    svg.selectAll(".bit-node-bar").transition().style("opacity", 1)
    svg.select(".y-axis").transition().style("opacity", 1)

    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the bit nodes to toggle an error and update the syndrome.")
}

function draw4() {
    clean(4)
 
    let svg = d3.select("#vis").select("svg")

    let bitNode = svg.selectAll(".bit-node")
    bitNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOverNoEdges)
        .on("mouseout", handleNodeMouseOutNoEdges)
        .transition().style("opacity", 1)
    let checkNode = svg.selectAll(".check-node")
    checkNode
        .style("pointer-events", "auto")
        .on("mouseover", handleNodeMouseOverNoEdges)
        .on("mouseout", handleNodeMouseOutNoEdges)
        .on("click", handleCheckNodeClick)
        .transition().style("opacity", 1)

    let bitNodeBar = svg.selectAll(".bit-node-bar")
    if (bitNodeBar.style("opacity") === "0") {
        bitNodeBar.transition().style("opacity", 1)
    } else {
        checkNodes[2].mask = true
        updateNodeColors()
        updateDeltas()
    }

    svg.select(".y-axis").transition().style("opacity", 1)
    svg.select(".arrow").transition().style("opacity", 1)  
    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the bit nodes to toggle an error and update the syndrome.\n\nClick the check nodes to toggle a mask and update the decoder.")

}

function draw5() {
    clean(5)

    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".vv_qubit").transition().style("opacity", 1)
    svg.selectAll(".vv_qubit").style("pointer-events", "auto")
    svg.selectAll(".vv_qubit").on("mouseover", handleQubitMouseOver)
    svg.selectAll(".vv_qubit").on("mouseout", handleQubitMouseOut)

    svg.selectAll(".cc_qubit").transition().style("opacity", 1)
    svg.selectAll(".cc_qubit").style("pointer-events", "auto")
    svg.selectAll(".cc_qubit").on("mouseout", handleQubitMouseOut)
    svg.selectAll(".cc_qubit").on("mouseover", handleQubitMouseOver)

    svg.selectAll(".z_gen").transition().style("opacity", 1)
    svg.selectAll(".z_gen").style("pointer-events", "auto")
    svg.selectAll(".z_gen").on("mouseout", handleQubitMouseOut)

    svg.selectAll(".x_gen").transition().style("opacity", 1)
    svg.selectAll(".x_gen").style("pointer-events", "auto")

    svg.selectAll(".quantum-underline").transition().style("opacity", 1)

    svg.selectAll(".quantum-underline-label").transition().style("opacity", 1)
    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the qubit nodes to toggle an error and update the X- and Z-type syndromes.")

}

function draw6() {
    clean(6)

    let svg = d3.select("#vis").select("svg")
    svg.selectAll(".vv_qubit").on("mouseover", handleQubitMouseOverScoring)
    svg.selectAll(".vv_qubit").on("mouseout", handleQubitMouseOutScoring)

    svg.selectAll(".cc_qubit").on("mouseover", handleQubitMouseOverScoring)
    svg.selectAll(".cc_qubit").on("mouseout", handleQubitMouseOutScoring)

    svg.selectAll(".z_gen").on("mouseout", handleQubitMouseOutScoring)
    
    svg.selectAll(".x_gen_scored").transition().style("opacity", 1)
    svg.selectAll(".x_gen_scored").style("pointer-events", "auto")

    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the qubit nodes to toggle an error and update the X- and Z-type syndromes.\n\nHover over a (colored) X-type check to see its overall ranking, the resulting syndrome weight difference, and the size of the correction. Any visible edge(s) to qubit(s) indicate the best small-set to flip for that check. Click an X-type check to apply the specified correction.")
}

function draw7() {
    clean(7)
  
    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".z_gen").on("click", handleZGenClick)

    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the qubit nodes to toggle an error and update the X- and Z-type syndromes.\n\nHover over a (colored) X-type check to see its overall ranking, the resulting syndrome weight difference, and the size of the correction. Any visible edge(s) to qubit(s) indicate the best small-set to flip for that check. Click an X-type check to apply the specified correction.\n\nClick a Z-type check to toggle a mask and update the decoder.")

    z_gens.flat(1).forEach(node => (Math.random() < 0.2) ? node.mask = true : node.mask = false)
    z_gens[0][0].mask = true;

    updateScoreGenerators()
    updateQubitColors()
}

function draw8() {
    clean(8)

    z_gens.flat(1).forEach(node => (Math.random() < 0.5) ? node.mask = true : node.mask = false)

    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the qubit nodes to toggle an error and update the X- and Z-type syndromes.\n\nHover over a (colored) X-type check to see its overall ranking, the resulting syndrome weight difference, and the size of the correction. Any visible edge(s) to qubit(s) indicate the best small-set to flip for that check. Click an X-type check to apply the specified correction.\n\nClick a Z-type check to toggle a mask and update the decoder.")

    updateScoreGenerators()
    updateQubitColors()
}

function draw9() {
    clean(9)

    let svg = d3.select("#vis").select("svg")

    svg.selectAll(".vv_qubit").transition().style("opacity", 1)
    svg.selectAll(".vv_qubit").style("pointer-events", "auto")
    svg.selectAll(".vv_qubit").on("mouseover", handleQubitMouseOverScoring)
    svg.selectAll(".vv_qubit").on("mouseout", handleQubitMouseOutScoring)

    svg.selectAll(".cc_qubit").transition().style("opacity", 1)
    svg.selectAll(".cc_qubit").style("pointer-events", "auto")
    svg.selectAll(".cc_qubit").on("mouseover", handleQubitMouseOverScoring)
    svg.selectAll(".cc_qubit").on("mouseout", handleQubitMouseOutScoring)

    svg.selectAll(".z_gen").transition().style("opacity", 1)
    svg.selectAll(".z_gen").style("pointer-events", "auto")
    svg.selectAll(".z_gen").on("mouseout", handleQubitMouseOutScoring)
    
    svg.selectAll(".x_gen_scored").transition().style("opacity", 1)
    svg.selectAll(".x_gen_scored").style("pointer-events", "auto")

    svg.selectAll(".question-container").transition().style("opacity", 1)
    svg.selectAll(".question-container").style("pointer-events", "auto")

    d3.select("#info-tooltip").text("Hover over the nodes to see the connections in the code. Click the qubit nodes to toggle an error and update the X- and Z-type syndromes.\n\nHover over a (colored) X-type check to see its overall ranking, the resulting syndrome weight difference, and the size of the correction. Any visible edge(s) to qubit(s) indicate the best small-set to flip for that check. Click an X-type check to apply the specified correction.\n\nClick a Z-type check to toggle a mask and update the decoder.\n\nAdd a random error or mask by entering the probability of any given node having an error/mask (enter a number between 0 and 1).")

    if (bitNodes.length === 7) {
        let face = [false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false]
        // let heart = [false, false, false, false, false, false, false, false, true, true, false, true, true, false, true, false, false, true, false, false, true, true, false, false, false, false, false, true, false, true, false, false, false, true, false, false, false, true, false, true, false, false, false, false, false, true, false, false, false]
        vv.flat(1).forEach(node => node.error = false)
        cc.flat(1).forEach(node => node.error = false)
        z_gens.flat(1).forEach(node => node.error = false)
        x_gens.flat(1).forEach(node => node.error = false)

        vv.flat(1).forEach((node, i) => { if (face[i]) { handleQubitClick(null, node) }})

        updateScoreGenerators()
        updateQubitColors()
    }
}

// Array of all the graph functions
// Will be called from the scroller functionality
let activationFunctions = [
    draw1,
    draw2,
    draw3,
    draw4,
    draw5,
    draw6,
    draw7,
    draw8,
    draw9
]



//All the scrolling function
//Will draw a new graph based on the index provided by the scroll

let scroll = scroller()
    .container(d3.select("#graphic"))
scroll()

let lastIndex, activeIndex = 0

scroll.on("active", function(index){
    d3.selectAll(".step")
        .transition().duration(500)
        .style("opacity", function (d, i) {return i === index ? 1 : 0.1})
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign)
    scrolledSections.forEach(i => {
        activationFunctions[i]()
    })
    lastIndex = activeIndex

})

drawInitial()


