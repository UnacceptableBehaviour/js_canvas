// algos support module
// helpers
const cl = (str) => {
  console.log(str);
};

const clj = (obj) => {
  console.log(JSON.parse(JSON.stringify(obj)));
};


function algoInfo() {
  cl('[algos] Hello!');
};
// use export built in to export interface - shortcut for module.export
exports.algoInfo = algoInfo;

cl('FROM MODULE: algos_sftest');


// Dijkstra
// we need
// Prioriy Q (min Heap)
// Graph
// Node - be able to sort

// noddy PriorityQ - lets get it working!
// lots of bad, implement as as fixed size minHeap
class PriorityQ {
  constructor(sortFunc, maxSize=200){
    this.q = [];
    this.sortFunc = sortFunc;
  }  
  push(o){
    this.q.push(o);
    this.q.sort(this.sortFunc);
  }  
  peek(){
    return(this.q[0]);
  }  
  pop(){
    return(this.q.shift());
  }  
  clear(){
    this.q = [];
  }  
  length(){
    return (this.q.length);
  }  
  isEmpty(){
    return ( this.q.length === 0 )
  }
  
}



// start simple
class RouteNode{
  static ctorCount = 0;
  static nodes = {};
  static idToObject(id){
    return RouteNode.nodes[id];
  }
  
  constructor(x,y,owner=undefined) {
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.adj = [];
    this.pi = undefined;   // predecessor node - for route search
    this.distFromStartNode = Infinity;
    this.id = RouteNode.ctorCount;
    RouteNode.ctorCount++;
    RouteNode.nodes[this.id] = this;
  }
  
  updatePos(x,y){
    this.x = x;
    this.y = y;
  }
  
  distanceFrom(node){
		let dx = Math.abs(this.x-node.x);
    let dy = Math.abs(this.y-node.y);
		return( Math.floor(Math.sqrt((dx*dx)+(dy*dy))) );    
  }
  
  static compAsc(nodeA, nodeB){
    return (nodeA.distFromStartNode - nodeB.distFromStartNode);
  }
  //static compDec(nodeB,nodeA){
  //  return (nodeA.distFromStartNode - nodeB.distFromStartNode);
  //}
  
  prt(){ // dbg out
    cl(`RouteNode: X:${this.x} Y:${this.y} SDist:${this.distFromStartNode}`);
  }
}
exports.RouteNode = RouteNode;

// at the moment this is really just managing the adjacency lists in the nodes
class Graph{
  constructor(){
    this.allNodes = [];
  }

  addEdge(u, v, distance=undefined){
    // tracking takes time and we don't need it
    if (!(u in this.allNodes)) {
      this.allNodes.push(u);
    }
    if (!(v in this.allNodes)) {
      this.allNodes.push(v);
    }

    if (!distance) distance = u.distanceFrom(v);

    u.adj.push([v, distance]);
    v.adj.push([u, distance]);
  }

  neighbours(node){
    return node.adj;
  }
  
  resetAllNodesToInfinity(){
    //for (let node in this.allNodes) {
    //  this.allNodes[node].distFromStartNode = Infinity;
    //}
  }
  
  prt(){
    cl('Graph - dbg print:   - - S');
    cl(this.allNodes);
    cl('Graph - dbg print:   - - E');
  }
}
exports.Graph = Graph;

// S - Start node
// T - Target node
function dijkstra(S, T, gDbg=null) {
  let path = [];
  let visited = {};
  cl(`start ${S.id}-${T.id}`);
  cl(S);
  cl(T);
  cl('- - EOS')
  let q = new PriorityQ(RouteNode.compAsc);
  S.distFromStartNode = 0;      
  q.push(S);
  visited[S.id] = S.distFromStartNode; // why are we storing distance here?
  
  //cl(T);
  //cl('while (!(T.id in visited)){');
  let wCount = 0;
  while (!(T.id in visited)) {
    let qNode = q.pop();
    cl(`qNode = q.pop(); - ${wCount++}`);
    cl(qNode);
    cl('for');
    for (const n of qNode.adj) {
      let distQAdjacent; let adjNode; let pathWeight;
      [adjNode, distQAdjacent] = n;    // n = [distance, node]
      cl(distQAdjacent);
      cl(adjNode);
      cl('-*-');
      pathWeight = qNode.distFromStartNode + distQAdjacent;
      
      if (pathWeight < adjNode.distFromStartNode) { // update adjNode with new path
        adjNode.distFromStartNode = pathWeight;
        adjNode.pi = qNode;
        q.push(adjNode);
        cl(` - - - - ASSIGN - - ID > T.id:${T.id} - adjNode.id:${adjNode.id}`)
      }      
      visited[adjNode.id] = adjNode.distFromStartNode;  // why are we storing distance here?
    }
  }
    
  // got T - reconstruct path
  path.push(T);
  
  cl(path);
  
  let parent = T.pi;           // << reading .pi = undefined 
  while (!(S in path)) {
    path.push(parent);
    parent = parent.pi;
  }
  return(path);
}
exports.dijkstra = dijkstra;
  
