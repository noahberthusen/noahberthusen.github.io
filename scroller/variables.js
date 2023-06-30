// ------------------------------------------------
// -------------- VARIABLES -----------------------


const biadjacencyMatrixHam = [
  [1,0,1,0,1,0,1],
  [1,1,0,0,1,1,0],
  [1,1,1,1,0,0,0]
];
const biadjacencyMatrixExp = [
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0,],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0,],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0,],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0,],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0,],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0,],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,]
];
// const biadjacencyMatrix = [
//     [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,],
//     [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,],
//     [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,],
//     [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1,],
//     [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,],
//     [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
//     [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0,],
//     [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,],
//     [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0,],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,],
//     [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,],
//     [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,]
// ]

var biadjacencyMatrix = biadjacencyMatrixHam
const margin = {left: 0, top: 0, bottom: 20, right: 20}
const width = 0.5*window.innerWidth - margin.left - margin.right
const height = width

const colors = {
	"Red": "#EC4646",
	"Blue": "#5463FF",
	"Normal": "#EEEEEE",
	"Black": "black",
}

var myColor = d3.scaleLinear()
	.range([colors["Normal"], colors["Blue"]])
	.domain([0, 4])


const marginLeft = 2;           // nodes left margin (extra node width multiplier)
const marginTop = 1;
const marginBottom = 2;
const marginRight = 1;

const gap = 2;                  // gap between bit and check nodes
var radius = width / (3 *(biadjacencyMatrix.length + biadjacencyMatrix[0].length + gap + marginTop + marginBottom));   
const curveHeight = 20;         // amount of curve in the bit/check node labels
const edgeCurviture = 4;     // curviture of the tanner graph edges (smaller is more curvy)
const highlightOpacity = 0.1;

var barWidth = 1.5*radius;            // width of delta syndrome bars
var barHeight = 2*radius + 50;     // max height of delta syndrome bars 
const maxHeight = 3;            // max synd diff, depends on code we're using. All three have maxHeight of 3


// -------------------------------------------------


function createBiPartiteGraph(matrix) {
    // Determine the dimensions of the matrix
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Create arrays for bit nodes, check nodes, and edges
    const bitNodes = [];
    const checkNodes = [];
    const edges = [];

    // Create bit nodes
    for (let col = 0; col < numCols; col++) {
      bitNodes.push({ ind: col, type: false, error: false }); // You can customize the properties of the bit nodes as needed
    }

    // Create check nodes and edges
    for (let row = 0; row < numRows; row++) {
      checkNodes.push({ ind: row, type: true, error: false, mask: false }); // You can customize the properties of the check nodes as needed

      for (let col = 0; col < numCols; col++) {
        if (matrix[row][col] === 1) {
          edges.push({ source: row, target: col }); // You can customize the properties of the edges as needed
        }
      }
    }

    // Return the bit nodes, check nodes, and edges
    return [bitNodes, checkNodes, edges];
}
var [ bitNodes, checkNodes, edges ] = createBiPartiteGraph(biadjacencyMatrix);
var dValues = bitNodes.map(node => 3);
var n = biadjacencyMatrix[0].length
var m = biadjacencyMatrix.length

// --------------------------------------------------

function qcodeData(code) {
  let code_transpose = code[0].map((_, columnIndex) => code.map(row => row[columnIndex]))
  let bit_nbhd = code_transpose.map(row => row.map((column, i) => {if (column) {return i}}).filter(column => column !== undefined))
  let check_nbhd = code.map(row => row.map((column, i) => {if (column) {return i}}).filter(column => column !== undefined))

	var vv = new Array()
	var cc = new Array()
	var z_gens = new Array()
	var x_gens = new Array()

	for (var i = 0; i < n; i++) {
		vv.push(new Array())
		for (var j = 0; j < n; j++) {
			vv[i].push({
				xind: j,
				yind: i,
				z_gen_nbhd: bit_nbhd[j],
				x_gen_nbhd: bit_nbhd[i],
				error: false,
        		type: false // false vv, true cc
			})
		}
	}

	for (var i = 0; i < m; i++) {
		cc.push(new Array())
		for (var j = 0; j < m; j++) {
			cc[i].push({
				xind: j,
				yind: i,
				z_gen_nbhd: check_nbhd[i],
				x_gen_nbhd: check_nbhd[j],
				error: false,
        		type: true
			})
		}
	}

	for (var i = 0; i < n; i++) {
		z_gens.push(new Array())
		for (var j = 0; j < m; j++) {
			z_gens[i].push({
				xind: j,
				yind: i,
				vv_nbhd: check_nbhd[j],
				cc_nbhd: bit_nbhd[i],
				error: false,
				mask: false,
        		type: false
			})
		}
	}

	for (var i = 0; i < m; i++) {
		x_gens.push(new Array())
		for (var j = 0; j < n; j++) {
			x_gens[i].push({
				xind: j,
				yind: i,
				vv_nbhd: check_nbhd[i],
				cc_nbhd: bit_nbhd[j],
				score: { best_flips: { ver_flips: [], hor_flips: [] }, best_synd_diff: 0, best_weight: 1 },
        		type: true
			})
		}
	}
	return [ vv, cc, z_gens, x_gens ]
}

var [ vv, cc, z_gens, x_gens ] = qcodeData(biadjacencyMatrix);
var sortedRelativeDiffs = x_gens.flat(1).map(node => 0)

function updateVariables(code) {
	if (code == 1) {
		biadjacencyMatrix = biadjacencyMatrixHam
	} else {
		biadjacencyMatrix = biadjacencyMatrixExp
	}
	[ bitNodes, checkNodes, edges ] = createBiPartiteGraph(biadjacencyMatrix);
	dValues = bitNodes.map(node => 3);
	n = biadjacencyMatrix[0].length
	m = biadjacencyMatrix.length

	radius = width / (3 *(biadjacencyMatrix.length + biadjacencyMatrix[0].length + gap + marginTop + marginBottom));   
	barWidth = 1.5*radius;
	barHeight = 2*radius + 50;

	[ vv, cc, z_gens, x_gens ] = qcodeData(biadjacencyMatrix);
	sortedRelativeDiffs = x_gens.flat(1).map(node => 0)

	drawInitial()
	draw9()
}