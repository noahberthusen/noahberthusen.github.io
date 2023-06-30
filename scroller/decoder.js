function computeGrayCode(dv) {
    res = []
    for (var i = 0; i < dv; i++) {
        res = res + [i] + res
    }
    return res
}

function horSubsetScore(hor_synd_diff, hor_weight, ver_synd_diff){
    let synd_diff = hor_synd_diff
    let ver_flips = new Array()
    let sorted_ver_synd_diff = ver_synd_diff.map(function(s, i) { return {s, i} })
    sorted_ver_synd_diff.sort((a, b) => a.s - b.s).reverse()

    let weight = hor_weight
    sorted_ver_synd_diff.forEach(function(s) {
        if (s.s * weight >= synd_diff) {
            synd_diff = synd_diff + s.s
            ver_flips.push(s.i)
            weight = weight + 1
        } 
    });
    return { synd_diff: synd_diff, ver_flips: ver_flips }
}


function scoreGen(synd_gen, synd_gen_mask) {
    let dc = synd_gen.length
    let dv = synd_gen[0].length

    let hor_weight = 0
    let hor_flips_array = new Array(dv).fill(false)
    let hor_synd_diff = 0
    let ver_synd_diff = new Array(dc).fill(0)
    for (let i = 0; i < dc; i++) {
        for (let j = 0; j < dv; j++) {
            if (!synd_gen_mask[i][j]) {
                ver_synd_diff[i] = ver_synd_diff[i] + 2*synd_gen[i][j] - 1
            }
        }
    }

    let _ = horSubsetScore(hor_synd_diff, hor_weight, ver_synd_diff)
    let best_synd_diff = _.synd_diff
    let ver_flips = _.ver_flips

    let best_weight = ver_flips.length
    let best_flips = { ver_flips: ver_flips, hor_flips: [] }

    let gray_code = computeGrayCode(dv)
    for (let g = 0; g < gray_code.length; g++) {
        j = parseInt(gray_code[g])
        if (hor_flips_array[j]) {
            hor_weight = hor_weight - 1
            hor_flips_array[j] = false
            for (let i = 0; i < dc; i++) {
                if (!synd_gen_mask[i][j]) {
                    ver_synd_diff[i] = ver_synd_diff[i] + 4*synd_gen[i][j] - 2
                    hor_synd_diff = hor_synd_diff - 2*synd_gen[i][j] + 1
                }
            }
        } else {
            hor_weight = hor_weight + 1
            hor_flips_array[j] = true
            for (let i = 0; i < dc; i++) {
                if (!synd_gen_mask[i][j]) {
                    ver_synd_diff[i] = ver_synd_diff[i] - 4*synd_gen[i][j] + 2
                    hor_synd_diff = hor_synd_diff + 2*synd_gen[i][j] - 1
                }
            }
        }

        _ = horSubsetScore(hor_synd_diff, hor_weight, ver_synd_diff)
        let synd_diff = _.synd_diff
        ver_flips = _.ver_flips

        let weight = hor_weight + ver_flips.length
        if (synd_diff * best_weight > best_synd_diff * weight) {
            best_synd_diff = synd_diff
            best_weight = weight
            best_flips = { ver_flips: ver_flips, hor_flips: [...Array(dv).keys()].filter(j => hor_flips_array[j]) }
        }
    }
    return { best_synd_diff: best_synd_diff, best_weight: best_weight, best_flips: best_flips }
}

function updateScoreGenerators() {
    for (let k = 0; k < m; k++) {
        for (let l = 0; l < n; l++) {
            let gen = x_gens[k][l]

            let synd_gen = new Array()
            let synd_mask = new Array()
            for (let i = 0; i < gen.vv_nbhd.length; i++) {
                synd_gen.push(new Array())
                synd_mask.push(new Array())
                for (let j = 0; j < gen.cc_nbhd.length; j++) {
                    synd_gen[i].push(z_gens[gen.vv_nbhd[i]][gen.cc_nbhd[j]].error)
                    synd_mask[i].push(z_gens[gen.vv_nbhd[i]][gen.cc_nbhd[j]].mask)
                }
            }
            gen.score = scoreGen(synd_gen, synd_mask)
        }
    }
    sortedRelativeDiffs = x_gens.flat(1).map(d => d.score.best_synd_diff/d.score.best_weight).sort((a,b) => b-a);
}