// Ported from some python I wrote a while ago - which may not be right!! :/
// Q1. No need for RouteNode.idToObject(T.id)
//      if visited is an array and doesn;t store distFromS - no clear why that was needed
// Q2. Is the first time we fine T the shortest? - while (!(T.id in visited)) { bla
//      its always checking the shortest rout 1st through priorityQ - 
//
// Why not make  visited = []; then can store object and no need T.id

//
//def dijkstra(g,S,T,vertex_list):
//	print(f"dijkstra from:{S} to:{T}")	
//	path = []
//	visited = {}
//	
//	q = PriorityQueue()
//	S.dist_S_to_node = 0					# set start node distance to self
//	q.put(S)
//	visited[S] = S.dist_S_to_node	
//	
//	while T not in visited:
//		node = q.get()		
//		for adj_node in node.adj:
//			# calc delta from source to adjacent
//			path_weight = node.dist_S_to_node + node.distance(adj_node)
//			
//			print(f"f:{node}-[{node.dist_S_to_node}] > t:{adj_node}-[{adj_node.dist_S_to_node}] PW:{path_weight} < ADJ_S:{adj_node.dist_S_to_node} = {path_weight < adj_node.dist_S_to_node}")
//			
//			# if its smaller update - relax
//			if path_weight < adj_node.dist_S_to_node:
//				adj_node.dist_S_to_node = path_weight
//				adj_node.pi = node
//				q.put(adj_node)
//				vertex_list.append([node, adj_node])
//		
//			visited[adj_node] = adj_node.dist_S_to_node
//		
//	
//	path.append(T)
//	parent = T.pi
//	while S not in path:
//		path.append(parent)
//		parent = parent.pi
//	
//	
//	print("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - S-D1")	
//	print(path)
//	print("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - E-D1")	
//	
//	return path

















cl('FROM MODULE: algos_sftest - Tests - - - - - - S');
// MAKE INTO more thorough unit tests - TODO
cl('> - - RouteNode - - -');
//let n = [];
//for (let i=0; i<10; i++) {
//  let node = new RouteNode(1,2);
//  node.distFromStartNode = Math.floor(Math.random()*100);
//  node.prt();
//  n.push(node);
//}
//
//cl('Node list - sort ascending');
//cl(n.sort(RouteNode.compAsc));
//cl('Sorted Node list');
//cl(n.sort(RouteNode.compDec));

cl('> - - PriortyQ - - -');
//let q = new PriorityQ(RouteNode.compAsc);
//for (let i=1; i<5; i++) {
//  let node = new RouteNode(1,2);
//  node.distFromStartNode = i;
//  q.push(node);
//}
//
//while (!q.isEmpty()) {
//  clj(q.pop());
//}

cl('> - - Graph - - -');
//let points = [[0,0],[0,10],[10,10],[10,0]];
//let nodes = [];
//for (let xy in points) {
//  let x; let y;
//  [x, y] = points[xy];
//  nodes.push(new RouteNode(x,y));
//}
//
//let g = new Graph();
//g.addEdge(nodes[0],nodes[1]);
//g.addEdge(nodes[1],nodes[2]);
//g.addEdge(nodes[2],nodes[3]);
//g.addEdge(nodes[3],nodes[0]);
//g.addEdge(nodes[0],nodes[2]);
//g.addEdge(nodes[1],nodes[3]);
//g.prt();
//
//let t = {};
//t[nodes[0]]= [];    // CANNOT USE AN OBJECT AS A KEY in an Object - for (dict for (EG
//t[nodes[1]]= [];    // has to be a string - IE needs unique obj string for (dict
//t[nodes[2]]= [];
//t[nodes[3]]= [];
//cl('added object array');
//cl(t);
//t[nodes[0]].push(nodes[1]);
//t[nodes[1]].push(nodes[2]);
//t[nodes[2]].push(nodes[3]);
//t[nodes[3]].push(nodes[4]);
//cl('added edges');
//cl(t);
//for (const n of t[nodes[0]]) {
//  cl(n);
//}

cl('FROM MODULE: algos_sftest - Test - - - - - - E');


