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
  constructor(x,y,owner=undefined) {
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.adj = [];
    this.pi = undefined;   // predecessor node - for route search
    this.distFromStartNode = Infinity;
  }
  
  updatePos(x,y){
    this.x = x;
    this.y = y;
  }
  
  distanceFrom(node){
		let dx = abs(this.x-node.x);
    let dy = abs(this.y-node.y);
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


class Graph{
  constructor(){
    this.adj = {};
  }

  // read  
  addEdge(u,v){
    if (!(u in this.adj)) {
      this.adj[u] = [];
    }
    if (!(v in this.adj[u])) {
      this.adj[u].push(v);
    }
  }

  neighbours(node){
    return this.adj[node];
  }
  
  resetAllNodesToInfinity(){
    for (let node in this.adj) {
      node.distFromStartNode = Infinity;
    }
  }
  
  prt(){
    cl('Graph - dbg print:   - - S')
    cl(this.adj);
    cl(' - - - ');
    //for (let node in this.adj) {
    //  clj(node);
    //}
    cl('Graph - dbg print:   - - E')
  }
}






cl('FROM MODULE: algos_sftest - Tests - - - - - - S');

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
let points = [[0,0],[0,10],[10,10],[10,0]];
let nodes = [];
for (let xy in points) {
  let x; let y;
  [x, y] = points[xy];
  nodes.push(new RouteNode(x,y));
}

let g = new Graph();
g.addEdge(nodes[0],nodes[1]);
g.addEdge(nodes[1],nodes[2]);
g.addEdge(nodes[2],nodes[3]);
g.addEdge(nodes[3],nodes[0]);
g.addEdge(nodes[0],nodes[2]);
g.addEdge(nodes[1],nodes[3]);
g.prt();

let t = {};
t[nodes[0]]= [];
t[nodes[1]]= [];
t[nodes[2]]= [];
t[nodes[3]]= [];
cl('added object array');
cl(t);
t[nodes[0]].push(nodes[1]);
t[nodes[1]].push(nodes[2]);
t[nodes[2]].push(nodes[3]);
t[nodes[3]].push(nodes[4]);
cl('added edges');
cl(t);

cl('FROM MODULE: algos_sftest - Test - - - - - - E');


